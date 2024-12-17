import Image from "next/image";

const BeyondAcademics = () => {
    return (
        <section className="relative min-h-screen flex items-center bg-gray-100">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/whyk-6.jpg"
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
              JDN Tuition also serves beyond academics by focuing on:
              </p>
            <h3 className="text-xl font-semibold text-[#17A4A5] mb-4">Confidence Building</h3>
              <p className="text-gray-700 mb-4">
              Our tutors help students overcome challenges, boosting their self-esteem 
              and resilience in both academic and non-academic settings. 
              </p>
            <h3 className="text-xl font-semibold text-[#17A4A5] mb-4">Life Skills Development</h3>
              <p className="text-gray-700 mb-4">
              Lessons incorporate skills like time management, organisation, and effective 
              communication that are valuable for future success. 
              </p>
            <h3 className="text-xl font-semibold text-[#17A4A5] mb-4">Encouraging a Growth Mindset</h3>
              <p className="text-gray-700 mb-4">
              We teach students to embrace challenges as opportunities to grow, helping them 
              develop perseverance and a positive attitude towards learning.
              </p>
          </div>
        </div>
      </section>
    );
    
}

export default BeyondAcademics