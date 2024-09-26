import type { Metadata } from "next";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import Loading from "./loading";
import { Suspense } from "react";
import Auth from "@/app/api/auth/checkAuth";
import CheckAuth from "@/app/api/auth/checkAuth";



export const metadata: Metadata = {
  title: "Dashboard",
  description: "Gitrush",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CheckAuth>

      <div className=" flex flex-col h-screen w-screen m-0 p-0 bg-[#D9D9D9]">
        <Navbar />

        <div className="flex h-full w-full border-solid border-[1px] border-red-600">
              <Sidebar />
    
            <div className="w-full mx-10 my-5  border-solid border-[1px] border-red-500">
              {children}
            </div>
        </div>

      </div>
   
    </CheckAuth>
  );
}
