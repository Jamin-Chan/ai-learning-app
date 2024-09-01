import React, { useState } from 'react';
import { Calculator, BookOpen, Beaker, Globe } from 'lucide-react';

interface ContentAreaProps {
  svgContent: JSX.Element;
  title: string;
  description: string;
  buttonText: string;
  subject: string;
}

const GenerateWorksheet = async (subject:string) => {

    try {
    const response = await fetch("/api/generate", {
        method: "POST",
        body: subject,
    })

    if (!response.ok) {
        throw new Error("Failed to generate worksheet")
    }

    const data = await response.json()
    } catch (error) {
    console.error("Error generating flashcards:", error)
    alert("An error occurred while generating flashcards. Please try again.")
    }
}


const ContentArea: React.FC<ContentAreaProps> = ({ svgContent, title, description, buttonText, subject }) => (
  <div className="content-area flex-1 m-2 min-w-[300px]">
      <div className="content-wrapper border-2 border-[#333] p-5 h-full overflow-hidden relative">
          {svgContent}
          <h1 className="text-2xl mb-4">{title}</h1>
          <p className="text-sm leading-6 mb-4">{description}</p>
          <button onClick={GenerateWorksheet(subject)} className="cta-button inline-block bg-[#333] text-white py-2 px-5 rounded font-bold">
              Start Now
          </button>
      </div>
  </div>
);

interface ExplanationColumnProps {
  features: Array<{ icon: string; title: string; description: string }>;
}

const ExplanationColumn: React.FC<ExplanationColumnProps> = ({ features }) => (
  <div className="explanation-column flex-1 mx-3">
      {features.map((feature, index) => (
          <div key={index} className="feature-item mb-5">
              <span className="feature-icon text-xl mr-2">{feature.icon}</span>
              <strong>{feature.title}:</strong> {feature.description}
          </div>
      ))}
  </div>
);

const subjectSections = [
  {
      svgContent: (
          <svg className="subject-symbols absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="20" fill="none" stroke="black" strokeWidth="2" />
              <line x1="70" y1="10" x2="130" y2="50" stroke="black" strokeWidth="2" />
              <text x="80" y="40" fontSize="24">π</text>
              <text x="20" y="100" fontSize="24">∑</text>
              <text x="60" y="130" fontSize="24">√</text>
              <path d="M120 100 L140 100 L130 80 Z" fill="black" />
              <text x="150" y="150" fontSize="24">∞</text>
              <text x="10" y="180" fontSize="24">±</text>
              <text x="100" y="190" fontSize="24">÷</text>
          </svg>
      ),
      title: 'Welcome to Math',
      description: 'Click to begin your challenge! As you answer questions correctly, the difficulty will increase, pushing you to improve continually. Make it a goal to progress every day, as consistent practice is key. Remember, math is an essential skill that benefits everyone, so give it your best effort and watch your abilities grow over time.',
      buttonText: 'Start Now',
      subject: 'Math',
  },
  {
      svgContent: (
          <svg className="subject-symbols absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="40" fontSize="24">Aa</text>
              <text x="60" y="30" fontSize="24">"</text>
              <text x="80" y="30" fontSize="24">"</text>
              <path d="M120 20 Q140 0 160 20 Q180 40 160 60 Q140 80 120 60 Q100 40 120 20 Z" fill="none" stroke="black" strokeWidth="2" />
              <line x1="20" y1="70" x2="180" y2="70" stroke="black" strokeWidth="2" />
              <line x1="20" y1="90" x2="180" y2="90" stroke="black" strokeWidth="2" />
              <line x1="20" y1="110" x2="180" y2="110" stroke="black" strokeWidth="2" />
              <text x="30" y="150" fontSize="24">?</text>
              <text x="70" y="150" fontSize="24">!</text>
              <text x="110" y="150" fontSize="24">,</text>
              <text x="150" y="150" fontSize="24">;</text>
              <path d="M20 170 Q60 190 100 170 Q140 150 180 170" fill="none" stroke="black" strokeWidth="2" />
          </svg>
      ),
      title: 'Welcome to English',
      description: 'Start your English challenge here! As you progress, you\'ll encounter more complex language tasks, enhancing your skills. Aim to practice regularly, as consistency is crucial for language improvement. English proficiency opens doors to countless opportunities, so put in your best effort and watch your language abilities flourish.',
      buttonText: 'Start Now',
      subject: 'English',
  },
  {
      svgContent: (
          <svg className="subject-symbols absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <text x="50" y="100" fontSize="48" fontWeight="bold">?</text>
              <circle cx="100" cy="100" r="80" fill="none" stroke="black" strokeWidth="2" strokeDasharray="10 5" />
          </svg>
      ),
      title: 'Upcoming: Science',
      description: 'Get ready to explore the wonders of science! Our upcoming science module will cover various topics from biology, chemistry, and physics. Dive into experiments, unravel scientific mysteries, and develop critical thinking skills essential for understanding the world around us.',
      buttonText: 'Coming Soon',
      buttonLink: '#',
  },
  {
      svgContent: (
          <svg className="subject-symbols absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <text x="50" y="100" fontSize="48" fontWeight="bold">?</text>
              <circle cx="100" cy="100" r="80" fill="none" stroke="black" strokeWidth="2" strokeDasharray="10 5" />
          </svg>
      ),
      title: 'Upcoming: History',
      description: 'Embark on a journey through time with our upcoming history module! From ancient civilizations to modern events, you\'ll gain insights into how past events shape our present and future. Develop analytical skills and a deeper understanding of human society and culture.',
      buttonText: 'Coming Soon',
      buttonLink: '#',
  },
];

