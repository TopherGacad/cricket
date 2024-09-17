import type { Metadata } from "next";
import Navbar from "@/app/components/navbar/navbar";
import Sidebar from "@/app/components/sidebar/sidebar";
import Link from "next/link";


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
   
      <div className="flex flex-col h-screen w-screen" >
        <Navbar />

        <div className="flex w-full h-full">
            <Sidebar />
            <div>
                {children}
            </div>
            
        </div>
        </div>
  );
}
