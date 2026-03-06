import { useMutation, useQueryClient } from "@tanstack/react-query";
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
        queryKey: ["portfolio", variables.clienteId],
      });
      queryClient.invalidateQueries({
        queryKey: ["profitability", variables.clienteId],
      });
    },
  });
}
