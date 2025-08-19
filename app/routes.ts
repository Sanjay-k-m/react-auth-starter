import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { authRoutes } from "./features/auth/routes.config";
// import { errorRoutes } from "./errors/routes";

export default [index("pages/home.tsx"), 
...authRoutes,
] satisfies RouteConfig;
