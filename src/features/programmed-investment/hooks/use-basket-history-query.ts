import { useQuery } from "@tanstack/react-query";
import { programmedInvestmentService } from "../services/programmed-investment-service";

export function useBasketHistoryQuery() {
  return useQuery({
    queryKey: ["basket-history"],
    queryFn: programmedInvestmentService.getBasketHistory,
  });
}
