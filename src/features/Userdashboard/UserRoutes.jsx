// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import UserDashboardLayout from "./components/UserDashboardLayout";

// // User Dashboard pages
// import UserHome from "./pages/UserHome";
// import Usermember from './pages/UserDashboard';

// const UserRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<UserDashboardLayout />}>
//         {/* Index route for /user */}
//         <Route index element={<UserHome />} />
//         <Route path="members" element={<UserMembers />} />
//       </Route>
//     </Routes>
//   );
// };

// export default UserRoutes;
import React from "react";
import { Route } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import UserHome from "./pages/UserHome";
import UserMembers from "./pages/UserMembers";
import UserProducts from  "./pages/UserProducts";
import UserPayments from  "./pages/UserPayments";
import UserReports from  "./pages/UserReports";
import UserSettings from  "./pages/UserSettings";

const UserRoutes = (
  <>
    <Route path="/user" element={<UserDashboard />}>
      <Route index element={<UserHome />} />
      <Route path="members" element={<UserMembers />} />
        <Route path="products" element={<UserProducts />} />
        <Route path="payments" element={<UserPayments />} />
        <Route path="reports" element={<UserReports/>} />
        <Route path="settings" element={<UserSettings />} />
    </Route>
  </>
);

export default UserRoutes;

