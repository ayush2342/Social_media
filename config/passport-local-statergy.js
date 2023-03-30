const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//Authentication using Passport
passport.use(new LocalStrategy(
    {
        usernameField:'email'
    },
    function(email,password,done)
    {
        //Find a User and establish a identity
        User.findOne({email:email}).then(function(user)
        {
            if(!user||user.password!=password)
            {
                console.log('Invalid UserName/Password');
                return done(null,false);
            }
            else
            {
                return done(null,user);
            }

        }).catch(function(error)
        {
            console.log('Error in finding the user--Passport');
            return done(error);
        })
    }
))


//Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done)
{
    done(null,user.id);
})

//Deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done)
{
    User.findById(id).then(function(user)
    {
        return done(null,user);
    }).catch(function(error)
    {
        console.log('Error in finding the user--Passport');
        return done(error);
    })
})

module.export=passport;