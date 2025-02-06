"use client";

import Image from "next/image";

export default function JobApplication() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-400">
      {/* Left Section (Appears on Top in Mobile) */}
      <div className="w-full md:w-1/3 bg-[#17A4A5] p-6 md:p-12 flex flex-col items-center justify-center text-white ">
        <div className="max-w-md">
          <Image
            src="/images/appform.png"
            alt="Hiring Illustration"
            width={368}
            height={368}
            className="mx-auto"
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            We are Hiring At JDN Tuition
          </h1>

          {/* Responsibilities */}
          <h2 className="text-xl md:text-2xl font-semibold mt-4">Responsibilities:</h2>
          <ul className="text-sm md:text-base text-white list-disc list-inside">
            <li>Provide engaging, one-on-one tutoring tailored to each student&apos;s needs.</li>
            <li>Support students with assignments, exams, and key concepts.</li>
            <li>Foster a positive learning environment and track student progress.</li>
          </ul>

          {/* Qualifications */}
          <h2 className="text-xl md:text-2xl font-semibold mt-4">Qualifications:</h2>
          <ul className="text-sm md:text-base text-white list-disc list-inside">
            <li>Strong subject knowledge and passion for teaching.</li>
            <li>Prior tutoring/teaching experience.</li>
            <li>Clear communication, adaptability, and professionalism.</li>
            <li>High ATAR or relevant degree.</li>
          </ul>

          <h5 className="mt-4 text-lg">If you&apos;re passionate about education and eager to make an impact, apply now!</h5>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full md:w-2/3 flex justify-center items-center p-6 md:p-12 mt-12 bg-gray-400">
        <div className="w-full max-w-3xl bg-gray-200 p-6 md:p-12 rounded-lg shadow-lg">
          {/* Form Container */}
          <div className="relative" style={{ height: "800px", overflow: "hidden" }}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfItrnKo9FqIrr7f1D3nd6oZcEse0qLcvKn5OAXG8hvHf0dgw/viewform?embedded=true"
              width="100%"
              height="871px"
              className="border-0 absolute top-0 left-0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
