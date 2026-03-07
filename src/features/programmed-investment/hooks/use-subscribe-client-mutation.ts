import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "../services/error";
import { programmedInvestmentService } from "../services/programmed-investment-service";
import { ClientSubscriptionRequest } from "../types";

export function useSubscribeClientMutation() {
  return useMutation({
    mutationFn: (payload: ClientSubscriptionRequest) =>
      programmedInvestmentService.subscribeClient(payload),
    onSuccess: () => {
      toast.success("Cliente aderido com sucesso.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
