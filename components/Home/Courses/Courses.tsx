import React from 'react';
import Image from "next/image";
import { coursesData } from '@/data/data';
import CourseCard from './CourseCard';

// Update type definition for the courses
interface Course {
  id: number;
  image: string;
  title: string; 
  button: string;
  //subjects: string; // Make subjects optional
  category: string;
}

const Courses = () => {
  return (
    <div className="pt-20 pb-12 relative mt-20 bg-gray-200 overflow-hidden">
      {/* Bounce ball */}
      <div className="absolute top-[30%] z-10 pointer-events-none">
        <Image
          src="/images/cb.png"
          alt="image"
          width={700}
          height={700}
          className="animate-bounce"
        />
      </div>
      
      {/* Main Content */}
      <div className="relative z-20 w-[80%] pt-10 pb-8 mx-auto">
        <h1 className="text-4xl md:text-5xl text-gray-900 font-bold">
          Subjects Offered
        </h1>
      
        <div className="md:mt-12 mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10">
          {coursesData.map((course: Course) => {
            return (
              <div key={course.id} className="relative z-20">
                <CourseCard course={course} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Courses;
