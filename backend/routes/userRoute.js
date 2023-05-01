const express=require('express')
const {registerController,loginController} =require('../controllers/userController')
const router=express.Router()

//Authorization
const {requireSignIn,isAdmin}=require('../middleware/requireAuth')

//register Route
router.post('/register',registerController)

//Login Route
router.post('/login',loginController)

module.exports=router