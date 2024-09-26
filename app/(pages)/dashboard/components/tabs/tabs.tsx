"use client";

import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type Variant = 'Tickets' | 'Setup';

interface TabProps {
    variant: Variant;
}

export default function Tabs({ variant }: TabProps) {
    const router = useRouter();
    const pathname = usePathname();  // Get the current route path

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

    const handleNavigation = (route: string) => {
        router.push(route);  // Navigate to the selected route
    };

    return (
        <>
            <div className="bg-[#fafafa] w-full h-[40px]">
                <ul className="flex gap-5">
                    {variant === 'Tickets' ? ticketItems.map((item) => (
                        <li key={item.title}
                            className={`flex justify-center items-center cursor-pointer ${pathname === item.route ? "bg-gray-300" : ""}`}
                            onClick={() => handleNavigation(item.route)}>
                            {item.icon}
                            {item.title}
                        </li>
                    )) : setupItems.map((item) => (
                        <li key={item.title}
                            className={`flex justify-center items-center cursor-pointer ${pathname === item.route ? "bg-gray-300" : ""}`}
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
