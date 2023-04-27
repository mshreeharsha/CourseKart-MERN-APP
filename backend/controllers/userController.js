
const User=require('../models/userModel')

//Register Controller
const registerController=async(req,res)=>{

    const {name,email,password,phone,address,role}=req.body
    let emptyField=[]
    if(!name){
        emptyField.push(name)
    }
    if(!email){
        emptyField.push(email)
    }
    if(!password){
        emptyField.push(password)
    }
    if(!phone){
        emptyField.push(phone)
    }
    if(!address){
        emptyField.push(address)
    }
    
    if(emptyList.length>0){
        return res.status(400).json({error:'Please Fill All the Fields',emptyList})
    }

    try {
        const user= await User.register(name,email,password,phone,address)
        res.status(200).send({
            sucess:true,
            message:'User Registered Sucessfully',
            user
        })
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports={registerController}