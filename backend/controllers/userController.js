
const User=require('../models/userModel')
const jwt=require('jsonwebtoken')

//Function to Generate Json Web Token
const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'})
}

//Register Controller
const registerController=async(req,res)=>{

    const {name,email,password,phone,address}=req.body
    let emptyField=[]
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
        return res.status(400).json({error:'Please Fill All the Fields',emptyField})
    }

    try {
        const user= await User.register(name,email,password,phone,address)
        const token=createToken(User._id)
        res.status(200).send({
            sucess:true,
            message:'User Registered Sucessfully',
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },token
        })
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

//Login Controller

const loginController = async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({error:'Please Fill All the Fields'})
    }

    try {
        const user= await User.login(email,password)
        const token=createToken(user._id)
        res.status(200).send({
            sucess:true,
            message:'User Logged in Sucessfully',
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        })
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports={registerController,loginController}