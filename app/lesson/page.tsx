'use client'

import React from 'react';
import { useEffect } from 'react';

interface Question {
    id: number;
    questionText: string;
    answerText: string;
  }
  
const questions: Question[] = [
    { id: 1, questionText: 'What is the capital of France?', answerText: '' },
    { id: 2, questionText: 'What is 2 + 2?', answerText: '' },
    { id: 3, questionText: 'Who wrote "To Kill a Mockingbird"?', answerText: '' },
    { id: 4, questionText: 'What is the largest planet in our solar system?', answerText: '' },
    { id: 5, questionText: 'What year did World War II end?', answerText: '' },
    { id: 6, questionText: 'What is the square root of 64?', answerText: '' },
    { id: 7, questionText: 'Who painted the Mona Lisa?', answerText: '' },
    { id: 8, questionText: 'What is the chemical symbol for water?', answerText: '' },
    { id: 9, questionText: 'What is the speed of light?', answerText: '' },
    { id: 10, questionText: 'Who was the first president of the United States?', answerText: '' },
];
  



export default function lesson() {
    return(
        <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Worksheet</h1>
        <form className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <label className="block mb-2 text-lg font-medium text-gray-700">
                {question.id}. {question.questionText}
              </label>
              <input
                type="text"
                placeholder="Your answer"
                value={question.answerText}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Submit Answers
          </button>
        </form>
      </div>
    </div>
    )
}


































