const API_URL = "http://localhost:8000";

export async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/api/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Identifiants incorrects");
  }

  return response.json();
}