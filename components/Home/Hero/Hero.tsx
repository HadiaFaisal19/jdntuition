import React from "react";
import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <div
      className="w-full pt-[2vh] md:pt-[6vh] h-screen bg-gradient-to-r from-teal-800 via-blue-850 to-blue-900 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bghero.png')" }}
    >
      <div className="flex justify-center flex-col w-4/5 h-full mx-auto">
        {/* Set a fixed gap between columns */}
        <div className=" grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 items-center gap-[1rem] h-full">
          <HeroContent />
        </div>
      </div>
    </div>
  );
};

export default Hero;
