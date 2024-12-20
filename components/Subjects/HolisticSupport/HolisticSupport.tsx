"use client";
import { FaBookOpen, FaCalculator, FaFlask, FaPen, FaBrain } from 'react-icons/fa';


const HolisticSupport = () => {
    return (
    <section className="">
        <div className="bg-white p-8 max-w-6xl w-full mx-auto mb-8">
  {/* Section Heading */}
  <h2 className="text-4xl font-bold text-[#17A4A5] mb-6 text-center">
    Holistic HSC Support
  </h2>

  {/* Description */}
  <p className="text-gray-700 text-lg text-center mb-6">
    Success in the HSC depends on more than just knowledge — it requires strategy and preparation.
  </p>

  {/* Cards Container */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
  {/* Card 1: Exam Preparation and Study Skills */}
  <div className="bg-gradient-to-r from-[#17A4A5] to-teal-700 text-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 ">
    <h3 className="text-2xl font-bold mb-4 text-center">
        Exam Preparation and Study Skills
      </h3>
      <ul className="list-disc pl-6 mt-4">
        <li>Time management and effective study planning.</li>
        <li>
          Practice exams under timed conditions with detailed feedback to improve performance.
        </li>
        <li>Building familiarity with HSC formats and marking criteria.</li>
      </ul>
    </div>

    {/* Card 2: Stress Management and Resilience */}
    <div className="bg-gradient-to-r from-[#17A4A5] to-teal-700 text-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
      <h3 className="text-2xl font-bold mb-4 text-center">
        Stress Management and Resilience
      </h3>
      <ul className="list-disc pl-6 mt-4">
        <li>Practical strategies to manage stress and reduce exam anxiety.</li>
        <li>
          Encouraging a growth mindset and persistence in overcoming challenges.
        </li>
        <li>
          Balancing academic and personal commitments for overall well-being.
        </li>
      </ul>
    </div>
  </div>
</div>

    </section>
    );
    
}

export default HolisticSupport