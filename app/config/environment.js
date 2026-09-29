export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const DEFAULT_USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export function useMockData() {
  if (typeof window === "undefined") {
    return DEFAULT_USE_MOCK;
  }

  const runtimeValue = localStorage.getItem("sportsee_use_mock");

  if (runtimeValue === null) {
    return DEFAULT_USE_MOCK;
  }

  return runtimeValue === "true";
}