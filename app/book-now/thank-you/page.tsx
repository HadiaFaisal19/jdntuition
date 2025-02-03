"use client"
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen bg-[#17A4A5]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl sm:w-[700px] md:w-[800px] lg:w-[900px] text-center">
        <h2 className="text-2xl font-semibold mb-6">Thank You!</h2>
        <p className="text-lg mb-6">
          Thank you for choosing <span className="font-semibold text-[#17A4A5]">JDN Tuition</span>; we&apos;re
          excited to help you achieve your goals and support you every step of the way!{" "}
          <b>We will contact you shortly.</b>
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-[#17A4A5] hover:bg-[#139093] text-white font-bold py-2 px-6 rounded"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
