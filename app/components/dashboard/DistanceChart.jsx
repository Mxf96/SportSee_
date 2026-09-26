import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../../styles/dashboard/DistanceChart.scss";

export default function DistanceChart({ data, average, periodLabel }) {
  return (
    <article className="dashboard-card">
      <div className="dashboard-card__header">
        <div className="dashboard-card__heading">
          <strong className="dashboard-card__main-value">
            {average} km en moyenne
          </strong>

          <p>Total des kilomètres des 4 dernières semaines</p>
        </div>

        <div className="dashboard-card__period">
          <button type="button" aria-label="Afficher la période précédente">
            ‹
          </button>

          <span>{periodLabel}</span>

          <button type="button" aria-label="Afficher la période suivante">
            ›
          </button>
        </div>
      </div>

      <div className="dashboard-card__chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 15,
              right: 5,
              bottom: 5,
              left: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis dataKey="week" axisLine={false} tickLine={false} />

            <YAxis axisLine={false} tickLine={false} width={30} />

            <Tooltip />

            <Bar
              dataKey="distance"
              fill="#aab5ff"
              radius={[8, 8, 8, 8]}
              barSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-card__legend">
        <span className="dashboard-card__legend-dot dashboard-card__legend-dot--distance" />

        <span>Km</span>
      </div>
    </article>
  );
}