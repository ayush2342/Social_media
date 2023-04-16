const express = require('express');
const router= express.Router();
const homeController= require('../controllers/homeController')
const passport=require('passport');

router.get('/',passport.checkAuthentication,homeController.home);
router.use('/users',require('./users'));
router.use('/friends',require('./friends'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comment'));

module.exports=router;