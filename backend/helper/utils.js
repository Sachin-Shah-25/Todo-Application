const jwt=require('jsonwebtoken')


const generateToken=(username,useremail)=>{
    const token=jwt.sign({username,useremail},process.env.SECURE_KEY,{expiresIn:"3d"})
    return token
}

const verifyUser=(req,res,next)=>{
    if(!req.cookies["token"]) return res.status(401).json({success:false,message:"login Again"})

    const verifyToken=jwt.verify(req.cookies["token"],process.env.SECURE_KEY)
    if(!verifyToken){
        return res.status(401).json({sucess:false,message:"Login Again"})
    }

    req.user=verifyToken
    next()
}

module.exports={generateToken,verifyUser}