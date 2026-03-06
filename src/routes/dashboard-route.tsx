import { DashboardPage } from "@/pages/dashboard";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root-route";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});
