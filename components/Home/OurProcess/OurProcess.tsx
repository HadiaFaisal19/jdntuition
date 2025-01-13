"use client";
import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaComments, FaBookOpen } from "react-icons/fa";

const WorkProcess = () => {
  const steps = [
    {
      id: 1,
      title: "Get in Touch",
      description:
        "Start by filling our booking form to share your details and tutoring needs. There’s no commitment at this stage — it’s just to help us understand how we can assist you best. If you prefer, you can also give us a call or contact us directly for a chat.",
      icon: <FaUserGraduate size={40} className="text-[#17A4A5]" />,
    },
    {
      id: 2,
      title: "Tutor Matching",
      description:
        "Based on your requirements, we carefully match you with the most suitable tutor of ours. We consider factors such as subject expertise, teaching style, location, availability, and even personality to ensure the best fit.",
      icon: <FaChalkboardTeacher size={40} className="text-[#17A4A5]" />,
    },
    {
      id: 3,
      title: "15-Minute Free Consultation",
      description:
        "Meet your tutor for a quick, no-obligation consultation. This is your opportunity to ask questions, discuss your goals, and make sure that it’s the right fit.",
      icon: <FaComments size={40} className="text-[#17A4A5]" />,
    },
    {
      id: 4,
      title: "Start Your Journey",
      description:
        "If everything feels right, we’ll schedule your first lesson and set you on the path to success!",
      icon: <FaBookOpen size={40} className="text-[#17A4A5]" />,
    },
  ];

  return (
    <section
      className="py-16 bg-fixed bg-cover bg-center "
      style={{
        backgroundImage: "url('/images/blog.png')",
      }}
    >
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
            <p className="text-sm text-gray-100">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkProcess;
