import { NextResponse } from "next/server";

const systemPrompt = `You are an educational content generator specialized in creating Kumon-style classwork and homework packets. 
Your task is to generate a set of exercises that follow the Kumon method: incremental difficulty, repetition for mastery, and self-learning emphasis. 
You will be provided with a subject (e.g., math, reading comprehension, language) and a difficulty level (ranging from beginner to advanced).

Instructions:

Subject: Focus on the given subject, ensuring that the exercises align with the principles and topics covered in that area.
Difficulty Level: Tailor the exercises to the specified difficulty level. Start with simpler problems that gradually increase in complexity.
Repetition for Mastery: Include multiple similar problems to reinforce learning. The difficulty should increase slightly as the student progresses.
Self-Learning: Design exercises that encourage students to think critically and deduce answers on their own, with minimal guidance.

Output Requirements:

There should be exactly 10 questions
Include a variety of problem types (e.g., fill-in-the-blank, multiple choice, short answer) to maintain engagement.

Output the result as a JSON object with the following structure:
{
  "subject": "The subject of the worksheet",
  "packet": [
    {
      "type": "fill-in-the-blank" | "multiple-choice" | "short-answer",
      "instructions": "Instructions for the question",
      "problem": "The question or problem statement",
      "answer": "The correct answer",
      "options": ["Option A", "Option B", "Option C", "Option D"] // Only for multiple-choice questions
    },
    // ... more questions
    
  ]
}`;
export async function POST(req: Request) {
  console.log("starts model generating");
  try{
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt,

      generation_config: {
          "temperature": 1,
          "top_p": 1,
          "top_k": 64,
          "max_output_tokens": 1056,
          "response_mime_type": "application/json",
        }
  });
		const subject = await req.json()

		const result = await model.generateContent(systemPrompt);
		const response = await result.response;
		const text = response.text();
    console.log(text);
		let packet;

		try {
			// Remove triple backticks and "json" identifier
			const cleanedText = text.replace(/```json\n|\n```/g, '').trim();
			packet = JSON.parse(cleanedText);
		} catch (error) {
			console.error("Error parsing AI response:", error);
			return NextResponse.json({ error: 'Invalid AI response format' }, { status: 500 });
		}

		// Validate the packet structure
		if (!packet.subject || !Array.isArray(packet.packet) || packet.packet.length !== 10) {
			return NextResponse.json({ error: 'Invalid packet structure' }, { status: 500 });
		}

		return NextResponse.json(packet);
	}
	catch (error) {
		console.error('Error:', error);
		return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
	}
}