import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage, createAgent } from "langchain";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite", 
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: process.env.MISTRAL_API_KEY
});

const agent = createAgent({
  model: geminiModel,
});

export async function generateResponse(messages) {
  try {
    const response = await agent.invoke({
      messages: [
        new SystemMessage(`
You are a helpful and precise assistant.
If you don't know the answer, say you don't know.
        `),

        
        ...messages.map(msg => {
          if (msg.role === "user") {
            return new HumanMessage(msg.content);
          } else {
            return new AIMessage(msg.content);
          }
        }),
      ],
    });

  
    return response.messages[response.messages.length - 1].content;

  } catch (error) {
    console.log("AI Error:", error.message);
    return "AI is busy, try again later.";
  }
}

export async function generateChatTitle(message) {
  try {
    const response = await mistralModel.invoke([
      new SystemMessage(`
Generate a short 2-4 word chat title.
      `),
      new HumanMessage(message)
    ]);

    return response.content;

  } catch (error) {
    console.log("Title error:", error.message);
    return "New Chat";
  }
}