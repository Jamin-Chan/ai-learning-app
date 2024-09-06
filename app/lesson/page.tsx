'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Question {
  type: string;
  instructions: string;
  problem: string;
  answer: string;
  options?: string[];
}

export default function Lesson() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showSolutions, setShowSolutions] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const subject = searchParams.get('subject');
    const worksheetParam = searchParams.get('worksheet');
    
    if (worksheetParam) {
      const worksheet = JSON.parse(decodeURIComponent(worksheetParam));
      setQuestions(worksheet.packet);
      setAnswers(new Array(worksheet.packet.length).fill(''));
    }
  }, [searchParams]);

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (answers[index].toLowerCase().trim() === question.answer.toLowerCase().trim()) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswers = calculateScore();
    setScore(correctAnswers);
    setShowSolutions(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">AI-Generated Worksheet</h1>
          <Link href="/subjects" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200">
            Back to Subjects
          </Link>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="mb-2 text-sm font-medium text-gray-500">{question.instructions}</p>
              <label className="block mb-2 text-lg font-medium text-gray-700">
                {index + 1}. {question.problem}
              </label>
              {question.type === 'multiple-choice' && question.options ? (
                <select
                  value={answers[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select an answer</option>
                  {question.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder="Your answer"
                  value={answers[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
              {showSolutions && (
                <div className={`mt-2 ${answers[index].toLowerCase().trim() === question.answer.toLowerCase().trim() ? 'text-green-600' : 'text-red-600'}`}>
                  {answers[index].toLowerCase().trim() === question.answer.toLowerCase().trim() ? 'Correct!' : `Incorrect. Correct answer: ${question.answer}`}
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors duration-200"
            disabled={showSolutions}
          >
            Submit Answers
          </button>
        </form>
        {score !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Your Score</h2>
            <p className="text-3xl font-bold text-blue-600">
              {score} / {questions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


































