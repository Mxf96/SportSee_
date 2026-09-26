import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "../../styles/dashboard/HeartRateChart.scss";

export default function HeartRateChart({ data, average, periodLabel }) {
  return (
    <article className="dashboard-card dashboard-card--heart">
      <div className="dashboard-card__header">
        <div className="dashboard-card__heading">
          <strong className="dashboard-card__main-value">{average} BPM</strong>

          <p>Fréquence cardiaque moyenne</p>
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
          <ComposedChart
            data={data}
            margin={{
              top: 15,
              right: 5,
              bottom: 5,
              left: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis dataKey="date" axisLine={false} tickLine={false} />

            <YAxis
              domain={["dataMin - 10", "dataMax + 10"]}
              axisLine={false}
              tickLine={false}
              width={35}
            />

            <Tooltip />

            <Bar
              dataKey="min"
              fill="#ffb1a6"
              radius={[8, 8, 8, 8]}
              barSize={9}
            />

            <Bar
              dataKey="max"
              fill="#ff3b1f"
              radius={[8, 8, 8, 8]}
              barSize={9}
            />

            <Line
              type="monotone"
              dataKey="average"
              stroke="#1735f5"
              strokeWidth={2}
              dot={{
                r: 3,
                fill: "#1735f5",
                strokeWidth: 0,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-card__legend">
        <span className="dashboard-card__legend-dot dashboard-card__legend-dot--min" />
        <span>Min</span>

        <span className="dashboard-card__legend-dot dashboard-card__legend-dot--max" />
        <span>Max BPM</span>

        <span className="dashboard-card__legend-dot dashboard-card__legend-dot--average" />
        <span>Moyenne</span>
      </div>
    </article>
  );
}