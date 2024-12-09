"use client"
import Link from "next/link";
import React from "react";

const HeroContent = () => {
  return (
    <div>
      <h4 data-aos="fade-right"
      className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-2xl font-bold md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[4rem] text-white opacity-60">
      Journey Development Network: Building the Pillars of Success
      </h4>
      <h1 data-aos="fade-left"
      data-aos-delay="200"
      className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-bold md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[4rem] text-white">
      Australia's Higest Rated Tutoring Platform - The Trusted Choice
      </h1>
      
      <div className="mt-8 flex items-center space-x-4">
        <button
          data-aos="zoom-in"
          data-aos-delay="300"
          className="button__cls text-white bg-[#17A4A5] hover:bg-[#138F8F]"
        >
          <Link href="/book-now">Book Now</Link>
        </button>
        <button
          data-aos="zoom-in"
          data-aos-delay="300"
          className="button__cls text-[#17A4A5] bg-white hover:bg-gray-200"
        >
          Why Choose Us
        </button>
        
      </div>
      <div className="flex items-center flex-wrap space-x-16 mt-8">
  <div
  data-aos="fade-up"
  data-aos-delay="500">
    <p 
    className="md:text-xl lg:text-2xl text-base text-white font-bold">
      20+
    </p>
    <p
      className="w-[100px] h-[3px] bg-green-600 mt-2 mb-2 rounded-lg"
    ></p>
    <p className="md:text-lg text-sm text-white text-opacity-70">
      Tutors
    </p>
  </div>
  <div
  data-aos="fade-up"
  data-aos-delay="600">
    <p 
    
    className="md:text-xl lg:text-2xl text-base text-white font-bold">
      500+
    </p>
    <p
      className="w-[100px] h-[3px] bg-blue-600 mt-2 mb-2 rounded-lg"
    ></p>
    <p className="md:text-lg text-sm text-white text-opacity-70">
      Students
    </p>
  </div>
  <div 
  data-aos="fade-up"
  data-aos-delay="700">
    <p 
      className="md:text-xl lg:text-2xl text-base text-white font-bold">
      30+
    </p>
    <p
      className="w-[100px] h-[3px] bg-pink-600 mt-2 mb-2 rounded-lg"
    ></p>
    <p className="md:text-lg text-sm text-white text-opacity-70">
      Courses
    </p>
  </div>
</div>

    </div>
  );
};

export default HeroContent;
