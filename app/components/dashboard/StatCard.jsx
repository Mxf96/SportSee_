import "../../styles/dashboard/StatCard.scss";

export default function StatCard({ label, value, unit, variant = "primary" }) {
  return (
    <article className="dashboard-stat">
      <span>{label}</span>

      <strong
        className={variant === "danger" ? "dashboard-stat__distance" : ""}
      >
        {value}
        <small> {unit}</small>
      </strong>
    </article>
  );
}