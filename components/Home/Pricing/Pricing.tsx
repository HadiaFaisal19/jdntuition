import { priceData } from "@/data/data";
import React from "react";
import PricingCard from "./PricingCard";

const Pricing = () => {
  return (
    <div className="pt-20 pb-20 bg-gray-100">
      <div className="w-[90%] md:w-[80%] mx-auto">
        {/* Heading */}
        <h1 
        data-aos="fade-left"
        data-aos-anchor-placement="top-center"
        className="pt-10 text-3xl md:text-5xl font-extrabold text-gray-900 text-center">
          Transparent, Flexible, and Packed Full of Value
        </h1>

        {/* Cards Grid */}
        <div 
        
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {priceData.map((price) => (
            <PricingCard 
            key={price.id} price={price} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
