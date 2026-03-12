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

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

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