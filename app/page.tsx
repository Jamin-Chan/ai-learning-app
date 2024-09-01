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

  const NavLink = ({ href, text }) => (
    <a href={href} className="hover:text-yellow-300 transition-colors">{text}</a>
  );
  
  const FeatureCard = ({ Icon, title, description }) => (
    <div className="bg-white bg-opacity-20 p-6 rounded-lg text-center">
      <Icon className="mx-auto mb-4 text-yellow-300" size={48} />
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
  
  const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white text-purple-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-blue-500 text-white">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Study AI</h1>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6 mr-4">
              <NavLink href="#" text="Home" />
              <NavLink href="#" text="Courses" />
              <NavLink href="#" text="About" />
              <NavLink href="#" text="Contact" />
            </nav>
            <button 
              onClick={() => setShowSignUp(true)}
              className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-full hover:bg-yellow-300 transition-colors"
            >
              Sign Up
            </button>
            <button 
              onClick={() => setShowLogin(true)}
              className="bg-transparent border border-white px-4 py-2 rounded-full hover:bg-white hover:text-purple-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Welcome to Study AI!</h2>
          <p className="text-xl mb-8">Embark on an exciting journey to master artificial intelligence.</p>
          <a href='/lesson'>
            <button className="bg-yellow-400 text-purple-900 font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition-colors">
              Start Learning Now
            </button>
          </a>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            Icon={BookOpen}
            title="Comprehensive Courses"
            description="Access a wide range of AI topics tailored for all skill levels."
          />
          <FeatureCard 
            Icon={Rocket}
            title="Hands-on Projects"
            description="Apply your knowledge with real-world AI projects and challenges."
          />
          <FeatureCard 
            Icon={Users}
            title="Community Support"
            description="Join a vibrant community of AI enthusiasts and experts."
          />
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to dive in?</h2>
          <p className="text-xl mb-8">Explore our courses and start your AI learning journey today!</p>
          <button className="bg-white text-purple-700 font-bold py-3 px-6 rounded-full hover:bg-yellow-100 transition-colors">
            View Courses
          </button>
        </section>
      </main>
      <PricingPlans></PricingPlans>
      <footer className="bg-purple-800 text-center py-4 mt-12">
        <p>&copy; 2024 Study AI. All rights reserved.</p>
      </footer>

      <SignedIn>
        <UserButton/>
      </SignedIn>

      <SignedOut>
          {showSignUp && (
            <Modal title="Sign Up" onClose={() => setShowSignUp(false)}>
              <SignUp/>
            </Modal>
          )}

          {showLogin && (
            <Modal title="Login" onClose={() => setShowLogin(false)}>
              <SignIn/>
            </Modal>
          )}
      </SignedOut>
    </div>
  );
}