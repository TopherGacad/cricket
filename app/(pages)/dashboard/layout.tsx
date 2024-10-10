import type { Metadata } from "next";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import Loading from "../loading";
import { Suspense } from "react";
import CheckAuth from "@/app/api/auth/checkAuth";


export const metadata: Metadata = {
  title: {
    default: "Dashboard - Cricket",
    template: "%s - Cricket",
  },
  icons: {
    icon: "/img/cricket.svg"
  }
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <div className="flex flex-col h-screen w-screen m-0 p-0 bg-[#EFEFEF]">
        <div className="w-full h-[6%] bg-[#fafafa]">
          <Navbar />
        </div>

        <div className="flex h-[94%] w-full">
          <div className="h-full w-[6%] bg-[#fafafa] flex flex-col items-center">
            <Sidebar />
          </div>

          <div className="mx-6 my-5 w-full h-[96%] bg-[#FAFAFA]">
            {children}
          </div>
        </div>
      </div>
   
  );
}
