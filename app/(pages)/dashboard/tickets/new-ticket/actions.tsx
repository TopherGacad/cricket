"use client";

import React, { useEffect, useState } from 'react'


const NewTicketAction = () => {

const [categories, setCategories] = useState([]);
const [error, setError] = useState(null);

useEffect(()=>{
    const fetchCategories = async () => {
        try{
            const response = await fetch("/api/categories");

            //if the response is not okay throw an error
            if(!response.ok) {
                throw new Error("Network Error");
            }

            const data = await response.json();
            setCategories(data);
        } catch (error: any) {
            setError(error.message);
        };
    };
    
    fetchCategories();
}, []);

//   const categoryItems = [
//     //change this to fetch category from new-ticket api
//     {id: "1" , title: "Software Issues"},
//     {id: "2" , title: "Hardware Request"},
//     {id: "3" , title: "Telephone Issues"}
//   ] 

  return (
    <>  
        <select name="" id="" form='newTicket' className='border-[1px] border-solid border-[#C7C7C7] text-[#797979] px-2 w-[60%] h-[40px] focus:ring-2 focus:ring-[#61DADA] focus:border-none'>
            {categories.map((item: any)=>(
                <option key={item._id} value={item.categoryName}>{item.categoryName}</option>
            ))}
        </select>
    </>
  )
}

export default NewTicketAction