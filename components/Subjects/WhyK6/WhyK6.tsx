import Image from "next/image";

const WhyK6 = () => {
    return (
        <section>
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col lg:flex-row items-center lg:items-start space-y-10 lg:space-y-0 lg:space-x-16">
                {/* Image Section */}
                <div className="flex-shrink-0 w-full lg:w-1/2">
                    <Image
                        src="/images/kg-6.jpg"
                        alt="Why K–6 is Critical"
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
                            Why K–6 is Critical
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            These formative years lay the groundwork for future academic and
                            personal success. At JDN Tuition, we specialize in making learning
                            engaging, enjoyable, and effective. Our K–6 tutoring services are
                            designed to develop literacy, numeracy, thinking skills, and writing,
                            while cultivating a lifelong love for learning.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyK6;
