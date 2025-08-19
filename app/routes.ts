import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { authRoutes } from "./features/auth/routes.config";

export default [index("routes/home.tsx"), 
...authRoutes,
] satisfies RouteConfig;
