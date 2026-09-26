import "../../styles/dashboard/ProfileSummary.scss";

export default function ProfileSummary({ profile, totalDistance }) {
  return (
    <section className="dashboard__profile-card">
      <div className="dashboard__profile">
        <img
          className="dashboard__profile-picture"
          src={profile.profilePicture}
          alt={`${profile.firstName} ${profile.lastName}`}
        />

        <div className="dashboard__profile-info">
          <h1>
            {profile.firstName} {profile.lastName}
          </h1>

          <p>
            Membre depuis le{" "}
            {new Date(profile.createdAt).toLocaleDateString("fr-FR")}
          </p>
        </div>
      </div>

      <div className="dashboard__distance">
        <span className="dashboard__distance-label">
          Distance totale parcourue
        </span>

        <div className="dashboard__distance-value">
          <img
            className="dashboard__distance-icon"
            src="/Icon/OUTLINE.png"
            alt=""
            aria-hidden="true"
          />

          <strong>{totalDistance} km</strong>
        </div>
      </div>
    </section>
  );
}