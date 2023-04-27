const express=require('express')
const {registerController} =require('../controllers/userController')
const router=express.Router()

//Routes
//register Route
router.post('/register',registerController)

module.exports=router