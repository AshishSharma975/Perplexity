import express from "express";
import { register } from "../controllers/auth.controller.js";
import { registerValidator, validate } from "../../validator/auth.validator.js";

const authrouter = express.Router();


authrouter.post("/register", registerValidator,register)

export default authrouter;