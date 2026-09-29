import { useEffect, useState } from "react";

import { getUserInfo } from "../services/userService";

import { useAuth } from "../context/AuthContext";

export function useUserInfo() {
  const { logout } = useAuth();

  const [userInfo, setUserInfo] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadUserInfo() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getUserInfo();

        if (isMounted) {
          setUserInfo(data);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        if (error.status === 401) {
          logout();

          return;
        }

        setError(error.message || "Une erreur est survenue.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUserInfo();

    return () => {
      isMounted = false;
    };
  }, [logout]);

  return {
    userInfo,
    isLoading,
    error,
  };
}