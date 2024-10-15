"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { PiTicket } from "react-icons/pi";
import { LuSettings } from "react-icons/lu";
import { useRouter } from "next/navigation";

type Variant = "admin" | "employee";

interface roleProps {
  variant: string;
}

const Sidebar = ({ variant }: roleProps) => {
  const router = useRouter();
  const [isRoute, setIsRoute] = useState("/dashboard"); // Default route
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const savedMenu = localStorage.getItem("activeMenu") || "/dashboard";
    if (savedMenu) {
      setActiveMenu(savedMenu);
    }
  }, []);

  const navItems = [
    {
      title: "Dashboard",
      icon: <MdOutlineDashboard className="w-[24px] h-[24px]" />,
      route: "/admin/dashboard",
    },
    {
      title: "Tickets",
      icon: <PiTicket className="w-[24px] h-[24px]" />,
      route: "/admin/dashboard/tickets/new-ticket",
    },
    {
      title: "System Setup",
      icon: <LuSettings className="w-[24px] h-[24px]" />,
      route: "/admin/dashboard/setup/departments",
    },
  ];

  const userItems = [
    {
      title: "Dashboard",
      icon: <MdOutlineDashboard className="w-[24px] h-[24px]" />,
      route: "/dashboard",
    },
    {
      title: "Tickets",
      icon: <PiTicket className="w-[24px] h-[24px]" />,
      route: "/dashboard/tickets/new-ticket",
    },
    {
      title: "System Setup",
      icon: <LuSettings className="w-[24px] h-[24px]" />,
      route: "/dashboard/setup/profiles",
    },
  ];

  const handleNavigation = (route: string) => {
    setActiveMenu(route);
    localStorage.setItem("activeMenu", route);
    setIsRoute(route); // Set active route
    router.push(route); // Navigate to the route
  };

  return (
    <div className="w-[6%] bg-[#fafafa]">
      <ul className="flex-col flex items-center text-[16px]">
        {variant === "admin"
          ? navItems.map((item) => (
            <li
            key={item.route}
            className={`flex flex-col justify-center items-center cursor-pointer
            ${isRoute && activeMenu === item.route ? "bg-gray-300" : ""}`} // Apply active class if route matches
            onClick={() => handleNavigation(item.route)}
        >
            {item.icon} {item.title}
        </li>
            ))
          : userItems.map((item) => (
            <li
            key={item.route}
            className={`flex flex-col justify-center items-center cursor-pointer
            ${isRoute && activeMenu === item.route ? "bg-gray-300" : ""}`} // Apply active class if route matches
            onClick={() => handleNavigation(item.route)}
        >
            {item.icon} {item.title}
        </li>
            ))}
        {/* {navItems.map((item) => (
                    <li
                        key={item.route}
                        className={`flex flex-col justify-center items-center cursor-pointer
                        ${isRoute && activeMenu === item.route ? "bg-gray-300" : ""}`} // Apply active class if route matches
                        onClick={() => handleNavigation(item.route)}
                    >
                        {item.icon} {item.title}
                    </li>
                ))} */}
      </ul>
    </div>
  );
};

export default Sidebar;
