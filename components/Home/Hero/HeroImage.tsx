"use client";
import Image from 'next/image';
import React from 'react';

const HeroImage = () => {
  return (
    <div
      data-aos="fade-left"
      data-aos-delay="1000"
      className="relative w-full h-full flex justify-end items-end"
    >
      <Image
        src="/images/hero-1.png"
        alt="Hero"
        width={800} // Fixed width
        height={800} // Fixed height
        className="object-contain"
        priority
      />
    </div>
  );
};

export default HeroImage;
