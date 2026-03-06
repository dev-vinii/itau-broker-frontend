import { useMutation, useQueryClient } from "@tanstack/react-query";
import { programmedInvestmentService } from "../services/programmed-investment-service";

export function useExitClientMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clienteId: number) =>
      programmedInvestmentService.exitClient(clienteId),
    onSuccess: (_, clienteId) => {
      queryClient.invalidateQueries({ queryKey: ["portfolio", clienteId] });
      queryClient.invalidateQueries({ queryKey: ["profitability", clienteId] });
    },
  });
}
