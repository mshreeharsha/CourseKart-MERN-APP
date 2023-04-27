const express=require('express')
const {registerController,loginController} =require('../controllers/userController')
const router=express.Router()

//Routes

//register Route
router.post('/register',registerController)

//Login Route
router.post('/login',loginController)

module.exports=router