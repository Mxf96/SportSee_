export function getWeeklyDistanceData(activities) {
  const weeks = [
    { week: "S1", distance: 0 },
    { week: "S2", distance: 0 },
    { week: "S3", distance: 0 },
    { week: "S4", distance: 0 },
  ];

  activities.forEach((activity) => {
    const day = new Date(activity.date).getDate();

    let weekIndex;

    if (day <= 7) {
      weekIndex = 0;
    } else if (day <= 14) {
      weekIndex = 1;
    } else if (day <= 21) {
      weekIndex = 2;
    } else {
      weekIndex = 3;
    }

    weeks[weekIndex].distance += activity.distance;
  });

  return weeks.map((week) => ({
    ...week,
    distance: Number(week.distance.toFixed(1)),
  }));
}

export function getAverageWeeklyDistance(weeklyData) {
  const total = weeklyData.reduce((sum, week) => sum + week.distance, 0);

  return Number((total / weeklyData.length).toFixed(1));
}

export function getHeartRateData(activities) {
  return activities.map((activity) => ({
    date: new Date(activity.date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    }),

    min: activity.heartRate.min,
    max: activity.heartRate.max,
    average: activity.heartRate.average,
  }));
}

export function getAverageHeartRate(activities) {
  const total = activities.reduce(
    (sum, activity) => sum + activity.heartRate.average,
    0,
  );

  return Math.round(total / activities.length);
}

export function getCurrentWeekStats(activities) {
  const currentWeek = activities.filter((activity) => {
    const day = new Date(activity.date).getDate();

    return day >= 22 && day <= 28;
  });

  const distance = currentWeek.reduce(
    (sum, activity) => sum + activity.distance,
    0,
  );

  const duration = currentWeek.reduce(
    (sum, activity) => sum + activity.duration,
    0,
  );

  return {
    sessions: currentWeek.length,
    distance: Number(distance.toFixed(1)),
    duration,
  };
}