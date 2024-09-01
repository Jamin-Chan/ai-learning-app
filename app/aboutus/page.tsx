import React from 'react';
import { Calculator, BookOpen, Beaker, Globe } from 'lucide-react';

interface AboutMeBlock {
  title: string;
  description: string;
}
interface Comment {
    author: string;
    description: string;
    comment: string;
}
interface ExplanationColumnProps {
  features: Array<{ icon: string; title: string; description: string }>;
}

const AboutMeArea = (about: AboutMeBlock) => {
    return (
        <div className="content-area flex-1 m-2 min-w-[300px]">
            <div className="content-wrapper border-2 border-[#333] p-5 h-full overflow-hidden relative">
                <h1 className="text-2xl mb-4">{about.title}</h1>
                <p className="text-sm leading-6 mb-4">{about.description}</p>
            </div>
        </div>
    );
};

const aboutMe :AboutMeBlock[] = [
  {
      title: 'What Does it Do?',
      description: 'StudyAI provides AI-generated questions based on the subject that is chosen',
  },
  {
      title: 'Who is it For?',
      description: 'Anyone can use this app, from students trying to pass tests, to folks who just want to have a little fun running through some trivia.',
  },
  {
      title: 'How Does it Work',
      description: 'For each subject, you will start off with easy questions, and then slowly get harder and harder questions as you are able to solve more and more of them.',
  },
];

const authorComments :Comment[] = [
    {
        author: 'Steven',
        description: 'blah blah blahj',
        comment: 'blah'

    },
    {
        author: 'Jamin',
        description: 'blah blah blahj',
        comment: 'blah'

    },
    {
        author: 'Nishant',
        description: 'dasw ',
        comment: 'blah'

    },
    {
        author: 'Aaron',
        description: 'blah blah blahj',
        comment: 'blah'

    },
    {
        author: 'Charles',
        description: 'blah blah blahj',
        comment: 'blah'

    },
];


export default function AboutUs() {
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
                        {aboutMe.map((aboutBlock, index) => (
                            <AboutMeArea key={index} {...aboutBlock} />
                        ))}
                    </section>
                </main>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="person-section flex items-center bg-white mb-8 shadow-md">
                    <div className="person-image flex-1 p-6">
                    <img
                        src="/api/placeholder/600/400"
                        alt="Steven"
                        className="w-full h-auto rounded-lg"
                    />
                    </div>
                    <div className="person-info flex-1 p-10">
                    <h1 className="text-3xl text-gray-800 mb-4">Steven</h1>
                    <p className="mb-6">
                        Steven brings a wealth of experience to our team. With a background in innovation and design, he's the driving force behind our creative solutions.
                    </p>
                    <p className="mb-6 font-semibold">
                        "I believe in pushing boundaries and creating products that truly enhance people's lives."
                    </p>
                    <a
                        href="#"
                        className="cta-button inline-block bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-600"
                    >
                        Learn More
                    </a>
                    </div>
                </div>

                <div className="person-section flex items-center bg-white mb-8 shadow-md flex-row-reverse">
                    <div className="person-image flex-1 p-6">
                    <img
                        src="/api/placeholder/600/400"
                        alt="Jmain"
                        className="w-full h-auto rounded-lg"
                    />
                    </div>
                    <div className="person-info flex-1 p-10">
                    <h1 className="text-3xl text-gray-800 mb-4">Jmain</h1>
                    <p className="mb-6">
                        Jmain is our technical expert, with a keen eye for detail and a passion for perfection. His work ensures that every product we create is of the highest quality.
                    </p>
                    <p className="mb-6 font-semibold">
                        "Perfection is not attainable, but if we chase perfection we can catch excellence."
                    </p>
                    <a
                        href="#"
                        className="cta-button inline-block bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-600"
                    >
                        See Projects
                    </a>
                    </div>
                </div>

                <div className="person-section flex items-center bg-white mb-8 shadow-md">
                    <div className="person-image flex-1 p-6">
                    <img
                        src="/api/placeholder/600/400"
                        alt="Nishant"
                        className="w-full h-auto rounded-lg"
                    />
                    </div>
                    <div className="person-info flex-1 p-10">
                    <h1 className="text-3xl text-gray-800 mb-4">Nishant</h1>
                    <p className="mb-6">
                        Nishant is our visionary leader, always looking ahead to the next big innovation. His strategic thinking has guided our team to new heights.
                    </p>
                    <p className="mb-6 font-semibold">
                        "The future belongs to those who can see possibilities before they become obvious."
                    </p>
                    <a
                        href="#"
                        className="cta-button inline-block bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-600"
                    >
                        Discover Vision
                    </a>
                    </div>
                </div>
            </div>
        </div>
  );
};