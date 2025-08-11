// import { Outlet } from "react-router-dom";
// import UserTopNavbar from "../components/UserTopNavbar"; 
// import UserSidebar from "../components/UserSidebar";      

// const UserDashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Top bar */}
//       <UserTopNavbar />

//       {/* Sidebar */}
//       <UserSidebar />

//       {/* Content */}
//       <main className="pt-16 pl-20 md:pl-64 p-4 md:p-6 transition-all">
//         <div className="min-h-[calc(100vh-6rem)] bg-white rounded-lg shadow p-4 md:p-6">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;
// src/features/Userdashboard/pages/UserDashboard.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import UserTopNavbar from "../components/UserTopNavbar";

const UserDashboardlayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <UserTopNavbar />
      <div className="flex">
        <UserSidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboardlayout;
