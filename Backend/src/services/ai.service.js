import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function TestAi(params) {
    model.invoke("what is capital of INDIA?").then((response)=>{
        console.log(response.text)
    })
}

