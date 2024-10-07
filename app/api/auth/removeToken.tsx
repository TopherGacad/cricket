"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React from "react";

const HandleLogout = () => {
  const router = useRouter();

  const handleLogoutClick = async () => {
    try {
      // Call the logout API to handle server-side logout if necessary
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Logout failed");
      }

      // Clear localStorage on logout
      if (typeof window !== "undefined") {
        localStorage.clear();
      }

      // Remove the authToken cookie
      Cookies.remove("authToken");

      // Redirect the user to the login page
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <button onClick={handleLogoutClick}>Logout</button>;
};

export default HandleLogout;
