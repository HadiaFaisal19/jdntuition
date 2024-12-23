import Image from "next/image";
import Link from "next/link";

const Header = ({ backgroundImage, tagline, heading }) => {
  return (
    <section className="relative h-screen flex items-center justify-center px-4">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt={heading}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </div>

      {/* Content */}
      <div className="text-center lg:px-6 md:px-12 sm:px-6 z-10">
        <div className="flex justify-center items-center mb-2">
          <p className="text-white text-sm md:text-base italic ml-1">{tagline}</p>
        </div>
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold text-white mb-4 md:mb-6">
          {heading}
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl text-white mb-6 md:mb-8">
        Journey Development Network: Building the Pillars of Success
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="px-4 py-2 sm:px-6 sm:py-3 bg-[#17A4A5] text-white font-semibold rounded-md transition hover:bg-[#138F8F]">
            <Link href="/book-now">Book your first lesson</Link>
          </button>
          <button className="px-4 py-2 sm:px-6 sm:py-3 sm:w-auto border border-white text-white font-semibold rounded-md transition hover:bg-[#138F8F]">
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
