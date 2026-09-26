import {
  mockUserInfo,
  mockUserActivity,
  dashboardConfig,
} from "../data/mockData";

import {
  getWeeklyDistanceData,
  getAverageWeeklyDistance,
  getHeartRateData,
  getAverageHeartRate,
  getCurrentWeekStats,
} from "../utils/dashboardData";

import ProfileSummary from "../components/dashboard/ProfileSummary";
import DistanceChart from "../components/dashboard/DistanceChart";
import HeartRateChart from "../components/dashboard/HeartRateChart";
import WeeklyGoalChart from "../components/dashboard/WeeklyGoalChart";
import StatCard from "../components/dashboard/StatCard";

import "../styles/dashboard/dashboard.scss";

export default function Dashboard() {
  const { profile, statistics } = mockUserInfo;

  const weeklyDistance = getWeeklyDistanceData(mockUserActivity);

  const averageWeeklyDistance = getAverageWeeklyDistance(weeklyDistance);

  const heartRateData = getHeartRateData(mockUserActivity);

  const averageHeartRate = getAverageHeartRate(mockUserActivity);

  const weekStats = getCurrentWeekStats(mockUserActivity);

  const weeklyGoal = dashboardConfig.weeklyRunGoal;

  return (
    <div className="dashboard">
      <ProfileSummary
        profile={profile}
        totalDistance={statistics.totalDistance}
      />

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