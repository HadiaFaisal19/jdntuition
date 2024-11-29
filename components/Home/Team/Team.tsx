import { teamData } from '@/data/data';
import React from 'react'
import TeamCard from './TeamCard';


const Team = () => {
  return (
    <div className="pt-20 pb-20 bg-gray">
      <div className="w-[80%] mx-auto">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl text-gray-900 font-bold">
          Meet Some of Our Dedicated Team
        </h1>

        {/* Define grid system */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* team mapping */}
          {teamData.map((team) => {
            return (
              <div key={team.id}>
                <TeamCard team={team} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


export default Team
