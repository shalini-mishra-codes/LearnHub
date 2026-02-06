import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill all fields");
      return;
    }

    // Check minimum message length
    if (formData.message.length < 10) {
      setErrorMessage("Message must be at least 10 characters long");
      return;
    }

    // Check maximum message length
    if (formData.message.length > 1000) {
      setErrorMessage("Message cannot exceed 1000 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4001/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle server errors safely
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Server error");
      }

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(
          "Message sent successfully! We'll get back to you soon.",
        );
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setErrorMessage(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage(error.message || "Server not responding. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-slate-900 dark:to-slate-900 dark:text-white pt-28 px-6 md:px-20">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold">
            Contact <span className="text-pink-500">Us</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Have questions, feedback, or need help? We're here to support you on
            your learning journey.
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: "📧 Email", value: "support@learnhub.com" },
            { title: "📞 Phone", value: "+91 98765 43210" },
            { title: "📍 Location", value: "Lucknow, Uttar Pradesh, India" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Support Hours */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold">🕘 Support Hours</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Monday – Saturday
          </p>
          <p className="text-gray-600 dark:text-gray-300">9:00 AM – 7:00 PM</p>
        </div>

        {/* Google Map - Lucknow, Uttar Pradesh */}
        <div className="mt-24 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Find Us</h2>

          <div className="w-full h-[350px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="map"
              className="w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.99973753574!2d80.77769795!3d26.8467088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-24 max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center">Send Us a Message</h2>

          {/* Success Message */}
          {successMessage && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              ✅ {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              ❌ {errorMessage}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="p-3 rounded-lg border dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
              required
              minLength={2}
              maxLength={100}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="p-3 rounded-lg border dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
              required
            />

            <div className="md:col-span-2">
              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message (minimum 10 characters)"
                className="w-full p-3 rounded-lg border dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
                required
                minLength={10}
                maxLength={1000}
              ></textarea>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {formData.message.length}/1000 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`md:col-span-2 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 space-y-6">
            <div className="p-5 bg-white dark:bg-slate-800 rounded-xl shadow">
              <p className="font-semibold">
                ❓ How long does it take to get a reply?
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                → Within 24 hours.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-800 rounded-xl shadow">
              <p className="font-semibold">❓ Are all courses free?</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                → We provide both free and premium content.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-800 rounded-xl shadow">
              <p className="font-semibold">❓ Can I become a teacher?</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                → Yes! Contact us for collaboration.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-24 text-center pb-16">
          <h2 className="text-3xl font-bold">We'd Love to Hear From You</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Your feedback helps us improve and serve you better.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;