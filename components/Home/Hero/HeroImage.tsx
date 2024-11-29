"use client"
import Image from 'next/image';
import React from 'react'

const HeroImage = () => {
  return (
    <>
      <div 
      data-aos="fade-left"
      data-aos-delay="1000"
      className='hidden lg:block'>
        <Image src="/images/hero-1.png" width={800} height={600} alt='Hero'/>
      </div>
      
    </>
  )
}

export default HeroImage
