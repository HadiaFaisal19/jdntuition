"use client";

import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "emailjs-com"; // Import EmailJS

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch('/api/sendContactEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
  
      setShowSuccessPopup(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
  
    } catch (error) {
      console.error("Submission error:", error);
      // Add error state handling here if needed
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <section className="bg-[#17A4A5] text-white py-16 pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 mt-10 pt-20">
        {/* Left Section */}
        <div>
          <h2 className="text-4xl font-bold mb-6 pt-20">Contact Us</h2>
          <p className="text-gray-200 mb-8">
            If you’re interested in learning more about our subject offerings or have any other
            questions, please don’t hesitate to contact us.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="bg-white text-[#17A4A5] w-10 h-10 flex items-center justify-center rounded-full">
                <FaPhoneAlt />
              </span>
              <p className="text-gray-200">
                <span className="font-semibold">Phone:</span> (04) 2540 9738
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-white text-[#17A4A5] w-10 h-10 flex items-center justify-center rounded-full">
                <FaEnvelope />
              </span>
              <p className="text-gray-200">
                <span className="font-semibold">Email:</span> contact@jdntuition.com.au
              </p>
            </div>
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

        {/* Right Section - Form */}
        <div className="bg-white text-black p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#17A4A5] text-white py-2 px-6 rounded-md hover:bg-[#138F8F]"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl sm:w-[700px] md:w-[800px] lg:w-[900px] overflow-auto max-h-[90vh]">
              <h2 className="text-2xl font-semibold text-center mb-6">Thank You!</h2>
              <p className="text-lg text-black text-center mb-6">
                Thank you for choosing <span className="font-semibold text-[#17A4A5]">JDN Tuition.</span> We received your message and are 
                excited to support you every step of the way!{" "}
                <b>We will contact you shortly.</b>
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleClosePopup}
                  className="bg-[#17A4A5] hover:bg-[#139093] text-black font-bold py-2 px-6 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactUsPage;
