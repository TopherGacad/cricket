"use client";
import React, { FormEvent } from "react";

const DepartmentAction = () => {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      name: event.currentTarget.departmentName.value,
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
    } else {
      const errorData = await response.json();
      console.log("Error:", errorData.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="departmentName" placeholder="Department name" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DepartmentAction;
