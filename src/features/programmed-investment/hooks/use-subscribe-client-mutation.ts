import { useMutation } from "@tanstack/react-query";
import { programmedInvestmentService } from "../services/programmed-investment-service";
import { ClientSubscriptionRequest } from "../types";

export function useSubscribeClientMutation() {
  return useMutation({
    mutationFn: (payload: ClientSubscriptionRequest) =>
      programmedInvestmentService.subscribeClient(payload),
  });
}
