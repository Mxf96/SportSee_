import { mockUserInfo, mockUserActivity } from "../data/mockData";

import {
  formatDuration,
  formatHeight,
  getLastActivityDate,
  getRestDays,
  getTotalCalories,
} from "../utils/profileData";

import "../styles/profile.scss";

export function meta() {
  return [
    {
      title: "Mon profil | SportSee",
    },
  ];
}

export default function Profile() {
  const { profile, statistics } = mockUserInfo;

  // =========================
  // DATE D'INSCRIPTION
  // =========================

  const memberSince = new Date(
    `${profile.createdAt}T00:00:00`,
  ).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // =========================
  // DUREE TOTALE
  // =========================

  const duration = formatDuration(statistics.totalDuration);

  // =========================
  // TAILLE
  // =========================

  const formattedHeight = formatHeight(profile.height);

  // =========================
  // CALORIES
  // =========================

  const totalCalories = getTotalCalories(mockUserActivity);

  // =========================
  // JOURS DE REPOS
  // =========================

  const lastActivityDate = getLastActivityDate(mockUserActivity);

  const restDays = lastActivityDate
    ? getRestDays(mockUserActivity, profile.createdAt, lastActivityDate)
    : 0;

  return (
    <div className="profile-page">
      {/* ========================= */}
      {/* COLONNE GAUCHE */}
      {/* ========================= */}

      <section className="profile-page__left">
        {/* IDENTITE */}

        <article className="profile-identity">
          <img
            className="profile-identity__picture"
            src={profile.profilePicture}
            alt={`${profile.firstName} ${profile.lastName}`}
          />

          <div className="profile-identity__information">
            <h1>
              {profile.firstName} {profile.lastName}
            </h1>

            <p>Membre depuis le {memberSince}</p>
          </div>
        </article>

        {/* PROFIL */}

        <article className="profile-details">
          <h2>Votre profil</h2>

          <div className="profile-details__separator" />

          <dl className="profile-details__list">
            <div className="profile-details__item">
              <dt>Âge :</dt>

              <dd>{profile.age} ans</dd>
            </div>

            <div className="profile-details__item">
              <dt>Taille :</dt>

              <dd>{formattedHeight}</dd>
            </div>

            <div className="profile-details__item">
              <dt>Poids :</dt>

              <dd>{profile.weight} kg</dd>
            </div>
          </dl>
        </article>
      </section>

      {/* ========================= */}
      {/* STATISTIQUES */}
      {/* ========================= */}

      <section className="profile-page__statistics">
        <div className="profile-page__statistics-heading">
          <h2>Vos statistiques</h2>

          <p>depuis le {memberSince}</p>
        </div>

        <div className="profile-stats">
          {/* TEMPS TOTAL */}

          <article className="profile-stat-card">
            <span className="profile-stat-card__label">Temps total couru</span>

            <strong className="profile-stat-card__value">
              {duration.hours}h<small> {duration.minutes}min</small>
            </strong>
          </article>

          {/* CALORIES */}

          <article className="profile-stat-card">
            <span className="profile-stat-card__label">Calories brûlées</span>

            <strong className="profile-stat-card__value">
              {totalCalories}

              <small> cal</small>
            </strong>
          </article>

          {/* DISTANCE */}

          <article className="profile-stat-card">
            <span className="profile-stat-card__label">
              Distance totale parcourue
            </span>

            <strong className="profile-stat-card__value">
              {statistics.totalDistance}

              <small> km</small>
            </strong>
          </article>

          {/* REPOS */}

          <article className="profile-stat-card">
            <span className="profile-stat-card__label">
              Nombre de jours de repos
            </span>

            <strong className="profile-stat-card__value">
              {restDays}

              <small> {restDays > 1 ? "jours" : "jour"}</small>
            </strong>
          </article>

          {/* SESSIONS */}

          <article className="profile-stat-card">
            <span className="profile-stat-card__label">Nombre de sessions</span>

            <strong className="profile-stat-card__value">
              {statistics.totalSessions}

              <small> sessions</small>
            </strong>
          </article>
        </div>
      </section>
    </div>
  );
}