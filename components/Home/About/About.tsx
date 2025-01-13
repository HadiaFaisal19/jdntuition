import Link from 'next/link';
import React from 'react'
import { FaArrowRight, FaAward } from 'react-icons/fa';

const About = () => {
  return <div className='pt-16 pb-15'>
    <div className='w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16'>
    {/* 1st part*/}

    <div data-aos="fade-right"
      data-aos-anchor-placement="top-center">
        <div className='flex items-center space-x-4'>-
            <div className='w-12 h-12 bg-[#17A4A5] rounded-full flex items-center justify-center flex-col'>
                <FaAward className='h6 w-6 text-white'/>
            </div>
            <h1 className='text-xl text-black font-semibold'>Australia's Best Tutors</h1>
        </div>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-8 font-bold md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[3.9rem] text-grey-800'>Discover The JDN Difference
        </h1>
        <p className='mt-4 text-gray-600'>At JDN Tuition, we’re not just about tutoring; we’re about fostering growth, building confidence, and nurturing potential. With a personalised approach to education, we prioritise each student’s journey and development above all else. Our hand-selected tutors are not only experts in their fields but are also passionate about guiding students towards success. From our free meet-and-greet consultations to our mentorship program for tutors, we’re committed to building a supportive network where students feel empowered to excel. Choose JDN Tuition and experience the difference firsthand as we embark on this educational journey together.
        </p>
        <button className='flex items-center space-x-2 px-8 py-3 mt-8 hover:bg-gray-700 transition-all duration-200 rounded-3xl bg-black text-white'>
            <Link href="/#why-choose-us"><span>Learn More</span></Link>
            <FaArrowRight/>
        </button>
    </div>
    {/* 2nd part*/}
    <div data-aos="fade-left"
      data-aos-anchor-placement="top-center"
      data-aos-delay="150">
        <div className=''>
            <h1 className='mt-19 text-7xl lg:text-9xl font-bold text-black text-opacity-10'>
                01
            </h1>
            <div className='-mt-10'>
                <h1 className='text-xl md-text-2xl text-opacity-70 mb-3 text-black font-bold'>
                    Unparallel Expertise
                </h1>
                <p className='w-[90%] lg-w-[70%] text-base text-black text-opacity-60'>At JDN Tuition, we pride ourselves on having Australia’s best tutors. Our team consists of highly qualified professionals who excel in their respective subjects. With years of experience and a passion for teaching, our tutors are dedicated to helping students achieve their academic goals. Whether they’re preparing for exams or need assistance with coursework, trust JDN Tuition for unparalleled expertise and guidance.</p>
            </div>
        </div>
        <div className='mt-10 w-full'>
            <h1 className='text-7xl lg:text-9xl font-bold text-black text-opacity-10'>
                02
            </h1>
            <div className='-mt-10'>
                <h1 className='text-xl md-text-2xl text-opacity-70 mb-3 text-black font-bold'>
                    Personalised Approach
                </h1>
                <p className='w-[90%] lg-w-[70%] text-base text-black text-opacity-60'>Our tutors are not only knowledgeable but also deeply committed to understanding each student's learning style and adapting lessons to keep them engaged and motivated. This ensures that students receive the focused guidance and encouragement they need to excel.</p>
            </div>
        </div>
        <div className='mt-10 w-full'>
            <h1 className='text-7xl lg:text-9xl font-bold text-black text-opacity-10'>
                03
            </h1>
            <div className='-mt-10'>
                <h1 className='text-xl md-text-2xl text-opacity-70 mb-3 text-black font-bold'>
                    Supportive Learning Environment
                </h1>
                <p className='w-[90%] lg-w-[70%] text-base text-black text-opacity-60'>At JDN Tuition, we believe that a supportive learning environment is essential for academic success. That’s why we foster a culture of encouragement, positivity, and collaboration. Our tutors are not just mentors; they’re also partners in learning. Whether a student is struggling with a difficult concept or needs motivation to reach their full potential, our team is here to support them every step of the way. Choose JDN Tuition and experience the difference of studying in a nurturing and empowering environment.</p>
            </div>
        </div>
    </div>
    </div>
    </div>;
    
}

export default About
