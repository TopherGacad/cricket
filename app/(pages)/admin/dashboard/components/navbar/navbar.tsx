"use client";

import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  email: string;
  fname: string;
  lname: string;
  // Add other properties if needed
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData); // Set the user data in the state
      } else {
        console.error("Failed to fetch user:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser(); // Call fetchUser when the component mounts
  }, []);

  return (
    <nav>
      <div>
        {user ? (
          <div>
            <p>Welcome, {user.fname} {user.lname}</p>
            {/* Add more user information as needed */}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
