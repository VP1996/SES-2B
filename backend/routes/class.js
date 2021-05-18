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
    .get(classController.findStudentClasses)
router
    .route('/teacher-classes')
    .get(classController.findTeacherClasses)

module.exports = router;
