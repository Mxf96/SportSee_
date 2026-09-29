import { API_URL, useMockData } from "../config/environment";

import { mockAuthUser } from "../data/mockData";

import { ApiError } from "./ApiError";

export async function loginUser(username, password) {
  // =========================
  // MODE MOCK
  // =========================

  if (useMockData()) {
    if (
      username !== mockAuthUser.username ||
      password !== mockAuthUser.password
    ) {
      throw new ApiError("Identifiants incorrects.", 401);
    }

    return {
      token: mockAuthUser.token,
      userId: mockAuthUser.userId,
    };
  }

  // =========================
  // MODE API
  // =========================

  let response;

  try {
    response = await fetch(`${API_URL}/api/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        password,
      }),
    });
  } catch {
    throw new ApiError("Impossible de contacter le serveur.", 0);
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new ApiError("Identifiants incorrects.", 401);
    }

    throw new ApiError("Impossible de se connecter.", response.status);
  }

  return response.json();
}