"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';  // We'll use this library to easily manage cookies
import Loading from "../login/loading";
import Dashlogout from "./dashlogout";


export default function Dashboard() {
 
  // if (loading) {
  //   return <Loading/>
  // }

  // if (!isAuthenticated) {
  //   return null; // Do not render anything if not authenticated
  // }

  return (
    <>
      <div className="w-full">
        <div className="bg-white">DASHBOARD</div>
        <Dashlogout />
      </div>
    </>
  );
}
