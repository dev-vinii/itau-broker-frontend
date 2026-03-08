import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useBasketHistoryQuery } from "./use-basket-history-query";
import { useCurrentBasketQuery } from "./use-current-basket-query";
import { useProfitabilityQuery } from "./use-profitability-query";

const serviceMocks = vi.hoisted(() => ({
  getBasketHistory: vi.fn(),
  getCurrentBasket: vi.fn(),
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

    const queryClient = new QueryClient();
    const wrapper = createWrapper(queryClient);

    const basketHistory = renderHook(() => useBasketHistoryQuery(), {
      wrapper,
    });
    const currentBasket = renderHook(() => useCurrentBasketQuery(), {
      wrapper,
    });

    await waitFor(() =>
      expect(basketHistory.result.current.isSuccess).toBeTruthy(),
    );
    await waitFor(() =>
      expect(currentBasket.result.current.isSuccess).toBeTruthy(),
    );
  });

  it("refetches basket history on mount and normalizes empty payload", async () => {
    serviceMocks.getBasketHistory
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce({ cestas: [] });

    const queryClient = new QueryClient();
    const wrapper = createWrapper(queryClient);

    const firstMount = renderHook(() => useBasketHistoryQuery(), {
      wrapper,
    });

    await waitFor(() =>
      expect(firstMount.result.current.data?.cestas).toEqual([]),
    );

    firstMount.unmount();

    renderHook(() => useBasketHistoryQuery(), { wrapper });

    await waitFor(() =>
      expect(serviceMocks.getBasketHistory).toHaveBeenCalledTimes(2),
    );
  });

  it("respects enabled flag for profitability query", async () => {
    serviceMocks.getProfitability.mockResolvedValue({ rentabilidade: {} });

    const queryClient = new QueryClient();
    const wrapper = createWrapper(queryClient);

    renderHook(() => useProfitabilityQuery(null), { wrapper });
    expect(serviceMocks.getProfitability).not.toHaveBeenCalled();

    renderHook(() => useProfitabilityQuery(9), { wrapper });

    await waitFor(() =>
      expect(serviceMocks.getProfitability).toHaveBeenCalledWith(9),
    );
  });
});
