import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "../services/error";
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
      toast.success("Cesta salva com sucesso.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
