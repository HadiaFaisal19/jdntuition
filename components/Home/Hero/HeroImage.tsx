"use client"
import Image from "next/image"
import React from "react"

const HeroImage = () => {
  return (
    <div 
      data-aos="fade-up" 
      data-aos-delay="1000" 
      className="w-full h-auto flex justify-center lg:justify-end"
    >
      <Image 
        src="/images/hero-1.png" 
        width={700} 
        height={500} 
        alt="Hero" 
        className="object-contain max-w-[100%] sm:max-w-[100%] md:max-w-[100%] lg:max-w-[70%] xl:max-w-[90%]" 
      />
    </div>
  )
}

export default HeroImage
