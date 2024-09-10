"use client";

//CREATE USER
import { FormEvent } from 'react';

export default function Login(){
    async function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        // const formData = new FormData(event.currentTarget)
        const formData = {
            email : event.currentTarget.email.value,
            fname : event.currentTarget.fname.value,
            lname : event.currentTarget.lname.value,
            department : event.currentTarget.department.value,
            password : event.currentTarget.password.value,
        }
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log("User created:", data);
          } else {
            const errorData = await response.json();
            console.error("Error:", errorData.message);
          }
          
    };

    return (
        <div className="border-[1px] border-solid border-red w-[300px]">
            <form onSubmit={onSubmit} className="flex flex-col w-[200px]">
                <input type="email" name="email" placeholder="email" />
                <input type="text" name="fname" placeholder="firsname"/>
                <input type="text" name="lname" placeholder="lastname"/>
                <input type="text" name="department" placeholder="department"/>
                <input type="password" name="password" placeholder="password"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}