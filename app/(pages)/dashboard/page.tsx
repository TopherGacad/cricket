"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';  // We'll use this library to easily manage cookies
import Loading from "../login/loading";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Set loading state
  const router = useRouter();

  useEffect(() => {
    // Check authentication using cookies
    const authToken = Cookies.get('authToken'); // Read the cookie

    if (!authToken) {
      // Redirect to login if the token doesn't exist
      router.push('/login');
    } else {
      // If token exists, mark the user as authenticated
      setIsAuthenticated(true);
    }
    setLoading(false); // Done checking
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Logout failed');
      }

      // Clear cookie on logout
      Cookies.remove('authToken');  // Remove the authToken cookie

      // Redirect the user to the login page
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <Loading/>
  }

  if (!isAuthenticated) {
    return null; // Do not render anything if not authenticated
  }

  return (
    <>
      <div className="w-full">
        <div className="bg-white">DASHBOARD</div>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}
