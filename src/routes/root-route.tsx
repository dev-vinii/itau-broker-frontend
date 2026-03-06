import { AppHeader } from "@/components/organisms/header";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => (
    <div className="relative min-h-screen bg-surface-0">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-gold-400/[0.04] blur-[120px]" />
        <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-gold-600/[0.03] blur-[100px]" />
        <div className="grid-bg absolute inset-0" />
      </div>
      <div className="relative z-10">
        <AppHeader />
        <Outlet />
      </div>
    </div>
  ),
});
