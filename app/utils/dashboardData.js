// =========================
// FORMAT DATE API
// =========================

export function formatDateForApi(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// =========================
// DATE DU JOUR
// =========================

export function getTodayDate() {
  return formatDateForApi(new Date());
}

// =========================
// PERIODE DES ACTIVITES
// =========================

export function getActivityPeriod(activities) {
  if (!activities || activities.length === 0) {
    return null;
  }

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  return {
    startDate: sortedActivities[0].date,
    endDate: sortedActivities[sortedActivities.length - 1].date,
  };
}

// =========================
// FORMAT LIBELLE PERIODE
// =========================

export function formatPeriodLabel(startDate, endDate) {
  if (!startDate || !endDate) {
    return "";
  }

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
    });

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

// =========================
// FORMAT PERIODE COMPLETE
// =========================

export function formatFullPeriodLabel(startDate, endDate) {
  if (!startDate || !endDate) {
    return "";
  }

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("fr-FR");

  return `Du ${formatDate(startDate)} au ${formatDate(endDate)}`;
}

// =========================
// 4 DERNIERES SEMAINES
// =========================

export function getWeeklyDistanceData(activities) {
  const weeks = [
    { week: "S1", distance: 0 },
    { week: "S2", distance: 0 },
    { week: "S3", distance: 0 },
    { week: "S4", distance: 0 },
  ];

  if (!activities || activities.length === 0) {
    return weeks;
  }

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const lastActivityDate = new Date(
    `${sortedActivities[sortedActivities.length - 1].date}T00:00:00`,
  );

  const periodStart = new Date(lastActivityDate);

  periodStart.setDate(lastActivityDate.getDate() - 27);

  sortedActivities.forEach((activity) => {
    const activityDate = new Date(`${activity.date}T00:00:00`);

    const differenceInDays = Math.floor(
      (activityDate - periodStart) / (1000 * 60 * 60 * 24),
    );

    const weekIndex = Math.floor(differenceInDays / 7);

    if (weekIndex >= 0 && weekIndex < 4) {
      weeks[weekIndex].distance += activity.distance;
    }
  });

  return weeks.map((week) => ({
    ...week,
    distance: Number(week.distance.toFixed(1)),
  }));
}

// =========================
// DISTANCE MOYENNE
// =========================

export function getAverageWeeklyDistance(weeklyData) {
  const total = weeklyData.reduce((sum, week) => sum + week.distance, 0);

  return Number((total / weeklyData.length).toFixed(1));
}

// =========================
// FREQUENCE CARDIAQUE
// =========================

export function getHeartRateData(activities) {
  return activities.map((activity) => ({
    date: new Date(`${activity.date}T00:00:00`).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    }),

    min: activity.heartRate.min,
    max: activity.heartRate.max,
    average: activity.heartRate.average,
  }));
}

// =========================
// FREQUENCE CARDIAQUE MOYENNE
// =========================

export function getAverageHeartRate(activities) {
  if (!activities || activities.length === 0) {
    return 0;
  }

  const total = activities.reduce(
    (sum, activity) => sum + activity.heartRate.average,
    0,
  );

  return Math.round(total / activities.length);
}

// =========================
// DERNIERE SEMAINE D'ACTIVITE
// =========================

export function getCurrentWeekPeriod(activities) {
  if (!activities || activities.length === 0) {
    return null;
  }

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const lastActivity = new Date(
    `${sortedActivities[sortedActivities.length - 1].date}T00:00:00`,
  );

  const monday = new Date(lastActivity);

  const day = monday.getDay();

  const difference = day === 0 ? -6 : 1 - day;

  monday.setDate(monday.getDate() + difference);

  const sunday = new Date(monday);

  sunday.setDate(monday.getDate() + 6);

  return {
    startDate: formatDateForApi(monday),
    endDate: formatDateForApi(sunday),
  };
}

// =========================
// STATISTIQUES DERNIERE SEMAINE
// =========================

export function getCurrentWeekStats(activities) {
  const weekPeriod = getCurrentWeekPeriod(activities);

  if (!weekPeriod) {
    return {
      sessions: 0,
      distance: 0,
      duration: 0,
    };
  }

  const currentWeek = activities.filter(
    (activity) =>
      activity.date >= weekPeriod.startDate &&
      activity.date <= weekPeriod.endDate,
  );

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