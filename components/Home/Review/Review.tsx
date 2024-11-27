import Slider from "@/components/Helper/Slider";
import React from "react";
import { BsQuote } from "react-icons/bs";

const Review = () => {
  return (
    <div className="pt-20 pb-16 bg-black">
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
          <h1 className="text-2xl md:text-3xl lg:text-5xl mt-8 font-bold md:leading-[3rem] lg:leading-[3.3rem] xl:leading-[3.6rem] text-white">
            Trusted By Students
          </h1>
          <p className="text-base text-white text-opacity-50 mt-6">
          Journet Development Network: Building the Pillars of Success
          </p>
          <div className="flex items-center space-x-10 mt-8">
            <p className="text-white font-bold text-5xl">99%</p>
            <p className="text-white">Students Gain Success<br/> Through Our Platform</p>
          </div>
        </div>
        <div className="xl:col-span-2 bg-white rounded-lg overflow-hidden">
            <Slider/>
        </div>
      </div>

      {/* Slider */}
    </div>
  );
};

export default Review;
