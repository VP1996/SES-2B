const router = require('express').Router();
const teachersController = require('../controllers/teacherController');

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

module.exports = router;