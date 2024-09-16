"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Set loading state
  const router = useRouter();

  useEffect(() => {
    // Simulate authentication check
    const authToken = localStorage.getItem('authToken');

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

      // Clear local storage or cookies if necessary
      localStorage.removeItem('authToken');

      // Redirect the user to the login page
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking
  }

  if (!isAuthenticated) {
    return null; // Do not render anything if not authenticated
  }

  return (
    <>
      <div className="bg-white">DASHBOARD</div>
      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
