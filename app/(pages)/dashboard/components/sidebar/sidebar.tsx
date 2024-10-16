"use client";

import React, { useEffect, useState } from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import { PiTicket } from "react-icons/pi";
import { LuSettings } from "react-icons/lu";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // To retrieve the token
import Loading from '@/app/(pages)/loading'; // Import your Loading component

const Sidebar = () => {
  const router = useRouter();
  const [isRoute, setIsRoute] = useState("/dashboard"); // Default route
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null); // State to store user role
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const savedMenu = localStorage.getItem('activeMenu') || '/dashboard';
    const token = Cookies.get('authToken'); // Get the JWT token from cookies

    if (savedMenu) {
      setActiveMenu(savedMenu);
    }

    if (token) {
      // Decode JWT to get the role from payload
      const [header, payload, signature] = token.split('.');
      if (payload) {
        const decodedPayload = JSON.parse(atob(payload)); // Decode the Base64 payload
        setRole(decodedPayload.role); // Set the user's role
        console.log("Decoded role:", decodedPayload.role); // Debugging: Check the decoded role
      }
    }

    setLoading(false); // Set loading to false once role is set
  }, []);

  // Define menu items based on roles
  const adminItems = [
    { title: "Dashboard", icon: <MdOutlineDashboard className="w-[24px] h-[24px]" />, route: "/dashboard" },
    { title: "Tickets", icon: <PiTicket className="w-[24px] h-[24px]" />, route: "/dashboard/tickets/new-ticket" },
    { title: "System Setup", icon: <LuSettings className="w-[24px] h-[24px]" />, route: "/dashboard/setup/departments" },
  ];

  const staffItems = [
    { title: "Dashboard", icon: <MdOutlineDashboard className="w-[24px] h-[24px]" />, route: "/dashboard" },
    { title: "Tickets", icon: <PiTicket className="w-[24px] h-[24px]" />, route: "/dashboard/tickets/new-ticket" },
    { title: "System Setup", icon: <LuSettings className="w-[24px] h-[24px]" />, route: "/dashboard/setup/profiles" }, // Adjusted to only show profiles
  ];

  const employeeItems = [
    { title: "Tickets", icon: <PiTicket className="w-[24px] h-[24px]" />, route: "/dashboard/tickets/new-ticket" },
    { title: "System Setup", icon: <LuSettings className="w-[24px] h-[24px]" />, route: "/dashboard/setup/profiles" }, // Adjusted to only show profiles
  ];

  // Determine which items to render based on the user's role
  const getMenuItems = () => {
    console.log("User role in getMenuItems:", role); // Debugging: Check role state
    if (role === 'superadmin') {
      return adminItems; // Show full admin menu
    } else if (role === 'staff') {
      return staffItems; // Show staff menu
    } else if (role === 'employee') {
      return employeeItems; // Show employee menu
    } else {
      return []; // Return an empty array if no role
    }
  };

  const handleNavigation = (route: string) => {
    setActiveMenu(route);
    localStorage.setItem('activeMenu', route);
    setIsRoute(route); // Set active route
    router.push(route); // Navigate to the route
  };

  const menuItems = getMenuItems();

  // If loading is true, render the Loading component
  if (loading) {
    return <Loading />; // Display the loading component while loading
  }

  // Don't render the sidebar if there are no menu items
  if (menuItems.length === 0) {
    return null;
  }

  return (
    <div className="w-[6%] bg-[#fafafa]">
      <ul className="flex-col flex items-center text-[16px]">
        {menuItems.map((item) => (
          <li
            key={item.route}
            className={`flex flex-col justify-center items-center cursor-pointer
            ${isRoute && activeMenu === item.route ? "bg-gray-300" : ""}`} // Apply active class if route matches
            onClick={() => handleNavigation(item.route)}
          >
            {item.icon} {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
