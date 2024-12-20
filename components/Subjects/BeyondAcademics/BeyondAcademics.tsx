import Image from "next/image";

const BeyondAcademics = ({ pageType }) => {
  // Data for K-6
  const kTo6Data = [
    {
      title: "Confidence Building",
      description: `Our tutors help students overcome challenges, boosting their self-esteem and resilience in both academic and non-academic settings.`,
    },
    {
      title: "Life Skills Development",
      description: `Lessons incorporate skills like time management, organisation, and effective communication that are valuable for future success.`,
    },
    {
      title: "Encouraging a Growth Mindset",
      description: `We teach students to embrace challenges as opportunities to grow, helping them develop perseverance and a positive attitude towards learning.`,
    },
  ];

  // Data for 7-10 with new descriptions
  const sevenToTenData = [
    {
      title: "Confidence",
      description: `Helping students take ownership of their learning journey and build the confidence to tackle new challenges.`,
    },
    {
      title: "Critical Thinking Development",
      description: `Encouraging students to think critically, analyse information, and draw meaningful conclusions — skills essential for both academics and life.`,
    },
    {
      title: "Resilience and Growth Mindset",
      description: `Teaching students how to approach setbacks as opportunities for growth, fostering persistence and adaptability.`,
    },
  ];

  const elevenToTwelveData =[
    {
      title: "Growth Mindset Development",
      description: `Encouraging students to embrace challenges, learn from setbacks, and remain motivated throughout their HSC journey. `,
    },
    {
      title: "Career and Pathway Support",
      description: `Guidance on how HSC results translate into university or career opportunities, helping students plan for their futures. `,
    },
  ];

 
  // Select the appropriate data
   const data =
    pageType === "K-6"
      ? kTo6Data
      : pageType === "7-10"
      ? sevenToTenData
      : elevenToTwelveData;
  const imageSrc = 
  pageType === "K6"
    ? "/images/whyk-6.jpg"
    : pageType === "7-10"
    ? "/images/bey7-10.png"
    : "/images/beyond11-12.png";
  return (
    <section className="relative min-h-screen flex items-center bg-gray-100">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt="Background Classroom"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </div>

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 lg:px-16 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl text-start">
          <h2 className="text-4xl font-bold text-[#17A4A5] mb-4">Beyond Academics</h2>
          <p className="text-gray-700 mb-4">
            JDN Tuition also serves beyond academics by focusing on:
          </p>
          {data.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold text-[#17A4A5] mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeyondAcademics;
