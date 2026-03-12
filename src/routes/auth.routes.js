import express from "express";
import { register, verifyEmail } from "../controllers/auth.controller.js";
import { registerValidator, validate } from "../../validator/auth.validator.js";

const authrouter = express.Router();


authrouter.post("/register", registerValidator,register)

authrouter.get("/verify-email",verifyEmail)

export default authrouter;