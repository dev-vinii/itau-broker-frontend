import { useMutation, useQueryClient } from "@tanstack/react-query";
import { programmedInvestmentService } from "../services/programmed-investment-service";
import { CreateBasketRequest } from "../types";

export function useCreateBasketMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBasketRequest) =>
      programmedInvestmentService.createBasket(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basket-current"] });
      queryClient.invalidateQueries({ queryKey: ["basket-history"] });
    },
  });
}
