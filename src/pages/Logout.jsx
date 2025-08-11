// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Logout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/");
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <h2 className="text-xl font-semibold text-gray-700">
//         Logging out...
//       </h2>
//     </div>
//   );
// };

// export default Logout;

import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"; // Adjust if you're not using alias
import { Button } from "@/components/ui/button";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear sessionStorage or auth tokens here if needed
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AlertDialog defaultOpen>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Logout</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will log you out of your session. You can log back in at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Yes, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Logout;
