// import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <TopNavbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <main className="pt-16 pl-20 md:pl-64 p-4 md:p-6 transition-all">
        <div className="min-h-[calc(100vh-6rem)] bg-white rounded-lg shadow p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

