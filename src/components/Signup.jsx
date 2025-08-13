
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '', lastName: '', email: '',
//     phone: '', password: '', confirmPassword: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }
//     alert('Account Created Successfully!');
//     navigate('/signin');
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: 0.2 + i * 0.1 }
//     })
//   };

//   // Helper function to render input with icon
//   const renderInput = (field, type, placeholder, Icon, i) => (
//     <motion.div
//       key={field}
//       className="flex items-center bg-white/10 border border-white/20 rounded-md px-3 py-2 gap-3"
//       variants={itemVariants}
//       custom={i}
//       initial="hidden"
//       animate="visible"
//     >
//       <Icon className="text-red-400" />
//       <input
//         type={type}
//         name={field}
//         placeholder={placeholder}
//         value={formData[field]}
//         onChange={handleChange}
//         className="bg-transparent w-full outline-none text-white placeholder-gray-400"
//       />
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 px-4 py-16 font-sans">
//       <motion.div
//         className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-10 text-white transition-all duration-300 hover:shadow-red-500/20 mx-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.h2
//           className="text-3xl font-extrabold text-center text-red-400 mb-8 tracking-wide"
//           variants={itemVariants}
//           custom={0}
//         >
//           Start Your Fitness Journey
//         </motion.h2>

//         <motion.form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             {renderInput('firstName', 'text', 'First Name', FaUser, 1)}
//             {renderInput('lastName', 'text', 'Last Name', FaUser, 2)}
//           </div>

//           {renderInput('email', 'email', 'Email', FaEnvelope, 3)}
//           {renderInput('phone', 'tel', 'Phone', FaPhone, 4)}
//           {renderInput('password', 'password', 'Password', FaLock, 5)}
//           {renderInput('confirmPassword', 'password', 'Confirm Password', FaLock, 6)}

//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.05 }}
//             className="w-full py-3 rounded-md bg-red-600 hover:bg-red-700 transition text-white font-bold tracking-wide shadow-md duration-300"
//             variants={itemVariants}
//             custom={7}
//             initial="hidden"
//             animate="visible"
//           >
//             Create Account
//           </motion.button>
//         </motion.form>

//         <motion.p
//           className="text-center text-sm mt-6 text-gray-400"
//           variants={itemVariants}
//           custom={8}
//           initial="hidden"
//           animate="visible"
//         >
//           Already have an account?{' '}
//           <button
//             onClick={() => navigate('/signin')}
//             className="text-red-400 hover:underline font-medium"
//           >
//             Sign In
//           </button>
//         </motion.p>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import bgSignup from '../assets/bg-signup.jpg'; // ✅ Correct Vite image import

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Account Created Successfully!');
    navigate('/signin');
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.1 }
    })
  };

  // Helper function to render input with icon
  const renderInput = (field, type, placeholder, Icon, i) => (
    <motion.div
      key={field}
      className="flex items-center bg-white/10 border border-white/20 rounded-md px-3 py-2 gap-3"
      variants={itemVariants}
      custom={i}
      initial="hidden"
      animate="visible"
    >
      <Icon className="text-red-400" />
      <input
        type={type}
        name={field}
        placeholder={placeholder}
        value={formData[field]}
        onChange={handleChange}
        className="bg-transparent w-full outline-none text-white placeholder-gray-400"
      />
    </motion.div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-16 font-sans flex items-center justify-center"
      style={{ backgroundImage: `url(${bgSignup})` }} // ✅ Fixed background
    >
      <motion.div
        className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-10 text-white transition-all duration-300 hover:shadow-red-500/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl font-extrabold text-center text-red-400 mb-8 tracking-wide"
          variants={itemVariants}
          custom={0}
        >
          Start Your Fitness Journey
        </motion.h2>

        <motion.form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {renderInput('firstName', 'text', 'First Name', FaUser, 1)}
            {renderInput('lastName', 'text', 'Last Name', FaUser, 2)}
          </div>

          {renderInput('email', 'email', 'Email', FaEnvelope, 3)}
          {renderInput('phone', 'tel', 'Phone', FaPhone, 4)}
          {renderInput('password', 'password', 'Password', FaLock, 5)}
          {renderInput('confirmPassword', 'password', 'Confirm Password', FaLock, 6)}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="w-full py-3 rounded-md bg-red-600 hover:bg-red-700 transition text-white font-bold tracking-wide shadow-md duration-300"
            variants={itemVariants}
            custom={7}
            initial="hidden"
            animate="visible"
          >
            Create Account
          </motion.button>
        </motion.form>

        <motion.p
          className="text-center text-sm mt-6 text-gray-400"
          variants={itemVariants}
          custom={8}
          initial="hidden"
          animate="visible"
        >
          Already have an account?{' '}
          <button
            onClick={() => navigate('/signin')}
            className="text-red-400 hover:underline font-medium"
          >
            Sign In
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signup;
