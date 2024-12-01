"use client";

import Image from "next/image";
import { FaUsers, FaTrophy, FaHeart, FaMoneyBillWave } from "react-icons/fa";

export default function Opportunities() {
  return (
    
    <section className="pt-[10rem] bg-white py-16 px-4">
  <div className="max-w-6xl mx-auto text-center mb-10">
    <h1 className="text-4xl md:text-5xl text-gray-900 font-bold">
      Primary School
    </h1>
  </div>
  <div className="max-w-6xl mx-auto bg-[#17A4A5] rounded-lg p-8 flex flex-col lg:flex-row items-center">
    {/* Left Section - English Text */}
    <div className="lg:w-1/2 text-center lg:text-left px-6">
      {/* Image */}
      <div className="mb-6">
      <Image className="mx-auto lg:mx-0 w-full max-w-md rounded-lg shadow-md" src="/images/english.jpg" width={300} height={200} alt='Hero'/>
        
      </div>
      <h2 className="text-lg font-semibold uppercase text-white/70">
        Journet Development Network: Building the Pillars of Success
      </h2>
      <h3 className="text-4xl font-bold mt-2 leading-tight text-white">
        English
      </h3>
      <p className="text-white/80 mt-4">
        Our Primary School English Program is designed to foster academic
        success by developing essential skills and knowledge through our
        expert tutors and their personalized guidance. We emphasize key
        areas vital for literacy and language proficiency, with the four
        cornerstones of our English tutoring comprised of:
      </p>
    </div>

    {/* Divider */}
    <div className="hidden lg:block w-[0.5px] bg-white/50 h-auto mx-1"></div>

    {/* Right Section - Icon Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-1/2">
      {/* Card 1 */}
      <div className="bg-white rounded-lg p-5 text-center shadow-md">
        
        <h4 className="text-lg font-semibold mt-2 text-[#17A4A5]">
          Comprehension and Text Interpretation
        </h4>
        <p className="text-gray-600 mt-2">
          We place a significant emphasis on reading comprehension and interpreting texts, which are crucial for literacy success. Proficiency in these skills is a must for high-stakes examinations such as the Selective School, Opportunity Class, and NAPLAN exams.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-lg p-6 text-center shadow-md">
        <h4 className="text-lg font-semibold mt-4 text-[#17A4A5]">
          Novel Study
        </h4>
        <p className="text-gray-600 mt-2">
          For older grades (Y4-6), we incorporate novel studies to prepare students for high school English. This technique not only improves their understanding and analytical abilities but also provides a foundation for writing essays based on provided materials.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-lg p-6 text-center shadow-md">
        <h4 className="text-lg font-semibold mt-4 text-[#17A4A5]">
          Vocabulary Development
        </h4>
        <p className="text-gray-600 mt-2">
          Expanding vocabulary is a cornerstone of our English program. We offer organized activities and exercises designed to improve students’ vocabulary, hence enhancing their overall language skills.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-lg p-6 text-center shadow-md">
        <h4 className="text-lg font-semibold mt-4 text-[#17A4A5]">
          Writing
        </h4>
        <p className="text-gray-600 mt-2">
          Our focus on writing equips pupils with the necessary skills for high school. We provide comprehensive guidance on a range of writing formats and assist students in crafting both well-structured, compelling arguments and detailed creative pieces.
        </p>
      </div>
    </div>
  </div>

{/* subject 2 */}
  <div className="mt-10 max-w-6xl mx-auto bg-[#17A4A5] rounded-lg p-8 flex flex-col lg:flex-row items-center">
    {/* Left Section - English Text */}
    <div className="lg:w-1/2 text-center lg:text-left px-6">
      {/* Image */}
      <div className="mb-6">
      <Image className="mx-auto lg:mx-0 w-full max-w-md rounded-lg shadow-md" src="/images/maths.jpg" width={300} height={200} alt='Hero'/>
        
      </div>
      <h2 className="text-lg font-semibold uppercase text-white/70">
        Journet Development Network: Building the Pillars of Success
      </h2>
      <h3 className="text-4xl font-bold mt-2 leading-tight text-white">
        Maths
      </h3>
      <p className="text-white/80 mt-4">
      Our Primary School Maths Program is focused on building a strong foundation in mathematics through personalized and comprehensive support.
      </p>
    </div>

    {/* Divider */}
    <div className="hidden lg:block w-[0.5px] bg-white/50 h-auto mx-1"></div>

    {/* Right Section - Icon Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-1/2">
      {/* Card 1 */}
      <div className="bg-white rounded-lg p-5 text-center shadow-md">
        
        <h4 className="text-lg font-semibold mt-2 text-[#17A4A5]">
        Challenging Problems
        </h4>
        <p className="text-gray-600 mt-2">
        We provide our students with challenging questions outside the conventional curriculum, promoting critical thinking and problem-solving abilities. This approach helps students tackle complex problems and enhance their analytical skills.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-lg p-6 text-center shadow-md">
        <h4 className="text-lg font-semibold mt-4 text-[#17A4A5]">
        Personalised Learning
        </h4>
        <p className="text-gray-600 mt-2">
        Each student’s learning plan is tailored to their individual needs and performance level. By doing this, all students can progress at their own pace, ensuring that they fully grasp each concept taught before moving on.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-lg p-6 text-center shadow-md">
        <h4 className="text-lg font-semibold mt-4 text-[#17A4A5]">
        Step-by-Step Solutions
        </h4>
        <p className="text-gray-600 mt-2">
        Our tutors explain solutions to problems step-by-step, ensuring clarity. When students face difficulties, we approach the concepts from multiple angles and offer many practice questions to strengthen the comprehension of our students and reinforce their understanding.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-lg p-6 text-center shadow-md">
        <h4 className="text-lg font-semibold mt-4 text-[#17A4A5]">
        Exam Preparation
        </h4>
        <p className="text-gray-600 mt-2">
        Our program offers specialized practice and preparation for NAPLAN, Opportunity Class, and Selective School exams, focusing on specific question patterns and problem-solving strategies. We ensure that our students are well-prepared and confident when walking into any exam.
        </p>
      </div>
    </div>
  </div>


      
      
    </section>
  );
}
