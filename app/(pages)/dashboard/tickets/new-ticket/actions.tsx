"use client";

import Buttons from "@/app/components/buttons/buttons";
import React, { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";


const NewTicketAction = () => {
  
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");

        // if the response is not okay throw an error
        if (!response.ok) {
          throw new Error("Network Error");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <form
        action=""
        id="new-ticket"
        className="w-full px-20"
      >
        <div className="flex items-center w-full justify-between my-8">
          <label htmlFor="category" className="w-[15%] font-bold">
            Category:
          </label>
          <select
            required
            name="category"
            id="category"
            className="border-[1px] border-solid border-[#C7C7C7] text-[#797979] px-2 w-[60%] h-[40px] focus:outline-none focus:ring-2 focus:ring-[#61DADA] focus:border-none"
          >
            {categories.map((item: any) => (
              <option key={item._id} value={item.categoryName}>
                {item.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mb-8">
          <label htmlFor="description" className="w-[15%] font-bold">
            Description:
          </label>
          <textarea
            required
            maxLength={280}
            name="description"
            id="description"
            className="border-[1px] border-solid border-[#C7C7C7] text-[#797979] w-[60%] resize-none h-40 p-4 overflow-hidden focus:border-none focus:outline-none focus:ring focus:ring-[#61DADA]"
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="attachment" className="w-[15%] font-bold">
            Attach File:
          </label>

          <div className="w-[60%] relative cursor-pointer">
            <input
              id="attachment"
              type="file"
              name="attachment"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex items-center border-[1px] border-solid border-[#C7C7C7] p-2 w-full cursor-pointer">
              <FaUpload className="text-[#797979] text-center" />
              <span className="ml-5 text-[#797979] text-center">
                Add attachment
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <Buttons fullWidth={false}>Submit</Buttons>
        </div>
      </form>
    </>
  );
};

export default NewTicketAction;
