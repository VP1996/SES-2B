const Student = require("../models/student");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {//function to verify token from client to then protect frontend routes. 
    verifyToken: function (req, res) {
        const authorization = req.headers.authorization;
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            // use jwt verify to check the token passsed through in position 1 of array made using split.
            jwt.verify(req.headers.authorization.split(' ')[1], process.env.STUDENTSECRET, (err, decoded) => {
                if (err) {
                    res.json({
                        success: false,
                        message: "Unauthorized"
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Authorized"
                    });
                }
            })
        } else {
            res.json({
                success: false,
                message: "No token provided"
            });
        }
    },
    register: function (req, res) {
        const userid = req.body.studentID;
        const password = req.body.studentPassword;
        const name = req.body.studentName;
        const studyYear = req.body.studentYear;
        const course = req.body.studentCourse;
        const faculty = req.body.studentFaculty;
        const email = req.body.studentEmail;
        const campusLocation = req.body.studentLocation;
        const description = req.body.studentDescription;

        Student.findOne({ userid: userid })
            .then(student => {
                if (student) {
                    return res.status(400).json({
                        success: false,
                        message: "Username already exists"
                    });

                } else {
                    //if user with that username doesnt exist then create a new user
                    const newStudent = new Student({
                        userid,
                        password,
                        name,
                        studyYear,
                        course,
                        faculty,
                        email,
                        campusLocation,
                        description
                    });

                    //save user to collection
                    newStudent.save()
                        .then((student) => {
                            res.json({
                                success: true,
                                message: "User successfully created"
                            });
                        })
                        .catch(err => res.status(400).json({
                            success: false,
                            message: "User could not be created",
                            err: err
                        }));

                }
            })

    },
    login: function (req, res) {
        const userid = req.body.studentID;
        const password = req.body.password;

        if (!userid || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        Student.findOne({ userid: userid })
            .then(student => {
                if (!student) {
                    return res.status(404).json({
                        success: false,
                        message: "Your username and/or password do not match"
                    });
                }
                else {
                    //if passwords match then create a payload for the JWT token
                    bcrypt.compare(password, student.password)
                        .then(isMatch => {
                            if (isMatch) {
                                const payload = {
                                    id: student.id,
                                    userid: student.userid
                                }
                                // return token created after payload is signed
                                jwt.sign(
                                    payload,
                                    process.env.STUDENTSECRET,
                                    { expiresIn: 604800 },
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            userid: student.userid,
                                            token: "Bearer " + token,
                                            message: "Successful login!"
                                        });
                                    }
                                );
                            } else {
                                res.json({
                                    success: false,
                                    message: "incorrect password"
                                });
                            }
                        });
                }
            })
            .catch(e => {
                return res.status(404).json({
                    success: false,
                    message: "Your username doesnt exist",
                    err: 'error'
                });
            })
    },
    getStudent: async function (req, res) {
        try {
            let student = await Student.findOne({ userid: req.body.studentID }, {userid: 1, name: 1, studyYear: 1, course : 1, faculty: 1, email: 1, campusLocation: 1, description: 1})
            if (student) {
                res.status(200).json(student);
            }
        } catch (e) {
            res.status(400).json({
                succes: false,
                response: "Could not find user."
            })
        }
    },
    findAll: function (req, res) {
        Student.find()
            .then(students => {
                return res.status(200).json({
                    students
                });
            })
            .catch(e => {
                return res.status(500).json({
                    students: []
                });
            })
    },
    update: function (req, res) {
        // const password = req.body.password;
        const studyYear = req.body.studentYear;
        const course = req.body.studentCourse;
        const email = req.body.studentEmail;
        const campusLocation = req.body.studentLocation;
        const description = req.body.studentDescription;
        const faculty = req.body.studentFaculty;

        console.log(description);
        Student.updateOne({ userid: req.body.studentID }, {
            // password,
            studyYear,
            course,
            email,
            campusLocation,
            description,
            faculty
        })
            .then(student => {
                return res.status(200).json({
                    success: true,
                    message: "Student successfully updated",
                });
            })
            .catch(e => {
                return res.status(404).json({
                    success: false,
                    message: "Student does not exist",
                    err: 'error'
                });
            });


    },
    delete: function (req, res) {
        const userid = req.body.userid;

        Student.findOneAndDelete({ userid: userid })
            .then(student => {
                return res.status(200).json({
                    success: true,
                    message: "Student successfully deleted",
                });
            })
            .catch(e => {
                return res.status(404).json({
                    success: false,
                    message: "Student could not be deleted"
                });
            });
    }
}
