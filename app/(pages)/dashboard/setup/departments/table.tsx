"use client";

import React, { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

// Step 1: Define the types for User and Department
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

interface DepartmentTableProps {
  departments: Department[]; // Expect an array of departments as a prop
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({ departments }) => {
  console.log("Departments received by table:", departments); // Add this for debugging

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full max-h-full overflow-y-auto border-l-[1px] border-r-[1px] border-b-[1px]">
        <table className="w-full table-fixed border-collapse text-center">
          <thead className="bg-[#EFEFEF] w-full sticky top-0">
            <tr className="h-[50px] border-b-[1px] text-[14px]">
              <th className="h-[50px] w-[10%]">ID</th>
              <th className="h-[50px] w-[30%]">Department</th>
              <th className="h-[50px] w-[25%]">Date Created</th>
              <th className="h-[50px] w-[25%]">Created By</th>
              <th className="h-[50px] w-[10%]">Actions</th>
            </tr>
          </thead>

          <tbody className="z-0">
            {departments.map((item, index) => (
              <tr
                key={item._id}
                className="text-[#797979] border-b-[1px] text-[14px]"
              >
                <td>{index + 1}</td>
                <td className="truncate overflow-hidden whitespace-nowrap">
                  {item.name}
                </td>
                <td className="truncate overflow-hidden whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="truncate overflow-hidden whitespace-nowrap">
                  {item.user
                    ? `${item.user.fname} ${item.user.lname}`
                    : "Unknown"}
                </td>
                <td className="py-3">
                  <div className="flex items-center justify-center">
                    <RiDeleteBin6Fill className="text-[#E03131] text-[22px] cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentTable;

