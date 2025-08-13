import React from "react";

const Employees = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          + Add Employee
        </button>
      </div>

      <p className="text-gray-600 mb-4">
        Manage gym employees & trainers with roles and permissions.
      </p>

      <div className="bg-white border rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left py-2 px-4">#ID</th>
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Role</th>
              <th className="text-left py-2 px-4">Email</th>
              <th className="text-left py-2 px-4">Phone</th>
              <th className="text-left py-2 px-4">Branch</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3].map(i => (
              <tr key={i} className="border-t">
                <td className="py-2 px-4">{1000 + i}</td>
                <td className="py-2 px-4">John Doe</td>
                <td className="py-2 px-4">Trainer</td>
                <td className="py-2 px-4">john@gym.com</td>
                <td className="py-2 px-4">+92 300 1234567</td>
                <td className="py-2 px-4">Main Branch</td>
                <td className="py-2 px-4">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                    Active
                  </span>
                </td>
                <td className="py-2 px-4 space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Employees;
