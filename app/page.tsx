"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';  // For cookie management

const Home = () =>{
  const router = useRouter();

  useEffect(() =>{
    router.push('/login'); //redirect to login page when the localhost:3000 or home is access
  }, [router]);

  // useEffect(() => {
  //   const authToken = Cookies.get('authToken');
  //   if (authToken) {
  //     router.push('/dashboard'); // Redirect to dashboard if already logged in
  //   }else {
  //     router.push('/login');
  //   }
  // }, [router]);

  return null; //render nothing from this page
}

export default Home;

