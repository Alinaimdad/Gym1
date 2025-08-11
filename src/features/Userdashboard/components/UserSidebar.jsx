// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   FaHome,
//   FaDumbbell,
//   FaUsers,
//   FaUserTie,
//   FaBars,
//   FaSignOutAlt,
//   FaMoneyBill,
//   FaChartBar,
//   FaCog,
//   FaTimes,
// } from "react-icons/fa";

// const navGroups = [
//   {
//     title: "Overview",
//     items: [{ label: "Dashboard", to: "/user", icon: <FaHome /> }],
//   },
//   {
//     title: "Members",
//     items: [
//       { label: "Members", to: "/user/members", icon: <FaUsers /> },
//       { label: "Trainers", to: "/user/trainers", icon: <FaUserTie /> },
//     ],
//   },
//   {
//     title: "Inventory",
//     items: [
//       { label: "Products", to: "/user/products", icon: <FaDumbbell /> },
//     ],
//   },
//   {
//     title: "Business",
//     items: [
//       { label: "Payments", to: "/user/payments", icon: <FaMoneyBill /> },
//       { label: "Reports", to: "/user/reports", icon: <FaChartBar /> },
//     ],
//   },
//   {
//     title: "System",
//     items: [{ label: "Settings", to: "/user/settings", icon: <FaCog /> }],
//   },
// ];

// const UserSidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/");
//   };

//   /* Desktop Sidebar */
//   const DesktopSidebar = () => (
//     <aside
//       className={`hidden md:flex fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-gray-900 text-white shadow-lg transition-all duration-300
//       ${collapsed ? "w-20" : "w-64"}`}
//     >
//       <div className="flex flex-col w-full">
//         {/* Header / Toggle */}
//         <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
//           {!collapsed && (
//             <h1 className="text-xl font-bold tracking-wide">Gym User</h1>
//           )}
//           <button
//             onClick={() => setCollapsed((p) => !p)}
//             className="p-2 rounded hover:bg-gray-800 transition"
//             aria-label="toggle sidebar"
//           >
//             <FaBars />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="mt-2 px-2 space-y-4 overflow-y-auto h-[calc(100%-8rem)]">
//           {navGroups.map((group) => (
//             <div key={group.title}>
//               {!collapsed && (
//                 <p className="px-3 text-xs uppercase tracking-wider text-gray-400 mb-1">
//                   {group.title}
//                 </p>
//               )}
//               <div className="space-y-1">
//                 {group.items.map((item) => (
//                   <NavLink
//                     key={item.to}
//                     to={item.to}
//                     end={item.to === "/user"}
//                     className={({ isActive }) =>
//                       `relative group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
//                       ${
//                         isActive
//                           ? "bg-gray-800 text-white"
//                           : "text-gray-300 hover:bg-gray-700"
//                       }`
//                     }
//                   >
//                     <span className="text-lg shrink-0">{item.icon}</span>
//                     {!collapsed && <span className="truncate">{item.label}</span>}
//                     {collapsed && (
//                       <span
//                         className="absolute left-20 invisible group-hover:visible bg-gray-800 text-white text-xs rounded px-2 py-1 ml-2 whitespace-nowrap"
//                         role="tooltip"
//                       >
//                         {item.label}
//                       </span>
//                     )}
//                   </NavLink>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </nav>

//         {/* Logout */}
//         <div className="mt-auto p-2">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 w-full justify-center md:justify-start px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
//           >
//             <FaSignOutAlt className="text-lg" />
//             {!collapsed && <span>Logout</span>}
//           </button>
//         </div>
//       </div>
//     </aside>
//   );

//   /* Mobile Hamburger */
//   const MobileHamburger = () => (
//     <button
//       onClick={() => setMobileOpen(true)}
//       className="md:hidden fixed left-4 top-20 z-40 bg-gray-900 text-white p-2 rounded shadow hover:bg-gray-800"
//       aria-label="open sidebar"
//     >
//       <FaBars />
//     </button>
//   );

//   /* Mobile Drawer */
//   const MobileDrawer = () => (
//     <>
//       <div
//         className={`md:hidden fixed inset-0 z-50 bg-black/40 transition-opacity ${
//           mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={() => setMobileOpen(false)}
//       />
//       <div
//         className={`md:hidden fixed top-0 left-0 z-50 h-full w-72 bg-gray-900 text-white shadow-lg transform transition-transform duration-300
//         ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
//           <h1 className="text-lg font-bold">User Dashboard</h1>
//           <button
//             onClick={() => setMobileOpen(false)}
//             aria-label="close sidebar"
//             className="p-2 rounded hover:bg-gray-800 transition"
//           >
//             <FaTimes />
//           </button>
//         </div>

