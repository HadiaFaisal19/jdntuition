import React from 'react'
import Image from "next/image";
import { FaBriefcase } from 'react-icons/fa';
import Link from 'next/link';

const Feature = () => {
  return <div className='pt-20 pb-20 bg-[#17A4A5]'>
      <div className='mt-8 grid grid-cols-1 xl:grid-cols-2 items-center gap-12 w-[80%] mx-auto'>
        <div 
        data-aos="zoom-in"
      data-aos-anchor-placement="top-center"
        >
            <Image src="/images/hero.png" alt="image" width={1000} height={"1000"} />
        </div>
        <div>
        <div className='flex items-center space-x-4'>
            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center flex-col'>
                <FaBriefcase className='h6 w-6 text-[#17A4A5]'/>
            </div>
            <h1 className='text-xl text-gray-300 font-semibold'>Premium Tutoring Platform</h1>
        </div>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-8 font-bold md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[3.9rem] text-white'>
            Apply Today and Help make the Difference
        </h1>
        <p className="text-sm md:text-base text-white text-opacity-90 mt-4">
  At JDN Tuition, we are dedicated to fostering academic excellence and personal growth in our students. We are seeking passionate and knowledgeable tutors to join our team.
</p>
        <div className='mt-6 mb-2'>
        <div className="text-lg md:text-2xl text-white text-opacity-90 font-semibold">
        Make a Difference
        </div>
        <p className="text-sm md:text-base text-white text-opacity-90 mb-4">
        Help students unlock their full potential and guide them toward achieving both academic and personal success.
        </p>
        <div className="text-lg md:text-2xl text-white text-opacity-90 font-semibold">
        Teach the Skills You&apos;ve Mastered
        </div>
        <p className="text-sm md:text-base text-white text-opacity-90 mb-4">
        Share your expertise in subjects you&apos;re passionate about, inspiring and educating the next generation.
        </p>
        <div className="text-lg md:text-2xl text-white text-opacity-90 font-semibold">
        Supportive Environment
        </div>
        <p className="text-sm md:text-base text-white text-opacity-90 mb-4">
        Join a team that values collaboration, continuous learning, and personal growth.
        </p>
        <p className="text-sm md:text-base text-white text-opacity-90 mb-2">
        By becoming a tutor with JDN Tuition, you&apos;ll not only impact students&apos; lives but also continue to grow and excel in your own professional journey.
        </p>
        </div>
  <button
          className="button__cls mt-10 font-bold text-[#17A4A5] bg-white hover:bg-gray-200"
        >
          
          <Link href="/jobs/job-application">Apply Now</Link>
        </button>


    </div>
      </div>
    </div>
}

export default Feature
