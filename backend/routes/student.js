const router = require('express').Router();
const studentsController = require('../controllers/studentController');

router
    .route('/register') 
    .get(studentsController.register);

router
    .route('/login')
    .post(studentsController.login)

module.exports = router;