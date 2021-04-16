const Strategy = require('passport-local').Strategy;
const User = require('..models/User');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);


const SignupStrategy = new Strategy({passReqToCallback: true, usernameField: 'emailID'},function(req, emailID, password, done){
    User.findOne({ emailID }).lean().exec((err, user) => {
        if (err) {
            return done(err, null);
        }
        if (user) {
            return done('User already exists', null);
        }

        const encrypedPassword = bcrypt.hashSync(password, salt);
        let newUser = new User({
            emailID,
            password: encrypedPassword
        });

        newUser.save((error, inserted) => {
            if (error) {
                return done(error, null);
            }
            //delete inserted.password;
            return done(null, inserted);
        });
    });
});


module.exports = SignupStrategy;