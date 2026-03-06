import { Link } from "@tanstack/react-router";
import { FeaturePageShell } from "@/features/programmed-investment/components/feature-page-shell";

const links = [
  {
    to: "/clientes",
    title: "Clientes",
    description:
      "Adesao, saida, alteracao de valor mensal, carteira e rentabilidade.",
  },
  {
    to: "/admin/cesta",
    title: "Admin - Cesta",
    description:
      "Cadastro da Top Five, consulta de cesta atual, historico e conta master.",
  },
  {
    to: "/motor",
    title: "Motor de Compra",
    description: "Execucao manual de compra programada para testes.",
  },
] as const;

export function DashboardPage() {
  return (
    <FeaturePageShell
      title="Compra Programada de Acoes"
      description="Frontend para consumir os endpoints de cliente, administracao e motor de compra da Itau Corretora."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {links.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="block rounded-xl border border-white/10 bg-[#0a2342]/60 p-5 transition hover:border-[#ff8a3d]/60 hover:bg-[#123b6b]/70"
          >
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-[#c1d3ed]">{item.description}</p>
          </Link>
        ))}
      </section>
    </FeaturePageShell>
  );
}
