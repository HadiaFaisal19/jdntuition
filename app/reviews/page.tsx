"use client"
import React from "react";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const reviewData = [
    {
      name: "Rania el Mohamad",
      date: "5 days ago",
      rating: 5,
      review: "Met my requirements! Sound kind and professional.",
      role: "Primary School Parent",
    },
    {
      name: "Amanda",
      date: "2 weeks ago",
      rating: 5,
      review:
        "I recently had the pleasure of using JDN Tution for my children's educational needs, and I can't recommend them highly enough! The tutor matched us perfectly and exceeded expectations.",
      role: "Primary School Parent",
    },
    {
      name: "Michael",
      date: "3 weeks ago",
      rating: 5,
      review:
        "I can’t thank JDN Tuition enough for their dedicated support. Their tutors go above and beyond to ensure that I understand the material and feel confident in my abilities. Thanks to them, I’ve been able to excel in subjects I once struggled with.",
      role: "University Student",
    },
    {
      name: "Emily",
      date: "1 month ago",
      rating: 5,
      review:
        "JDN Tuition has been a game-changer for me. With their personalized approach and expert tutors, I see a significant improvement in my grades and confidence. I highly recommend them to anyone seeking academic support.",
      role: "High School Student",
    },
    {
      name: "Sarah",
      date: "1 month ago",
      rating: 5,
      review:
        "Honestly the best decision I’ve ever made for my daughter’s education. Their tutors are not only knowledgeable but also incredibly supportive. They’ve helped me overcome my daughter’s fear of exams and achieve results beyond even my expectations.",
      role: "High School Parent",
    },
    {
      name: "Jack",
      date: "1 month ago",
      rating: 5,
      review:
        "I’ve had a fantastic experience with JDN Tuition. Their tutors are passionate, patient, and always willing to go the extra mile to help me succeed. Thanks to their guidance, I’ve not only improved academically but also developed valuable study skills that will benefit me for years to come.",
      role: "High School Student",
    },
  ];

  return (
    <div className="pt-[9rem] py-16 px-4 bg-[#17A4A5]">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Australia’s Highest Rated Tutoring Platform
        </h1>
        <h1 className="text-4xl font-bold text-gray-800">
        Thousands of Hours Tutored, Countless Futures Brightened</h1>
        <h4 className="mt-2 text-lg font-semibold text-gray-600">
        
        </h4>
        <div className="mt-4 text-yellow-500 flex items-center justify-center space-x-2">
          <span className="text-2xl font-semibold">5.0 rated</span>
          <span className="text-lg text-white">Platform</span>
        </div>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviewData.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
          >
            {/* Reviewer Info */}
            <div className="flex items-center space-x-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex items-center mb-4 text-yellow-500">
              {Array.from({ length: review.rating }, (_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-700">{review.review}</p>

            {/* Role */}
            <p className="mt-2 text-sm text-gray-500 italic">~{review.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
