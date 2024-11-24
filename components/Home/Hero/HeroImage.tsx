"use client"
import Image from 'next/image';
import React from 'react'

const HeroImage = () => {
  return (
    <>
      <div className='hidden lg:block'>
        <Image src="/images/hero.png" width={800} height={600} alt='Hero'/>
      </div>
      
    </>
  )
}

export default HeroImage
