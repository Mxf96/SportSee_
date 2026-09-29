import { API_URL, useMockData } from "../config/environment";

import { mockUserActivity } from "../data/mockData";

import { getAuthToken } from "../utils/authToken";

import { ApiError } from "./ApiError";

export async function getUserActivity(startDate, endDate) {
  // =========================
  // MODE MOCK
  // =========================

  if (useMockData()) {
    return mockUserActivity.filter(
      (activity) => activity.date >= startDate && activity.date <= endDate,
    );
  }

  // =========================
  // MODE API
  // =========================

  const token = getAuthToken();

  if (!token) {
    throw new ApiError("Aucun token d'authentification disponible.", 401);
  }

  const params = new URLSearchParams({
    startWeek: startDate,
    endWeek: endDate,
  });

  let response;

  try {
    response = await fetch(
      `${API_URL}/api/user-activity?${params.toString()}`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
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
      "Impossible de récupérer les activités utilisateur.",
      response.status,
    );
  }

  return response.json();
}