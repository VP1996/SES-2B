const router = require('express').Router();
const studentsController = require('../controllers/studentController');

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

module.exports = router;