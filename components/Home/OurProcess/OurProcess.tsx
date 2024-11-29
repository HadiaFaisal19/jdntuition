import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaComments, FaBookOpen } from 'react-icons/fa';

const WorkProcess = () => {
  const steps = [
    {
      id: 1,
      title: 'Finding Out Student Needs',
      description: 'Understand the student’s requirements and goals.',
      icon: <FaUserGraduate size={40} className="text-[#17A4A5]" />,
    },
    {
      id: 2,
      title: 'Matching a Tutor',
      description: 'Find the perfect tutor tailored to the student’s needs.',
      icon: <FaChalkboardTeacher size={40} className="text-[#17A4A5]" />,
    },
    {
      id: 3,
      title: 'Consultation',
      description: 'Discuss goals, schedules, and create a learning plan.',
      icon: <FaComments size={40} className="text-[#17A4A5]" />,
    },
    {
      id: 4,
      title: 'Processing with Lessons',
      description: 'Start the personalized lessons with expert tutors.',
      icon: <FaBookOpen size={40} className="text-[#17A4A5]" />,
    },
  ];

  return (
    <section className="py-16 bg-[#17A4A5]">
      {/* Title Section */}
      <div className="text-center mb-10">
        <p className="text-lg uppercase text-gray-100">What We Do</p>
        <h1 className="text-4xl font-bold text-white">Our Process</h1>
      </div>

      {/* Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-16 lg:px-32">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center space-y-4"
          >
            {/* Icon Section */}
            <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-lg">
              {step.icon}
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-white">{step.title}</h2>

            {/* Description */}
            <p className="text-sm text-gray-200">{step.description}</p>

            {/* Button */}
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkProcess;
