"use client";
import React from "react";
import Image from "next/image";
import { FaFile } from "react-icons/fa";
import Link from "next/link";

type Props = {
  course: {
    id: number;
    image: string;
    title: string;
    price: number;
    button: string;
    subjects: number;
    category: string;
    students: number;
  };
};

const CourseCard = ({ course }: Props) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden cursor-pointer shadow-lg transition-all">
      {/* Image Section */}
      <div className="w-full h-[30rem] relative">
        <Image
          src={course.image}
          alt={course.title}
          width={400}
          height={400}
          className="w-full h-full transition-transform duration-300 transform group-hover:scale-110"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-center mt-3 space-x-4">
          <span className="text-lg text-black text-opacity-70 font-bold">
            {course.category}
          </span>
        </div>
        <h1 className="text-xl text-black font-bold mt-2">{course.title}</h1>
        <div className="mt-6 mb-6 w-full h-[2px] bg-gray-500 opacity-15"></div>
        <div className="flex mb-6 items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaFile className="w-4 h-4 text-orange-600" />
            <p className="text-base font-semibold text-gray-800">
              {course.subjects} Subjects
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* Learn More Button */}
            <Link href={`/${course.button}`}>
              <button className="button__cls text-white bg-[#17A4A5] hover:bg-[#138F8F] px-4 py-2 rounded-lg transition-all">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
