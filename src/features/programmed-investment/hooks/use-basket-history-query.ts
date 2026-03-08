import { useQuery } from "@tanstack/react-query";
import { programmedInvestmentService } from "../services/programmed-investment-service";

export function useBasketHistoryQuery() {
  return useQuery({
    queryKey: ["basket-history"],
    queryFn: async () => {
      const data = await programmedInvestmentService.getBasketHistory();
      return {
        cestas: Array.isArray(data?.cestas) ? data.cestas : [],
      };
    },
    refetchOnMount: "always",
  });
}
