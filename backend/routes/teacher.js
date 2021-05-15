const router = require('express').Router();
const teachersController = require('../controllers/teacherController');

router
    .route('/all')
    .get(teachersController.findAll);

router
    .route('/register') 
    .post(teachersController.register);

router
    .route('/login')
    .post(teachersController.login)

router
    .route('/edit')
    .post(teachersController.update)

router
    .route('/delete')
    .post(teachersController.delete)

router
    .route('/verifyToken') // to verify token from frontend - used to protect fronted routes.
    .get(teachersController.verifyToken);

router
    .route('/sendEmail') // to verify token from frontend - used to protect fronted routes.
    .post(teachersController.sendEmail);

module.exports = router;