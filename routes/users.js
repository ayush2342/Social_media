const express = require('express');
const router = express.Router();

const userProfile= require('../controllers/usersController');

router.get('/profile',userProfile.profile);
router.get('/Signin',userProfile.Signin);
router.get('/Signup',userProfile.SignUp);
router.post('/create',userProfile.create);
router.post('/create-session',userProfile.createSession);
router.get('/destroy-session',userProfile.destroySession);


module.exports=router;