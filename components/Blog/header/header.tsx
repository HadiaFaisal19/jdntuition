import Image from "next/image";

const Header = ({ backgroundImage }) => {
  return (
    <section className=" relative h-[50vh] flex items-center justify-center">
      {/* Background Image */}
      <div className=" absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt="Blog Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </div>

      {/* Heading */}
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Blog</h1>
      </div>
    </section>
  );
};

export default Header;
