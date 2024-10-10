"use client";
import React, { FormEvent, useEffect, useState } from "react";

const AccountsAction = () => {
  const [department, setDepartment] = useState([]);
  const [error, setError] = useState<string | null>(null);

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
    <form className="bg-gray-400 flex flex-col" onSubmit={handleSubmit}>
      <input type="text" name="fname" placeholder="Firstname" />
      <input type="text" name="lname" placeholder="Lastname" />
      <select
  required
  name="department"
  id="department"
  className="border-[1px] border-solid border-[#C7C7C7] text-[#797979] px-2 w-[60%] h-[40px] focus:outline-none focus:ring-2 focus:ring-[#61DADA] focus:border-none"
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

      <select name="userRole" id="">
        <option value="superadmin">Superadmin</option>
        <option value="staff">Staff</option>
        <option value="employee">Employee</option>
      </select>
      <input type="text" name="mobileNo" placeholder="Mobile no." />
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <input type="password" placeholder="Confirm password" />
      <button type="submit">Submit</button>
      {error && <p className="text-red-500">Error: {error}</p>}
    </form>
  );
};

export default AccountsAction;
