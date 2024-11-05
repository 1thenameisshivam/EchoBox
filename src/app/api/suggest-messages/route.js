import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";
export const GET = async (req) => {
  try {
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: "What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?". Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`;
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: prompt,
    });
    if (!text) {
      return NextResponse.json(
        { message: "No text generated", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Text generated successfully",
      success: true,
      text: text,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "error in generating text", success: false },
      { status: 500 }
    );
  }
};
