import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Modular imports for features
import { authRoutes } from "./features/auth/routes.config";
// import { productRoutes } from "./features/products/routes.config";
// import { dashboardRoutes } from "./features/dashboard/routes.config";

export default [
  // 1. Index route (Landing Page)
  index("routes/home.tsx"),

  // 2. Simple static routes
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),

  // 3. Nested routes with a layout
  route("blog", "routes/blog/layout.tsx", [
    index("routes/blog/index.tsx"), // /blog
    route(":slug", "routes/blog/[slug].tsx"), // /blog/my-first-post
    route("categories/:category", "routes/blog/category.tsx"), // /blog/categories/tech
  ]),

  // 4. Nested routes with auth guard layout
  route("account", "routes/account/layout.tsx", [
    index("routes/account/index.tsx"), // /account
    route("settings", "routes/account/settings.tsx"), // /account/settings
    route("orders", "routes/account/orders.tsx", [
      index("routes/account/orders/index.tsx"), // /account/orders
      route(":orderId", "routes/account/orders/detail.tsx"), // /account/orders/123
    ]),
  ]),

  // 5. Dynamic routes with params
  route("users/:id", "routes/users/user-detail.tsx"), // /users/42

  // 6. Optional params
  route("profile/:tab?", "routes/profile/profile.tsx"), // /profile OR /profile/settings

  // 7. Wildcard / catch-all (404 handler)
  route("*", "routes/not-found.tsx"),

  // 8. Feature modularized routes
  ...authRoutes,      // login, register, forgot-password
//   ...productRoutes,   // product listing, product detail
//   ...dashboardRoutes, // admin dashboard
] satisfies RouteConfig;
