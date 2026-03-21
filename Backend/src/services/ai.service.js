import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatMistralAI } from "@langchain/mistralai";

const geminiModel = new ChatGoogleGenerativeAI({
 model: "gemini-1.5-flash",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
});


export async function generateResponse(message) {
  try {
    const response = await geminiModel.invoke([
      new HumanMessage(message)
    ]);

    return response.content; 

  } catch (error) {
    console.log("Gemini failed:", error.message);

    try {
      const response = await mistralModel.invoke(message);
      return response.content;
    } catch (err) {
      console.log("Mistral also failed:", err.message);
      return "AI is busy, try again later.";
    }
  }
}


export async function generateChatTitle(message) {
  try {
    const response = await mistralModel.invoke([
      new SystemMessage(
        "You generate short 3-5 word chat titles only."
      ),
      new HumanMessage(`Message: ${message}`)
    ]);

    return response.content; 

  } catch (error) {
    console.log("Title error:", error.message);
    return "New Chat";
  }
}