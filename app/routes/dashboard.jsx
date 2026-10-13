import { dashboardConfig } from "../config/dashboardConfig";

import {
  getWeeklyDistanceData,
  getAverageWeeklyDistance,
  getHeartRateData,
  getAverageHeartRate,
  getCurrentWeekStats,
  getActivityPeriod,
  getCurrentWeekPeriod,
  getTodayDate,
  formatPeriodLabel,
  formatFullPeriodLabel,
} from "../utils/dashboardData";

import { useUserInfo } from "../hooks/useUserInfo";
import { useUserActivity } from "../hooks/useUserActivity";

import ProfileSummary from "../components/dashboard/ProfileSummary";
import DistanceChart from "../components/dashboard/DistanceChart";
import HeartRateChart from "../components/dashboard/HeartRateChart";
import WeeklyGoalChart from "../components/dashboard/WeeklyGoalChart";
import StatCard from "../components/dashboard/StatCard";

import "../styles/dashboard/dashboard.scss";

export function meta() {
  return [
    {
      title: "Dashboard | SportSee",
    },
  ];
}

export default function Dashboard() {
  // =========================
  // INFORMATIONS UTILISATEUR
  // =========================

  const {
    userInfo,
    isLoading: isUserLoading,
    error: userError,
  } = useUserInfo();

  // =========================
  // PERIODE DE RECHERCHE API
  // =========================

  const activityStartDate = userInfo?.profile?.createdAt || null;

  const activityEndDate = getTodayDate();

  // =========================
  // ACTIVITES UTILISATEUR
  // =========================

  const {
    activities,
    isLoading: isActivityLoading,
    error: activityError,
  } = useUserActivity(activityStartDate, activityEndDate);

  // =========================
  // CHARGEMENT
  // =========================

  const isLoading = isUserLoading || isActivityLoading;

  if (isLoading) {
    return (
      <div className="dashboard">
        <p>Chargement du dashboard...</p>
      </div>
    );
  }

  // =========================
  // ERREURS
  // =========================

  const error = userError || activityError;

  if (error) {
    return (
      <div className="dashboard">
        <p>Erreur : {error}</p>
      </div>
    );
  }

  // =========================
  // VERIFICATION UTILISATEUR
  // =========================

  if (!userInfo) {
    return (
      <div className="dashboard">
        <p>Aucune donnée utilisateur disponible.</p>
      </div>
    );
  }

  // =========================
  // VERIFICATION ACTIVITES
  // =========================

  if (!activities || activities.length === 0) {
    return (
      <div className="dashboard">
        <p>Aucune activité disponible.</p>
      </div>
    );
  }

  // =========================
  // DONNEES UTILISATEUR
  // =========================

  const { profile, statistics } = userInfo;

  // =========================
  // PERIODES REELLES
  // =========================

  const activityPeriod = getActivityPeriod(activities);

  const currentWeekPeriod = getCurrentWeekPeriod(activities);

  // =========================
  // DISTANCE
  // =========================

  const weeklyDistance = getWeeklyDistanceData(activities);

  const averageWeeklyDistance = getAverageWeeklyDistance(weeklyDistance);

  // =========================
  // FREQUENCE CARDIAQUE
  // =========================

  const heartRateData = getHeartRateData(activities);

  const averageHeartRate = getAverageHeartRate(activities);

  // =========================
  // SEMAINE ACTUELLE
  // =========================

  const weekStats = getCurrentWeekStats(activities);

  const weeklyGoal = dashboardConfig.weeklyRunGoal;

  // =========================
  // LIBELLES DE PERIODE
  // =========================

  const activityPeriodLabel = formatPeriodLabel(
    activityPeriod.startDate,
    activityPeriod.endDate,
  );

  const currentWeekLabel = formatFullPeriodLabel(
    currentWeekPeriod.startDate,
    currentWeekPeriod.endDate,
  );

  // =========================
  // AFFICHAGE
  // =========================

  return (
    <div className="dashboard">
      {/* ========================= */}
      {/* PROFIL */}
      {/* ========================= */}

      <ProfileSummary
        profile={profile}
        totalDistance={statistics.totalDistance}
      />

      {/* ========================= */}
      {/* PERFORMANCES */}
      {/* ========================= */}

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Vos dernières performances</h2>

        <div className="dashboard__performance-grid">
          <DistanceChart
            data={weeklyDistance}
            average={averageWeeklyDistance}
            periodLabel={activityPeriodLabel}
          />

          <HeartRateChart
            data={heartRateData}
            average={averageHeartRate}
            periodLabel={activityPeriodLabel}
          />
        </div>
      </section>

      {/* ========================= */}
      {/* CETTE SEMAINE */}
      {/* ========================= */}

      <section className="dashboard__section dashboard__week">
        <div className="dashboard__week-heading">
          <h2 className="dashboard__section-title">Cette semaine</h2>

          <p>{currentWeekLabel}</p>
        </div>

        <div className="dashboard__week-grid">
          <WeeklyGoalChart sessions={weekStats.sessions} goal={weeklyGoal} />

          <div className="dashboard__week-stats">
            <StatCard
              label="Durée d'activité"
              value={weekStats.duration}
              unit="minutes"
            />

            <StatCard
              label="Distance"
              value={weekStats.distance}
              unit="kilomètres"
              variant="danger"
            />
          </div>
        </div>
      </section>
    </div>
  );
}