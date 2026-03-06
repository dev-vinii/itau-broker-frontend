import { useMutation } from "@tanstack/react-query";
import { programmedInvestmentService } from "../services/programmed-investment-service";

export function useExecutePurchaseMutation() {
  return useMutation({
    mutationFn: (dataReferencia: string) =>
      programmedInvestmentService.executePurchase({ dataReferencia }),
  });
}