const featureColumns = [
  [
      { icon: '🤖', title: 'AI-Powered Learning', description: 'Personalized study plans tailored to your learning style and progress.' },
      { icon: '💡', title: 'Dynamic Challenges', description: 'Engage with increasingly difficult questions to enhance your knowledge.' },
  ],
  [
      { icon: '📊', title: 'Progress Tracking', description: 'Monitor your improvement over time with detailed analytics.' },
      { icon: '🎓', title: 'Expert Guidance', description: 'Learn from carefully curated content by experienced educators.' },
  ],
  [
      { icon: '🌍', title: 'Global Access', description: 'Study anytime, anywhere, with access to a world of knowledge.' },
      { icon: '🔒', title: 'Secure Learning Environment', description: 'Your data and progress are protected with top-notch security measures.' },
  ],
];

export default function LearningPlatform() {


  return (
    <div className="bg-[#05192d] text-[#333] min-h-screen">
            <header className="py-5">
                <div className="container mx-auto flex justify-between items-center px-5">
                    <div className="text-2xl font-bold text-[#03ef62]">StudyAI</div>
                    <nav className="flex items-center">
                        <div className="signed-out">
                            <a href="/login" className="border border-white px-3 py-2 rounded ml-5">Sign in</a>
                        </div>
                        <div className="signed-in hidden">
                            <a href="/profile" className="border border-white px-3 py-2 rounded ml-5">My Profile</a>
                            <div className="user-button w-8 h-8 bg-gray-300 rounded-full ml-3"></div>
                        </div>
                    </nav>
                </div>
            </header>
            <div className="container mx-auto px-5">
                <main>
                    <section className="hero flex flex-wrap justify-between py-12">
                        {subjectSections.map((subject) => (
                            <ContentArea key={subject.title} {...subject} />
                        ))}
                    </section>
                    <section className="explanation-section mt-12 p-8 bg-white border-2 border-[#333] rounded-lg shadow-md">
                        <div className="explanation-content flex justify-between">
                            {featureColumns.map((features, index) => (
                                <ExplanationColumn key={index} features={features} />
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
  );
};