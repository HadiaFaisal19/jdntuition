import Image from "next/image";
import {
  FaChalkboardTeacher,
  FaDollarSign,
  FaHandshake,
  FaChartLine,
  FaUserGraduate,
  FaClipboardList,
  FaCalendarCheck,
  FaRegClock,
} from "react-icons/fa";

const ReasonsToChooseUs = () => {
  const reasons = [
    {
      id: 1,
      icon: <FaChalkboardTeacher size={30} />,
      title: "Complimentary Consultation",
      description:
        "15-minute consultation to ensure each tutor is an ideal match.",
    },
    {
      id: 2,
      icon: <FaDollarSign size={30} />,
      title: "Transparent Pricing",
      description: "All prices are inclusive of GST, so no extra or hidden costs.",
    },
    {
      id: 3,
      icon: <FaHandshake size={30} />,
      title: "No Lock-In Contracts",
      description: "Enjoy freedom with no long-term commitments.",
    },
    {
      id: 4,
      icon: <FaRegClock size={30} />,
      title: "Free Lesson Cancellations",
      description:
        "Lesson cancellations are completely free as long as you let us know at least 8 hours prior.",
    },
    {
      id: 5,
      icon: <FaUserGraduate size={30} />,
      title: "Personalised Learning",
      description: "Pathways tailored to individual learning styles.",
    },
    {
      id: 6,
      icon: <FaCalendarCheck size={30} />,
      title: "Highly Qualified Tutors",
      description: "Experienced professionals who ensure quality learning.",
    },
    {
      id: 7,
      icon: <FaChartLine size={30} />,
      title: "Regular Progress Updates",
      description: "Stay informed with regular feedback and assessments.",
    },
    {
      id: 9,
      icon: <FaClipboardList size={30} />,
      title: "Comprehensive Support",
      description: "Receive mentorship and personalised guidance.",
    },
  ];

  return (
    <section className="relative py-16" style={{ backgroundImage: "url('/images/beyond11-12.png')", backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white">Why Choose Us</h2>
          <p className="text-gray-200 mt-2">
            Discover The Benefits Of Choosing Us For Your Tutoring Needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:animate-shake"
            >
              <div className="text-[#17A4A5] mb-4 flex items-center justify-center">
                {reason.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {reason.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsToChooseUs;
