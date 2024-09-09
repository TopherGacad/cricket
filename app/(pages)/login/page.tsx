"use client";

import Inputs from '@/app/components/inputs/inputs';

import { MdAlternateEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";

import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useState } from 'react';
import Buttons from '@/app/components/buttons/buttons';
import { IoArrowForward } from 'react-icons/io5';


export default function Login() {
    const [isLoading, setIsLoading] = useState(false);

    const{
      handleSubmit,
      formState: {errors},
    } = useForm<FieldValues>({
      defaultValues:{
        email: "",
        password: ""
      }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true)
    }

    
    return (
      <div className="h-screen w-screen bg-cover bg-no-repeat bg-login-bg flex justify-center items-center m-0">
        <div className="bg-white h-[500px] w-[550px] border-solid border-[1px] border-[#D9D9D9] rounded-[10px] flex flex-col">
          {/**h HEADER */}
          <div className="pt-8 pb-2 h-fit w-full flex flex-col justify-center items-center">
            <h1 className="text-4xl"><b><span className="text-[#61DADA]">Welcome</span> to Cricket</b></h1>
            <div className="text-center text-[15px] pt-2 leading-tight">
              <p>Catch every issue, everytime. </p>
              <p>Login to your account or contact the admin for</p>
              <p>account creation.</p>
            </div>
          </div>

          {/**h HEADER */}
          <div className="w-full h-full p-5 flex flex-col justify-center items-center">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <Inputs
                id="email"
                type="email"
                title="Email"
                label={<MdAlternateEmail className="w-[20px] h-[20px]"/>}
                errors={errors}
              />

              <Inputs
                id="pass"
                type="password"
                title="Password"
                label={<MdLockOutline className="w-[20px] h-[20px]"/>}
                errors={errors}
              />

              <Buttons
                type="submit"
                disabled={isLoading}

              >
                Login  <IoArrowForward className="text-[15px] ml-2 mt-[3px]"/>
              </Buttons>

            </form>
          </div>
        </div>
      </div>
    );
  }