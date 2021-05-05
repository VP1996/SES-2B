const Teacher = require("../models/teacher");

module.exports = {
    register: function (req, res) {
        const userid = req.body.teacherID;
        const password = req.body.teacherPassword;
        const name = req.body.teacherName;
        const teachingYear = req.body.teacherYear;
        const faculty = req.body.teacherFaculty;
        const email = req.body.teacherEmail;
        const campusLocation = req.body.teacherLocation;
        const description = req.body.teacherDescription;


        Teacher.findOne({ userid: userid })
            .then(teacher => {
                if (teacher) {
                    return res.status(400).json({
                        success: false,
                        message: "Username already exists"
                    });

                } else {
                    //if user with that username doesnt exist then create a new user
                    const newTeacher = new Teacher({
                        userid,
                        password,
                        name,
                        teachingYear,
                        faculty,
                        email,
                        campusLocation,
                        description
                    });

                    //save user to collection
                    newTeacher.save()
                        .then((teacher) => {
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

        Teacher.findOne({ userid: userid })
            .then(teacher => {
                if (!teacher) {
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
        const teachingYear = req.body.teachingYear;
        const faculty = req.body.faculty;
        const email = req.body.email;
        const campusLocation = req.body.campusLocation;
        const description = req.body.description;

        Teacher.updateOne({ userid: userid }, {
            userid,
            password,
            name,
            teachingYear,
            faculty,
            email,
            campusLocation,
            description
        })
            .then(teacher => {
                return res.status(200).json({
                    success: true,
                    message: "Teacher successfully updated",
                });
            })
            .catch(e => {
                return res.status(404).json({
                    success: false,
                    message: "Teacher does not exist",
                    err: 'error'
                });
            });


    },
    delete: function (req, res) {
        const userid = req.body.userid;

        Teacher.findOneAndDelete({ userid: userid })
            .then(teacher => {
                return res.status(200).json({
                    success: true,
                    message: "Teacher successfully deleted",
                });
            })
            .catch(e => {
                return res.status(404).json({
                    success: false,
                    message: "Teacher could not be deleted"
                });
            });
    }
}
