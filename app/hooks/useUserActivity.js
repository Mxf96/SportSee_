import { useEffect, useState } from "react";

import { getUserActivity } from "../services/activityService";

import { useAuth } from "../context/AuthContext";

export function useUserActivity(startDate, endDate) {
  const { logout } = useAuth();

  const [activities, setActivities] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (!startDate || !endDate) {
      setActivities([]);
      setIsLoading(false);
      setError(null);

      return;
    }

    async function loadActivities() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getUserActivity(startDate, endDate);

        if (isMounted) {
          setActivities(data);
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

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, [startDate, endDate, logout]);

  return {
    activities,
    isLoading,
    error,
  };
}