//         <nav className="mt-2 px-2 space-y-4 overflow-y-auto h-[calc(100%-9rem)]">
//           {navGroups.map((group) => (
//             <div key={group.title}>
//               <p className="px-3 text-xs uppercase tracking-wider text-gray-400 mb-1">
//                 {group.title}
//               </p>
//               <div className="space-y-1">
//                 {group.items.map((item) => (
//                   <NavLink
//                     key={item.to}
//                     to={item.to}
//                     end={item.to === "/user"}
//                     onClick={() => setMobileOpen(false)}
//                     className={({ isActive }) =>
//                       `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
//                       ${
//                         isActive
//                           ? "bg-gray-800 text-white"
//                           : "text-gray-300 hover:bg-gray-700"
//                       }`
//                     }
//                   >
//                     <span className="text-lg shrink-0">{item.icon}</span>
//                     <span className="truncate">{item.label}</span>
//                   </NavLink>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </nav>

//         <div className="p-2 border-t border-white/10">
//           <button
//             onClick={() => {
//               setMobileOpen(false);
//               handleLogout();
//             }}
//             className="flex items-center gap-2 w-full px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
//           >
//             <FaSignOutAlt className="text-lg" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );

//   return (
//     <>
//       <DesktopSidebar />
//       <MobileHamburger />
//       <MobileDrawer />
//     </>
//   );
// };

// export default UserSidebar;
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaDumbbell,
  FaUsers,
  FaUserTie,
  FaBars,
  FaSignOutAlt,
  FaMoneyBill,
  FaChartBar,
  FaCog,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navGroups = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", to: "/user", icon: <FaHome /> }],
  },
  {
    title: "Members",
    items: [
      { label: "Members", to: "/user/members", icon: <FaUsers /> },
      { label: "Trainers", to: "/user/trainers", icon: <FaUserTie /> },
    ],
  },
  {
    title: "Inventory",
    items: [{ label: "Products", to: "/user/products", icon: <FaDumbbell /> }],
  },
  {
    title: "Business",
    items: [
      { label: "Payments", to: "/user/payments", icon: <FaMoneyBill /> },
      { label: "Reports", to: "/user/reports", icon: <FaChartBar /> },
    ],
  },
  {
    title: "System",
    items: [{ label: "Settings", to: "/user/settings", icon: <FaCog /> }],
  },
];

const UserSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  /* Desktop Sidebar */
  const DesktopSidebar = () => (
    <aside
      className={`hidden md:flex fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-gray-900 text-white shadow-lg transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          {!collapsed && (
            <h1 className="text-xl font-bold tracking-wide">Gym User</h1>
          )}
          <button
            onClick={() => setCollapsed((p) => !p)}
            className="p-2 rounded hover:bg-gray-800 transition"
          >
            <FaBars />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-2 px-2 space-y-4 overflow-y-auto h-[calc(100%-8rem)]">
          {navGroups.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <p className="px-3 text-xs uppercase tracking-wider text-gray-400 mb-1">
                  {group.title}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/user"}
                    className={({ isActive }) =>
                      `relative group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
                      ${
                        isActive
                          ? "bg-gray-800 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`
                    }
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {collapsed && (
                      <span className="absolute left-20 invisible group-hover:visible bg-gray-800 text-white text-xs rounded px-2 py-1 ml-2 whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto p-2">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-2 w-full justify-center md:justify-start px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
          >
            <FaSignOutAlt className="text-lg" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );

  /* Mobile Hamburger */
  const MobileHamburger = () => (
    <button
      onClick={() => setMobileOpen(true)}
      className="md:hidden fixed left-4 top-20 z-40 bg-gray-900 text-white p-2 rounded shadow hover:bg-gray-800"
    >
      <FaBars />
    </button>
  );

  /* Mobile Drawer */
  const MobileDrawer = () => (
    <>
      <div
        className={`md:hidden fixed inset-0 z-50 bg-black/40 transition-opacity ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-72 bg-gray-900 text-white shadow-lg transform transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <h1 className="text-lg font-bold">User Dashboard</h1>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded hover:bg-gray-800 transition"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="mt-2 px-2 space-y-4 overflow-y-auto h-[calc(100%-9rem)]">
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="px-3 text-xs uppercase tracking-wider text-gray-400 mb-1">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/user"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
                      ${
                        isActive
                          ? "bg-gray-800 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`
                    }
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-2 border-t border-white/10">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );

  /* Logout Confirmation Modal */
  const LogoutModal = () => (
    <AnimatePresence>
      {showLogoutConfirm && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
            <p className="text-gray-600 text-sm mb-5">
              You will be logged out from your account.
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileHamburger />
      <MobileDrawer />
      <LogoutModal />
    </>
  );
};

export default UserSidebar;
