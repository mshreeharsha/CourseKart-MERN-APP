
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');
const Order=require('../models/orderModel');


//Function to Generate Json Web Token
const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'});
}

//Register Controller
const registerController=async(req,res)=>{
    const {name,email,password,phone,address}=req.body;
    let emptyField=[];
    if(!name){
        emptyField.push('name')
    }
    if(!email){
        emptyField.push('email')
    }
    if(!password){
        emptyField.push('password')
    }
    if(!phone){
        emptyField.push('phone')
    }
    if(!address){
        emptyField.push('address')
    }
    
    if(emptyField.length>0){
        return res.status(400).send({
            success:false,
            message:'All Fields Must be Filled'
        })
    }

    try {
        const user=await User.register(name,email,password,phone,address);
        const token=createToken(User._id);
        console.log(user);
        res.status(200).send({
            success:true,
            message:'User Registered Successfully',
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },token
        });
        
    } catch (error) {
        res.status(400).send({
            success:false,
            message:error.message,
            error
        });
    }
}

//Login Controller

const loginController = async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).send({
            success:false,
            message:'All Fields have to be Filled'
        })
    }

    try {
        const user=await User.login(email,password);
        const token=createToken(user._id);
        res.status(200).send({
            success:true,
            message:'User Logged in Successfully',
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        });
    } catch (error) {
        res.status(400).send({
            success:false,
            message:error.message,
            error
        });
    }
}

//update profile
const updateProfileController = async(req,res)=>{
    try{
        const {name,email,password,address,phone} = req.body;
        const user = await User.findById(req.user._id);
        //password
        if(password && password.length < 6){
            return res.json({ error:"Password is reqiuired and 6 characters long" });
        }
        const hashedPassword = password ? await hashedPassword(password):undefined;
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new:true }
        );
        res.status(200).send({
            success:true,
            message:"Profile updated successfully ",
            updatedUser,
        });
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error while updating profile",
            error
        })
    }
};

//orders

const getOrdersController = async (req,res)=>{
    try{
        const orders = await Order.
        find({buyer:req.user._id})
        .populate("courses","-photo")
        .populate("buyer","name");
        res.json(orders);

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error While getting order",
            error
        });
    };
}

// all orders

const getAllOrdersController = async (req,res)=>{
    try{
        const orders = await Order
        .find({})
        .populate("courses","-photo")
        .populate("buyer","name")
        .sort({createdAt:"-1"});
        res.json(orders);
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error While getting order",
            error
        });
    };
}


const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updating Order",
        error,
      });
    }
  };


module.exports={registerController,loginController,updateProfileController,getOrdersController,getAllOrdersController,orderStatusController};