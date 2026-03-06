import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/clientes", label: "Clientes" },
  { to: "/admin/cesta", label: "Admin Cesta" },
  { to: "/motor", label: "Motor" },
] as const;

export function AppHeader() {
  return (
    <header className="border-b border-white/10 bg-[#04152b]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-wide text-[#ff9a5b]">
          ITAU CORRETORA
        </p>
        <nav className="flex items-center gap-2">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-[#d9e8ff] transition hover:bg-[#ff6200]/15 hover:text-white"
              activeProps={{
                className:
                  "rounded-md bg-[#ff6200]/20 px-3 py-2 text-sm text-[#ffd5bd]",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
