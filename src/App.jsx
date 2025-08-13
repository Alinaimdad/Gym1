






// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";

// // Public layout parts
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// // Public pages
// import Home from "./components/Home";
// import Signin from "./components/Signin";
// import Signup from "./components/Signup";
// import Journey from "./components/Journey";
// import ForgotPassword from "./components/ForgotPassword";

// // Admin Dashboard layout and pages
// import Dashboard from "./pages/Dashboard";
// import DashboardHome from "./pages/DashboardHome";
// import Products from "./pages/Products";
// import Employees from "./pages/Employees";
// import Branches from "./pages/Branches";
// import Members from "./pages/Members";
// import Trainers from "./pages/Trainers";
// import Plans from "./pages/Plans";
// import Classes from "./pages/Classes";
// import Payments from "./pages/Payments";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";
// import User from "./pages/User"; // ✅ Import your new User.jsx

// // User Dashboard layout and pages
// import UserDashboardlayout from "./features/Userdashboard/components/UserDashboardLayout";
// import UserHome from "./features/Userdashboard/pages/UserHome";
// import UserMembers from "./features/Userdashboard/pages/UserMembers";
// import UserTrainer from "./features/Userdashboard/pages/UserTrainer";
// import UserProducts from "./features/Userdashboard/pages/UserProducts";
// import UserPayments from "./features/Userdashboard/pages/UserPayments";
// import UserReports from "./features/Userdashboard/pages/UserReports";
// import UserSettings from "./features/Userdashboard/pages/UserSettings";

// const App = () => {
//   const { pathname } = useLocation();

//   const isAdminDashboardRoute = /^\/dashboard(\/|$)/i.test(pathname);
//   const isUserDashboardRoute = /^\/user(\/|$)/i.test(pathname);

//   return (
//     <>
//       {/* Hide Navbar inside dashboard */}
//       {!isAdminDashboardRoute && !isUserDashboardRoute && <Navbar />}

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/signin" element={<Signin />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/journey" element={<Journey />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* Admin Dashboard Routes */}
//         <Route path="/dashboard" element={<Dashboard />}>
//           <Route index element={<DashboardHome />} />
//           <Route path="products" element={<Products />} />
//           <Route path="employees" element={<Employees />} />
//           <Route path="branches" element={<Branches />} /> {/* ✅ Keep Branches */}
//           <Route path="users" element={<User />} /> {/* ✅ New User route */}
//           <Route path="members" element={<Members />} />
//           <Route path="trainers" element={<Trainers />} />
//           <Route path="plans" element={<Plans />} />
//           <Route path="classes" element={<Classes />} />
//           <Route path="payments" element={<Payments />} />
//           <Route path="reports" element={<Reports />} />
//           <Route path="settings" element={<Settings />} />
//         </Route>

//         {/* User Dashboard Routes */}
//         <Route path="/user" element={<UserDashboardlayout />}>
//           <Route index element={<UserHome />} />
//           <Route path="members" element={<UserMembers />} />
//           <Route path="trainers" element={<UserTrainer />} />
//           <Route path="products" element={<UserProducts />} />
//           <Route path="payments" element={<UserPayments />} />
//           <Route path="reports" element={<UserReports />} />
//           <Route path="settings" element={<UserSettings />} />
//         </Route>
//       </Routes>

//       {/* Hide Footer inside dashboard */}
//       {!isAdminDashboardRoute && !isUserDashboardRoute && <Footer />}
//     </>
//   );
// };

// export default App;



// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";

// // Public layout parts
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// // Public pages
// import Home from "./components/Home";
// import Signin from "./components/Signin";
// import Signup from "./components/Signup";
// import Journey from "./components/Journey";
// import ForgotPassword from "./components/ForgotPassword";

// // Admin Dashboard layout and pages (updated paths)
// import Dashboard from "./features/AdminDashboard/pages/Dashboard";
// import DashboardHome from "./features/AdminDashboard/pages/DashboardHome";
// import Products from "./features/AdminDashboard/pages/Products";
// import Employees from "./features/AdminDashboard/pages/Employees";
// import Branches from "./pages/Branches"; // public pages folder me rakha hai
// import Members from "./features/AdminDashboard/pages/Members";
// import Trainers from "./features/AdminDashboard/pages/Trainers";
// import Plans from "./features/AdminDashboard/pages/Plans";
// import Classes from "./pages/Classes"; // public pages folder me rakha hai
// import Payments from "./features/AdminDashboard/pages/Payments";
// import Reports from "./features/AdminDashboard/pages/Reports";
// import Settings from "./features/AdminDashboard/pages/Settings";
// import User from "./features/AdminDashboard/pages/User"; // new path

// // User Dashboard layout and pages
// import UserDashboardlayout from "./features/Userdashboard/components/UserDashboardLayout";
// import UserHome from "./features/Userdashboard/pages/UserHome";
// import UserMembers from "./features/Userdashboard/pages/UserMembers";
// import UserTrainer from "./features/Userdashboard/pages/UserTrainer";
// import UserProducts from "./features/Userdashboard/pages/UserProducts";
// import UserPayments from "./features/Userdashboard/pages/UserPayments";
// import UserReports from "./features/Userdashboard/pages/UserReports";
// import UserSettings from "./features/Userdashboard/pages/UserSettings";

