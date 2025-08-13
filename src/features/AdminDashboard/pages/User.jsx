
import React, { useState } from "react";

export default function User() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    address: "",
    email: "",
    contact: "",
    status: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, formData]);
    setFormData({
      fullName: "",
      password: "",
      address: "",
      email: "",
      contact: "",
      status: true,
    });
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleView = (user) => {
    alert(
      `Viewing user:\n\nName: ${user.fullName}\nEmail: ${user.email}\nContact: ${user.contact}\nAddress: ${user.address}\nStatus: ${
        user.status ? "Active" : "Inactive"
      }`
    );
  };

  const handleEdit = (user, index) => {
    setFormData(user);
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      {/* User Management Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-red-600 font-bold text-lg mb-4">User Management</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Side */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-semibold text-black">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="Enter full name"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-black">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-black">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="Enter full address"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-semibold text-black">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-black">Contact Number *</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="Enter contact number"
                required
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="h-4 w-4 text-red-600"
              />
              <label className="text-black font-semibold">Active</label>
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4 mt-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              Save User
            </button>
            <button
              type="reset"
              onClick={() =>
                setFormData({
                  fullName: "",
                  password: "",
                  address: "",
                  email: "",
                  contact: "",
                  status: true,
                })
              }
              className="bg-gray-300 text-black px-4 py-2 rounded w-full md:w-auto"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>

      {/* Registered Users Table */}
      <div className="bg-white p-6 rounded shadow mt-6">
        <h2 className="text-red-600 font-bold text-lg mb-4">Registered Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-4 py-2 border">Full Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Contact</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 border">
                    No users registered.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{user.fullName}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.contact}</td>
                    <td className="px-4 py-2 border">{user.address}</td>
                    <td className="px-4 py-2 border">
                      <span className="px-2 py-1 rounded text-green-700 bg-green-100">
                        {user.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleView(user)}
                          className="text-green-700 underline"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(user, index)}
                          className="text-blue-600 underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-600 underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
