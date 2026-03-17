import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage , SystemMessage} from "@langchain/core/messages";
import {ChatMistralAI} from "@langchain/mistralai"


const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
})


export async function generateResponse(message) {
    const response = await geminiModel.invoke([
        new HumanMessage(message)
    ]);
    return response.text;
}

export async function generateChatTitle(message) {
  
  const response = await mistralModel.invoke([
    new SystemMessage("you are a helpfull assistant that generates a title for a chat based on the chat messages"),
    new HumanMessage(`
      here are the messages:
      ${message}
      `)
  ])

  return response.text;
}
