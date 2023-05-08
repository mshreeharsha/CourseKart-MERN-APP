const express=require('express')
const {registerController,loginController} =require('../controllers/userController')
const router=express.Router()

//Authorization
const {requireSignIn,isAdmin}=require('../middleware/requireAuth')

//register Route
router.post('/register',registerController)

//Login Route
router.post('/login',loginController)

//Protected route for User
//User must be Signed in

router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//Protected Admin Route Signed in and Must be a Admin

router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

module.exports=router