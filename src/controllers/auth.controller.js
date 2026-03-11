import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"

export async function register (req,res) {
    
    const {username , email, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {email}, {username}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"user with this email or username already exist.",
            success:false,
            err:"user already exist."
        })
    }

    const user = await userModel.create({email,username,password})
}