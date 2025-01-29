"use client"


export default function JobApplication() {
  return (
    <div className="min-h-screen flex bg-gray-400 ">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-[#17A4A5] p-12 flex-col items-center justify-center text-white relative">
        <div className="max-w-md">
          <div className="mb-8">
            <img
              src="/images/appform.png"
              alt="Hiring Illustration"
              className="w-92 h-92 mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">We are Hiring At JDN Tuition</h1>
          <p className="text-center mb-8 text-emerald-50">
            ANY text here that should be added.
          </p>
          
        </div>
         </div>

      {/* Right Section */}
      <div className="mt-20 w-full md:w-1/2 bg-gray-400 p-6 md:p-12">
        <div className="max-w-2xl mx-auto bg-gray-200">
          

          {/* Form Container */}
          <div className="relative" style={{ height: "800px", overflow: "hidden" }}>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfItrnKo9FqIrr7f1D3nd6oZcEse0qLcvKn5OAXG8hvHf0dgw/viewform?embedded=true"
            width="100%"
            height="871px"  // Keeping it slightly larger so the bottom can be hidden
            className="border-0 absolute top-0 left-0"
            allowFullScreen
          />
        </div>
        </div>
      </div>
    </div>
  )
}

