const AuthModel = require('../model/user_auth');
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const { use } = require('../router/auth_router');


const UserRegister = async (req, res) => {
    const { name, email,phone, password, password_conform } = req.body
    const user = await AuthModel.findOne({ email: email })
    
    if (user) {
        res.json({ "Status": "Failed", "message": "Email already exists" })
    }
    else {

        if (name && email && phone &&password && password_conform) {

           try{

            const hashpassword = await bcrypt.hash(password, 10)
            if (password === password_conform) {
                const doc = await AuthModel.create({
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashpassword,
                })
                await doc.save()
              
                const save_user = await AuthModel.findOne({email:email})
                const token = jwt.sign({UserId:save_user._id},process.env.TOKEN_SCRT_CODE,{expiresIn:"2d"})
               
               res.status(201) 
                res.json({ "Status": "Registation", "message": "Registation Successful","token":token })
            }
            else{ res.json({ "Status": "password", "message": "Password don't match" }) }
           } 
        catch{
            res.json({ "Status": "failed", "message": "Registation failed" })
            
           }
        }
        else {
            res.json({ "Status": "Empty", "message": "All feiled require" })
        }
    }
}



const UserLogin = async (req,res)=>{
   try{
    const{email,password} = req.body
    if(email && password){
        const user  = await AuthModel.findOne({email:email})
        if(user !=null){
          const isMatch = await bcrypt.compare(password,user.password)
           if((user.email === email)&& isMatch){


            const token = jwt.sign({UserId:user._id},process.env.TOKEN_SCRT_CODE,({expiresIn:"3d"}))
            res.status(200)
            res.json({"Status":"Success","message":"Successfully Login","token":token})
           }else{
            res.json({"Status":"Failed","message":"Email or Password is not valid"})
           }
        }
        else{
            res.json({"Status":"Failed","message":"You are not Register"})
        }

    }else{
        res.json({"Status":"Empty","message":"All Feild require"})
    }

   }
   catch(error){
    console.log(error)
    res.json({"Status":"Login","message":"Unable to Login"})
   }



}




module.exports = {UserRegister,UserLogin}