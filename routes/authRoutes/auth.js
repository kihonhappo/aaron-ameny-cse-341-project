const path = require('path');
const express = require('express');
const authController = require('../../controllers/auth');
const router = express.Router();
console.log('after authPages index.js inside auth route');


router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/logout', authController.getLogout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;
