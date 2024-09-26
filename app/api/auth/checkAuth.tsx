"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import React from "react";

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Set loading state
  const router = useRouter();

  useEffect(() => {
    // Check authentication using cookies
    const authToken = Cookies.get("authToken"); // Read the cookie

    if (!authToken) {
      // Redirect to login if the token doesn't exist
      router.push("/login");
    } else {
      // If token exists, mark the user as authenticated
      setIsAuthenticated(true);
    }
    setLoading(false); // Done checking
  }, [router]);

  return (
    <div>{isAuthenticated && children}</div>
  )
 ;
};

export default CheckAuth;
