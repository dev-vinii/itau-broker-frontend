import { AdminCestaPage } from "@/pages/admin-cesta";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root-route";

export const adminCestaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/cesta",
  component: AdminCestaPage,
});
