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

module.exports = router;
