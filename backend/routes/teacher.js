const router = require('express').Router();
const teachersController = require('../controllers/teacherController');

router
    .route('/register') 
    .get(teachersController.register);

router
    .route('/login')
    .post(teachersController.login)

module.exports = router;