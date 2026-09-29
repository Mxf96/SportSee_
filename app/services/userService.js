import { API_URL, useMockData } from "../config/environment";

import { mockUserInfo } from "../data/mockData";

import { getAuthToken } from "../utils/authToken";

import { ApiError } from "./ApiError";

export async function getUserInfo() {
  // =========================
  // MODE MOCK
  // =========================

  if (useMockData()) {
    return mockUserInfo;
  }

  // =========================
  // MODE API
  // =========================

  const token = getAuthToken();

  if (!token) {
    throw new ApiError("Aucun token d'authentification disponible.", 401);
  }

  let response;

  try {
    response = await fetch(`${API_URL}/api/user-info`, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    throw new ApiError("Impossible de contacter le serveur.", 0);
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new ApiError(
        "Session expirée ou utilisateur non authentifié.",
        401,
      );
    }

    throw new ApiError(
      "Impossible de récupérer les informations utilisateur.",
      response.status,
    );
  }

  return response.json();
}