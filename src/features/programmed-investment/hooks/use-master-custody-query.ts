import { useQuery } from "@tanstack/react-query";
import { programmedInvestmentService } from "../services/programmed-investment-service";

export function useMasterCustodyQuery() {
  return useQuery({
    queryKey: ["master-custody"],
    queryFn: programmedInvestmentService.getMasterCustody,
  });
}
