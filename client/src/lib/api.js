// NEW FEATURE START: CENTRAL API LAYER

const API_URL = "http://localhost:5000";

// Token helper
export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

// Login
export async function login(email) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data;
}

// Get Blog
export async function getBlog() {
  const res = await fetch(`${API_URL}/api/blog`);
  return res.json();
}

// Dashboard
export async function getDashboard() {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/dashboard`, {
    headers: {
      Authorization: token,
    },
  });

  return res.json();
}

// AI
export async function generateAI(prompt) {
  const res = await fetch(`${API_URL}/api/ai/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  return res.json();
}

// NEW FEATURE END