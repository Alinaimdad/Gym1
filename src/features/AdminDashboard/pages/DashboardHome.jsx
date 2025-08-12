import React from "react";

const DashboardHome = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Welcome Admin 👋</h1>

      {/* Example cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Members", value: 1280 },
          { title: "Active Trainers", value: 14 },
          { title: "Products", value: 52 },
          { title: "Branches", value: 3 },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-lg bg-gray-50 border border-gray-200 p-4"
          >
            <p className="text-sm text-gray-500">{c.title}</p>
            <p className="text-2xl font-semibold">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Dummy table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold">Recent Activities</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left py-2 px-4">#</th>
              <th className="text-left py-2 px-4">Action</th>
              <th className="text-left py-2 px-4">By</th>
              <th className="text-left py-2 px-4">Time</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3].map(i=>(
              <tr key={i} className="border-t">
                <td className="py-2 px-4">{i}</td>
                <td className="py-2 px-4">Added new product</td>
                <td className="py-2 px-4">Admin</td>
                <td className="py-2 px-4">2 mins ago</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
