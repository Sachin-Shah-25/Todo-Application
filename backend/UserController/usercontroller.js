const bcryptPass=require('bcryptjs');
const usermodel = require('../UserModels/usermodel');
const { generateToken } = require('../helper/utils');
const { patch } = require('../UserRouter/userrouter');

const createUserFun=async (req,res) => {
    try {
        const {username,useremail,userpassword}=req.body;
        const createSecurePassword=bcryptPass.hashSync(userpassword,10);

        const finduser=await usermodel.findOne({useremail});
        if(finduser){
            return res.status(409).json({success:false,message:"The Email already Exists"});
        }
        const isAccCreated=await usermodel.create({
            username,useremail,userpassword:createSecurePassword
        });
        if(!isAccCreated){
           throw new Error("Something Went Wrong")
        }
        
        return res.status(201).json({success:true,data:isAccCreated})
    } catch (error) {
        return res.status(500).json({success:false,message:"Can't Create Account"});
    }
}

const loginUserFun=async(req,res)=>{
    try {
        const {useremail,userpassword}=req.body;
        const ifUserAvailable=await usermodel.findOne({useremail});
        if(!ifUserAvailable){
            return res.status(404).json({success:false,message:"Invalid Email"});
        }
        const checkPassword=bcryptPass.compareSync(userpassword,ifUserAvailable.userpassword);
        if(!checkPassword){
            return res.status(401).json({success:false,message:"Password Doesn't Match"});
        }
        const getToken=generateToken(ifUserAvailable.username,ifUserAvailable.useremail)
        res.cookie("token",getToken,{
            httpOnly:true,
            secure:false,
            maxAge:(24 * 3 * 60 * 60 * 1000),
            path:"/"
            
        })
        return res.status(200).json({success:true,message:"Login Successfully ",data:ifUserAvailable});
    } catch (error) {
        return res.status(503).json({success:false,message:e.message});
    }
}

module.exports={createUserFun,loginUserFun}