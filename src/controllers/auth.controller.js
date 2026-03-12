import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {

    const { username, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { email }, { username }
        ]
    })
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "user with this email or username already exist.",
            success: false,
            err: "user already exist."
        })
    }

    const user = await userModel.create({ email, username, password })

    const emialVerificationToken = jwt.sign({
        email: user.email,
        id: user._id
    }, process.env.JWT_SECRET)

    await sendEmail({
        to: user.email,
        subject: "Verify Your Email",
        html: `
  <div style="font-family:Arial;padding:20px">
      <h2>Welcome ${user.username}</h2>
      <p>Thank you for registering on our platform.</p>
      <p>Please verify your email to activate your account.</p>
      
      <a href="http://localhost:3000/api/auth/verify-email?token=${emialVerificationToken}"
         style="padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px">
         Verify Email
      </a>

      <p>If you did not create this account, please ignore this email.</p>
  </div>
  `
    })

    res.status(201).json({
        message: "user registered successfully",
        success: true,
        user
    })
}

export async function verifyEmail(req,res) {
    const {token} = req.query;


    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(400).json({
            message:"invalid token",
            success:false,
            err:"invalid token"
        })
    }

    const user = await userModel.findOne({email:decoded.email})

    if(!user){
        return res.status(400).json({
            message:"invalid token",
            success:false,
            err:"user not found"
        })
    }

    user.verified = true

    await user.save();

    const html = 
    
    `
    <h1>Email verified successfully!</h1>
    <p>You can now login to your account.</p>
    <a href="http://localhost:3000/login">Login</a>

    `

    res.send(html)
}

export async function login(req,res) {
    const user = await userModel.findOne({email:req.body.email})




 const isPasswordmatch = await user.comparePassword(req.body.password)

 if(!isPasswordmatch){
    return res.status(400).json({
        message:"invalid email or password",
        success:false,
        err:"incorrect password."
    })
 }

    if(!user){
        return res.status(400).json({
            message:"invalid email or password",
            success:false,
            err:"incorrect password."
        })
    }



    if(!user.verified){
        return res.status(400).json({
            message:"please verify your email before logging in.",
            success:false,
            err:"email not verified."
        })
    }
    
    const token = jwt.sign({
        id:user._id,
        username:user.username,
        email:user.email
    },process.env.JWT_SECRET,{expiresIn:"7d"})

    res.cookie("token",token)

    res.status(200).json({
        message:"user logged in successfully",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

export async function getme(req,res) {
    const userid = req.user.id

    const user = await userModel.findById(userid).select("-password")

    if(!user){
        return res.status(404).json({
            message:"user not found",
            success:false,
            err:"user not found"
        })
    }

    res.status(200).json({
        message:"user fetched successfully",
        success:true,
        user
    })
}