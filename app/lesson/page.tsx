'use client'

import React, { useState, useEffect } from 'react';

interface Question {
    id: number;
    questionText: string;
    answerText: string;
}

// Mock AI function to generate questions
const generateAIQuestions = async (count: number): Promise<Question[]> => {
    // In a real scenario, this would be an API call to an AI service
    const questions = [
        { questionText: 'What is the capital of France?', answerText: 'Paris' },
        { questionText: 'What is 2 + 2?', answerText: '4' },
        { questionText: 'Who wrote "To Kill a Mockingbird"?', answerText: 'Harper Lee' },
        // ... add more questions as needed
    ];

    return questions.slice(0, count).map((q, index) => ({
        id: index + 1,
        ...q
    }));
};

export default function Lesson() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showSolutions, setShowSolutions] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    useEffect(() => {
        const loadQuestions = async () => {
            const aiQuestions = await generateAIQuestions(5); // Generate 5 questions
            setQuestions(aiQuestions);
            setAnswers(new Array(aiQuestions.length).fill(''));
        };
        loadQuestions();
    }, []);

    const handleInputChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const calculateScore = () => {
        let correctCount = 0;
        questions.forEach((question, index) => {
            if (answers[index].toLowerCase().trim() === question.answerText.toLowerCase().trim()) {
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
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">AI-Generated Worksheet</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={question.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                            <label className="block mb-2 text-lg font-medium text-gray-700">
                                {question.id}. {question.questionText}
                            </label>
                            <input
                                type="text"
                                placeholder="Your answer"
                                value={answers[index]}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {showSolutions && (
                                <div className={`mt-2 ${answers[index].toLowerCase().trim() === question.answerText.toLowerCase().trim() ? 'text-green-600' : 'text-red-600'}`}>
                                    {answers[index].toLowerCase().trim() === question.answerText.toLowerCase().trim() ? 'Correct!' : `Incorrect. Correct answer: ${question.answerText}`}
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


































