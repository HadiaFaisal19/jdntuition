"use client"
import Slider from "@/components/Helper/Slider";
import Link from "next/link";
import React from "react";
import { BsQuote } from "react-icons/bs";

const Review = () => {
  return (
    <div className="pt-[13vh] pb-16 bg-gray-600">
      <div className="w-[80%] mx-auto grid grid-cols-1 xl:grid-cols-3 items-center gap-20">
        {/* Text Content */}
        <div className="xl:col-span-1 mt-6">
          {/* Subheading */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#17A4A5] rounded-full flex items-center justify-center flex-col">
              <BsQuote className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl text-white font-semibold">
              Student Reviews
            </h1>
          </div>
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-5xl mt-5 font-bold md:leading-[3rem] lg:leading-[3.3rem] xl:leading-[3.6rem] text-white">
            5-Star Excellence
          </h1>
          <p className="text-base text-white text-opacity-70 mt-6">
          Raising the Bar for Tutoring Excellence - Countless Success Stories Across All Grade Levels
          </p>
          {/* <div className="flex items-center space-x-10 mt-5">
            <p className="text-white font-bold text-5xl">99%</p>
            <p className="text-white">Success Stores Across<br/> All Grade Levels</p>
          </div> */}
          <button className="button__cls mt-5 text-white bg-[#17A4A5] hover:bg-[#138F8F]">
            <Link href="/reviews">View All</Link>
          </button>
        </div>
        <div className="xl:col-span-2 bg-white rounded-lg overflow-hidden">
            <Slider/>
        </div>
      </div>
    </div>
  );
};

export default Review;
