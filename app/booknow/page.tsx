"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaBook, FaHandshake, FaRocket, FaComments } from "react-icons/fa";

export default function BookNow() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '',
    grade: '',
    selectedSubjects: [],
  });

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGradeChange = (grade) => {
    setFormData((prevData) => {
      if (prevData.grade !== grade) {
        return { ...prevData, grade, selectedSubjects: [] };
      }
      return prevData;
    });
  };

  const toggleSubjectSelection = (subject) => {
    setFormData((prevData) => {
      const isSelected = prevData.selectedSubjects.includes(subject);
      const updatedSubjects = isSelected
        ? prevData.selectedSubjects.filter((s) => s !== subject)
        : [...prevData.selectedSubjects, subject];
      return { ...prevData, selectedSubjects: updatedSubjects };
    });
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-content">
            <p className="text-lg font-semibold">Are you a student or a parent?</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className={`p-2 px-6 border rounded ${formData.userType === 'Student' ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                onClick={() => {
                  setFormData({ ...formData, userType: 'Student' });
                }}
              >
                Student
              </button>
              <button
                className={`p-2 px-6 border rounded ${formData.userType === 'Parent' ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                onClick={() => {
                  setFormData({ ...formData, userType: 'Parent' });
                }}
              >
                Parent
              </button>
            </div>
          </div>
        );
        case 2:
            return (
              <div className="step-content">
                <p className="text-lg font-semibold">
                  {formData.userType === 'Student' ? 'What grade are you in?' : 'What grade is your child in?'}
                </p>
                <div className="mt-4">
                  <div className="flex space-x-4">
                    {/* Primary Grades */}
                    <div>
                      <p className="font-semibold">Primary</p>
                      <div className="flex space-x-2 mt-2">
                        {['K', '1', '2', '3', '4', '5', '6'].map((grade) => (
                          <button
                            key={grade}
                            className={`p-2 px-4 border rounded ${formData.grade === grade ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                            onClick={() => handleGradeChange(grade)}
                          >
                            {grade}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Secondary Grades */}
                    <div>
                      <p className="font-semibold">Secondary</p>
                      <div className="flex space-x-2 mt-2">
                        {['7', '8', '9', '10'].map((grade) => (
                          <button
                            key={grade}
                            className={`p-2 px-4 border rounded ${formData.grade === grade ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                            onClick={() => handleGradeChange(grade)}
                          >
                            {grade}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Senior Grades */}
                    <div>
                      <p className="font-semibold">Senior</p>
                      <div className="flex space-x-2 mt-2">
                        {['11', '12'].map((grade) => (
                          <button
                            key={grade}
                            className={`p-2 px-4 border rounded ${formData.grade === grade ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                            onClick={() => handleGradeChange(grade)}
                          >
                            {grade}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="text-lg font-semibold">What subject(s) do you need support in?</p>
                  <div className="mt-4">{formData.grade && renderSubjects(formData.grade)}</div>
                </div>
              </div>
            );
          default:
            return null;
        }
      };

  const renderSubjects = (grade) => {
    if (['K', '1', '2', '3', '4', '5', '6'].includes(grade)) {
      return (
        <div>
          <div className="flex flex-wrap space-x-4 mt-2">
            {['English', 'Maths', 'Thinking Skills', 'Writing', 'Exam Preparation'].map((subject) => (
              <button
                key={subject}
                className={`p-2 px-4 border rounded ${formData.selectedSubjects.includes(subject) ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                onClick={() => toggleSubjectSelection(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <p className="font-semibold">Exam Preparation:</p>
            <select
              className="p-2 border rounded"
              onChange={(e) => toggleSubjectSelection(e.target.value)}
            >
              <option value="" disabled selected>
                Select an option
              </option>
              {['NAPLAN Preparation', 'Opportunity Class Exam Preparation', 'Selective School Exam Preparation', 'HAST Exam Preparation'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    } else if (['7', '8', '9', '10'].includes(grade)) {
      return (
        <div>
          <div className="flex flex-wrap space-x-4 mt-2">
            {['English', 'Maths', 'Science', 'NAPLAN', 'Other'].map((subject) => (
              <button
                key={subject}
                className={`p-2 px-4 border rounded ${formData.selectedSubjects.includes(subject) ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                onClick={() => toggleSubjectSelection(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <p className="font-semibold">Other:</p>
            <select
              className="p-2 border rounded"
              onChange={(e) => toggleSubjectSelection(e.target.value)}
            >
              <option value="" disabled selected>
                Select an option
              </option>
              {['Visual Arts', 'Music', 'Design and Technology', 'Drama', 'PDHPE'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    } else if (['11', '12', 'Other'].includes(grade)) {
      return (
        <div>
          {[{ name: 'English', options: ['English Standard', 'English Advanced', 'English Extension 1', 'English Extension 2', 'EAL/D'] },
            { name: 'Maths', options: ['Mathematics Standard', 'Mathematics Advanced', 'Mathematics Extension 1', 'Mathematics Extension 2'] },
            { name: 'Science', options: ['Biology', 'Chemistry', 'Physics', 'Other Sciences'] },
            { name: 'Social Science', options: ['Business Studies', 'Economics', 'Legal Studies', 'Geography'] },
            { name: 'Humanities', options: ['Ancient History', 'Modern History', 'History Extension', 'Geography', 'Society and Culture'] },
            { name: 'Other', options: ['Languages', 'Studies of Religion', 'Software Development', 'IT', 'Visual Arts', 'Music'] },
          ].map((subject) => (
            <div key={subject.name}>
              <p className="font-semibold">{subject.name}:</p>
              <div className="flex flex-wrap space-x-4 mt-2">
                {subject.options.map((option) => (
                  <button
                    key={option}
                    className={`p-2 px-4 border rounded ${formData.selectedSubjects.includes(option) ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                    onClick={() => toggleSubjectSelection(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-20 flex flex-col items-center w-full">
      {/* Header Section */}
      <div className="text-center py-8 px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Start Your Journey with JDN Tuition Today
        </h1>
        <p className="text-gray-700 text-lg">
          Our streamlined process gets you matched and learning in no time:
        </p>
      </div>

      {/* Steps Section */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 md:gap-6 px-4">
        {/* Step 1 */}
        <div className="border-2 border-[#17A4A5] rounded-lg p-6 shadow-lg flex flex-col items-center max-w-[250px] mx-auto">
          <div className="flex items-center justify-center w-16 h-16 bg-[#17A4A5] text-white rounded-full mb-4">
            <FaBook size={28} />
          </div>
          <h2 className="text-lg font-semibold mb-4 text-center">
            Tell Us Your Story
          </h2>
          <p className="text-gray-700 text-sm text-center leading-5">
            Start by filling our booking form to share your details and
            tutoring needs. There’s no commitment at this stage — it’s just to
            help us understand how we can assist you best.
          </p>
        </div>

        {/* Step 2 */}
        <div className="border-2 border-[#17A4A5] rounded-lg p-6 shadow-lg flex flex-col items-center max-w-[250px] mx-auto">
          <div className="flex items-center justify-center w-16 h-16 bg-[#17A4A5] text-white rounded-full mb-4">
            <FaHandshake size={28} />
          </div>
          <h2 className="text-lg font-semibold mb-4 text-center">
            Find Your Perfect Tutor
          </h2>
          <p className="text-gray-700 text-sm text-center leading-5">
            Based on your requirements, we carefully match you with the most
            suitable tutor. We consider factors such as subject expertise,
            teaching style, location, availability, and personality.
          </p>
        </div>

        {/* Step 3 */}
        <div className="border-2 border-[#17A4A5] rounded-lg p-6 shadow-lg flex flex-col items-center max-w-[250px] mx-auto">
          <div className="flex items-center justify-center w-16 h-16 bg-[#17A4A5] text-white rounded-full mb-4">
            <FaComments size={28} />
          </div>
          <h2 className="text-lg font-semibold mb-4 text-center">
            15-Minute Free Consultation
          </h2>
          <p className="text-gray-700 text-sm text-center leading-5">
            Meet your tutor for a quick, no-obligation consultation. This is
            your opportunity to ask questions, discuss your goals, and make sure
            that it’s the right fit.
          </p>
        </div>

        {/* Step 4 */}
        <div className="border-2 border-[#17A4A5] rounded-lg p-6 shadow-lg flex flex-col items-center max-w-[250px] mx-auto">
          <div className="flex items-center justify-center w-16 h-16 bg-[#17A4A5] text-white rounded-full mb-4">
            <FaRocket size={28} />
          </div>
          <h2 className="text-lg font-semibold mb-4 text-center">
            Start The Journey
          </h2>
          <p className="text-gray-700 text-sm text-center leading-5">
            If everything feels right, we’ll schedule your first lesson and set
            you on the path to success!
          </p>
        </div>
      </div>

      {/* Button Section */}
      <div className="mt-10 py-10">
        <button
          onClick={() => setIsFormVisible(true)} // Show the form on button click
          className="bg-[#17A4A5] text-white font-bold py-3 px-6 rounded hover:bg-[#138F8F]"
        >
          Get Started Now
        </button>
      </div>

      {/* Conditional Form Display */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl sm:w-[700px] md:w-[800px] lg:w-[900px] overflow-auto max-h-[90vh]">
            <h2 className="text-2xl font-semibold mb-6 text-center">Step {step}</h2>
            {/* Render Form Steps */}
            {renderFormStep()}
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className="bg-gray-400 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={step === 2 && !formData.userType || step === 2 && !formData.grade}
                className="bg-[#17A4A5] text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <div className="mt-20 mb-20 bg-black w-full py-6 flex justify-center items-center">
        <Image
          src="/images/LOGO.png"
          alt="JDN Logo"
          width={150}
          height={50}
        />
      </div>
    </div>
  );
}
