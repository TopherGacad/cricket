"use client";

import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from 'js-cookie'; // To retrieve the token

type Variant = 'Tickets' | 'Setup';

interface TabProps {
    variant: Variant;
}

export default function Tabs({ variant }: TabProps) {
    const router = useRouter();
    const pathname = usePathname();  // Get the current route path
    const [role, setRole] = useState<string | null>(null); // State to store the user's role

    useEffect(() => {
        const token = Cookies.get('authToken'); // Get the JWT token from cookies
        if (token) {
            // Decode JWT to get the role from payload
            const [header, payload, signature] = token.split('.');
            if (payload) {
                const decodedPayload = JSON.parse(atob(payload)); // Decode the Base64 payload
                setRole(decodedPayload.role); // Set the user's role
                console.log("Decoded role:", decodedPayload.role); // Debugging: Check the decoded role
            }
        }
    }, []);

    // Define tab items based on the variant
    const ticketItems = [
        { title: "New Ticket", icon: <IoMdAddCircleOutline />, route: "/dashboard/tickets/new-ticket" },
        { title: "Queue", icon: <HiOutlineQueueList />, route: "/dashboard/tickets/queue" },
        { title: "Resolved", icon: <IoMdCheckmarkCircleOutline />, route: "/dashboard/tickets/resolved" }
    ];

    const setupItems = [
        { title: "Department", icon: <IoMdAddCircleOutline />, route: "/dashboard/setup/departments" },
        { title: "Categories", icon: <HiOutlineQueueList />, route: "/dashboard/setup/categories" },
        { title: "New Account", icon: <IoMdCheckmarkCircleOutline />, route: "/dashboard/setup/accounts" },
        { title: "User Profile", icon: <IoMdCheckmarkCircleOutline />, route: "/dashboard/setup/profiles" }
    ];

    // Conditionally render tabs based on role
    const getTicketItems = () => {
        if (role === 'superadmin' || role === 'staff' || role === 'employee') {
            return ticketItems; // All roles can access ticket-related items
        }
        return [];
    };

    const getSetupItems = () => {
        if (role === 'superadmin') {
            return setupItems; // Superadmin has access to all setup items
        } else if (role === 'staff' || 'employee') {
            return setupItems.filter(item => item.title === "User Profile"); // Staff can only access profiles
        }
        return []; // Employee has no access to setup items
    };

    const handleNavigation = (route: string) => {
        router.push(route);  // Navigate to the selected route
    };

    return (
        <>
            <div className="bg-[#EFEFEF] h-full w-full flex items-center">
                <ul className="flex h-full bg-[#D9D9D9] text-[#797979]">
                    {variant === 'Tickets' ? getTicketItems().map((item) => (
                        <li key={item.title}
                            className={`flex justify-center items-center cursor-pointer w-[150px] ${pathname === item.route ? "bg-[#fafafa] text-[#352F36]" : ""}`}
                            onClick={() => handleNavigation(item.route)}>
                            {item.icon}
                            {item.title}
                        </li>
                    )) : getSetupItems().map((item) => (
                        <li key={item.title}
                            className={`flex justify-center items-center cursor-pointer w-[150px] ${pathname === item.route ? "bg-[#fafafa] text-[#352F36]" : ""}`}
                            onClick={() => handleNavigation(item.route)}>
                            {item.icon}
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
