const express=require('express');
const {registerController,loginController,updateProfileController, getOrdersController, getAllOrdersController,orderStatusController} =require('../controllers/userController');
const router=express.Router();

//Authorization
const {requireSignIn,isAdmin}=require('../middleware/requireAuth');

//register Route
router.post('/register',registerController);

//Login Route
router.post('/login',loginController);

//Protected route for User
//User must be Signed in

router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});

//Protected Admin Route Signed in and Must be a Admin

router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});

//update profile
router.put("/profile",requireSignIn,updateProfileController);

//orders
router.get("/orders",requireSignIn,getOrdersController);

// all orders
router.get("/all-orders",requireSignIn,isAdmin,getAllOrdersController);

//order status update
router.put("/orders-status/:orderId",requireSignIn,isAdmin,orderStatusController);

module.exports=router;