import Image from "next/image";

const WhyK6 = ({ heading, description, contentImage }) => {
  return (
    <section>
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col lg:flex-row items-center lg:items-start space-y-10 lg:space-y-0 lg:space-x-16">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
          <Image
            src={contentImage}
            alt={heading}
            className="rounded-lg shadow-lg"
            width={600}
            height={400}
            layout="responsive"
          />
        </div>

        {/* Centered Text Section in a Compact Card */}
        <div className="w-full lg:w-[40%] flex items-center lg:h-[400px]">
          <div className="border-2 border-[#17A4A5] p-6 rounded-lg shadow-sm bg-white transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl font-bold text-[#17A4A5] mb-4">
              {heading}
            </h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyK6;
