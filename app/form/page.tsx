"use client";
import React, { useState } from "react";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "",
    grade: "",
    subjects: [],
  });

  const gradeSubjects = {
    K: ["English", "Maths", "Thinking Skills", "Writing", "Exam Preparation"],
    "1-6": ["English", "Maths", "Thinking Skills", "Writing", "Exam Preparation"],
    "7-10": ["English", "Maths", "Science", "NAPLAN", "Other"],
    "11-12": [
      "English",
      "Maths",
      "Science",
      "Social Science",
      "Humanities",
      "Other",
    ],
  };

  const subjectSubcategories = {
    "Exam Preparation": [
      "NAPLAN Preparation",
      "Opportunity Class Exam Preparation",
      "Selective School Exam Preparation",
      "HAST Exam Preparation",
    ],
    Other: [
      "Visual Arts",
      "Music",
      "Design and Technology",
      "Drama",
      "PDHPE",
      "Languages",
      "Studies of Religion",
      "Software Design and Development",
    ],
    English: [
      "English Standard",
      "English Advanced",
      "English Extension 1",
      "English Extension 2",
      "EAL/D",
    ],
    Maths: [
      "Mathematics Standard",
      "Mathematics Advanced",
      "Mathematics Extension 1",
      "Mathematics Extension 2",
    ],
    Science: ["Biology", "Chemistry", "Physics", "Other Sciences"],
    "Social Science": [
      "Business Studies",
      "Economics",
      "Legal Studies",
      "Geography",
    ],
    Humanities: [
      "Ancient History",
      "Modern History",
      "History Extension",
      "Society and Culture",
      "Geography",
    ],
  };

  const handleNextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubjectSelection = (subject) => {
    if (formData.subjects.includes(subject)) {
      setFormData({
        ...formData,
        subjects: formData.subjects.filter((item) => item !== subject),
      });
    } else {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, subject],
      });
    }
  };

  const renderSubjects = () => {
    const subjects =
      gradeSubjects[formData.grade] ||
      gradeSubjects["1-6"]; 

    return subjects.map((subject) => (
      <div key={subject} className="relative">
        <button
          className={`px-4 py-2 rounded w-full ${
            formData.subjects.includes(subject)
              ? "bg-[#17A4A5] text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleSubjectSelection(subject)}
        >
          {subject}
        </button>
        {formData.subjects.includes(subject) &&
          subjectSubcategories[subject] && (
            <div className="absolute bg-white shadow-lg mt-2 rounded w-full z-10 max-h-60 overflow-auto">
              {subjectSubcategories[subject].map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSubjectSelection(sub)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
      </div>
    ));
  };

  const StepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Are you a student or a parent?</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  handleChange("role", "Student");
                  handleNextStep();
                }}
                className="bg-[#17A4A5] text-white px-6 py-2 rounded"
              >
                Student
              </button>
              <button
                onClick={() => {
                  handleChange("role", "Parent");
                  handleNextStep();
                }}
                className="bg-[#17A4A5] text-white px-6 py-2 rounded"
              >
                Parent
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">
              {formData.role === "Student"
                ? "What grade are you in?"
                : "What grade is your child in?"}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map(
                (grade) => (
                  <button
                    key={grade}
                    onClick={() => handleChange("grade", grade)}
                    className={`px-4 py-2 rounded ${
                      formData.grade === grade
                        ? "bg-[#17A4A5] text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {grade}
                  </button>
                )
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Choose your subjects</h2>
            <div className="grid grid-cols-2 gap-4">{renderSubjects()}</div>
          </div>
        );

      default:
        return <div>Step not implemented yet.</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-8 shadow-lg">
        <StepContent />
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              onClick={handlePrevStep}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Back
            </button>
          )}
          {currentStep < 5 && (
            <button
              onClick={handleNextStep}
              className="bg-[#17A4A5] text-white px-4 py-2 rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
