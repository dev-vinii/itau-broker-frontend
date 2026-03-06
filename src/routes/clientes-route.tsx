import { ClientesPage } from "@/pages/clientes";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root-route";

export const clientesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clientes",
  component: ClientesPage,
});
