import { FaBook, FaChalkboardTeacher, FaChild, FaGraduationCap } from "react-icons/fa";

const SubjectsOffered = () => {
  const sections = [
    {
      id: 1,
      title: "High School (7-12)",
      icon: <FaGraduationCap size={30} />,
      color: "bg-[#17A4A5] text-white",
      border: "",
      textColor: "text-white",
      subjects: [
        { name: "English", details: ["Years 7-10", "HSC English Standard, Advanced, Extension 1 & 2"] },
        { name: "Maths", details: ["Years 7-10", "HSC Math Standard, Advanced, Extension 1 & 2"] },
        { name: "Science", details: ["Years 7-10", "HSC Physics, Chemistry, Biology"] },
        { name: "Commerce", details: ["Years 9-10", "HSC Economics, Business Studies, Legal Studies"] },
        { name: "History", details: ["Years 7-10", "HSC Ancient, Modern, Extension"] },
        { name: "Geography", details: ["Years 7-10", "HSC Geography"] },
      ],
    },
    {
      id: 2,
      title: "Primary School (K-6)",
      icon: <FaChild size={30} />,
      color: "bg-white",
      border: "border border-[#17A4A5]",
      textColor: "text-[#17A4A5]",
      subjects: [
        "English",
        "Maths",
        "Thinking Skills",
        "Writing",
        "Selective School Preparation",
        "Opportunity Class (OC) Preparation",
        "NAPLAN Preparation",
      ],
    },
    {
      id: 3,
      title: "Other",
      icon: <FaBook size={30} />,
      color: "bg-white",
      border: "border border-[#17A4A5]",
      textColor: "text-[#17A4A5]",
      subjects: [
        "Pre-K Tutoring",
        "University and TAFE (1st-year courses in HSC-taught subjects)",
        "Specific Exam Preparation",
        "Assignment Assistance",
      ],
    },
  ];

  return (
    <section className="pt-[10rem] bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">Subjects Offered</h2>
          <p className="text-gray-600 mt-2">Explore the wide range of subjects we provide for every academic level.</p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* High School Column */}
          <div
            className={`${sections[0].color} ${sections[0].border} p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform`}
          >
            <div className="flex items-center justify-center mb-4">
              {sections[0].icon}
            </div>
            <h3 className={`text-2xl font-semibold ${sections[0].textColor} text-center`}>
              {sections[0].title}
            </h3>
            <ul className={`mt-4 ${sections[0].textColor} text-sm`}>
              {sections[0].subjects.map((subject, index) => (
                <li key={index} className="mt-2">
                  <strong>{subject.name}:</strong>
                  <ul className="ml-4">
                    {subject.details.map((detail, i) => (
                      <li key={i}>- {detail}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-white text-[#17A4A5] px-4 py-2 rounded-md hover:bg-gray-200 transition">
              Learn More
            </button>
          </div>

          {/* Primary + Other Column */}
          <div className="flex flex-col gap-6">
            {/* Primary Card */}
            <div
              className={`${sections[1].color} ${sections[1].border} p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform`}
            >
              <div className={`flex items-center justify-center mb-4 ${sections[1].textColor}`}>
                {sections[1].icon}
              </div>
              <h3 className={`text-2xl font-semibold ${sections[1].textColor} text-center`}>
                {sections[1].title}
              </h3>
              <ul className={`mt-4 ${sections[1].textColor} text-sm`}>
                {sections[1].subjects.map((subject, index) => (
                  <li key={index} className="mt-2">
                    • {subject}
                  </li>
                ))}
              </ul>
              <button className="mt-6 bg-[#17A4A5] text-white px-4 py-2 rounded-md hover:bg-[#159c9d] transition">
                Learn More
              </button>
            </div>

            {/* Other Card */}
            <div
              className={`${sections[2].color} ${sections[2].border} p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform`}
            >
              <div className={`flex items-center justify-center mb-4 ${sections[2].textColor}`}>
                {sections[2].icon}
              </div>
              <h3 className={`text-2xl font-semibold ${sections[2].textColor} text-center`}>
                {sections[2].title}
              </h3>
              <ul className={`mt-4 ${sections[2].textColor} text-sm`}>
                {sections[2].subjects.map((subject, index) => (
                  <li key={index} className="mt-2">
                    • {subject}
                  </li>
                ))}
              </ul>
              <button className="mt-6 bg-[#17A4A5] text-white px-4 py-2 rounded-md hover:bg-[#159c9d] transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectsOffered;
