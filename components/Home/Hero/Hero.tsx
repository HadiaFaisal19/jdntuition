import React from "react"
import HeroContent from "./HeroContent"
import HeroImage from "./HeroImage"

const Hero = () => {
  return (
    <div className="relative w-full pt-[4vh] md:pt-[12vh] h-screen bg-gradient-to-r from-teal-800 via-blue-850 to-blue-900 overflow-hidden">
      <div className="flex justify-center flex-col w-4/5 h-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <HeroContent />
          <div className="hidden lg:block lg:absolute lg:bottom-0 lg:right-[5%]">
            <HeroImage />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

