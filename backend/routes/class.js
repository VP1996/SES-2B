const router = require('express').Router();
const classController = require('../controllers/classController');

router
    .route('/create')
    .post(classController.create)
router
    .route('/delete')
    .post(classController.delete)
router
    .route('/addStudent')
    .post(classController.addStudent)
router
    .route('/addTeacher')
    .post(classController.addTeacher)
router
    .route('/removeStudent')
    .post(classController.removeStudent)
router
    .route('/removeTeacher')
    .post(classController.removeTeacher)
router
    .route('/all')
    .get(classController.findAll)
router
    .route('/student-classes')
    .post(classController.findStudentClasses)
router
    .route('/teacher-classes')
    .post(classController.findTeacherClasses)
router
    .route('/getStudentAuth')
    .post(classController.findStudentAuthObject)
router
    .route('/updateFacialFlag')
    .post(classController.updateFacialFlag)
    router
    .route('/updateTeacherFacialFlag')
    .post(classController.updateTeacherFacialFlag)
router
    .route('/updateCaptchaFlag')
    .post(classController.updateCaptchaFlag)
router
    .route('/updateTeacherCaptchaFlag')
    .post(classController.updateTeacherCaptchaFlag)
router
    .route('/updatePinFlag')
    .post(classController.updatePinFlag)
router
    .route('/getTeacherAuth')
    .post(classController.findTeacherAuthObject)

module.exports = router;
