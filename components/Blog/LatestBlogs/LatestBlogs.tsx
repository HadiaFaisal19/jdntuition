import Image from "next/image";

export default function TopPostsSection() {
  const posts = [
    {
      title: "How Much Online Learning is Effective than Physical learning",
      category: "Online Learning",
      date: "25th December 2024",
      imageUrl: "/images/online.jpg",
    },
    {
      title: "Importance of Classroom engagement while teaching",
      category: "Tutors",
      date: "25th December 2024",
      imageUrl: "/images/kg.jpg",
    },
    {
      title: "Benefits Of Creative and Fun Activities For A Student",
      category: "Student Wellbeing",
      date: "25th December 2024",
      imageUrl: "/images/whyk-6.jpg",
    },
    {
      title: "Benefits Of Creative and Fun Activities For A Student",
      category: "Student Wellbeing",
      date: "25th December 2024",
      imageUrl: "/images/whyk-6.jpg",
    },
    {
      title: "How Much Online Learning is Effective than Physical learning",
      category: "Online Learning",
      date: "25th December 2024",
      imageUrl: "/images/online.jpg",
    },
    {
      title: "Importance of Classroom engagement while teaching",
      category: "Tutors",
      date: "25th December 2024",
      imageUrl: "/images/kg.jpg",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Centered Heading */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="text-[#17A4A5]">Latest</span> Blogs
          </h2>
          <div className="mx-auto border-b-4 border-[#17A4A5] w-20"></div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="relative w-full h-72 md:h-96 overflow-hidden shadow-lg group"
            >
              {/* Background Image with Hover Effect */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>

              {/* Content Card */}
              <div className="absolute bottom-4 left-0 w-[95%] bg-white px-4 py-2 shadow-md">
                <span className="text-[#17A4A5] text-sm font-semibold">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-2 mb-4">
                  {post.title}
                </h3>
                <div className="flex items-center text-sm">
                  {/* Date */}
                  <div className="flex items-center text-[#17A4A5]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-500">{post.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}