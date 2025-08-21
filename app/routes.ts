import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { authRoutes } from "./features/auth/routes.config";
import { errorRoutes } from "./errors/routes/routes.config";
// import { errorRoutes } from "./errors/routes";

export default [
  index("features/auth/routes/login.tsx"),
  ...authRoutes,
  ...errorRoutes,
] satisfies RouteConfig;
