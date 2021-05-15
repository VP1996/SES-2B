const router = require('express').Router();
const studentsController = require('../controllers/studentController');

router
    .route('/all')
    .get(studentsController.findAll);

router
    .route('/register')
    .post(studentsController.register);

router
    .route('/login')
    .post(studentsController.login)

router
    .route('/edit')
    .post(studentsController.update)

router
    .route('/delete')
    .post(studentsController.delete)

router
    .route('/verifyToken') // to verify token from frontend - used to protect fronted routes.
    .get(studentsController.verifyToken);

module.exports = router;