"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';  // We'll use this library to easily manage cookies
import Loading from "./loading";
import Link from "next/link";

export default function NewTicket() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Set loading state
  const router = useRouter();

  useEffect(() => {
    // Check authentication using cookies
    const authToken = Cookies.get('authToken'); // Read the cookie

    if (!authToken) {
      // Redirect to login if the token doesn't exist
      router.push('/login');
    } else {
      // If token exists, mark the user as authenticated
      setIsAuthenticated(true);
    }
    setLoading(false); // Done checking
  }, [router]);


  
  if (loading) {
    return <Loading/>
  }


    return (
    <>
      <div>
        <div className="w-[500px] h-[50px] border-solid border-[1px] border-gray-600">
          <ul className="flex justify-around items-center">
              <Link href="/dashboard/tickets/new-ticket"><li>New Ticket</li></Link>
              <Link href="/dashboard/tickets/queue"><li>Queue</li></Link>
              <Link href="/dashboard/tickets/resolved"><li>Resolved</li></Link>
          </ul>
        </div>

        <h1>NEW TICKET HERE</h1>
      </div>
    </>
    );
  }