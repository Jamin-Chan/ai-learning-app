'use client'

import React, { useState } from 'react';
import { BookOpen, Rocket, Users } from 'lucide-react';
import { SignedIn, SignedOut, UserButton, useUser, SignIn, SignUp } from "@clerk/nextjs";
interface Plan {
  title: string;
  price: string;
  features: string[];
  popular: boolean;
 }
 

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const PricingCard = (plan: Plan) => (
    <div className={`bg-white text-black rounded-lg shadow-md p-4 flex flex-col ${plan.popular ? 'border-2 border-blue-500' : ''} w-full`}>
      {plan.popular && (
        <div className="bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-full self-start mb-2">
          Most popular
        </div>
      )}
      <h2 className="text-lg font-bold mb-2">{plan.title}</h2>
      <div className="text-2xl font-bold mb-2">${plan.price}<span className="text-sm font-normal">/month</span></div>
      <ul className="mb-4 flex-grow text-sm">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center mb-1">
            <svg className="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded text-sm hover:bg-blue-600 transition duration-300">
        Subscribe Now
      </button>
    </div>
  );
  
  const PricingPlans = () => {
    const plans:Plan[] = [
      {
        title: "Basic Plan",
        price: "9.99",
        features: [
          "Access to 5 courses",
          "Basic quizzes",
          "Email support"
        ],
        popular: false
      },
      {
        title: "Standard Plan",
        price: "19.99",
        features: [
          "Access to 15 courses",
          "Advanced quizzes",
          "24/7 support",
          "Progress tracking"
        ],
        popular: true
      },
      {
        title: "Premium Plan",
        price: "29.99",
        features: [
          "All courses",
          "Advanced quizzes",
          "Priority support",
          "Progress tracking",
          "1-on-1 tutoring"
        ],
        popular: false
      }
    ];
  
    return (
      <div className="flex flex-row justify-center items-stretch space-x-4 p-4">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="bg-[#05192d] text-white">
        <header className="py-5">
          <div className="container mx-auto flex justify-between items-center px-5">
            <div className="text-2xl font-bold text-[#03ef62]">StudyAI</div>
            <nav className="flex items-center">
              <SignedOut>
                <a href="/login" className="border border-white px-3 py-2 rounded mx-5">Sign in</a>
              </SignedOut>
              <SignedIn>
                  <a href="/profile" className="border border-white px-3 py-2 rounded mx-5">My Profile</a>
                  <UserButton/>
              </SignedIn>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-5 py-10">
          <section className="flex justify-between items-center py-20 relative">
            <div className="w-1/2 text-center mr-5 relative z-20">
              <h1 className="text-5xl font-bold mb-5 leading-tight">Learn using StudyAI</h1>
              <p className="text-lg mb-10 leading-relaxed">
                Embark on a transformative learning journey with StudyAI. Our cutting-edge AI technology simplifies complex topics, personalizes your study experience, and helps you achieve your academic goals with ease. Say goodbye to study struggles and hello to effortless learning!
              </p>
              <div className="flex justify-center gap-5">
                <a href="/subjects" className="inline-block px-7 py-3 bg-[#03ef62] text-[#05192d] rounded font-bold text-lg transition-all hover:bg-[#02d656] transform hover:-translate-y-1">Start Your Journey</a>
              </div>
            </div>
            <div className="w-1/2 h-96 flex justify-center items-center text-xl text-white relative z-20">
              <img 
                src="/images/kidgoingtoschool.png" 
                alt="Student using StudyAI" 
              />
            </div>
          </section>
          <section className="py-20 relative">
            <h2 className="text-center text-4xl font-bold mb-12 text-[#03ef62]">Why Choose StudyAI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white bg-opacity-10 p-10 rounded text-center transition-transform transform hover:-translate-y-2">
                <div className="text-6xl mb-5">🧠</div>
                <h3 className="text-2xl font-semibold text-white mb-3">Adaptive Learning</h3>
                <p className="text-lg text-[#cccccc]">Our AI tailors questions to your skill level, ensuring optimal challenge and growth.</p>
              </div>
              <div className="bg-white bg-opacity-10 p-10 rounded text-center transition-transform transform hover:-translate-y-2">
                <div className="text-6xl mb-5">🎯</div>
                <h3 className="text-2xl font-semibold text-white mb-3">Personalized Experience</h3>
                <p className="text-lg text-[#cccccc]">Enjoy a unique learning journey crafted specifically for your needs and goals.</p>
              </div>
              <div className="bg-white bg-opacity-10 p-10 rounded text-center transition-transform transform hover:-translate-y-2">
                <div className="text-6xl mb-5">📊</div>
                <h3 className="text-2xl font-semibold text-white mb-3">Progress Tracking</h3>
                <p className="text-lg text-[#cccccc]">Monitor your improvement with detailed analytics and insightful feedback.</p>
              </div>
            </div>
            {/* Shapes for Background Decoration */}
            <div className="absolute top-[-50px] left-[-50px] w-24 h-24 bg-[#03ef62] rounded-lg transform rotate-45 opacity-10 z-0"></div>
            <div className="absolute bottom-12 right-[-75px] w-36 h-36 bg-[#ff6b6b] rounded-full opacity-10 z-0"></div>
            <div className="absolute top-1/3 left-10 w-20 h-20 bg-[#feca57] rounded-full opacity-10 z-0"></div>
            <div className="absolute bottom-1/5 left-5 w-28 h-28 bg-[#48dbfb] rounded-lg transform rotate-12 opacity-10 z-0"></div>
            <div className="absolute top-1/5 right-[15%] w-16 h-16 bg-[#ff9ff3] rounded-full opacity-10 z-0"></div>
          </section>
          <PricingPlans></PricingPlans>
        </main>
      </div>
      <footer className="bg-purple-800 text-center py-4">
        <p>&copy; 2024 Study AI. All rights reserved.</p>
      </footer>
    </div>
  );
}