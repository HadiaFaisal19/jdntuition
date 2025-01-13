import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  price: {
    id: number;
    tagline: string;
    name: string;
    image: string;
    title: string;
    price: number;
    about: string;
  };
};

const PricingCard = ({ price }: Props) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden group hover:scale-105 transition-transform duration-300">
      {/* Enlarged Image Section */}
      <div className="w-full h-96 relative">
        <Image
          src={price.image}
          alt={price.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Tagline */}
        <p className="text-sm font-medium text-[#17A4A5] uppercase tracking-wide">
          {price.tagline}
        </p>
        
        {/* Title */}
        <h1 className="mt-2 text-2xl font-semibold text-gray-800">
          {price.name}
        </h1>
        
        <hr className="my-4 border-gray-300" />
        
        {/* Price */}
        <p className="text-lg font-bold text-gray-900">${price.price}/hour</p>
        
        <h2 className="mt-2 text-xl font-semibold text-gray-700">
          {price.title}
        </h2>
        
        {/* About */}
        
        {/* Button */}
        <button
          className="mt-6 px-6 py-2 text-white bg-[#17A4A5] hover:bg-[#138F8F] rounded-md shadow-sm transition-colors"
        >
          
          <Link href="/book-now">Book Your First Lesson Now</Link>
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
