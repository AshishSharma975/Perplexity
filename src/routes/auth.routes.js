import express from "express";
import { register, verifyEmail,login } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator} from "../../validator/auth.validator.js";

const authrouter = express.Router();

// routes POST /api/auth/register
 // @desc register a new user
 // @access public
 // @body {username, email, password}
authrouter.post("/register", registerValidator,register)



authrouter.get("/verify-email",verifyEmail)


authrouter.post("/login", loginValidator,login)

export default authrouter;