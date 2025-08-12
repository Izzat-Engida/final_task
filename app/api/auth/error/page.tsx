'use client'
import React,{useEffect}from 'react'

function Error() {
    useEffect(() => {
  async function testLogin() {
    try {
      const res = await fetch("https://akil-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "izzat.engida@a2sv.org",
          password: "123456789",
        }),
      });

      const data = await res.json();
      console.log("LOGIN TEST:", data);
    } catch (error) {
      console.error("Login test failed:", error);
    }
  }

  testLogin();
}, []);

  return (
    <div className='flex justify-center items-center h-screen'>
      <p>Something went wrong</p>
    </div>
  )
}

export default Error
