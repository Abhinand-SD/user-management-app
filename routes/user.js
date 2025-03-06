const express = require('express')
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/userAuth'); //middleware
const adminAuth = require('../middleware/adminAuth');

 


router.get('/login',adminAuth.redirectIfAuthaticated,userController.loadLogin)

router.post('/login',adminAuth.redirectIfAuthaticated,userController.login)

router.get('/register',adminAuth.redirectIfAuthaticated,userController.loadRegister)

router.post('/register',adminAuth.redirectIfAuthaticated,userController.registerUser)

router.get('/home',auth.checkSession,userController.loadHome)

router.post('/logout',auth.checkSession,userController.logout)

router.get('*',userController.notFound)



// Update user
// router.put('/users/:id', userController.updateUser);



module.exports = router