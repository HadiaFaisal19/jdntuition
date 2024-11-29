//import Image from 'next/image';
import React from 'react'
import { FaStar } from 'react-icons/fa';
//import { FaStar } from 'react-icons/fa';

type Props = {
    name: string;
    review: string;
    role: string;
}

const SliderCard = ({review, name, role}:Props) => {
  return <div className='flex flex-wrap sm:flex-nowrap items-center space-x-10 '>
    {/* <div className='h-full w-full'>
      <Image 
      className='h-full w-full'
      src={image}
      alt='image'
      width={350}
      height={350}
      />

    </div> */}
    <div className='ml-7 mt-6 mb-7'>
      <div className='flex items-center'>
        <FaStar className='xl:w-7 xl:h-7 md:w-5 md:h-5 w-4 h-4 text-yellow-600' />
        <FaStar className='xl:w-7 xl:h-7 md:w-5 md:h-5 w-4 h-4 text-yellow-600' />
        <FaStar className='xl:w-7 xl:h-7 md:w-5 md:h-5 w-4 h-4 text-yellow-600' />
        <FaStar className='xl:w-7 xl:h-7 md:w-5 md:h-5 w-4 h-4 text-yellow-600' />
        <FaStar className='xl:w-7 xl:h-7 md:w-5 md:h-5 w-4 h-4 text-yellow-600' />
      </div>
      <p className='mt-6 text0gray-800 w-[95%] md:w-[80%] text-xs md:text-sm lg:text-base font-semibold text-opacity-65'>
        {review}
      </p>
      <div className='mt-7'>
        <h1 className='text-xl text-black font-semibold'>{name}</h1>
        <p className='text-lg text-black text-opacity-60'>{role}</p>
      </div>
    </div>
    </div>;
}

export default SliderCard
