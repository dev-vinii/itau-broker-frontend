import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { useBasketHistoryQuery } from "./use-basket-history-query";
import { useCurrentBasketQuery } from "./use-current-basket-query";
import { useMasterCustodyQuery } from "./use-master-custody-query";
import { usePortfolioQuery } from "./use-portfolio-query";
import { useProfitabilityQuery } from "./use-profitability-query";

const serviceMocks = vi.hoisted(() => ({
  getBasketHistory: vi.fn(),
  getCurrentBasket: vi.fn(),
  getMasterCustody: vi.fn(),
  getPortfolio: vi.fn(),
  getProfitability: vi.fn(),
}));

vi.mock("../services/programmed-investment-service", () => ({
  programmedInvestmentService: serviceMocks,
}));

function createWrapper(client: QueryClient) {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}

describe("query hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads admin queries", async () => {
    serviceMocks.getBasketHistory.mockResolvedValue({ cestas: [] });
    serviceMocks.getCurrentBasket.mockResolvedValue({ cestaId: 1 });
    serviceMocks.getMasterCustody.mockResolvedValue({ custodia: [] });

    const queryClient = new QueryClient();
    const wrapper = createWrapper(queryClient);

    const basketHistory = renderHook(() => useBasketHistoryQuery(), { wrapper });
    const currentBasket = renderHook(() => useCurrentBasketQuery(), { wrapper });
    const masterCustody = renderHook(() => useMasterCustodyQuery(), { wrapper });

    await waitFor(() =>
      expect(basketHistory.result.current.isSuccess).toBeTruthy(),
    );
    await waitFor(() =>
      expect(currentBasket.result.current.isSuccess).toBeTruthy(),
    );
    await waitFor(() =>
      expect(masterCustody.result.current.isSuccess).toBeTruthy(),
    );
  });

  it("respects enabled flag for client queries", async () => {
    serviceMocks.getPortfolio.mockResolvedValue({ ativos: [] });
    serviceMocks.getProfitability.mockResolvedValue({ rentabilidade: {} });

    const queryClient = new QueryClient();
    const wrapper = createWrapper(queryClient);

    renderHook(() => usePortfolioQuery(null), { wrapper });
    renderHook(() => useProfitabilityQuery(null), { wrapper });
    expect(serviceMocks.getPortfolio).not.toHaveBeenCalled();
    expect(serviceMocks.getProfitability).not.toHaveBeenCalled();

    renderHook(() => usePortfolioQuery(9), { wrapper });
    renderHook(() => useProfitabilityQuery(9), { wrapper });

    await waitFor(() => expect(serviceMocks.getPortfolio).toHaveBeenCalledWith(9));
    await waitFor(() =>
      expect(serviceMocks.getProfitability).toHaveBeenCalledWith(9),
    );
  });
});
