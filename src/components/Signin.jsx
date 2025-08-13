

import React from "react";
import { FaEnvelope, FaLock, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import bgSignin from "../assets/bg-signin.jpg";
import googleLogo from "../assets/google-logo.png"; // Add Google icon PNG here

const Signin = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Signed in");
  };

  const handleUserClick = () => {
    navigate("/user");
  };

  const handleAdminClick = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-16"
      style={{ backgroundImage: `url(${bgSignin})` }}
    >
      {/* Navigation Bar */}
      <nav className="flex justify-center space-x-6 py-4 text-gray-300 bg-black/40 backdrop-blur-sm rounded-full px-6">
        <a href="/" className="hover:text-red-400">
          Home
        </a>
        <a href="/about" className="hover:text-red-400">
          About
        </a>
        <a href="/projects" className="hover:text-red-400">
          Projects
        </a>
        <a href="/testimonials" className="hover:text-red-400">
          Testimonials
        </a>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="bg-black/40 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-red-500/40 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-red-400/40">
          {/* Heading */}
          <h2 className="text-4xl font-extrabold text-center text-red-400 mb-4 tracking-wide font-sans">
            Welcome to GYM ZONE
          </h2>

          {/* Role Selection Heading */}
          <p className="text-center text-gray-300 font-semibold text-lg mt-4 mb-4 animate-pulse">
            Select your role to continue
          </p>

          {/* Role Buttons */}
          <div className="flex justify-center gap-8 mb-8">
            <button
              onClick={handleUserClick}
              className="bg-gradient-to-br from-gray-700 to-gray-900 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:from-gray-600 hover:to-gray-800 hover:shadow-gray-400 transform transition-all duration-300 hover:scale-110 active:scale-95"
            >
              👤 User
            </button>
            <button
              onClick={handleAdminClick}
              className="bg-gradient-to-br from-red-600 to-red-800 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:from-red-500 hover:to-red-700 hover:shadow-red-500 transform transition-all duration-300 hover:scale-110 active:scale-95"
            >
              🛡️ Admin
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="relative group">
              <FaEnvelope className="absolute left-3 top-3 text-gray-300 group-hover:text-red-400 transition duration-300" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2 border border-red-400/30 rounded-lg bg-black/30 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 hover:shadow-md transition-all duration-300"
                required
              />
            </div>

            <div className="relative group">
              <FaLock className="absolute left-3 top-3 text-gray-300 group-hover:text-red-400 transition duration-300" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border border-red-400/30 rounded-lg bg-black/30 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 hover:shadow-md transition-all duration-300"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right -mt-4 mb-4">
              <Link
                to="/forgot-password"
                className="text-sm text-red-400 hover:underline transition duration-300"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white font-bold py-2 rounded-xl hover:from-red-600 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-red-400 transform hover:scale-105"
            >
              Sign In
            </button>
          </form>

          {/* Continue With */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-500"></div>
            <span className="px-4 text-gray-300 text-sm">Or continue with</span>
            <div className="flex-grow border-t border-gray-500"></div>
          </div>

          {/* Official Google Button */}
          <button className="w-full flex items-center justify-center border border-gray-300 bg-white rounded-lg py-2 shadow hover:bg-gray-100 transition mb-3">
            <img src={googleLogo} alt="Google" className="w-5 h-5 mr-3" />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>

          {/* Facebook Button */}
          <button className="w-full flex items-center justify-center bg-blue-600 text-white rounded-lg py-2 shadow hover:bg-blue-700 transition">
            <FaFacebookF className="mr-3" />
            <span className="font-medium">Continue with Facebook</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm mt-6 text-gray-300">
            Don’t have an account?
            <Link to="/signup" className="text-red-400 hover:underline ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
