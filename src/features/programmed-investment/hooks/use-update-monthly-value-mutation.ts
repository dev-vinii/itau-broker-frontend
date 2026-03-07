import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "../services/error";
import { programmedInvestmentService } from "../services/programmed-investment-service";

export function useUpdateMonthlyValueMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      clienteId,
      novoValorMensal,
    }: {
      clienteId: number;
      novoValorMensal: number;
    }) =>
      programmedInvestmentService.updateMonthlyValue(clienteId, {
        novoValorMensal,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profitability", variables.clienteId],
      });
      toast.success("Valor mensal atualizado com sucesso.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
