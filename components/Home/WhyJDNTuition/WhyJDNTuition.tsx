import Image from "next/image";

const WhyJDNTuition = () => {
    return (
        <div className="relative min-h-screen flex items-center bg-gray-100">
          {/* Background Image */}
          <div className="absolute inset-0">
          
        <Image
          src="/images/whyJDN.png"
          alt="Background Classroom"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority // Ensures the image loads quickly
        />
      </div>
    
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    
          {/* Content Section */}
          <div className="relative z-10 flex w-full items-center justify-center lg:justify-end px-6 lg:px-16 py-8">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl">
              <h2 className="text-3xl font-bold text-[#17A4A5] mb-4">Who We Are</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">ABOUT US</h3>
              <p className="text-gray-700 mb-4">
                At JDN Tuition, we're more than just a tutoring service – we're a community
                dedicated to nurturing growth, fostering confidence, and empowering students
                to reach their full potential. Founded with a vision to revolutionize education,
                we believe that every student deserves personalized support tailored to their
                individual needs and goals.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">OUR APPROACH</h3>
              <p className="text-gray-700 mb-4">
                What sets JDN Tuition apart is our commitment to personalized learning. We
                understand that every student learns differently, which is why we take the time
                to get to know each individual and tailor our approach accordingly. From our free
                30-minute meet-and-greet consultation to our meticulous tutor matching process,
                we prioritize compatibility and ensure that students are paired with tutors who
                not only excel in their respective subjects but also connect on a personal level.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">OUR VALUES</h3>
              <p className="text-gray-700 mb-4">
                At the heart of JDN Tuition are our core values: excellence, integrity, empathy,
                and community. We are committed to upholding the highest standards of academic
                excellence while operating with integrity and transparency in everything we do.
                Empathy is at the forefront of our interactions, as we strive to understand and
                support each student's individual needs and challenges. And finally, we believe
                in the power of community – the strength that comes from working together towards
                a common goal.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">OUR PROMISE</h3>
              <p className="text-gray-700">
                When you choose JDN Tuition, you're not just investing in a tutoring service –
                you're joining a supportive network dedicated to your success. We promise to
                provide personalized attention, expert guidance, and unwavering support every
                step of the way. With JDN Tuition, you can rest assured that you're receiving the
                highest quality education tailored to your unique needs and aspirations.
              </p>
            </div>
          </div>
        </div>
      );
};

export default WhyJDNTuition;
