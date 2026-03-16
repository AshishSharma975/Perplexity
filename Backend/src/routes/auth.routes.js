import express from "express";
import { register, verifyEmail,login,getme } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator} from "../../validator/auth.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const authrouter = express.Router();

// routes POST /api/auth/register
 // @desc register a new user
 // @access public
 // @body {username, email, password}
authrouter.post("/register", registerValidator,register)

authrouter.get("/get-me", authMiddleware,getme)

authrouter.get("/verify-email",verifyEmail)


authrouter.post("/login", loginValidator,login)

export default authrouter;