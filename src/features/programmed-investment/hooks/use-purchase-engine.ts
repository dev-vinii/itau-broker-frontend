import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "../services/error";
import { programmedInvestmentService } from "../services/programmed-investment-service";

export function useExecutePurchaseMutation() {
  return useMutation({
    mutationFn: (dataReferencia: string) =>
      programmedInvestmentService.executePurchase({ dataReferencia }),
    onSuccess: () => {
      toast.success("Execucao do motor concluida com sucesso.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
