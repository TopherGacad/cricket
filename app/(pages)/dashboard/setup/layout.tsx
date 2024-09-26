import type { Metadata } from "next";
import Auth from "@/app/api/auth/checkAuth";
import CheckAuth from "@/app/api/auth/checkAuth";
import Tabs from "../components/tabs/tabs";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Gitrush",
};

export default function TicketsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CheckAuth>
      <div className="border-solid border-[1px] border-red-600">
        <Tabs variant="Setup"/>
        {children}
      </div>
     
    </CheckAuth>
  );
}
