// NEW FEATURE START - ADVANCED LEAD FORM

"use client";
import { useState } from "react";

export default function LeadForm({ service }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        service,
        source: window.location.pathname,
      }),
    });

    alert("Lead submitted 🚀");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black/40 p-6 rounded-2xl mt-10"
    >
      <h2 className="text-xl font-bold mb-4">
        💬 Get a Free Quote
      </h2>

      <input
        placeholder="Name"
        className="w-full p-2 mb-3 rounded"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="w-full p-2 mb-3 rounded"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <textarea
        placeholder="Project details"
        className="w-full p-2 mb-3 rounded"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button className="bg-purple-600 px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}

// NEW FEATURE END