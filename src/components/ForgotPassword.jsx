import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, sending, sent

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate sending link (like API call)
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000); // reset after 3s
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-32 px-4 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900">
      <div className="bg-black/40 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-red-500/40 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-red-400/40">
        <h2 className="text-4xl font-extrabold text-center text-white mb-6 tracking-wide font-sans">
          Reset <span className="text-red-400">Password</span>
        </h2>
        <p className="text-center text-gray-300 text-sm mb-8">
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative group">
            <FaEnvelope className="absolute left-3 top-3 text-gray-300 group-hover:text-red-400 transition duration-300" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-red-400/30 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 hover:shadow-md transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className={`w-full text-white font-bold py-2 rounded-xl transition-all duration-300 shadow-lg transform
              ${status === "sent" ? "bg-green-600 hover:bg-green-500" : "bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 hover:shadow-red-400 hover:scale-105"}
              ${status === "sending" ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
              ? "Link Sent ✅"
              : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
