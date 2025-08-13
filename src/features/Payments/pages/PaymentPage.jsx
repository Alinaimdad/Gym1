

import React, { useState } from "react";
import { motion } from "framer-motion";

// Import images
import easypaisaLogo from "../../../assets/easypaisa.png";
import jazzcashLogo from "../../../assets/jazzcash.png";
import bankLogo from "../../../assets/bank.png";
import bgPayment from "../../../assets/bg-payment2.jpg"; // ✅ Background image

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    paymentMethod: "",
    bankName: "",
    accountNumber: "",
    accountHolder: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const paymentOptions = [
    { id: "easypaisa", label: "EasyPaisa", logo: easypaisaLogo },
    { id: "jazzcash", label: "JazzCash", logo: jazzcashLogo },
    { id: "bank", label: "Bank Transfer", logo: bankLogo },
  ];

  const handleOptionClick = (method) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
      bankName: "",
      accountNumber: "",
      accountHolder: "",
    }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.paymentMethod)
      newErrors.paymentMethod = "Please select a payment method";
    if (formData.paymentMethod === "bank") {
      if (!formData.bankName) newErrors.bankName = "Bank name is required";
      if (!formData.accountNumber)
        newErrors.accountNumber = "Account number is required";
      if (!formData.accountHolder)
        newErrors.accountHolder = "Account holder is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccessMsg("Payment submitted successfully!");
    }
  };

  return (
    <div
      className="min-h-screen px-4 pt-28 pb-16 flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${bgPayment})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg max-w-lg w-full border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Choose Payment Method
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent border border-red-600 rounded-md px-3 py-2 text-white mb-2"
          />
          {errors.name && (
            <p className="text-red-400 text-xs mb-2">{errors.name}</p>
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border border-red-600 rounded-md px-3 py-2 text-white mb-2"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mb-2">{errors.email}</p>
          )}

          {/* Payment Options */}
          <div className="grid grid-cols-3 gap-4 mb-2 mt-4">
            {paymentOptions.map((opt) => (
              <div
                key={opt.id}
                className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition ${
                  formData.paymentMethod === opt.id
                    ? "bg-red-600"
                    : "bg-gray-700/70 hover:bg-gray-600/80"
                }`}
                onClick={() => handleOptionClick(opt.id)}
              >
                <img
                  src={opt.logo}
                  alt={opt.label}
                  className="w-10 h-10 mb-2"
                />
                <span className="text-white font-medium text-sm">
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
          {errors.paymentMethod && (
            <p className="text-red-400 text-xs mb-4">{errors.paymentMethod}</p>
          )}

          {/* Conditional Fields */}
          {formData.paymentMethod === "easypaisa" && (
            <div className="mb-4">
              <input
                type="text"
                name="accountNumber"
                placeholder="EasyPaisa Number"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full bg-transparent border border-red-600 rounded-md px-3 py-2 text-white"
              />
            </div>
          )}

          {formData.paymentMethod === "jazzcash" && (
            <div className="mb-4">
              <input
                type="text"
                name="accountNumber"
                placeholder="JazzCash Number"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full bg-transparent border border-red-600 rounded-md px-3 py-2 text-white"
              />
            </div>
          )}

          {formData.paymentMethod === "bank" && (
            <>
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full bg-transparent border border-red-600 rounded-md px-3 py-2 text-white mb-2"
              />
              {errors.bankName && (
                <p className="text-red-400 text-xs mb-2">{errors.bankName}</p>
              )}

              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full bg-transparent border border-red-600 rounded-md px-3 py-2 text-white mb-2"
              />
              {errors.accountNumber && (
                <p className="text-red-400 text-xs mb-2">
                  {errors.accountNumber}
                </p>
              )}

              <input
                type="text"
                name="accountHolder"
                placeholder="Account Holder"
                value={formData.accountHolder}
                onChange={handleChange}
                className="w-full bg-transparent border border-red-600 rounded-md px-3 py-2 text-white"
              />
              {errors.accountHolder && (
                <p className="text-red-400 text-xs mb-2">
                  {errors.accountHolder}
                </p>
              )}
            </>
          )}

          {/* Pay Now Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition"
          >
            Pay Now
          </button>
        </form>

        {/* Receipt */}
        {successMsg && (
          <motion.div
            className="mt-8 p-6 bg-white/10 backdrop-blur-md border border-green-400 rounded-xl shadow-xl text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold text-green-400 mb-4">
              Payment Receipt
            </h3>
            <p className="text-sm mb-2">
              <span className="font-semibold">Status:</span> ✅ Payment
              Successful
            </p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Name:</span>{" "}
              {formData.name || "—"}
            </p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Email:</span>{" "}
              {formData.email || "—"}
            </p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Method:</span>{" "}
              {formData.paymentMethod || "—"}
            </p>
            {formData.bankName && (
              <p className="text-sm mb-2">
                <span className="font-semibold">Bank:</span> {formData.bankName}
              </p>
            )}
            <p className="text-sm mb-2">
              <span className="font-semibold">Account Number:</span>{" "}
              {formData.accountNumber || "—"}
            </p>
            {formData.accountHolder && (
              <p className="text-sm mb-2">
                <span className="font-semibold">Account Holder:</span>{" "}
                {formData.accountHolder}
              </p>
            )}
            <p className="text-xs text-gray-300 mt-4">
              This receipt is generated for your records.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
