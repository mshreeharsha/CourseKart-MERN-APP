
const express=require('express')
const { requireSignIn, isAdmin } = require('../middleware/requireAuth')
const router=express.Router()

const {createInstructorController,
    updateInstructorController,
    getSingleInstructorController,
    deleteInstructorController,
    getAllInstructorController}=require('../controllers/instructorController')

//create Instructor Route
router.post('/create-instructor',requireSignIn,isAdmin,createInstructorController)

//update Instructor Route
router.patch('/update-instructor/:id',requireSignIn,isAdmin,updateInstructorController)

//get Single Instructor
router.get('/single-instructor/:slug',getSingleInstructorController)

//get all Instructor
router.get('/all-instructors',getAllInstructorController)

//delete Instructor
router.delete('/delete-instructor/:id',requireSignIn,isAdmin,deleteInstructorController)

module.exports=router