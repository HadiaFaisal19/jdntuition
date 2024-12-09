"use client";
import React, { useState } from "react";

export default function SubjectSelectionForm() {
  const [formData, setFormData] = useState({
    grade: "",
    subjects: [],
  });

  const grades = {
    Primary: ["Kindergarten", "1", "2", "3", "4", "5", "6"],
    Secondary: ["7", "8", "9", "10"],
    Senior: ["11", "12", "Other"],
  };

  const subjectsByGrade = {
    Kindergarten: ["English", "Maths", "Science"],
    "1": ["English", "Maths", "Science", "Social Studies"],
    "11": ["English Standard", "English Advanced", "English Extension 1", "English Extension 2", "ESL/EAL"],
    "12": ["English Advanced", "Mathematics", "Physics", "Chemistry", "Economics"],
  };

  const [step, setStep] = useState(1);

  const handleGradeSelection = (grade) => {
    setFormData({ ...formData, grade, subjects: [] }); // Reset subjects on grade change
  };

  const toggleSubjectSelection = (subject) => {
    setFormData((prevState) => {
      const isSelected = prevState.subjects.includes(subject);
      return {
        ...prevState,
        subjects: isSelected
          ? prevState.subjects.filter((s) => s !== subject)
          : [...prevState.subjects, subject],
      };
    });
  };

  const goToNextStep = () => setStep(step + 1);
  const goToPreviousStep = () => setStep(step - 1);

  return (
    <div className="w-full flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-full max-w-4xl p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Subject and Grade</h2>

        {step === 1 && (
          <>
            <h3 className="text-lg font-semibold mb-4">What grade are you in?</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {Object.entries(grades).map(([category, gradeList]) => (
                <div key={category}>
                  <h4 className="font-bold">{category}</h4>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {gradeList.map((grade) => (
                      <button
                        key={grade}
                        onClick={() => handleGradeSelection(grade)}
                        className={`py-2 px-4 rounded ${
                          formData.grade === grade
                            ? "bg-[#17A4A5] text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={goToNextStep}
              className="bg-[#17A4A5] text-white py-3 px-6 rounded hover:bg-[#138F8F]"
              disabled={!formData.grade}
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="text-lg font-semibold mb-4">
              What subject/s do you need support in?
            </h3>
            {formData.grade && (
              <div className="space-y-4">
                {subjectsByGrade[formData.grade]?.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => toggleSubjectSelection(subject)}
                    className={`w-full text-left py-2 px-4 rounded ${
                      formData.subjects.includes(subject)
                        ? "bg-[#17A4A5] text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            )}
            <div className="flex justify-between mt-6">
              <button
                onClick={goToPreviousStep}
                className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800"
              >
                Previous
              </button>
              <button
                onClick={() => console.log("Form Data:", formData)}
                className="bg-[#17A4A5] text-white py-3 px-6 rounded hover:bg-[#138F8F]"
                disabled={formData.subjects.length === 0}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

