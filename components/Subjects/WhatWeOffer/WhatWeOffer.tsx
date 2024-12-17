
"use client";
import { FaBookOpen, FaCalculator, FaFlask, FaPen, FaBrain } from 'react-icons/fa';

const WhatWeOffer = () => {
    return (
<section className="py-16 px-4 bg-[#17A4A5]">
      <div className="max-w-7xl mx-auto">
      <h1 
        data-aos="fade-left"
        data-aos-anchor-placement="top-center"
        className="pt-3 mb-8 text-3xl md:text-5xl font-extrabold text-white text-center">
          What We Offer
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Comprehensive English Program */}
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full mx-auto mb-4 transform transition-transform duration-300 hover:scale-105">
            <FaBookOpen className="text-6xl text-[#17A4A5] mb-4 mx-auto" />
            <h2 className="text-3xl font-bold text-[#17A4A5] mb-4 text-center">Comprehensive English Program</h2>
            <p className="text-gray-700 mb-4">
              Our English tutoring develops a strong foundation in literacy, empowering students to communicate clearly and confidently.
            
              <br />
              <ul className="list-disc pl-6">
                <li>Phonics and spelling mastery.</li>
                <li>Reading fluency and comprehension strategies.</li>
                <li>Sentence construction and creative writing projects.</li>
              </ul>
            </p>
          </div>

          {/* Holistic Mathematics Program */}
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full mx-auto mb-4 transform transition-transform duration-300 hover:scale-105">
            <FaCalculator className="text-6xl text-[#17A4A5] mb-4 mx-auto" />
            <h2 className="text-3xl font-bold text-[#17A4A5] mb-4 text-center">Holistic Mathematics Program</h2>
            <p className="text-gray-700 mb-4">
              We focus on building confidence and competence in maths, helping students grasp key concepts and apply them effectively.
              <br />
              <ul className="list-disc pl-6">
                <li>Mastery of arithmetic (addition, subtraction, multiplication, division).</li>
                <li>Introduction to fractions, decimals, and measurement.</li>
                <li>Applying maths in real-life situations.</li>
              </ul>
            </p>
          </div>

          {/* Science Explorations */}
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full mx-auto mb-4 transform transition-transform duration-300 hover:scale-105">
            <FaFlask className="text-6xl text-[#17A4A5] mb-4 mx-auto" />
            <h2 className="text-3xl font-bold text-[#17A4A5] mb-4 text-center">Science Explorations</h2>
            <p className="text-gray-700 mb-4">
              We ignite curiosity about the world through engaging science lessons that encourage hands-on learning.
              <br />
              <ul className="list-disc pl-6">
                <li>Understanding basic principles of biology, chemistry, and physics.</li>
                <li>Nurturing inquisitive and critical thinking skills.</li>
              </ul>
            </p>
          </div>

          {/* Writing Skills Development */}
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full mx-auto mb-4 transform transition-transform duration-300 hover:scale-105">
            <FaPen className="text-6xl text-[#17A4A5] mb-4 mx-auto" />
            <h2 className="text-3xl font-bold text-[#17A4A5] mb-4 text-center">Writing Skills Development</h2>
            <p className="text-gray-700 mb-4">
              Strong writing skills are crucial for communication. Our writing program builds confidence and clarity.
              <br />
              <ul className="list-disc pl-6">
                <li>Constructing clear and cohesive sentences and paragraphs.</li>
                <li>Learning different writing types, including persuasive and narrative.</li>
                <li>Building vocabulary and grammar skills through practical exercises.</li>
              </ul>
            </p>
          </div>

          {/* Thinking Skills Program */}
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full mx-auto mb-4 lg:col-span-2 transform transition-transform duration-300 hover:scale-105">
            <FaBrain className="text-6xl text-[#17A4A5] mb-4 mx-auto" />
            <h2 className="text-3xl font-bold text-[#17A4A5] mb-4 text-center">Thinking Skills Program</h2>
            <p className="text-gray-700 mb-4">
              Thinking skills are integral to solving problems and understanding the world. We equip students with the tools to think logically and creatively.
              <br />
              <ul className="list-disc pl-6">
                <li>Developing critical and lateral thinking abilities.</li>
                <li>Building reasoning skills through puzzles, patterns, and challenges.</li>
                <li>Strengthening decision-making and problem-solving through age-appropriate tasks.</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </section>
    );
    
}

export default WhatWeOffer