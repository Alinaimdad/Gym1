// // import React, { useState } from "react";

// // export default function Branches() {
// //   const [branches, setBranches] = useState([]);
// //   const [formData, setFormData] = useState({
// //     branchName: "",
// //     phone: "",
// //     address: "",
// //     manager: "",
// //     status: true,
// //   });

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: type === "checkbox" ? checked : value,
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setBranches([...branches, formData]);
// //     setFormData({
// //       branchName: "",
// //       phone: "",
// //       address: "",
// //       manager: "",
// //       status: true,
// //     });
// //   };

// //   const handleDelete = (index) => {
// //     setBranches(branches.filter((_, i) => i !== index));
// //   };

// //   const handleView = (branch) => {
// //     alert(
// //       `Viewing branch:\n\nName: ${branch.branchName}\nPhone: ${branch.phone}\nAddress: ${branch.address}\nManager: ${branch.manager}\nStatus: ${
// //         branch.status ? "Active" : "Inactive"
// //       }`
// //     );
// //   };

// //   const handleEdit = (branch, index) => {
// //     setFormData(branch);
// //     setBranches(branches.filter((_, i) => i !== index));
// //   };

// //   return (
// //     <div className="p-6">
// //       {/* Branch Management Form */}
// //       <div className="bg-white p-6 rounded shadow">
// //         <h2 className="text-red-600 font-bold text-lg mb-4">Branch Management</h2>
// //         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
// //           {/* Left Column */}
// //           <div className="flex flex-col gap-4">
// //             <div>
// //               <label className="block font-semibold text-black">Branch Name *</label>
// //               <input
// //                 type="text"
// //                 name="branchName"
// //                 value={formData.branchName}
// //                 onChange={handleChange}
// //                 className="border p-2 w-full rounded"
// //                 placeholder="Enter branch name"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-semibold text-black">Address</label>
// //               <textarea
// //                 name="address"
// //                 value={formData.address}
// //                 onChange={handleChange}
// //                 className="border p-2 w-full rounded"
// //                 placeholder="Enter full address"
// //               />
// //             </div>
// //           </div>

// //           {/* Right Column */}
// //           <div className="flex flex-col gap-4">
// //             <div>
// //               <label className="block font-semibold text-black">Phone Number *</label>
// //               <input
// //                 type="text"
// //                 name="phone"
// //                 value={formData.phone}
// //                 onChange={handleChange}
// //                 className="border p-2 w-full rounded"
// //                 placeholder="Enter phone number"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-semibold text-black">Manager</label>
// //               <input
// //                 type="text"
// //                 name="manager"
// //                 value={formData.manager}
// //                 onChange={handleChange}
// //                 className="border p-2 w-full rounded"
// //                 placeholder="Enter manager name"
// //               />
// //             </div>
// //             <div className="flex items-center gap-2 mt-2">
// //               <input
// //                 type="checkbox"
// //                 name="status"
// //                 checked={formData.status}
// //                 onChange={handleChange}
// //                 className="h-4 w-4 text-red-600"
// //               />
// //               <label className="text-black font-semibold">Active</label>
// //             </div>
// //           </div>

// //           {/* Buttons */}
// //           <div className="col-span-2 flex gap-4 mt-4">
// //             <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
// //               Save Branch
// //             </button>
// //             <button
// //               type="reset"
// //               onClick={() =>
// //                 setFormData({
// //                   branchName: "",
// //                   phone: "",
// //                   address: "",
// //                   manager: "",
// //                   status: true,
// //                 })
// //               }
// //               className="bg-gray-300 text-black px-4 py-2 rounded"
// //             >
// //               Clear Form
// //             </button>
// //           </div>
// //         </form>
// //       </div>

