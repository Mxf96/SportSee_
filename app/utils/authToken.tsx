const TOKEN_COOKIE_NAME = "sportsee_token";

export function setAuthToken(token: string): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${TOKEN_COOKIE_NAME}=${encodeURIComponent(
    token
  )}; path=/; SameSite=Lax`;
}

export function getAuthToken(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookies = document.cookie.split("; ");

  const tokenCookie = cookies.find((cookie) =>
    cookie.startsWith(`${TOKEN_COOKIE_NAME}=`)
  );

  if (!tokenCookie) {
    return null;
  }

  return decodeURIComponent(tokenCookie.split("=")[1]);
}

export function removeAuthToken(): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${TOKEN_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}