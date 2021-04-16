const passport = require('passport');



// import all the strategies
const SigninStrategy = requre('./SigninStrategy');
const SignupStrategy = requre('./SignupStrategy');


passport.use('local-signin', SigninStrategy);
passport.use('local-signup', SignupStrategy);



module.exports = passport;