import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

import "../../styles/dashboard/WeeklyGoalChart.scss";

const COLORS = ["#1735f5", "#aab5ff"];

function GoalPieShape(props) {
  const color = COLORS[props.index % COLORS.length];

  return <Sector {...props} fill={color} />;
}

export default function WeeklyGoalChart({ sessions, goal }) {
  const remainingSessions = Math.max(goal - sessions, 0);

  const goalData = [
    {
      name: "Réalisées",
      value: sessions,
    },
    {
      name: "Restantes",
      value: remainingSessions,
    },
  ];

  return (
    <article className="dashboard-card dashboard-card--goal">
      <div>
        <strong className="dashboard-card__goal-value">X{sessions}</strong>

        <span className="dashboard-card__goal-target">
          sur objectif de {goal}
        </span>

        <p>Courses hebdomadaires réalisées</p>
      </div>

      <div className="dashboard-card__donut">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={goalData}
              dataKey="value"
              innerRadius={48}
              outerRadius={70}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              shape={GoalPieShape}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="dashboard-card__goal-legend dashboard-card__goal-legend--done">
          <span className="dashboard-card__legend-dot dashboard-card__legend-dot--goal" />

          <span>{sessions} réalisées</span>
        </div>

        <div className="dashboard-card__goal-legend dashboard-card__goal-legend--remaining">
          <span className="dashboard-card__legend-dot dashboard-card__legend-dot--remaining" />

          <span>{remainingSessions} restantes</span>
        </div>
      </div>
    </article>
  );
}