// const App = () => {
//   const { pathname } = useLocation();

//   const isAdminDashboardRoute = /^\/dashboard(\/|$)/i.test(pathname);
//   const isUserDashboardRoute = /^\/user(\/|$)/i.test(pathname);

//   return (
//     <>
//       {/* Hide Navbar inside dashboard */}
//       {!isAdminDashboardRoute && !isUserDashboardRoute && <Navbar />}

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/signin" element={<Signin />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/journey" element={<Journey />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* Admin Dashboard Routes */}
//         <Route path="/dashboard" element={<Dashboard />}>
//           <Route index element={<DashboardHome />} />
//           <Route path="products" element={<Products />} />
//           <Route path="employees" element={<Employees />} />
//           <Route path="branches" element={<Branches />} /> {/* public page */}
//           <Route path="users" element={<User />} /> {/* New User route */}
//           <Route path="members" element={<Members />} />
//           <Route path="trainers" element={<Trainers />} />
//           <Route path="plans" element={<Plans />} />
//           <Route path="classes" element={<Classes />} /> {/* public page */}
//           <Route path="payments" element={<Payments />} />
//           <Route path="reports" element={<Reports />} />
//           <Route path="settings" element={<Settings />} />
//         </Route>

//         {/* User Dashboard Routes */}
//         <Route path="/user" element={<UserDashboardlayout />}>
//           <Route index element={<UserHome />} />
//           <Route path="members" element={<UserMembers />} />
//           <Route path="trainers" element={<UserTrainer />} />
//           <Route path="products" element={<UserProducts />} />
//           <Route path="payments" element={<UserPayments />} />
//           <Route path="reports" element={<UserReports />} />
//           <Route path="settings" element={<UserSettings />} />
//         </Route>
//       </Routes>

//       {/* Hide Footer inside dashboard */}
//       {!isAdminDashboardRoute && !isUserDashboardRoute && <Footer />}
//     </>
//   );
// };

// export default App;



import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Public layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Journey from "./components/Journey";
import ForgotPassword from "./components/ForgotPassword";

// New Public Feature Pages
import PaymentPage from "./features/Payments/pages/PaymentPage";
import OffersPage from "./features/Offers/pages/OffersPage";
import BookingPage from "./features/Bookings/pages/BookingPage";
import BlogPage from "./features/Blog/pages/BlogPage";

// Admin Dashboard layout and pages
import Dashboard from "./features/AdminDashboard/pages/Dashboard";
import DashboardHome from "./features/AdminDashboard/pages/DashboardHome";
import Products from "./features/AdminDashboard/pages/Products";
import Employees from "./features/AdminDashboard/pages/Employees";
import Branches from "./pages/Branches";
import Members from "./features/AdminDashboard/pages/Members";
import Trainers from "./features/AdminDashboard/pages/Trainers";
import Plans from "./features/AdminDashboard/pages/Plans";
import Classes from "./pages/Classes";
import Payments from "./features/AdminDashboard/pages/Payments";
import Reports from "./features/AdminDashboard/pages/Reports";
import Settings from "./features/AdminDashboard/pages/Settings";
import User from "./features/AdminDashboard/pages/User";

// User Dashboard layout and pages
import UserDashboardlayout from "./features/Userdashboard/components/UserDashboardLayout";
import UserHome from "./features/Userdashboard/pages/UserHome";
import UserMembers from "./features/Userdashboard/pages/UserMembers";
import UserTrainer from "./features/Userdashboard/pages/UserTrainer";
import UserProducts from "./features/Userdashboard/pages/UserProducts";
import UserPayments from "./features/Userdashboard/pages/UserPayments";
import UserReports from "./features/Userdashboard/pages/UserReports";
import UserSettings from "./features/Userdashboard/pages/UserSettings";

const App = () => {
  const { pathname } = useLocation();

  const isAdminDashboardRoute = /^\/dashboard(\/|$)/i.test(pathname);
  const isUserDashboardRoute = /^\/user(\/|$)/i.test(pathname);

  return (
    <>
      {/* Show Navbar only outside dashboards */}
      {!isAdminDashboardRoute && !isUserDashboardRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* New Public Feature Routes */}
        <Route path="/payments" element={<PaymentPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/blog" element={<BlogPage />} />

        {/* Admin Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<Products />} />
          <Route path="employees" element={<Employees />} />
          <Route path="branches" element={<Branches />} />
          <Route path="users" element={<User />} />
          <Route path="members" element={<Members />} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="plans" element={<Plans />} />
          <Route path="classes" element={<Classes />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* User Dashboard Routes */}
        <Route path="/user" element={<UserDashboardlayout />}>
          <Route index element={<UserHome />} />
          <Route path="members" element={<UserMembers />} />
          <Route path="trainers" element={<UserTrainer />} />
          <Route path="products" element={<UserProducts />} />
          <Route path="payments" element={<UserPayments />} />
          <Route path="reports" element={<UserReports />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
      </Routes>

      {/* Show Footer only outside dashboards */}
      {!isAdminDashboardRoute && !isUserDashboardRoute && <Footer />}
    </>
  );
};

export default App;









