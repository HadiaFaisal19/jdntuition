import Image from 'next/image';
import React from 'react';

type Props = {
  team: {
    id: number;
    name: string;
    image: string;
    title: string;
    about: string;
  };
};

const TeamCard = ({ team }: Props) => {
  return (
    <div className="relative bg-gray-300 rounded-lg overflow-hidden group">
      {/* Image Section */}
      <div className="w-full h-[37rem] relative">
        <Image
          src={`${team.image}`}
          alt={`${team.name}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Overlay Section */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-5">
        <p className="text-white text-lg font-medium text-center">{team.about}</p>
      </div>

      {/* Card Info Section */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <p className="text-base text-black font-semibold text-opacity-80">{team.name}</p>
          </div>
        </div>
        <h1 className="mt-4 mb-4 text-xl font-semibold">{team.title}</h1>
      </div>
    </div>
  );
};

export default TeamCard;
