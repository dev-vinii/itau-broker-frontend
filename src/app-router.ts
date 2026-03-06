import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/root-route";
import { dashboardRoute } from "./routes/dashboard-route";
import { clientesRoute } from "./routes/clientes-route";
import { adminCestaRoute } from "./routes/admin-cesta-route";
import { motorRoute } from "./routes/motor-route";

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  clientesRoute,
  adminCestaRoute,
  motorRoute,
]);

export const router = createRouter({
  routeTree,
  context: {},
});
