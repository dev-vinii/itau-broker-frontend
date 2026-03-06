import { AppHeader } from "@/components/organisms/header";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gradient-to-br from-[#04152b] via-[#0a2342] to-[#123b6b]">
      <AppHeader />
      <Outlet />
    </div>
  ),
});
