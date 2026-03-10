import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function runAgent(prompt: string) {

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: prompt
  });

  return response.output_text;

}