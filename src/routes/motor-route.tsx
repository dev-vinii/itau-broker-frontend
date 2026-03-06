import { MotorCompraPage } from "@/pages/motor-compra";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root-route";

export const motorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/motor",
  component: MotorCompraPage,
});
