import React from "react";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaRegLightbulb,
  FaSmileBeam,
  FaChartLine,
  FaUserGraduate,
} from "react-icons/fa";

const UniqueApproach = ({ pageType }) => {
  // Data for K-6
  const kTo6Data = [
    {
      icon: <FaChalkboardTeacher className="text-[#17A4A5] text-2xl" />,
      title: "Engaging Methods",
      description: "Incorporating practical activities to keep students motivated and interested.",
    },
    {
      icon: <FaChartLine className="text-[#17A4A5] text-2xl" />,
      title: "Progress Updates",
      description: "Regular feedback to parents on student achievements and areas for growth.",
    },
    {
      icon: <FaUserGraduate className="text-[#17A4A5] text-2xl" />,
      title: "Tutor Expertise",
      description: "Our experienced tutors are skilled at working with young learners and making lessons effective and enjoyable.",
    },
  ];

  // Data for 7-10
  const sevenToTenData = [
    {
      icon: <FaRegLightbulb className="text-[#17A4A5] text-2xl" />,
      title: "Progressive Learning",
      description: "Building on foundational knowledge while preparing for the increasing demands of senior school.",
    },
    {
      icon: <FaBookOpen className="text-[#17A4A5] text-2xl" />,
      title: "Real-World Applications",
      description: "Connecting academic concepts to real-life examples to make learning meaningful.",
    },
    {
      icon: <FaChalkboardTeacher className="text-[#17A4A5] text-2xl" />,
      title: "Student Mentorship",
      description: "Tutors not only teach but also mentor their students, offering guidance and support to help them navigate high school challenges.",
    },
  ];

  // Data for 11-12
  const elevenToTwelveData = [
    {
      icon: <FaChalkboardTeacher className="text-[#17A4A5] text-2xl" />,
      title: "HSC-Specific Expertise",
      description: "Our tutors are experienced in navigating the demands of the HSC curriculum, ensuring students are thoroughly prepared.",
    },
    {
      icon: <FaBookOpen className="text-[#17A4A5] text-2xl" />,
      title: "Proven Resources",
      description: "Access to curated study materials, including past papers, model essays, and revision guides.",
    },
    {
      icon: <FaSmileBeam className="text-[#17A4A5] text-2xl" />,
      title: "Confidence Building",
      description: "We focus on empowering students to believe in their abilities, helping them perform their best under pressure.",
    },
  ];

  // Data selection based on pageType
  const data =
    pageType === "K-6"
      ? kTo6Data
      : pageType === "7-10"
      ? sevenToTenData
      : elevenToTwelveData;

  return (
    <div className="flex flex-col items-center bg-gray-200 py-16 px-4">
      {/* Title */}
      <h2 className="text-4xl font-bold text-[#17A4A5] mb-8 text-center">
        Our Unique Approach
      </h2>

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative flex items-center transform transition-transform duration-300 hover:scale-95"
          >
            {/* Circle with Icon */}
            <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center absolute -left-8 top-1/2 transform -translate-y-1/2 shadow-lg">
              {item.icon}
            </div>
            {/* Content */}
            <div className="bg-teal-500 text-white p-6 rounded-full w-72 h-72 flex items-center justify-center text-center shadow-lg">
              <div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="mx-3 text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniqueApproach;
