const express = require('express');
const router = express.Router();
const passport=require('passport');

const userProfile= require('../controllers/usersController');

router.get('/profile/:id',passport.checkAuthentication,userProfile.profile);
router.get('/Signin',passport.restrictAccess,userProfile.Signin);
router.get('/Signup',passport.restrictAccess,userProfile.SignUp);
router.post('/create',userProfile.create);
router.post('/update/:id',passport.checkAuthentication,userProfile.update)

//Use passport as a middleware to Authenticate
router.post('/create-session',passport.authenticate(
    'local',{failureRedirect:'/users/Signin'}
),userProfile.createSession);

router.get('/Signout',userProfile.destroySession)

module.exports=router;
