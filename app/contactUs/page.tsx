"use client"
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUsPage = () => {
  return (
    <section className="bg-[#17A4A5] text-white py-16 pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 mt-10 pt-20">
        {/* Left Section */}
        <div>
          <h2 className="text-4xl font-bold mb-6 pt-20">Contact Us</h2>
          <p className="text-gray-200 mb-8">
          If you’re interested in learning more about our subject offerings or have any other questions or queries, please don’t hesitate to contact us. We are always delighted to assist and look forward to helping you achieve academic success.
          </p>
          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-center gap-4">
              <span className="bg-white text-[#17A4A5] w-10 h-10 flex items-center justify-center rounded-full">
                <FaPhoneAlt />
              </span>
              <p className="text-gray-200">
                <span className="font-semibold">Phone:</span> (04) 2540 9738
              </p>
            </div>
            {/* Email */}
            <div className="flex items-center gap-4">
              <span className="bg-white text-[#17A4A5] w-10 h-10 flex items-center justify-center rounded-full">
                <FaEnvelope />
              </span>
              <p className="text-gray-200">
                <span className="font-semibold">Email:</span> contact@jdntuition.com.au
              </p>
            </div>
            {/* Address */}
            <div className="flex items-center gap-4">
              <span className="bg-white text-[#17A4A5] w-10 h-10 flex items-center justify-center rounded-full">
                <FaMapMarkerAlt />
              </span>
              <p className="text-gray-200">
                <span className="font-semibold">Address:</span> Sydney, Australia
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white text-black p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h3>
          <form className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
                placeholder="Your Name"
                required
              />
            </div>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
                placeholder="example@gmail.com"
                required
              />
            </div>
            {/* Phone No Field */}
            <div>
  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
    Phone Number
  </label>
  <input
    type="tel"
    id="phone"
    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
    placeholder="+1234567890"
    required
    maxLength={15} // Optional: Adjust max length as needed
    pattern="^\+?[0-9]*$"
    onInput={(e) => {
      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+]/g, "");
    }}
  />
</div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
                placeholder="Your Message"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#17A4A5] text-white py-2 px-6 rounded-md hover:bg-[#138F8F] focus:outline-none focus:ring focus:ring-gray-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
