"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaBook, FaHandshake, FaRocket, FaComments } from "react-icons/fa";
import emailjs from "emailjs-com";

export default function BookNow() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '',
    grade: '',
    selectedSubjects: [],
    studentInfo: {
      firstName: "",
      lastName: "",
      reason: "",
      performance: "",
      learningNeeds: "",
    },
    lessonDetails: {
      type: "",
      duration: "",
      frequency: "",
      availability: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      },
    },
    parentDetails: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      suburb: "",
      addDetails: "",
    },
    
  });

  

  const handleNext = () => {
    if (step < 5 && formData.userType && formData.studentInfo ) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        studentInfo: { ...prevData.studentInfo, [name]: value },
      };
      console.log("Updated formData:", updatedData); // Log formData whenever it is updated
      return updatedData;
    });
  };
  const handleLessonInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        lessonDetails: {
          ...prevData.lessonDetails,
          [name]: value, // Update the `duration` field directly
        },
      };
  
      console.log("Updated formData:", updatedData); // Log updated formData
      return updatedData;
    });
  };
  
  
  
  

  const handleLastInputChange= (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        // Dynamically update either studentInfo or parentDetails based on the input field
        parentDetails: {
          ...prevData.parentDetails,
          [name]: value, // Update the specific field in parentDetails
        },
      };
  
      console.log("Updated formData:", updatedData); // Log updated formData to the console
      return updatedData;
    });
  };


  const handleGradeChange = (grade) => {
    setFormData((prevData) => {
      const updatedData = prevData.grade !== grade 
        ? { ...prevData, grade, selectedSubjects: [] } 
        : prevData;
      console.log("Updated formData after grade change:", updatedData); // Log formData when grade changes
      return updatedData;
    });
  };

  

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const [day, time] = value.split("-"); // Split the value into day and time
  
    setFormData((prevFormData) => {
      const currentAvailability = prevFormData.lessonDetails.availability[day] || [];
  
      let updatedAvailability;
  
      if (time === "Any" || time === "Unavailable") {
        // If "Any" or "Unavailable" is selected
        updatedAvailability = checked ? [time] : [];
      } else {
        // Normal checkbox behavior
        updatedAvailability = checked
          ? [...currentAvailability, time] // Add the time slot if checked
          : currentAvailability.filter((item) => item !== time); // Remove the time slot if unchecked
      }
  
      // Log the updated availability array for the day
      console.log(`Updated availability for ${day}:`, updatedAvailability);
  
      return {
        ...prevFormData,
        lessonDetails: {
          ...prevFormData.lessonDetails,
          availability: {
            ...prevFormData.lessonDetails.availability,
            [day]: updatedAvailability,
          },
        },
      };
    });
  };
  
  const handleSubmit = () => {
    // Perform submission logic (e.g., save data, API call)
    console.log("Form submitted successfully!", formData);
  
    // Prepare the email content using the formData
    const emailContent = {
      userType: formData.userType,
      grade: formData.grade,
      selectedSubjects: formData.selectedSubjects.join(", "),  
      firstName: formData.studentInfo.firstName,
      lastName: formData.studentInfo.lastName,
      reason: formData.studentInfo.reason,
      performance: formData.studentInfo.performance,
      learningNeeds: formData.studentInfo.learningNeeds,
      lessonType: formData.lessonDetails.type,
      lessonDuration: formData.lessonDetails.duration,
      lessonFrequency: formData.lessonDetails.frequency,
      availability: JSON.stringify(formData.lessonDetails.availability),  
      parentFirstName: formData.parentDetails.fname,
      parentLastName: formData.parentDetails.lname,
      parentEmail: formData.parentDetails.email,
      parentPhone: formData.parentDetails.phone,
      parentSuburb: formData.parentDetails.suburb,
      parentAddDetails: formData.parentDetails.addDetails
    };
  
    // Send the form data via EmailJS
  
      emailjs.send(
        "service_xc34br8",  // Replace with your EmailJS service ID
        "template_ya9huar",  // Replace with your EmailJS template ID
        emailContent,
        "4L19u9FwDl0mVJcZz"       // Replace with your EmailJS user ID
      )      
    
    .then(
      (response) => {
        console.log("Email sent successfully!", response);
        setFormData({
          userType: '',
          grade: '',
          selectedSubjects: [],
          studentInfo: {
            firstName: "",
            lastName: "",
            reason: "",
            performance: "",
            learningNeeds: "",
          },
          lessonDetails: {
            type: "",
            duration: "",
            frequency: "",
            availability: {
              Monday: [],
              Tuesday: [],
              Wednesday: [],
              Thursday: [],
              Friday: [],
              Saturday: [],
              Sunday: [],
            },
          },
          parentDetails: {
            fname: "",
            lname: "",
            email: "",
            phone: "",
            suburb: "",
            addDetails: "",
          },
        });
        // Set the step to 6 to display the thank-you message
        setStep(6);
      },
      (error) => {
        console.error("Error sending email:", error);
      }
    );
  };
  
  const handleClosePopup = () => {
    // Close the popup and reset the form visibility
    setIsFormVisible(false);
    setStep(1); // Optional: Reset to the first step
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
                onClick={() => setFormData({ ...formData, userType: 'Student' })}
              >
                Student
              </button>
              <button
                className={`p-2 px-6 border rounded ${formData.userType === 'Parent' ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                onClick={() => setFormData({ ...formData, userType: 'Parent' })}
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

            {formData.grade && (
              <div className="mt-8">
                <p className="text-lg font-semibold">What subject(s) do you need support in?</p>
                <div className="mt-4">{renderSubjects(formData.grade)}</div>
              </div>
            )}
          </div>
        );

        case 3:
          return (
            <div className="step-content">
              <h2 className="text-2xl font text-center font-semibold mb-4">Student Information</h2>
              
              {/* First Name and Last Name */}
              <div className="flex gap-4 mb-4">
                <div className="flex flex-col flex-1">
                  <label className="font-semibold mb-1">Student First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.studentInfo.firstName}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="font-semibold mb-1">Student Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.studentInfo.lastName}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                  />
                </div>
              </div>
          
              {/* Tutor Reason */}
              <div className="mb-4">
                <label className="font-semibold mb-1 block">
                {formData.userType === 'Student' ? 'Why are you seeking a tutor?' : 'Why are you seeking a tutor for your child?'}
          
                </label>
                <select
                  name="reason"
                  value={formData.studentInfo.reason}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full"
                >
                  <option value="">Select</option>
                  <option value="Boost Marks">Boost Marks</option>
                  <option value="Support and Mentorship">Support and Mentorship</option>
                  <option value="Exam Preparation">Exam Preparation</option>
                  <option value="A mix of all">A mix of all</option>
                </select>
              </div>
          
              {/* Current Performance */}
              <div className="mb-4">
                <label className="font-semibold mb-1 block">
                {formData.userType === 'Student' ? 'How would you describe your current performance in school?' : "How would you describe your child's current performance in school?"}
            
                  
                </label>
                <select
                  name="performance"
                  value={formData.studentInfo.performance}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full"
                >
                  <option value="">Select</option>
                  <option value="Facing Difficulties">Facing Difficulties</option>
                  <option value="Fairly Average">Fairly Average</option>
                  <option value="Excelling">Excelling</option>
                </select>
              </div>
          
              {/* Learning Needs */}
              <div className=" mb-0">
                <label className="font-semibold block">
                {formData.userType === 'Student' ? 'Please provide us with an overview of your learning needs to help you match with the perfect tutor' : "Please provide us with an overview of your child's learning needs to help us match them with the perfect tutor."}
                  
                </label>
                <textarea
                  name="learningNeeds"
                  value={formData.studentInfo.learningNeeds}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full"
                  rows="4"
                  placeholder="Describe the student's learning needs here..."
                ></textarea>
              </div>
            </div>
          );
          

          case 4:
            return (
              <div
                className="step-content4"
                
              >
                <h2 className="text-2xl text-center font-semibold mb-2">Lesson Details</h2>
          
                <div className="flex flex-col sm:flex-row gap-4 mb-2">
                  <div className="flex-1">
                    <label className="font-semibold mb-1 block">Lesson Type</label>
                    <select
                      name="type"
                      value={formData.lessonDetails.type}
                      onChange={handleLessonInputChange}
                      className="p-2 border rounded w-full"
                    >
                      <option value="">Select</option>
                      <option value="Online">Online</option>
                      <option value="In-person">In-person</option>
                    </select>
                  </div>
          
                  <div className="flex-1">
  <label className="font-semibold mb-1 block">Lesson Duration</label>
  <select
    name="duration"
    value={formData.lessonDetails.duration.endsWith("hours")
      ? "custom"
      : formData.lessonDetails.duration} // Keeps "custom" selected when custom value is present
    onChange={(e) => {
      const value = e.target.value;
      if (value === "custom") {
        handleLessonInputChange({
          target: {
            name: "duration",
            value: " hours", // Initialize with a default value
          },
        });
      } else {
        handleLessonInputChange({ target: { name: "duration", value } });
      }
    }}
    className="p-2 border rounded w-full"
  >
    <option value="">Select</option>
    <option value="1 hour">1 hour</option>
    <option value="1.5 hour">1.5 hours</option>
    <option value="2 hour">2 hours</option>
    <option value="custom">custom</option>
  </select>

  {/* Render the custom input field when "custom" is selected */}
  {formData.lessonDetails.duration.endsWith("hours") && (
    <div className="mt-2">
      <label className="font-semibold mb-1 block">Enter Custom Duration</label>
      <div className="flex items-center">
        
        <input
          type="number"
          step="0.1" // Allows decimal input up to one place
          value={formData.lessonDetails.duration.replace(" hours", "")}
          onChange={(e) => {
            const value = e.target.value;
            const durationValue = parseInt(value, 10);
            if (!value || (durationValue >= 2 && durationValue <= 4.0)) {
              handleLessonInputChange({
                target: {
                  name: "duration",
                  value: `${value} hours`, // Store the custom value ending with "hours"
                },
              });
            }
          }}
          placeholder="Enter hours"
          className="p-2 border rounded w-full"
        />
      </div>
    </div>
  )}
</div>


          
<div className="flex-1">
  <label className="font-semibold mb-1 block">Lesson Frequency</label>
  <select
    name="frequency"
    value={formData.lessonDetails.frequency.endsWith("times a week")
      ? "custom"
      : formData.lessonDetails.frequency} // Keeps "custom" selected when custom value is present
    onChange={(e) => {
      const value = e.target.value;
      if (value === "custom") {
        handleLessonInputChange({
          target: {
            name: "frequency",
            value: " times a week", // Initialize custom value with a default
          },
        });
      } else {
        handleLessonInputChange({ target: { name: "frequency", value } });
      }
    }}
    className="p-2 border rounded w-full"
  >
    <option value="">Select</option>
    <option value="Once a week">Once a week</option>
    <option value="Twice a week">Twice a week</option>
    <option value="Thrice a week">Thrice a week</option>
    <option value="custom">custom</option>
  </select>

  {/* Render the custom input field when "custom" is selected */}
  {formData.lessonDetails.frequency.endsWith("times a week") && (
    <div className="mt-2">
      <label className="font-semibold mb-1 block">Enter Custom Frequency</label>
      <div className="flex items-center">
      <input
          type="number"
          min="4"
          max="7"
          step="1"
          value={formData.lessonDetails.frequency.replace(" times a week", "")}
          onChange={(e) => {
            const value = e.target.value;
            const frequencyValue = parseInt(value, 10);
            if (!value || (frequencyValue >= 4 && frequencyValue<= 7)) {
              handleLessonInputChange({
                target: {
                  name: "frequency",
                  value: `${value} times a week`, // Store the custom value ending with "hours"
                },
              });
            }
          }}
          
          placeholder="Enter frequency per week"
          className="p-2 border rounded w-full"
        />
      </div>
    </div>
  )}
</div>


                </div>
          
                {/* Availability Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2">Day</th>
                        <th className="border border-gray-300 p-2">Early Morning<br />(Before 9am)</th>
                        <th className="border border-gray-300 p-2">Morning <br />(9am – 12pm)</th>
                        <th className="border border-gray-300 p-2">Early Afternoon <br />(12pm – 3pm)</th>
                        <th className="border border-gray-300 p-2">Late Afternoon <br /> (3pm – 6pm)</th>
                        <th className="border border-gray-300 p-2">Evening <br />(After 6pm)</th>
                        <th className="border border-gray-300 p-2">Any <br/> Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <tr key={day}>
                          <td className="border border-gray-300 p-2 font-semibold">{day}</td>
                          {[
                            "Early Morning",
                            "Morning",
                            "Early Afternoon",
                            "Late Afternoon",
                            "Evening",
                            "Any",
                          ].map((time) => {
                            const isDisabled =
                              formData.lessonDetails.availability[day]?.includes("Any") ||
                              formData.lessonDetails.availability[day]?.includes("Unavailable");
                            const isChecked =
                              formData.lessonDetails.availability[day]?.includes(time);
          
                            const handleCheckboxClick = (e) => {
                              handleCheckboxChange(e);
                              const checkbox = e.target;
                              checkbox.classList.add("glow");
                              setTimeout(() => {
                                checkbox.classList.remove("glow");
                              }, 2000);
                            };
          
                            return (
                              <td key={time} className="border border-gray-300 p-2 text-center">
                                <input
                                  type="checkbox"
                                  value={`${day}-${time}`}
                                  onChange={handleCheckboxClick}
                                  disabled={isDisabled && time !== "Any" && time !== "Unavailable"}
                                  checked={isChecked}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          
          

            
          
            case 5:
              return (
                <div className="step-content">
                  <h2 className="text-2xl text-center font-semibold mb-4">Final Form</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold mb-4">Enter Parent's/Guardian's Details</h2>
                      <div className="flex flex-col mb-4">
                        <label className="font-semibold mb-1">First Name:</label>
                        <input
                          type="text"
                          name="fname"
                          value={formData.parentDetails.fname}
                          onChange={handleLastInputChange}
                          className="p-2 border rounded"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="flex flex-col mb-4">
                        <label className="font-semibold mb-1">Last Name:</label>
                        <input
                          type="text"
                          name="lname"
                          value={formData.parentDetails.lname}
                          onChange={handleLastInputChange}
                          className="p-2 border rounded"
                          placeholder="Enter last name"
                        />
                      </div>
                      <div className="flex flex-col mb-4">
                        <label className="font-semibold mb-1">Email:</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.parentDetails.email}
                          onChange={handleLastInputChange}
                          className="p-2 border rounded"
                          placeholder="Enter email"
                        />
                      </div>
    <div className="flex flex-col mb-4">
      <label className="font-semibold mb-1">Phone Number:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.parentDetails.phone}
        onChange={handleLastInputChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
        
        placeholder="+61987654321"
        required
        maxLength={12} // Allow + followed by 11 digits (12 characters total)
        pattern="^\+?[0-9]*$"
      />
    </div>
    {formData.lessonDetails.type === "In-person" && (
  <div className="flex flex-col mb-4">
    <label className="font-semibold mb-1">Suburb:</label>
    <input
      type="text"
      name="suburb"
      value={formData.parentDetails.suburb}
      onChange={handleLastInputChange}
      className="p-2 border rounded"
      placeholder="Enter suburb"
    />
  </div>
)}
                    </div>
            
                    {/* Right Column */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold mb-4">Student Lesson Details</h2>
                      <p className="mb-2">
                        <span className="font-semibold">Grade:</span> {formData.grade || "Not selected"}
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Selected Subjects:</span>{" "}
                        {formData.selectedSubjects.length > 0
                          ? formData.selectedSubjects.join(", ")
                          : "No subjects selected"}
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Lesson Type:</span> {formData.lessonDetails.type || "Not selected"}
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Lesson Duration:</span> {formData.lessonDetails.duration || "Not selected"}
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Lesson Frequency:</span> {formData.lessonDetails.frequency || "Not selected"}
                      </p>
                      <div className="flex flex-col mt-4">
                        <label className="font-semibold mb-1">Additional Details:</label>
                        <textarea
                          name="addDetails"
                          rows={5}
                          value={formData.parentDetails.addDetails || ""}
                          onChange={handleLastInputChange}
                          className="p-2 border rounded"
                          placeholder="Enter any additional details"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            
              case 6:
                return (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl sm:w-[700px] md:w-[800px] lg:w-[900px] overflow-auto max-h-[90vh]">
                      <h2 className="text-2xl font-semibold text-center mb-6">
                        Thank You!
                      </h2>
                      <p className="text-lg text-center mb-6">
                        Thank you for choosing <span className="font-semibold text-[#17A4A5]">JDN Tuition</span>; we're excited to help you achieve your goals and support you every step of the way! <b>We will contact you shortly.</b> 
                      </p>
                      <div className="flex justify-center">
                        <button
                          onClick={handleClosePopup}
                          className="bg-[#17A4A5] hover:bg-[#139093] text-white font-bold py-2 px-6 rounded"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                );
              
      default:
        return null;
    }
  };

      const renderSubjects = (grade) => {
        const handleSubjectChange = (subject) => {
          setFormData((prevData) => {
            const updatedData = prevData.selectedSubjects.includes(subject)
              ? { ...prevData, selectedSubjects: prevData.selectedSubjects.filter((item) => item !== subject) }
              : { ...prevData, selectedSubjects: [...prevData.selectedSubjects, subject] };
            console.log("Updated formData after subject selection:", updatedData); // Log formData after subject selection
            return updatedData;
          });
        };
      
        if (['K', '1', '2', '3', '4', '5', '6'].includes(grade)) {
          return (
            <div>
              <div className="flex flex-wrap space-x-4 mt-2">
                {['English', 'Maths', 'Thinking Skills', 'Writing'].map((subject) => (
                  <button
                    key={subject}
                    className={`p-2 px-4 mb-2 border rounded ${formData.selectedSubjects.includes(subject) ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                    onClick={() => handleSubjectChange(subject)}
                  >
                    {subject}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <p className="font-semibold">Exam Preparation:</p>
                <div className="flex flex-wrap space-x-4 mt-2">
                  {['NAPLAN Preparation', 'Opportunity Class Exam Preparation', 'Selective School Exam Preparation', 'HAST Exam Preparation'].map((option) => (
                    <button
                      key={option}
                      className={`p-2 px-4 mb-2 border rounded ${formData.selectedSubjects.includes(option) ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                      onClick={() => handleSubjectChange(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        } else if (['7', '8', '9', '10'].includes(grade)) {
          return (
            <div>
              <div className="flex flex-wrap space-x-4 mt-2">
                {['English', 'Maths', 'Science', 'NAPLAN'].map((subject) => (
                  <button
                    key={subject}
                    className={`p-2 px-4 mb-1 border rounded ${formData.selectedSubjects.includes(subject) ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                    onClick={() => handleSubjectChange(subject)}
                  >
                    {subject}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <p className="font-semibold">Other:</p>
                <div className="flex flex-wrap space-x-4 mt-2">
                  {['Visual Arts', 'Music', 'Design and Technology', 'Drama', 'PDHPE'].map((option) => (
                    <button
                      key={option}
                      className={`p-2 px-4 border rounded ${formData.selectedSubjects.includes(option) ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                      onClick={() => handleSubjectChange(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
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
                        className={`p-2 px-4 mb-2 border rounded ${formData.selectedSubjects.includes(option) ? 'bg-[#17A4A5] text-white' : 'text-gray-700'}`}
                        onClick={() => handleSubjectChange(option)}
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
      
      const handleCloseForm = () => {
        setFormData({
          userType: "",
          grade: "",
          selectedSubjects: [],
          studentInfo: {
            firstName: "",
            lastName: "",
            reason: "",
            performance: "",
            learningNeeds: "",
          },
          lessonDetails: {
            type: "",
            duration: "",
            frequency: "",
            availability: {
              Monday: [],
              Tuesday: [],
              Wednesday: [],
              Thursday: [],
              Friday: [],
              Saturday: [],
              Sunday: [],
            },
          },
          parentDetails: {
            fname: "",
            lname: "",
            email: "",
            phone: "",
            suburb: "",
            addDetails: "",
          },
        });
        setStep(1);
        setIsFormVisible(false); // Hide form after reset
      };
      
      
  return (
    <div className="mt-16 flex flex-col items-center w-full">
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
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 md:gap-6 px-4">
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
      <div className="mt-6 py-5">
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
<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-10xl sm:w-[700px] md:w-[800px] lg:w-[900px] overflow-auto max-h-[90vh] relative">
    {/* Close Button */}
    <button
      onClick={handleCloseForm}
      className="absolute top-1 right-4 text-2xl text-gray-600 font-bold p-2 hover:text-gray-900"
    >
      X
    </button>
  {/* Step Progress Bar */}
  <div className="relative mb-6 mt-6 w-full">
    <div className="w-full bg-gray-200 h-2 rounded-full">
      <div
        className={`h-2 rounded-full ${
          step === 1
            ? "bg-[#17A4A5]"
            : step === 2
            ? "bg-[#17A4A5] opacity-75"
            : step === 3
            ? "bg-[#17A4A5] opacity-60"
            : step === 4
            ? "bg-[#17A4A5] opacity-50"
            : "bg-[#17A4A5] opacity-40"
        }`}
        style={{
          width: `${(step - 1) * 25}%`,
          transition: "width 0.5s ease-in-out", // Animation
        }}
      ></div>
    </div>
  </div>

  {/* Form Content */}
  <div className="flex justify-center items-center">
    {/* Render Form Steps */}
    <div className="w-full max-w-[800px]">{renderFormStep()}</div>
  </div>



            {/* Navigation Buttons */}
<div className="flex justify-between mt-5">
  <button
    onClick={handlePrev}
    disabled={step === 1}
    className="bg-gray-400 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
  >
    Previous
  </button>
  {step === 5 ? (
    <button
      onClick={handleSubmit}
      disabled={
        step===5 && !formData.parentDetails.fname ||
        step===5 && !formData.parentDetails.lname ||
        step === 5 && 
        (!formData.parentDetails.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentDetails.email)) ||
        step===5 && !formData.parentDetails.phone ||
        step===5 && formData.lessonDetails.type==="In-person" && !formData.parentDetails.suburb
      }
      
      className="bg-[#17A4A5] text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      Submit
    </button>
  ) : (
    <button
      onClick={handleNext}
      disabled={
        step === 2 && !formData.userType ||
        step === 2 && !formData.grade ||
        step === 2 && formData.selectedSubjects.length === 0 ||
        step === 3 && !formData.studentInfo.firstName ||
        step === 3 && !formData.studentInfo.lastName ||
        step === 3 && !formData.studentInfo.performance ||
        step === 3 && !formData.studentInfo.reason ||
        step === 3 && !formData.studentInfo.learningNeeds ||
        step ===4 && !formData.lessonDetails.type ||
        step ===4 && !formData.lessonDetails.duration ||
        step ===4 && !formData.lessonDetails.frequency ||
        step ===4 && formData.lessonDetails.duration===" hours" ||
        step ===4 && formData.lessonDetails.frequency===" times a week" ||
        step ===4 && !Object.values(formData.lessonDetails.availability).some(day => day.length > 0) 
      }
    
      className="bg-[#17A4A5] text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      Next
    </button>
  )}
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