// //       {/* Registered Branches Table */}
// //       <div className="bg-white p-6 rounded shadow mt-6">
// //         <h2 className="text-red-600 font-bold text-lg mb-4">Registered Branches</h2>
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full border border-gray-300">
// //             <thead className="bg-red-600 text-white">
// //               <tr>
// //                 <th className="px-4 py-2 border">Branch Name</th>
// //                 <th className="px-4 py-2 border">Phone</th>
// //                 <th className="px-4 py-2 border">Manager</th>
// //                 <th className="px-4 py-2 border">Status</th>
// //                 <th className="px-4 py-2 border">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {branches.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="5" className="text-center py-4 border">
// //                     No branches registered.
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 branches.map((branch, index) => (
// //                   <tr key={index}>
// //                     <td className="px-4 py-2 border">
// //                       <div className="font-bold">{branch.branchName}</div>
// //                       <div className="text-sm text-gray-500">{branch.address}</div>
// //                     </td>
// //                     <td className="px-4 py-2 border">{branch.phone}</td>
// //                     <td className="px-4 py-2 border">{branch.manager}</td>
// //                     <td className="px-4 py-2 border">
// //                       <span className="px-2 py-1 rounded text-green-700 bg-green-100">
// //                         {branch.status ? "Active" : "Inactive"}
// //                       </span>
// //                     </td>
// //                     <td className="px-4 py-2 border flex gap-3">
// //                       <button
// //                         onClick={() => handleView(branch)}
// //                         className="text-green-700 underline"
// //                       >
// //                         View
// //                       </button>
// //                       <button
// //                         onClick={() => handleEdit(branch, index)}
// //                         className="text-blue-600 underline"
// //                       >
// //                         Edit
// //                       </button>
// //                       <button
// //                         onClick={() => handleDelete(index)}
// //                         className="text-red-600 underline"
// //                       >
// //                         Delete
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState } from "react";

// export default function Branches() {
//   const [branches, setBranches] = useState([]);
//   const [formData, setFormData] = useState({
//     branchName: "",
//     phone: "",
//     address: "",
//     manager: "",
//     status: true,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setBranches([...branches, formData]);
//     setFormData({
//       branchName: "",
//       phone: "",
//       address: "",
//       manager: "",
//       status: true,
//     });
//   };

//   const handleDelete = (index) => {
//     setBranches(branches.filter((_, i) => i !== index));
//   };

//   const handleView = (branch) => {
//     alert(
//       `Viewing branch:\n\nName: ${branch.branchName}\nPhone: ${branch.phone}\nAddress: ${branch.address}\nManager: ${branch.manager}\nStatus: ${
//         branch.status ? "Active" : "Inactive"
//       }`
//     );
//   };

//   const handleEdit = (branch, index) => {
//     setFormData(branch);
//     setBranches(branches.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="p-6">
//       {/* Branch Management Form */}
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-red-600 font-bold text-lg mb-4">Branch Management</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
//           {/* Left Column */}
//           <div className="flex flex-col gap-4">
//             <div>
//               <label className="block font-semibold text-black">Branch Name *</label>
//               <input
//                 type="text"
//                 name="branchName"
//                 value={formData.branchName}
//                 onChange={handleChange}
//                 className="border p-2 w-full rounded"
//                 placeholder="Enter branch name"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block font-semibold text-black">Address</label>
//               <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="border p-2 w-full rounded"
//                 placeholder="Enter full address"
//               />
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="flex flex-col gap-4">
//             <div>
//               <label className="block font-semibold text-black">Phone Number *</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="border p-2 w-full rounded"
//                 placeholder="Enter phone number"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block font-semibold text-black">Manager</label>
//               <input
//                 type="text"
//                 name="manager"
//                 value={formData.manager}
//                 onChange={handleChange}
//                 className="border p-2 w-full rounded"
//                 placeholder="Enter manager name"
//               />
//             </div>
//             <div className="flex items-center gap-2 mt-2">
//               <input
//                 type="checkbox"
//                 name="status"
//                 checked={formData.status}
//                 onChange={handleChange}
//                 className="h-4 w-4 text-red-600"
//               />
//               <label className="text-black font-semibold">Active</label>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="col-span-2 flex gap-4 mt-4">
//             <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
//               Save Branch
//             </button>
//             <button
//               type="reset"
//               onClick={() =>
//                 setFormData({
//                   branchName: "",
//                   phone: "",
//                   address: "",
//                   manager: "",
//                   status: true,
//                 })
//               }
//               className="bg-gray-300 text-black px-4 py-2 rounded"
//             >
//               Clear Form
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Registered Branches Table */}
//       <div className="bg-white p-6 rounded shadow mt-6">
//         <h2 className="text-red-600 font-bold text-lg mb-4">Registered Branches</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300">
//             <thead className="bg-red-600 text-white">
//               <tr>
//                 <th className="px-4 py-2 border">Branch Name</th>
//                 <th className="px-4 py-2 border">Phone</th>
//                 <th className="px-4 py-2 border">Manager</th>
//                 <th className="px-4 py-2 border">Status</th>
//                 <th className="px-4 py-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {branches.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4 border">
//                     No branches registered.
//                   </td>
//                 </tr>
//               ) : (
//                 branches.map((branch, index) => (
//                   <tr key={index}>
//                     <td className="px-4 py-2 border">
//                       <div className="font-bold">{branch.branchName}</div>
//                       <div className="text-sm text-gray-500">{branch.address}</div>
//                     </td>
//                     <td className="px-4 py-2 border">{branch.phone}</td>
//                     <td className="px-4 py-2 border">{branch.manager}</td>
//                     <td className="px-4 py-2 border">
//                       <span className="px-2 py-1 rounded text-green-700 bg-green-100">
//                         {branch.status ? "Active" : "Inactive"}
//                       </span>
//                     </td>
//                     <td className="border px-4 py-2">
//                       <div className="flex items-center space-x-3">
//                         <button
//                           onClick={() => handleView(branch)}
//                           className="text-green-700 underline"
//                         >
//                           View
//                         </button>
//                         <button
//                           onClick={() => handleEdit(branch, index)}
//                           className="text-blue-600 underline"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(index)}
//                           className="text-red-600 underline"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    branchName: "",
    phone: "",
    address: "",
    manager: "",
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
    setBranches([...branches, formData]);
    setFormData({
      branchName: "",
      phone: "",
      address: "",
      manager: "",
      status: true,
    });
  };

  const handleDelete = (index) => {
    setBranches(branches.filter((_, i) => i !== index));
  };

  const handleView = (branch) => {
    alert(
      `Viewing branch:\n\nName: ${branch.branchName}\nPhone: ${branch.phone}\nAddress: ${branch.address}\nManager: ${branch.manager}\nStatus: ${
        branch.status ? "Active" : "Inactive"
      }`
    );
  };

  const handleEdit = (branch, index) => {
    setFormData(branch);
    setBranches(branches.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      {/* Branch Management Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-red-600 font-bold text-lg mb-4">Branch Management</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-semibold text-black">Branch Name *</label>
              <input
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="Enter branch name"
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

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-semibold text-black">Phone Number *</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-black">Manager</label>
              <input
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                placeholder="Enter manager name"
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
              Save Branch
            </button>
            <button
              type="reset"
              onClick={() =>
                setFormData({
                  branchName: "",
                  phone: "",
                  address: "",
                  manager: "",
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

      {/* Registered Branches Table */}
      <div className="bg-white p-6 rounded shadow mt-6">
        <h2 className="text-red-600 font-bold text-lg mb-4">Registered Branches</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-4 py-2 border">Branch Name</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Manager</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 border">
                    No branches registered.
                  </td>
                </tr>
              ) : (
                branches.map((branch, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">
                      <div className="font-bold">{branch.branchName}</div>
                      <div className="text-sm text-gray-500">{branch.address}</div>
                    </td>
                    <td className="px-4 py-2 border">{branch.phone}</td>
                    <td className="px-4 py-2 border">{branch.manager}</td>
                    <td className="px-4 py-2 border">
                      <span className="px-2 py-1 rounded text-green-700 bg-green-100">
                        {branch.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleView(branch)}
                          className="text-green-700 underline"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(branch, index)}
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
