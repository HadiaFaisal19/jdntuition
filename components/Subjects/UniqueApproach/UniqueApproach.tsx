import React from "react";
import { FaPhoneAlt, FaChartLine, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

const UniqueApproach = () => {
  return (
    <div className="flex flex-col items-center bg-gray-200 py-16 px-4">
      {/* Title */}
      <h2 className="text-4xl font-bold text-[#17A4A5] mb-8 text-center">Our Unique Approach</h2>

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 ">
        {/* Card 1 - Engaging Methods */}
        <div className="relative flex items-center transform transition-transform duration-300 hover:scale-95">
          {/* Circle with Icon */}
          <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center absolute -left-8 top-1/2 transform -translate-y-1/2 shadow-lg">
            <FaChalkboardTeacher className="text-[#17A4A5] text-2xl" />
          </div>
          {/* Content */}
          <div className="bg-teal-500 text-white p-6 rounded-full w-72 h-72 flex items-center justify-center text-center shadow-lg ">
            <div>
              <h3 className="font-bold text-lg mb-2">Engaging Methods</h3>
              <p className="mx-3 text-sm">
                Incorporating practical activities to keep students motivated and interested.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 - Progress Updates */}
        <div className="relative flex items-center transform transition-transform duration-300 hover:scale-95">
          {/* Circle with Icon */}
          <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center absolute -left-8 top-1/2 transform -translate-y-1/2 shadow-lg">
            <FaChartLine className="text-[#17A4A5] text-2xl" />
          </div>
          {/* Content */}
          <div className="bg-teal-500 text-white p-6 rounded-full w-72 h-72 flex items-center justify-center text-center shadow-lg">
            <div>
              <h3 className="font-bold text-lg mb-2">Progress Updates</h3>
              <p className="mx-3 text-sm">
                Regular feedback to parents on student achievements and areas for growth.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 - Tutor Expertise */}
        <div className="relative flex items-center transform transition-transform duration-300 hover:scale-95">
          {/* Circle with Icon */}
          <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center absolute -left-8 top-1/2 transform -translate-y-1/2 shadow-lg">
            <FaUserGraduate className="text-[#17A4A5] text-2xl" />
          </div>
          {/* Content */}
          <div className="bg-teal-500 text-white p-6 rounded-full w-72 h-72 flex items-center justify-center text-center shadow-lg ">
            <div>
              <h3 className="font-bold text-lg mb-2">Tutor Expertise</h3>
              <p className="text-sm mx-2">
                Our experienced tutors are skilled at working with young learners and making lessons effective and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueApproach;
