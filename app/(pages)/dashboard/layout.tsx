import type { Metadata } from "next";
import Navbar from "@/app/components/navbar/navbar";
import Sidebar from "@/app/components/sidebar/sidebar";
import Link from "next/link";
import Action from "./action";


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
   <Action>
      <div className="flex flex-col h-screen w-screen" >
        <Navbar />

        <div className="flex w-full h-full">
            <Sidebar />
            <div>
                {children}
            </div>

        </div>
        </div>
    </Action>  
  );
}
