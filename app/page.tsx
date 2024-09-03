"use client";

import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="bg-white">hello</div>
//   );
// }

import { useEffect, useState } from "react";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Adjust this path if necessary
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {users.map((user: any, index: number) => (
            <>
              <li key={index}>{user.email}</li>
              <li key={index}>{user.fname}</li> 
              <li key={index}>{user.lname}</li>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
