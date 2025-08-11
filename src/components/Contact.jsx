
import React, { useState } from 'react';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const data = new FormData(form);
    const response = await fetch("https://formspree.io/f/mgvzverv", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setSuccess(true);
      form.reset();
    }
    setLoading(false);
  };

  return (
    <div className="w-full py-20 p-6 md:px-20 lg:px-32 bg-white overflow-hidden" id="Contact">
      <h1 className="text-3xl font-bold text-center mb-2">
        Contacts <span className="underline font-light">with us</span>
      </h1>
      <p className="text-center text-gray-500 mb-6">
        Ready to move? Let’s Build Your Future Together
      </p>

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 max-w-2xl mx-auto text-center">
          ✅ Message sent successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto text-gray-600 pt-8"
      >
        <div className="flex flex-col md:flex-row gap-6">
  <div className="w-full md:w-1/2">
    <label className="block text-sm text-gray-700 font-semibold mb-2">Your Name</label>
    <input
      name="name"
      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
      type="text"
      placeholder="John Doe"
      required
    />
  </div>

  <div className="w-full md:w-1/2">
    <label className="block text-sm text-gray-700 font-semibold mb-2">Your Email</label>
    <input
      name="email"
      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
      type="email"
      placeholder="john@example.com"
      required
    />
  </div>
</div>

<div className="flex flex-col md:flex-row gap-6 mt-4">
  <div className="w-full md:w-1/2">
    <label className="block text-sm text-gray-700 font-semibold mb-2">Phone Number</label>
    <input
      name="phone"
      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
      type="tel"
      placeholder="+92 300 1234567"
    />
  </div>

  <div className="w-full md:w-1/2">
    <label className="block text-sm text-gray-700 font-semibold mb-2">Subject</label>
    <input
      name="subject"
      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
      type="text"
      placeholder="Fitness Goals"
    />
  </div>
</div>

<div className="mt-6">
  <label className="block text-sm text-gray-700 font-semibold mb-2">Message</label>
  <textarea
    name="message"
    className="w-full bg-gray-100 border border-gray-300 rounded-lg py-5 px-4 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
    placeholder="Tell us how we can help you reach your goals..."
    required
  ></textarea>
</div>


        <div className="flex justify-center mt-8">
  <button
    type="submit"
    disabled={loading}
    className={`${
      loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
    } text-white font-semibold text-lg py-3 px-10 rounded-full shadow-lg transition-all duration-300`}
  >
    {loading ? 'Sending...' : 'Send Message'}
  </button>
</div>
      </form>
    </div>
  );
};

export default Contact;

