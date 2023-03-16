const express = require('express');
const router = express.Router();

const userProfile= require('../controllers/usersController');

router.get('/profile',userProfile.profile);

module.exports=router;