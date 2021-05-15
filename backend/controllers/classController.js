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
        const studentName = req.body.studentName;
        const facialFlag = false;
        const recaptchaFlag = false;
        const emailPinFlag = false;


        let newStudentAuth = {
            classID,
            className,
            studentName,
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
        const teacherName = req.body.teacherName;
        const facialFlag = false;
        const recaptchaFlag = false;
        const emailPinFlag = false;


        let newTeacherAuth = {
            classID,
            className,
            teacherName,
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

        Class.findOneAndUpdate({ classID: classID }, { $pull: { 'students' : {'studentName' : studentName}}})
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

        Class.findOneAndUpdate({ classID: classID }, { $pull: { 'teachers' : {'teacherID' : teacherID}}})
            .then(() => res.json({
                success: true,
                message: `Successfully removed teacher from classroom!`
            }))
            .catch(err => res.status(400).json({
                success: false,
                message: `Could not remove teacher from the classroom.`,
                err: err
            }));
    }
}
