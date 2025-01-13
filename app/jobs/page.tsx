import React from 'react'
import Image from "next/image";
import { FaBriefcase } from 'react-icons/fa';

const Feature = () => {
  return <div className='pt-20 pb-20 bg-[#17A4A5]'>
      <div className='mt-8 grid grid-cols-1 xl:grid-cols-2 items-center gap-12 w-[80%] mx-auto'>
        <div 
        data-aos="zoom-in"
      data-aos-anchor-placement="top-center"
        >
            <Image src="/images/f.png" alt="image" width={1000} height={"1000"} />
        </div>
        <div>
        <div className='flex items-center space-x-4'>
            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center flex-col'>
                <FaBriefcase className='h6 w-6 text-[#17A4A5]'/>
            </div>
            <h1 className='text-xl text-black font-semibold'>Premium Tutoring Platform</h1>
        </div>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-8 font-bold md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[3.9rem] text-white'>
            Apply Today and Help make the Difference
        </h1>
        <div className='mt-8 mb-6'>
        <div className="text-lg md:text-2xl text-white text-opacity-90 font-semibold">
  Teach the skills that you mastered
</div>
<p className="text-sm md:text-base text-white text-opacity-90 mt-4">
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, 
  adipisci? Perferendis a non totam laborum modi placeat eum iusto
</p>

<div className="mt-8 mb-6">
  <h1 className="text-lg md:text-2xl text-white text-opacity-90 font-semibold">
    Help create a Difference
  </h1>
  <p className="text-sm md:text-base text-white text-opacity-90 mt-4">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, 
    adipisci? Perferendis a non totam laborum modi placeat eum iusto 
    quam.
  </p>
  <button
          className="button__cls mt-10 font-bold text-[#17A4A5] bg-white hover:bg-gray-200"
        >
          Apply Now
        </button>
</div>
</div>
    </div>
      </div>
    </div>
}

export default Feature
