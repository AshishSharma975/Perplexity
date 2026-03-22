import { Router } from 'express';
import { sendMessageController,getChats,getMessages,deleteChat } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const chatRouter = Router();


chatRouter.post("/message", authMiddleware,sendMessageController)

chatRouter.get("/", authMiddleware,getChats)

chatRouter.get("/:chatId/messages", authMiddleware,getMessages)

chatRouter.delete("/:chatId/delete", authMiddleware,deleteChat)


export default chatRouter;