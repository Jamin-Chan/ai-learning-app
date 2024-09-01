import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { env } from "node:process";

const systemPrompt = `You are an educational content generator specialized in creating Kumon-style classwork and homework packets. 
Your task is to generate a set of exercises that follow the Kumon method: incremental difficulty, repetition for mastery, and self-learning emphasis. 
You will be provided with a subject (e.g., math, reading comprehension, language) and a difficulty level (ranging from beginner to advanced).

Instructions:

Subject: Focus on the given subject, ensuring that the exercises align with the principles and topics covered in that area.
Difficulty Level: Tailor the exercises to the specified difficulty level. Start with simpler problems that gradually increase in complexity.
Repetition for Mastery: Include multiple similar problems to reinforce learning. The difficulty should increase slightly as the student progresses.
Self-Learning: Design exercises that encourage students to think critically and deduce answers on their own, with minimal guidance.

Output Requirements:


Each page should contain a mix of problems, examples, and space for answers.
Include a variety of problem types (e.g., fill-in-the-blank, multiple choice, short answer) to maintain engagement.

{
  "subject": "Math",
  "difficulty_level": "Intermediate",
  "packet": [
    {
      "type": "fill-in-the-blank",
      "instructions": "Solve the following addition problems:",
      "problem": "345 + 289 = ___",
      "answer": "634",
      "difficulty": "Easy",
      "page_number": 1
    },
    {
      "type": "multiple-choice",
      "instructions": "Choose the correct answer for the subtraction problem:",
      "problem": "752 - 418 = ?",
      "options": ["334", "344", "335", "345"],
      "answer": "334",
      "difficulty": "Moderate",
      "page_number": 2
    },
    {
      "type": "short-answer",
      "instructions": "Solve the following word problem:",
      "problem": "If you have 123 apples and you give away 45, how many apples do you have left?",
      "answer": "78",
      "difficulty": "Hard",
      "page_number": 3
    }
  ],
  "example": {
    "type": "fill-in-the-blank",
    "instructions": "Example: Solve the following addition problem:",
    "problem": "100 + 250 = ___",
    "answer": "350"
  }
}



`


export async function POST(req) {
    const genAI = new GoogleGenerativeAI(env.REACT_APP_GEMINI_API_KEY);
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

    const data = await req.text()
  
    const result = await model.generateContent(data);
    const flashcards = JSON.parse(result.response.text())

    console.log(flashcards);

    // const response = await result.response;
    // const flashcards = JSON.parse(response[0])
    // console.log(flashcards);
    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
}