import Link from 'next/link';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const WhyParents = () => {
    return (
        <section className="px-10 py-8 mb-16 mt-5">
            {/* Section Heading */}
            <h2 className="text-3xl font-bold text-center text-[#17A4A5] mb-16">
                Why Parents And Students Love Us?
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
            <div className="pt-3 mt-5 flex flex-col lg:flex-row justify-center items-center gap-8">
                <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
                {/* Card 3 */}
            <div className="w-full lg:w-[45%] border-2 border-[#17A4A5] p-6 rounded-lg shadow-lg bg-white relative">
                    {/* Right Quotation Mark */}
                    <div className="px-5 absolute -top-8 left-[-40px] z-10">
                        <FaQuoteLeft className="w-16 h-16 text-[#17A4A5]" />
                    </div>

                    <p className="text-gray-700 leading-relaxed mt-8 relative z-0">
                    JDN turned my daughter's struggles into strengths. She now approaches schoolwork with a positive attitude." 
                        <span className="font-bold"> – Mark P., Parent</span>
                    </p>
                </div>
                {/* Card 4 */}
                <div className="w-full lg:w-[45%] border-2 border-[#17A4A5] p-6 rounded-lg shadow-lg bg-white relative">
                    {/* Right Quotation Mark */}
                    <div className="px-5 absolute -top-8 left-[-40px] z-10">
                        <FaQuoteLeft className="w-16 h-16 text-[#17A4A5]" />
                    </div>

                    <p className="text-gray-700 leading-relaxed mt-8 relative z-0">
                    My son’s tutor not only helped him improve in maths but also showed him how to approach problems with confidence. The change has been incredible.
                        <span className="font-bold">  – Lisa K., Parent</span>
                    </p>
                </div>
                
                
            </div>
                
                
            </div>
            <div className="pt-3 mt-5 flex flex-col lg:flex-row justify-center items-center gap-8">
                <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
                {/* Card 3 */}
            <div className="w-full lg:w-[45%] border-2 border-[#17A4A5] p-6 rounded-lg shadow-lg bg-white relative">
                    {/* Right Quotation Mark */}
                    <div className="px-5 absolute -top-8 left-[-40px] z-10">
                        <FaQuoteLeft className="w-16 h-16 text-[#17A4A5]" />
                    </div>

                    <p className="text-gray-700 leading-relaxed mt-8 relative z-0">
                    JDN Tuition helped me transform my HSC marks. My tutor made complex topics easy to understand and gave me the confidence I needed to excel.
                        <span className="font-bold">  – Liam P., Year 12 Student </span>
                    </p>
                </div>
                {/* Card 4 */}
                <div className="w-full lg:w-[45%] border-2 border-[#17A4A5] p-6 rounded-lg shadow-lg bg-white relative">
                    {/* Right Quotation Mark */}
                    <div className="px-5 absolute -top-8 left-[-40px] z-10">
                        <FaQuoteLeft className="w-16 h-16 text-[#17A4A5]" />
                    </div>

                    <p className="text-gray-700 leading-relaxed mt-8 relative z-0">
                    The structure and support JDN provided were invaluable. My daughter achieved results far beyond our expectations!
                        <span className="font-bold">  – Grace M., Parent</span>
                    </p>
                   
                </div>
                
                
            </div>
                
                
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-[#17A4A5] text-white font-semibold rounded-md transform transition-transform duration-300 hover:scale-105 hover:bg-[#138F8F]">
              <Link href="/book-now">Book your first lesson</Link>
            </button>
            <button className="px-4 py-2 sm:px-6 sm:py-3 sm:w-auto border border-[#17A4A5] text-[#17A4A5] font-semibold rounded-md transition hover:bg-gray-100 transform transition-transform duration-300 hover:scale-105">
            <Link href="/reviews">See More Reviews</Link>
            </button>
          </div>
        </section>
    );
};

export default WhyParents;
