
// import React from "react";
// import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

// const Signup = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900 px-4 py-12">
//       <div className="animate-fade-in-down bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-gray-200 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-red-400/40">
//         <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-wide font-sans animate-pulse">
//           Join <span className="text-red-600">GYM ZONE</span>
//         </h2>

//         <form className="space-y-6">
//           {/* Full Name */}
//           <div className="relative group">
//             <FaUser className="absolute left-3 top-3 text-gray-400 group-hover:text-red-400 transition duration-300" />
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white/80 backdrop-blur-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:shadow-md hover:shadow-md transition-all duration-300"
//             />
//           </div>

//           {/* Email */}
//           <div className="relative group">
//             <FaEnvelope className="absolute left-3 top-3 text-gray-400 group-hover:text-red-400 transition duration-300" />
//             <input
//               type="email"
//               placeholder="Email Address"
//               className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white/80 backdrop-blur-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:shadow-md hover:shadow-md transition-all duration-300"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative group">
//             <FaLock className="absolute left-3 top-3 text-gray-400 group-hover:text-red-400 transition duration-300" />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white/80 backdrop-blur-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:shadow-md hover:shadow-md transition-all duration-300"
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-red-600 to-red-400 text-white font-semibold py-2 rounded-xl hover:from-red-500 hover:to-red-300 transition-all duration-300 shadow-lg hover:shadow-red-400 transform hover:scale-105"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="text-center text-sm mt-6 text-gray-600 animate-fade-in-up">
//           Already have an account?
//           <a href="#" className="text-red-500 hover:underline ml-1">
//             Log In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900 px-4 py-12">
      <div className="animate-fade-in-down bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-gray-200 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-red-400/40">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-wide font-sans animate-pulse">
          Join <span className="text-red-600">GYM ZONE</span>
        </h2>

        <form className="space-y-6">
          <div className="relative group">
            <FaUser className="absolute left-3 top-3 text-gray-400 group-hover:text-red-400 transition duration-300" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white/80 backdrop-blur-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:shadow-md hover:shadow-md transition-all duration-300"
            />
          </div>

          <div className="relative group">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400 group-hover:text-red-400 transition duration-300" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white/80 backdrop-blur-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:shadow-md hover:shadow-md transition-all duration-300"
            />
          </div>

          <div className="relative group">
            <FaLock className="absolute left-3 top-3 text-gray-400 group-hover:text-red-400 transition duration-300" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white/80 backdrop-blur-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:shadow-md hover:shadow-md transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-400 text-white font-semibold py-2 rounded-xl hover:from-red-500 hover:to-red-300 transition-all duration-300 shadow-lg hover:shadow-red-400 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600 animate-fade-in-up">
          Already have an account?
          <Link to="/" className="text-red-500 hover:underline ml-1">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;


