"use client";

import Buttons from '@/app/components/buttons/buttons'
import Inputs from '@/app/components/inputs/inputs'
import React, { useEffect, useState } from 'react'
import { IoArrowForward } from 'react-icons/io5'
import { MdAlternateEmail, MdLockOutline } from 'react-icons/md'
import Loading from '../loading';
import { FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie"; // For cookie management

const LoginActions = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
  
    const {
      formState: { errors },
    } = useForm<FieldValues>({
      defaultValues: { email: "", password: "" },
    });
  
    // Check if the user is already authenticated and redirect if they are
    useEffect(() => {
      const authToken = Cookies.get("authToken");
      if (authToken) {
        localStorage.setItem("activeMenu", "dashboard");
        router.push("/dashboard"); // Redirect to dashboard if already logged in
      } else {
        setIsLoading(false);
      }
    }, [router]);
  

    const handleSubmit = async (e: React.FormEvent) => {
      setIsLoading(true);
      e.preventDefault();
  
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Store the JWT token in a secure cookie
          Cookies.set("authToken", data.token, {
            expires: 1, // Expire in 1 day
            secure: true, // Ensure cookie is only sent over HTTPS
            sameSite: "Strict", // Prevent CSRF
          });
  
          // Redirect to the dashboard after successful login
          router.push("/dashboard");
          setMessage("Login successful!");
  
          console.log("Login successful. Redirecting to dashboard...");
          setError("");
        } else {
          console.log("Login failed: ", data.message);
          setError(data.message || "Login failed");
          setMessage("");
        }
      } catch (error: any) {
        setError("Error: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit}>
        <Inputs
        id="email"
        type="email"
        title="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label={<MdAlternateEmail className="w-[20px] h-[20px]" />}
        disabled={isLoading}
        required
        />

        <Inputs
        id="pass"
        type="password"
        title="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label={<MdLockOutline className="w-[20px] h-[20px]" />}
        disabled={isLoading}
        required
        />

        <Buttons type="submit" disabled={isLoading} fullWidth={true}>
        Login{" "}
        <IoArrowForward className="text-[15px] ml-2 mt-[3px] text-[#352F36]" />
        </Buttons>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
    </form>
    </div>
  )
}

export default LoginActions