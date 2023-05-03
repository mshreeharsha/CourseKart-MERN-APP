
const express=require('express')
const { requireSignIn, isAdmin } = require('../middleware/requireAuth')
const router=express.Router()
const formidable=require('express-formidable')

const {createCourseController} = require('../controllers/courseController')

//creating a new Course

router.post('/create-course',requireSignIn,isAdmin,formidable(),createCourseController)
module.exports=router