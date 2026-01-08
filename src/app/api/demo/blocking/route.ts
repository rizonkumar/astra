import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST() {
  const response = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: "Say short about Taj Mahal in 1 online",
  });

  return Response.json({ response });
}
