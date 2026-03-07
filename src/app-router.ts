import { createRouter } from "@tanstack/react-router";
import { adminCestaRoute } from "./routes/admin-cesta-route";
import { clientesRoute } from "./routes/clientes-route";
import { dashboardRoute } from "./routes/dashboard-route";
import { motorRoute } from "./routes/motor-route";
import { rootRoute } from "./routes/root-route";

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
