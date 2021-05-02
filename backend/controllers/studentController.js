const Student = require("../models/student");

module.exports = {
    register: function (req, res) {
        const userid = req.body.userid;
        const password = req.body.password;
        const name = req.body.name;
        const studyYear = req.body.studyYear;
        const course = req.body.course;
        const faculty = req.body.faculty;
        const email = req.body.email;
        const campusLocation = req.body.campusLocation;

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
                        campusLocation
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
    }
}