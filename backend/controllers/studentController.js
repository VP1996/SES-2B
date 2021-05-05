const Student = require("../models/student");

module.exports = {
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
        const userid = req.body.userid;
        const password = req.body.password;

        Student.findOne({ userid: userid })
            .then(student => {
                if (!student) {
                    return res.status(404).json({
                        success: false,
                        message: "Your username and/or password do not match"
                    });
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: "User exists and is logged in"
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
    update: function (req, res){
        const userid = req.body.userid;
        const password = req.body.password;
        const name = req.body.name;
        const studyYear = req.body.studyYear;
        const course = req.body.course;
        const faculty = req.body.faculty;
        const email = req.body.email;
        const campusLocation = req.body.campusLocation;
        const description = req.body.description;

        Student.updateOne({ userid: userid }, {
            userid,
            password,
            name,
            studyYear,
            course,
            faculty,
            email,
            campusLocation,
            description
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
