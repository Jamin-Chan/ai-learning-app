import React from 'react';
import { Calculator, BookOpen, Beaker, Globe } from 'lucide-react';

const SubjectPanel = ({ title, icon, color, description }) => (
  <div className={`${color} p-6 rounded-lg shadow-lg flex flex-col justify-between items-center text-white h-full`}>
    <div className="text-center">
      {icon}
      <h2 className="text-2xl font-bold my-3 relative inline-block">
        <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-2 h-8 border-t-2 border-l-2 border-pink-300"></span>
        {title}
        <span className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-8 border-t-2 border-r-2 border-pink-300"></span>
      </h2>
      <p className="text-sm mb-4 max-w-xs">
        {description}
      </p>
    </div>
    <div className="w-full">
      <p className="text-xs mb-4 font-semibold text-pink-200">
        The more you get right, the harder it gets! Challenge yourself!
      </p>
      <button className="w-full bg-pink-400 text-purple-900 px-4 py-2 rounded-full font-bold hover:bg-pink-300 transition-colors text-sm">
        Start Learning {title}
      </button>
    </div>
  </div>
);

const LearningPlatform = () => {
  const subjects = [
    {
      title: "Mathematics",
      icon: <Calculator size={36} className="mb-2" />,
      color: "bg-purple-700",
      description: "Develop problem-solving skills and numerical literacy. Progress through levels of increasing difficulty."
    },
    {
      title: "English",
      icon: <BookOpen size={36} className="mb-2" />,
      color: "bg-purple-600",
      description: "Enhance language skills, from grammar and vocabulary to reading comprehension and writing."
    },
    {
      title: "Science",
      icon: <Beaker size={36} className="mb-2" />,
      color: "bg-purple-700",
      description: "Explore scientific concepts, conduct experiments, and understand the world around you."
    },
    {
      title: "Geography",
      icon: <Globe size={36} className="mb-2" />,
      color: "bg-purple-600",
      description: "Learn about countries, cultures, and the physical features of our planet."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-purple-800 p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Learning Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {subjects.map((subject) => (
          <SubjectPanel key={subject.title} {...subject} />
        ))}
      </div>
    </div>
  );
};

export default LearningPlatform;