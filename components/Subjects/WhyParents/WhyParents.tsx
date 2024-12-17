import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const WhyParents = () => {
    return (
        <section className="py-8">
            {/* Section Heading */}
            <h2 className="text-3xl font-bold text-center text-[#17A4A5] mb-8">
                WHY Parents Love Us?
            </h2>

            {/* Cards Container */}
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
                {/* Card 1 */}
                <div className="w-full lg:w-[45%] border-2 border-[#17A4A5] p-6 rounded-lg shadow-lg bg-white relative">
                    {/* Left Quotation Mark */}
                    <div className="px-5 absolute -top-8 left-[-40px] z-10">
                        <FaQuoteLeft className="w-16 h-16 text-[#17A4A5]" />
                    </div>

                    <p className="text-gray-700 leading-relaxed mt-8 relative z-0">
                        JDN Tuition has been a wonderful support for my son. His confidence
                        has grown, and he's even started to enjoy maths for the first time!
                        <span className="font-bold"> – Claire T., Parent</span>
                    </p>
                </div>

                {/* Card 2 */}
                <div className="w-full lg:w-[45%] border-2 border-[#17A4A5] p-6 rounded-lg shadow-lg bg-white relative">
                    {/* Right Quotation Mark */}
                    <div className="px-5 absolute -top-8 left-[-40px] z-10">
                        <FaQuoteLeft className="w-16 h-16 text-[#17A4A5]" />
                    </div>

                    <p className="text-gray-700 leading-relaxed mt-8 relative z-0">
                        The personalised attention my daughter receives during her lessons is
                        unmatched. She's improving faster than I imagined!
                        <span className="font-bold"> – Jack W., Parent</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyParents;
