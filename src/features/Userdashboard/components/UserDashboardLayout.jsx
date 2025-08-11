import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import UserTopNavbar from "./UserTopNavbar";

const UserDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Right Side */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* Top Navbar */}
        <UserTopNavbar />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
