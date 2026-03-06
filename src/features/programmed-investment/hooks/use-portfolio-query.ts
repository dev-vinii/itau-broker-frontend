import { useQuery } from "@tanstack/react-query";
import { programmedInvestmentService } from "../services/programmed-investment-service";

export function usePortfolioQuery(clienteId: number | null) {
  return useQuery({
    queryKey: ["portfolio", clienteId],
    queryFn: () => programmedInvestmentService.getPortfolio(clienteId as number),
    enabled: Boolean(clienteId),
  });
}
