"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () =>{
  const router = useRouter();

  useEffect(() =>{
    router.push('/login'); //redirect to login page when the localhost:3000 or home is access
  }, [router]);

  return null; //render nothing from this page
}

export default Home;