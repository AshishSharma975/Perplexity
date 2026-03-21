import { generateResponse , generateChatTitle} from "../services/ai.service.js";
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"
export async function sendMessageController(req, res) {


  const {message} = req.body;

  const result = await generateResponse(message)
  const title = await generateChatTitle(message)

  const chat = await chatModel.create({
    user:"65f123abc456xyz789",
    title:title,
    messages:[
      {
        role:"user",
        content:message
      },
      {
        role:"assistant",
        content:result
      }
    ]
  })

  const aimessage = await messageModel.create({
    chat:chat._id,
    sender:req.userId,
    content:message
  })

  console.log(title)

  res.json({
    aiMessage:result,
    title,
    chatId:chat._id,
    aimessage
  })
}