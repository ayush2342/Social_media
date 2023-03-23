const express = require('express');
const router = express.Router();

const userProfile= require('../controllers/usersController');

router.get('/profile',userProfile.profile);
router.get('/Signin',userProfile.Signin);
router.get('/Signup',userProfile.SignUp);
router.post('/create',userProfile.create);


module.exports=router;