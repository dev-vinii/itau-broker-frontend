import { useQuery } from "@tanstack/react-query";
import { programmedInvestmentService } from "../services/programmed-investment-service";

export function useProfitabilityQuery(clienteId: number | null) {
  return useQuery({
    queryKey: ["profitability", clienteId],
    queryFn: () => programmedInvestmentService.getProfitability(clienteId as number),
    enabled: Boolean(clienteId),
  });
}
