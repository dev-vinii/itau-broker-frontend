import { useQuery } from "@tanstack/react-query";
import { programmedInvestmentService } from "../services/programmed-investment-service";

export function useCurrentBasketQuery() {
  return useQuery({
    queryKey: ["basket-current"],
    queryFn: programmedInvestmentService.getCurrentBasket,
  });
}
