import { Settings, Users, Zap } from "lucide-react";

export const dashboardLinks = [
  {
    to: "/clientes",
    title: "Clientes",
    description:
      "Adesao, saida, alteracao de valor mensal, carteira e rentabilidade.",
    icon: Users,
    tag: "OPERACOES",
  },
  {
    to: "/admin/cesta",
    title: "Admin - Cesta",
    description:
      "Cadastro da Top Five, consulta de cesta atual, historico e conta master.",
    icon: Settings,
    tag: "ADMIN",
  },
  {
    to: "/motor",
    title: "Motor de Compra",
    description: "Execucao manual de compra programada para testes.",
    icon: Zap,
    tag: "ENGINE",
  },
] as const;
