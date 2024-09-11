"use client";

import Inputs from '@/app/components/inputs/inputs';

import { MdAlternateEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";

import {
  FieldValues,
  useForm,
} from "react-hook-form";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Buttons from '@/app/components/buttons/buttons';
import { IoArrowForward } from 'react-icons/io5';


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

    const{
      formState: {errors},
    } = useForm<FieldValues>({
      defaultValues:{
        email: "",
        password: ""
      }
    });

    // const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //   setIsLoading(true)
    // }

    const handleSubmit = async (e: React.FormEvent) => {
      setIsLoading(true);
      e.preventDefault();
      
      try {
       
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          router.push('/dashboard')
          setMessage(data.message);
          setError("");
        } else {
          setError(data);
          setMessage("");
        }
      } catch (error:any) {
        setError("error: " + error.message);
      }
    };

    
    return (
      <div className="font-Roboto h-screen w-screen bg-cover bg-no-repeat bg-login-bg flex justify-center items-center m-0">
        <div className="bg-white h-[500px] w-[550px] border-solid border-[1px] border-[#D9D9D9] rounded-[10px] flex flex-col">
          {/**h HEADER */}
          <div className="pt-8 pb-2 h-fit w-full flex flex-col justify-center items-center">
            <h1 className="text-4xl"><b><span className="text-[#61DADA]">Welcome</span> to Cricket</b></h1>
            <div className="text-center text-[15px] pt-4 leading-tight">
              <p>Catch every issue, everytime. </p>
              <p>Login to your account or contact the admin for</p>
              <p>account creation.</p>
            </div>
          </div>

          {/**h HEADER */}
          <div className="w-full h-full flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit}>
              <Inputs
                id="email"
                type="email"
                title="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label={<MdAlternateEmail className="w-[20px] h-[20px]"/>}
                disabled={isLoading}
                required
              />

              <Inputs
                id="pass"
                type="password"
                title="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label={<MdLockOutline className="w-[20px] h-[20px]"/>}
                disabled={isLoading}
                required
                
              />
              <Buttons
                type="submit"
                disabled={isLoading}
              >
                Login  <IoArrowForward className="text-[15px] ml-2 mt-[3px] text-[#352F36]"/>
              </Buttons>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {message && <p style={{ color: "green" }}>{message}</p>}

            </form>
          </div>
        </div>
      </div>
    );
  }