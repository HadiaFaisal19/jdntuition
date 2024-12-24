import React from "react";

const Categories = () => {
  const categories = [
    { id: 1, imageUrl: "/images/academics.jpeg", name: "Academics", link: "/category1" },
    { id: 2, imageUrl: "/images/examPrep.jpg", name: "Exam Preparation", link: "/category2" },
    { id: 3, imageUrl: "/images/online.jpg", name: "Online Learning", link: "/category3" },
    { id: 4, imageUrl: "/images/2.png", name: "Student Wellbeing", link: "/category4" },
    { id: 5, imageUrl: "/images/english.jpg", name: "Tutors", link: "/category5" },
    { id: 6, imageUrl: "/images/career.png", name: "Career Guidance", link: "/category6" },
    { id: 7, imageUrl: "/images/homework.png", name: "HomeWork", link: "/category7" },
  ];

  return (
    <div className="bg-gray-100 overflow-hidden py-10">
      <h2 className="text-center text-4xl font-bold text-teal-600 mb-8">
        Categories
      </h2>

      <div className="relative w-full">
        {/* Animation Wrapper */}
        <div className="flex w-[200%] animate-scroll items-center space-x-8">
          {/* Circles */}
          {categories.concat(categories).map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center shrink-0 space-y-4"
            >
              {/* Circle with Image */}
              <div className="w-72 h-72 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden">
                <img
                  src={category.imageUrl}
                  alt={`Category ${category.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Button */}
              <a
                href={category.link}
                className="px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700"
              >
                {category.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
