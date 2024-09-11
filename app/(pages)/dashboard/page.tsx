"use client";

import { useState } from "react";

export default function dashboard() {
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
    // For example, clear authToken if stored in localStorage
    localStorage.removeItem('authToken');

    // Optionally, redirect the user or update the UI
    window.location.href = '/login'; // Redirect to the login page
  } catch (error) {
    console.error('Error logging out:', error);
    // Optionally, show an error message
  }
};

    return (
      <>
        <div className="bg-white">DASHBOARD</div>
        <button onClick={handleLogout}>
          Logout
        </button>

      </>
      
      
    );
  }