import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

export function useLogin() {
  const { authenticate } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login(username, password) {
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser(username, password);

      authenticate(data.token);

      return true;
    } catch (error) {
      setError(error.message);

      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    login,
    isLoading,
    error,
  };
}