"use client";
import { useState, useEffect, FormEvent } from "react";
import DepartmentTable from "./table";
import Buttons from "@/app/components/buttons/buttons";

// Define the Department and User types
interface User {
  fname: string;
  lname: string;
}

interface Department {
  _id: string;
  name: string;
  createdAt: string;
  user?: User;
}

const DepartmentAction = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);

  // Step 1: Fetch departments and sort them by createdAt (newest to oldest)
  const fetchDepartments = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/departments");
      if (response.ok) {
        const data: Department[] = await response.json();
        // Sort by createdAt in descending order (newest first)
        const sortedData = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setDepartments(sortedData); // Set the sorted departments in state
      }
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Fetch departments on component mount
  useEffect(() => {
    fetchDepartments(); // Fetch departments when the component mounts
  }, []);

  // Step 3: Handle form submission and automatically refresh the table after submission
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = {
      name: form.departmentName.value,
    };

    try {
      const response = await fetch("/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newDepartment = await response.json();
        console.log("New department created:", newDepartment);

        form.reset(); // Reset the form after submission

        // Step 4: Refetch departments to update the table automatically, and keep the sorting
        await fetchDepartments();
      } else {
        console.error("Failed to create department");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="h-[95%] flex">
      <div className="flex flex-col justify-center items-center border-r-[1px] border-solid border-[#D9D9D9] h-full w-[30%]">
        <h1 className="text-center font-bold text-[45px] mb-10">
          <span className="text-[#61DADA] leading-tight">Add</span> New<br />Department
        </h1>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col items-center w-full px-5">
            <input
              className="bg-[#FAFAFA] text-[#797979] border-[1px] border-solid border-[#C7C7C7] w-[80%] p-2"
              type="text"
              name="departmentName"
              placeholder="Department name"
              required
            />
            <Buttons>Submit</Buttons>
          </div>
        </form>
      </div>

      <div className="w-[70%] h-full py-14 px-10 overflow-hidden">
        <DepartmentTable departments={departments} loading={loading} />
      </div>
    </div>
  );
};

export default DepartmentAction;
