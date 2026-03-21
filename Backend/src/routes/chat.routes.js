import { Router } from 'express';
import { sendMessageController } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const chatRouter = Router();


chatRouter.post("/message", authMiddleware,sendMessageController)


export default chatRouter;