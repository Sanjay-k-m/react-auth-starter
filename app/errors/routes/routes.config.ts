import { route } from "@react-router/dev/routes";

export const errorRoutes = [
  route("500", "errors/components/ServerError.tsx"),
  route("*", "errors/components/NotFound.tsx"),
];
