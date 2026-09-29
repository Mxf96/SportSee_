import { dashboardConfig } from "../config/dashboardConfig";

import {
  getWeeklyDistanceData,
  getAverageWeeklyDistance,
  getHeartRateData,
  getAverageHeartRate,
  getCurrentWeekStats,
} from "../utils/dashboardData";

import { useUserInfo } from "../hooks/useUserInfo";
import { useUserActivity } from "../hooks/useUserActivity";

import ProfileSummary from "../components/dashboard/ProfileSummary";
import DistanceChart from "../components/dashboard/DistanceChart";
import HeartRateChart from "../components/dashboard/HeartRateChart";
import WeeklyGoalChart from "../components/dashboard/WeeklyGoalChart";
import StatCard from "../components/dashboard/StatCard";

import "../styles/dashboard/dashboard.scss";

// =========================
// PERIODE DES ACTIVITES
// =========================

const ACTIVITY_START_DATE = "2025-01-01";
const ACTIVITY_END_DATE = "2025-01-31";

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
  // ACTIVITES UTILISATEUR
  // =========================

  const {
    activities,
    isLoading: isActivityLoading,
    error: activityError,
  } = useUserActivity(ACTIVITY_START_DATE, ACTIVITY_END_DATE);

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
        <p>Aucune activité disponible pour cette période.</p>
      </div>
    );
  }

  // =========================
  // DONNEES UTILISATEUR
  // =========================

  const { profile, statistics } = userInfo;

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
            periodLabel="01 jan - 31 jan"
          />

          <HeartRateChart
            data={heartRateData}
            average={averageHeartRate}
            periodLabel="04 jan - 26 jan"
          />
        </div>
      </section>

      {/* ========================= */}
      {/* CETTE SEMAINE */}
      {/* ========================= */}

      <section className="dashboard__section dashboard__week">
        <div className="dashboard__week-heading">
          <h2 className="dashboard__section-title">Cette semaine</h2>

          <p>Du 22/01/2025 au 28/01/2025</p>
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