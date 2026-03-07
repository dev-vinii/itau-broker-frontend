import { FeaturePageShell } from "@/features/programmed-investment/components/feature-page-shell";
import { dashboardLinks } from "@/features/programmed-investment/constants/dashboard-links";
import { Link } from "@tanstack/react-router";

export function DashboardPage() {
  return (
    <FeaturePageShell
      title="Compra Programada de Acoes"
      description="Frontend para consumir os endpoints de cliente, administracao e motor de compra da Itau Corretora."
    >
      <section className="grid gap-5 md:grid-cols-3">
        {dashboardLinks.map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            className={`animate-fade-up stagger-${index + 1} group relative overflow-hidden rounded-lg border border-faint/30 bg-surface-1/60 p-6 transition-all duration-300 hover:border-gold-400/30 hover:bg-surface-2/80`}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-400/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.15em] text-gold-400/60">
                  {item.tag}
                </span>
                <item.icon className="h-4 w-4 text-faint transition-colors group-hover:text-gold-400/60" />
              </div>

              <h2 className="font-display text-lg font-bold text-cream">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>

              <div className="mt-5 flex items-center gap-1 font-mono text-[10px] tracking-wider text-gold-400/50 uppercase transition-colors group-hover:text-gold-400">
                <span>Acessar</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </FeaturePageShell>
  );
}
