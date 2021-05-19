const Class = require("../models/class");

module.exports = {
    create: function (req, res) {
        const className = req.body.className;
        const classID = req.body.classID;
        const startTime = req.body.classStart;
        const endTime = req.body.classEnd;

        Class.findOne({ classID: classID })
            .then(classRecord => {
                if (classRecord) {
                    return res.status(400).json({
                        success: false,
                        message: "Class id already exists"
                    });
                }
                else {
                    const newClass = new Class({
                        className,
                        classID,
                        startTime,
                        endTime
                    });


                    newClass.save()
                        .then(classRecord => {
                            res.json({
                                success: true,
                                message: "Class successfully created"
                            });
                        })
                        .catch(err => res.status(400).json({
                            success: false,
                            message: "Class could not be created",
                            err: err
                        }));
                }
            })

    },
    delete: function (req, res) {
        const classID = req.body.classID;

        Class.findOneAndRemove({ classID: classID })
            .then(classRecord => {
                res.json({
                    success: true,
                    message: "Class successfully deleted"
                });
            })
            .catch(err => res.status(400).json({
                success: false,
                message: "Class could not be deleted",
                err: err
            }));
    },
    addStudent: function (req, res) {
        // * check if student is already in list/array of student of class
        // * check that userid being used is student id and valid 
        const classID = req.body.classID;
        const className = req.body.className;
        const studentID = req.body.studentID;
        const facialFlag = false;
        const recaptchaFlag = false;
        const emailPinFlag = false;


        let newStudentAuth = {
            classID,
            className,
            studentID,
            facialFlag,
            recaptchaFlag,
            emailPinFlag
        }
        // mongodb's push allows instant update to nested array in document.

        Class.findOneAndUpdate({ classID: classID }, { $push: { students: newStudentAuth } })
            .then((classRecord) => {
                classRecord.save();
                res.json({
                    success: true,
                    message: `Successfully added new student to classroom!`
                })
            })
            .catch(err => res.status(400).json({
                success: false,
                message: `Could not add student to the classroom`,
                err: err
            }));
    },
    addTeacher: function (req, res) {
        // * check if teacher is already in list/array of teachers of class
        // * check that teacherid being used is teacher's id and valid 

        const classID = req.body.classID;
        const className = req.body.className;
        const teacherID = req.body.teacherID;
        const facialFlag = false;
        const recaptchaFlag = false;
        const emailPinFlag = false;


        let newTeacherAuth = {
            classID,
            className,
            teacherID,
            facialFlag,
            recaptchaFlag,
            emailPinFlag
        }
        // mongodb's push allows instant update to nested array in document.

        Class.findOneAndUpdate({ classID: classID }, { $push: { teachers: newTeacherAuth } })
            .then((classRecord) => {
                classRecord.save();
                res.json({
                    success: true,
                    message: `Successfully added teacher to classroom!`
                })
            })
            .catch(err => res.status(400).json({
                success: false,
                message: `Could not add student to the classroom`,
                err: err
            }));
    },
    removeStudent: function (req, res) {
        // * make sure to delete using student ID  
        // * check to see its valid student ID  
        // * make sure student actually exists in array

        const classID = req.body.classID;
        const studentName = req.body.studentName;

        Class.findOneAndUpdate({ classID: classID }, { $pull: { 'students': { 'studentName': studentName } } })
            .then(() => res.json({
                success: true,
                message: `Successfully removed student from classroom!`
            }))
            .catch(err => res.status(400).json({
                success: false,
                message: `Could not remove student from the classroom.`,
                err: err
            }));
    },
    removeTeacher: function (req, res) {
        // * make sure to delete using teacher ID  
        // * check to see its valid teacher ID  
        // * make sure teacher actually exists in array

        const classID = req.body.classID;
        const teacherID = req.body.teacherID;

        Class.findOneAndUpdate({ classID: classID }, { $pull: { 'teachers': { 'teacherID': teacherID } } })
            .then(() => res.json({
                success: true,
                message: `Successfully removed teacher from classroom!`
            }))
            .catch(err => res.status(400).json({
                success: false,
                message: `Could not remove teacher from the classroom.`,
                err: err
            }));
    },
    findAll: function (req, res) {
        Class.find()
            .then(classes => {
                return res.status(200).json({
                    classes
                });
            })
            .catch(e => {
                return res.status(500).json({
                    classes: []
                });
            })
    },
    findStudentClasses: function (req, res) {
        const studentID = req.body.studentID
        Class.find({ "students.studentID": studentID })
            .then(classes => {
                // console.log(classes)
                return res.status(200).json({
                    classes
                });
            })
            .catch(e => {
                return res.status(400).json({
                    classes: []
                });
            })
    },
    findTeacherClasses: function (req, res) {
        const teacherID = req.body.teacherID
        Class.find({ "teachers.teacherID": teacherID })
            .then(classes => {
                // console.log(classes)
                return res.status(200).json({
                    classes
                });
            })
            .catch(e => {
                return res.status(400).json({
                    classes: []
                });
            })
    },
    findStudentAuthObject: function (req, res) {
        const studentID = req.body.studentID
        const classID = req.body.classID

        Class.find({ classID: classID }, { students: { $elemMatch: { studentID: studentID } } })
            .then(studentAuthObject => {
                return res.status(200).json({
                    studentAuth: studentAuthObject,
                    success: true,
                    message: "Sent Auth Obj"
                })
            })
            .catch(e => {
                return res.status(400).json({
                    success: false,
                    message: "Could not get student Auth object."
                })
            });
    },
    updateFacialFlag: function (req, res) {
        const studentID = req.body.studentID
        const classID = req.body.classID

        Class.updateOne({classID: classID, "students.studentID": studentID}, {$set: {"students.$.facialFlag": true}})
            .then(response => {
                console.log(response)
                return res.status(200).json({
                    response,
                    success: true,
                    message: "Updated facial flag to true"
                })
            })
            .catch(e => {
                return res.status(400).json({
                    success: false,
                    message: "Could not update facial flag."
                })
            });
    },
    updateCaptchaFlag: function (req, res) {
        const studentID = req.body.studentID
        const classID = req.body.classID

        Class.updateOne({classID: classID, "students.studentID": studentID}, {$set: {"students.$.recaptchaFlag": true}})
            .then(response => {
                return res.status(200).json({
                    response,
                    success: true,
                    message: "Updated captcha flag to true"
                })
            })
            .catch(e => {
                return res.status(400).json({
                    success: false,
                    message: "Could not update captcha flag."
                })
            });
    },
    updatePinFlag: function (req, res) {
        const studentID = req.body.studentID
        const classID = req.body.classID

        Class.updateOne({classID: classID, "students.studentID": studentID}, {$set: {"students.$.emailPinFlag": true}})
            .then(response => {
                console.log(response)
                return res.status(200).json({
                    response,
                    success: true,
                    message: "Updated pin flag to true"
                })
            })
            .catch(e => {
                return res.status(400).json({
                    success: false,
                    message: "Could not update pin flag."
                })
            });
    }
}
