import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // Route publique
  index("./routes/login.jsx"),

  // Routes nécessitant une authentification
  layout("./routes/protected-layout.jsx", [
    route("dashboard", "./routes/dashboard.jsx"),
    route("profile", "./routes/profile.jsx"),
  ]),

  // Toutes les routes inexistantes
  route("*", "./routes/not-found.jsx"),
] satisfies RouteConfig;