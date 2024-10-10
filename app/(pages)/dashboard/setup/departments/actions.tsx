"use client";
import Buttons from "@/app/components/buttons/buttons";
import React, { FormEvent } from "react";

const DepartmentAction = () => {

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget
    const formData = {
      name: form.departmentName.value,
    };

    const response = await fetch("/api/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Department created:", data);
      form.reset();
    } else {
      const errorData = await response.json();
      console.log("Error:", errorData.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col items-center w-full px-5">
        <input className="
          bg-[#FAFAFA] 
          text-[#797979] 
          border-[1px] 
          border-solid 
          border-[#C7C7C7] 
          w-[80%] 
          p-2" 

          type="text" 
          name="departmentName" 
          placeholder="Department name" 
          required />
          <Buttons>Submit</Buttons>
      </div>
    </form>
  );
};

export default DepartmentAction;
