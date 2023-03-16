const express = require('express');
const router = express.Router();

const friendsCount= require('../controllers/friendsController');

router.get('/count',friendsCount.count);

module.exports=router;