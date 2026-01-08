import { inngest } from "./client";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ step }) => {
    await step.run("generate-text", async () => {
      return await generateText({
        model: google("gemini-2.5-flash"),
        prompt: "Say short about Taj Mahal in 1 online",
      });
    });
  }
);
