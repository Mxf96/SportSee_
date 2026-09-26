export function getTotalCalories(activities) {
  return activities.reduce(
    (total, activity) => total + activity.caloriesBurned,
    0,
  );
}

export function getRestDays(activities, startDate, endDate) {
  if (!startDate || !endDate) {
    return 0;
  }

  const activityDays = new Set(activities.map((activity) => activity.date));

  const currentDate = createLocalDate(startDate);
  const lastDate = createLocalDate(endDate);

  let restDays = 0;

  while (currentDate <= lastDate) {
    const formattedDate = formatDateToISO(currentDate);

    if (!activityDays.has(formattedDate)) {
      restDays++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return restDays;
}

export function getLastActivityDate(activities) {
  if (!activities.length) {
    return null;
  }

  return activities.reduce((latestDate, activity) => {
    return activity.date > latestDate ? activity.date : latestDate;
  }, activities[0].date);
}

export function formatDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    hours,
    minutes,
  };
}

export function formatHeight(heightInCentimeters) {
  const meters = Math.floor(heightInCentimeters / 100);

  const centimeters = heightInCentimeters % 100;

  return `${meters}m${String(centimeters).padStart(2, "0")}`;
}

function createLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatDateToISO(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}