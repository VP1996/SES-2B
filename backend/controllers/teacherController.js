const Teacher = require("../models/teacher");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

module.exports = {
    verifyToken: function (req, res) {
        const authorization = req.headers.authorization;
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            // use jwt verify to check the token passsed through in position 1 of array made using split.
            jwt.verify(req.headers.authorization.split(' ')[1], process.env.TEACHERSECRET, (err, decoded) => {
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
        const userid = req.body.teacherID;
        const password = req.body.password;

        if (!userid || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            });
        }

        Teacher.findOne({ userid: userid })
            .then(teacher => {
                if (!teacher) {
                    return res.status(404).json({
                        success: false,
                        message: "Your username and/or password do not match"
                    });
                }
                else {
                    //if passwords match then create a payload for the JWT token
                    bcrypt.compare(password, teacher.password)
                        .then(isMatch => {
                            if (isMatch) {
                                const payload = {
                                    id: teacher.id,
                                    userid: teacher.userid
                                }
                                // return token created after payload is signed
                                jwt.sign(
                                    payload,
                                    process.env.TEACHERSECRET,
                                    { expiresIn: 604800 },
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            userid: teacher.userid,
                                            token: "Bearer " + token
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
    getTeacher: async function (req, res) {
        console.log(req.body.teacherID );
        try {
            let teacher = await Teacher.findOne({ userid: req.body.teacherID }, {userid: 1, name: 1, teachingYear: 1, faculty: 1, email: 1, campusLocation: 1, description: 1})
            if (teacher) {
                res.status(200).json(teacher);
            }
        } catch (e) {
            res.status(400).json({
                succes: false,
                response: "Could not find user."
            })
        }
    },
    findAll: function (req, res) {
        Teacher.find()
            .then(teachers => {
                return res.status(200).json({
                    teachers
                });
            })
            .catch(e => {
                return res.status(500).json({
                    teachers: []
                });
            })
    },
    update: function (req, res) {
        // const password = req.body.password;
        const teachingYear = req.body.teacherYear;
        const faculty = req.body.teacherFaculty;
        const email = req.body.teacherEmail;
        const campusLocation = req.body.teacherLocation;
        const description = req.body.teacherDescription;

        Teacher.updateOne({ userid: req.body.teacherID }, {
            // password,
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
    },
    sendEmail: async function (req, res) {
        const secretPin = req.body.secretPin;
        const teacherID = req.body.teacherID;
        const classID = req.body.classID;
        let teacherEmail;

        let response = await Teacher.findOne({userid: teacherID})
        teacherEmail = response.email;
        
        console.log(`sending email from: ${teacherEmail}`);

        //transporter is going to be an object that is able to send mail
        //transport us the transport config object, connection url or transport plugin instance
        //defaults is an object that defines default values for mail options
        let transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "d59c9dcb970128",
                pass: "075f9213f14420"
            }
        })

        //set mail options - can have multiple address in 'to'
        const mailOptions = {
            from: teacherEmail,
            to: 'guddhikalambe2000@gmail.com',
            subject: classID + ' Authorisation Pin',
            html: `<br>Dear student</br>, <br>You are being sent this email as you requested to be authenticated into ${classID}.</br><br>The pin to be authorised is: <b>${secretPin}</b></br>`
        }
        
        //use sendMail once transport is created and message is configures
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId)
            res.json({
                success: true,
                message: 'Email sent to all students'
            })
        })
        
    }
}
