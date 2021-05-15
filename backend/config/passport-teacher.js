const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const Teacher = require('../models/teacher'); 

// The following function is a middleware which will validate the user sent JWT token.

// send token and key as options objects.
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TEACHERSECRET;

module.exports = passport => {
    passport.use(
        // Options used to create a new strategy which looks up token id and returns user if user found.
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};