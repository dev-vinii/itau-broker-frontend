import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/clientes", label: "Clientes" },
  { to: "/admin/cesta", label: "Admin Cesta" },
  { to: "/motor", label: "Motor" },
] as const;

export function AppHeader() {
  return (
    <header className="border-b border-faint/40 bg-surface-0/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-6 w-[2px] bg-gold-400" />
          <p className="font-display text-sm font-bold tracking-[0.15em] text-gold-400 uppercase">
            Itau Corretora
          </p>
        </div>
        <nav className="flex items-center gap-1">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-sm px-3 py-1.5 font-mono text-xs tracking-wide text-muted transition-all duration-200 hover:text-cream"
              activeProps={{
                className:
                  "rounded-sm border border-gold-400/20 bg-gold-400/[0.06] px-3 py-1.5 font-mono text-xs tracking-wide text-gold-200",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="gold-line" />
    </header>
  );
}
