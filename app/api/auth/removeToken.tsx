"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // We'll use this library to easily manage cookies

import React from "react";

const HandleLogout = () => {
  const router = useRouter();
  localStorage.clear();
  
  const HandleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Logout failed");
      }

      // Clear cookie on logout
      Cookies.remove("authToken"); // Remove the authToken cookie

      // Redirect the user to the login page
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <button onClick={HandleLogout}>Logout</button>;
};

export default HandleLogout;
