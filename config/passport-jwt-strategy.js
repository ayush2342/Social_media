const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const env = require('../config/enviornment')

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

passport.use(new JWTStrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload._id).then(function (user) {

        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }).catch(function (error) {
        console.log('Error in finding the User from JWT')
        return done(error);
    });
}))


module.exports = passport;
