const router = require('express').Router();
const userController = require('../controllers/userController');


router
    .route('/login') // to login to existing account
    .post(userController.login);

router
    .route('/register') // to login to existing account
    .post(userController.register);

router 
    .route('/verifyToken') // to verify token from frontend - used to protect fronted routes.
    .get(userController.verifyToken);

module.exports = router;