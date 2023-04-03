const express = require('express');
const router = express.Router();
const passport=require('passport');

const userProfile= require('../controllers/usersController');

router.get('/profile',userProfile.profile);
router.get('/Signin',userProfile.Signin);
router.get('/Signup',userProfile.SignUp);
router.post('/create',userProfile.create);

//Use passport as a middleware to Authenticate
router.post('/create-session',passport.authenticate(
    'local',{failureRedirect:'/users/Signin'}
),userProfile.createSession);


module.exports=router;