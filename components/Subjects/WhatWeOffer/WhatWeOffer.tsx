"use client";
import React from "react";
import { FaBookOpen, FaCalculator, FaFlask, FaPen, FaBrain, FaPenFancy, FaChartLine, FaGlobe, FaClipboardList } from "react-icons/fa";

const WhatWeOffer = ({ pageType }) => {
  // Data for K-6
  const kToSixData = [
    {
      icon: <FaBookOpen className="text-6xl text-[#17A4A5] mb-4 mx-auto" />,
      title: "Comprehensive English Program",
      description: `
        Our English tutoring develops a strong foundation in literacy, empowering students to communicate clearly and confidently.
      `,
      points: [
        "Phonics and spelling mastery.",
        "Reading fluency and comprehension strategies.",
        "Sentence construction and creative writing projects.",
      ],
    },
    {
      icon: <FaCalculator className="text-6xl text-[#17A4A5] mb-4 mx-auto" />,
      title: "Holistic Mathematics Program",
      description: `
        We focus on building confidence and competence in maths, helping students grasp key concepts and apply them effectively.
      `,
      points: [
        "Mastery of arithmetic (addition, subtraction, multiplication, division).",
        "Introduction to fractions, decimals, and measurement.",
        "Applying maths in real-life situations.",
      ],
    },
    {
      icon: <FaFlask className="text-6xl text-[#17A4A5] mb-4 mx-auto" />,
      title: "Science Explorations",
      description: `
        We ignite curiosity about the world through engaging science lessons that encourage hands-on learning.
      `,
      points: [
        "Understanding basic principles of biology, chemistry, and physics.",
        "Nurturing inquisitive and critical thinking skills.",
      ],
    },
    {
      icon: <FaPen className="text-6xl text-[#17A4A5] mb-4 mx-auto" />,
      title: "Writing Skills Development",
      description: `
        Strong writing skills are crucial for communication. Our writing program builds confidence and clarity.
      `,
      points: [
        "Constructing clear and cohesive sentences and paragraphs.",
        "Learning different writing types, including persuasive and narrative.",
        "Building vocabulary and grammar skills through practical exercises.",
      ],
    },
    {
      icon: <FaBrain className="text-6xl text-[#17A4A5] mb-4 mx-auto" />,
      title: "Thinking Skills Program",
      description: `
        Thinking skills are integral to solving problems and understanding the world. We equip students with the tools to think logically and creatively.
      `,
      points: [
        "Developing critical and lateral thinking abilities.",
        "Building reasoning skills through puzzles, patterns, and challenges.",
        "Strengthening decision-making and problem-solving through age-appropriate tasks.",
      ],
    },
  ];

  // Data for 7-10
  const sevenToTenData = [
    {
      icon: <FaPenFancy className="text-6xl text-[#17A4A5] mb-4 mx-auto" />,
      title: "English Excellence",
      description: `
        Our English tutoring equips students with the skills needed to excel in reading, writing, and critical thinking.
      `,
      points: [
        "Critical analysis of novels, poetry, and media texts.",
        "Mastery of essay writing for different text types (narrative, persuasive, analytical).",
        "Advanced grammar and vocabulary development.",
      ],
    },
    {
      icon: <FaChartLine className="text-6xl text-[#17A4A5] mb-4 mx-auto" />,
      title: "Mathematics Mastery",
      description: `
        We simplify complex topics, providing students with the tools they need to approach problems with confidence.
      `,
      points: [
        "Algebra, geometry, and statistics made simple.",
        "Step-by-step problem-solving techniques.",
        "Developing logical thinking for tackling challenging problems.",
      ],
    },
    {
      icon: <FaFlask className="text-6xl text-[#17A4A5] mb-4 mx-auto" />,
      title: "Science Exploration",
      description: `
        Our science program fosters a love for discovery while demystifying complex concepts.
      `,
      points: [
        "Hands-on learning in biology, chemistry, and physics basics.",
        "Understanding scientific inquiry and data analysis.",
        "Bridging the gap between theoretical knowledge and practical applications.",
      ],
    },
    {
      icon: <FaGlobe className="text-6xl text-[#17A4A5] mb-4 mx-auto" />,
      title: "HSIE (Human Society and Its Environment)",
      description: `
        We guide students through subjects like history, geography, and commerce, helping them connect ideas and apply their learning.
      `,
      points: [
        "Analysing historical events and their relevance to today.",
        "Understanding geographical processes and global issues.",
        "Developing research and analytical skills.",
      ],
    },
    {
      icon: <FaClipboardList className="text-6xl text-[#17A4A5] mb-4 mx-auto" />,
      title: "Study Skills and Organisation",
      description: `
        We equip students with strategies to manage their workload and perform effectively in high school.
      `,
      points: [
        "Time management and prioritisation techniques.",
        "Effective note-taking and organisation.",
        "Preparing for exams and managing test anxiety.",
      ],
    },
  ];

  // Determine which data to use based on pageType
  const data = pageType === "K-6" ? kToSixData :sevenToTenData ;

  return (
    <section className="py-16 px-4 bg-[#17A4A5]">
      <div className="max-w-7xl mx-auto">
        <h1
          data-aos="fade-left"
          data-aos-anchor-placement="top-center"
          className="pt-3 mb-8 text-3xl md:text-5xl font-extrabold text-white text-center"
        >
          What We Offer
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {data.map((item, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-lg shadow-lg max-w-xl w-full mx-auto mb-4 transform transition-transform duration-300 hover:scale-105 ${
                index === data.length - 1 ? "lg:col-span-2 lg:mx-auto" : ""
              }`}
            >
              {item.icon}
              <h2 className="text-3xl font-bold text-[#17A4A5] mb-4 text-center">
                {item.title}
              </h2>
              <h6 className="text-gray-700 mb-4">
                {item.description}
                <ul className="list-disc pl-6">
                  {item.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </h6>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  
};

export default WhatWeOffer;
