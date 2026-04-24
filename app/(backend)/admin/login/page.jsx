// app/admin/login/page.jsx
"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/admin/dashboard";
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full"/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full"/>
      <button onClick={handleLogin} className="bg-black text-white p-2 w-full">
        Login
      </button>
    </div>
  );
}