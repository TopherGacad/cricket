"use client";

import React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // We'll use this library to easily manage cookies

const Action = ({ children }: { children: React.ReactNode }) => {
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

  return <div>{isAuthenticated && children}</div>;
};

export default Action;
