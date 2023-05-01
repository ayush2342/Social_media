const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user')

// Tell passport to use a new Strategy for google Login
passport.use(new googleStrategy(
    {
        clientID:"694532115132-pfh3t3tmnbqcuf6ieqrelnlii2amsgqq.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    async function(accessToken, refreshToken,profile,done)
    {
        try {

            // Find a User
            let user = await User.findOne({email:profile.emails[0].value});
            

            if(user)
            {
                // If found set this user as req.user
                return done(null,user)
            }
            else
            {
                // If not found create the user and set it as req.user
                User.create(
                    {
                        name: profile.displayName,
                        email:profile.emails[0].value,
                        password:crypto.randomBytes(20).toString('hex')
                    }
                ).then(function(user)
                {
                    return done(null,user);
                }).catch(function(error)
                {
                    console.log("Error in google strategy passport",error);
                    return;
                })
            }
            
        } catch (error) {
            console.log('Error in google strategy passport')
            return done(error);
        }
    }

))

module.exports = passport;