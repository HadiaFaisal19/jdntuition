"use client"
import Image from "next/image"
import React from "react"

const HeroImage = () => {
  return (
    <div data-aos="fade-up" data-aos-delay="1000" className="w-full h-full">
      <Image src="/images/hero-1.png" width={700} height={500} alt="Hero" className="object-contain" />
    </div>
  )
}

export default HeroImage

