"use client";
import Buttons from "@/app/components/buttons/buttons";
import { setRequestMeta } from "next/dist/server/request-meta";
import React, { FormEvent, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const AccountsAction = () => {
  const [department, setDepartment] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(()=>{
    if(success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);

      return() => clearTimeout(timer)
    }
  }, [success])

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await fetch("/api/departments", {
          credentials: "include", // Include cookies with the request
        });

        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }

        const data = await response.json();
        setDepartment(data);
      } catch (error: any) {
        console.error("Fetch department error:", error);
        setError(error.message);
      }
    };

    fetchDepartment();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = {
      fname: form.fname.value,
      lname: form.lname.value,
      department_id: form.department.value,
      role: form.userRole.value,
      mobileNo: form.mobileNo.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies with the request
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        console.log("User is created:", data);

        // Clear the form after a successful submission
        form.reset();
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  return (
    <form className="flex flex-col justify-center w-full gap-10 h-full" onSubmit={handleSubmit}>
      {success && <div className="shadow-lg flex justify-between items-center top-10 right-10 absolute w-[230px] border-[1px] border-solid border-[#] h-[50px] px-5 bg-[#fafafa] rounded-[5px] transition ease-in-out duration-500">
        <FaCheckCircle className="text-[#7FCC75] h-[22px] w-[22px]" />
        <p className="
          text-[#7FCC75]
            flex
            items-center
            justify-center
            text-[18px]"
            >New user created.
        </p>
      </div>}
      
      <div className="flex justify-between">
        <input className="px-2 border-[1px] border-solid border-[#C7C7C7] w-[46%] h-[40px] focus:outline-none focus:ring-2 focus:ring-[#61DADA] focus:border-none" type="text" name="fname" required placeholder="Firstname" />
        <input className="px-2 border-[1px] border-solid border-[#C7C7C7] w-[46%] h-[40px] focus:outline-none focus:ring-2 focus:ring-[#61DADA] focus:border-none" type="text" name="lname" required placeholder="Lastname" />
      </div>
     
    <div className="flex justify-between">
      <select
        required
        name="department"
        id="department"
        className="px-2 w-[46%] border-[1px] border-solid border-[#C7C7C7] text-[#797979] h-[40px] focus:outline-none focus:ring-2 focus:ring-[#61DADA] focus:border-none"
      >
        <option value="" disabled selected>
          Select a department
        </option>
        {department.map((item: any) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>

      <select className="px-2 w-[46%] order-[1px] border-[1px] border-solid border-[#C7C7C7] h-[40px] text-[#797979] focus:outline-none focus:ring-2 focus:ring-[#61DADA] focus:border-none" name="userRole" id="" required>
        <option value="" selected disabled>Select Role</option>
        <option value="superadmin">Superadmin</option>
        <option value="staff">Staff</option>
        <option value="employee">Employee</option>
      </select>
    </div>

    <div className="flex justify-between">
      <input className="px-2 border-[1px] border-solid border-[#C7C7C7] w-[46%] h-[40px] focus:outline-none focus:ring-2 focus:ring-[#61DADA] focus:border-none" type="text" name="mobileNo" required placeholder="Mobile no." />
      <input className="px-2 border-[1px] border-solid border-[#C7C7C7] w-[46%] h-[40px] focus:outline-none focus:ring-2 focus:ring-[#61DADA] focus:border-none" type="email" name="email" required placeholder="Email" />
    </div>
    
    <div className="flex justify-between">
      <input className="px-2 border-[1px] border-solid border-[#C7C7C7] w-[46%] h-[40px] focus:outline-none focus:ring-2 focus:ring-[#61DADA] focus:border-none" type="password" required name="password" placeholder="Password" /> 
    </div>
      <div className="flex justify-end mt-5">
        <Buttons fullWidth={false}>Submit</Buttons>
        {error && 
        <p className="text-red-500">Error: {error}</p>}
      </div>
    </form>
  );
};

export default AccountsAction;
