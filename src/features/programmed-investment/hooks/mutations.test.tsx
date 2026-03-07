import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { toast } from "sonner";
import { useCreateBasketMutation } from "./use-create-basket-mutation";
import { useExecutePurchaseMutation } from "./use-purchase-engine";
import { useExitClientMutation } from "./use-exit-client-mutation";
import { useSubscribeClientMutation } from "./use-subscribe-client-mutation";
import { useUpdateMonthlyValueMutation } from "./use-update-monthly-value-mutation";

const serviceMocks = vi.hoisted(() => ({
  createBasket: vi.fn(),
  executePurchase: vi.fn(),
  exitClient: vi.fn(),
  subscribeClient: vi.fn(),
  updateMonthlyValue: vi.fn(),
}));

vi.mock("../services/programmed-investment-service", () => ({
  programmedInvestmentService: serviceMocks,
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

function createWrapper(client: QueryClient) {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}

describe("mutation hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("handles create basket success and error", async () => {
    const queryClient = new QueryClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    const wrapper = createWrapper(queryClient);
    serviceMocks.createBasket.mockResolvedValueOnce({ cestaId: 1 });

    const { result } = renderHook(() => useCreateBasketMutation(), { wrapper });
    result.current.mutate({ nome: "Top", itens: [] });

    await waitFor(() => expect(serviceMocks.createBasket).toHaveBeenCalled());
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["basket-current"] });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["basket-history"] });
    expect(toast.success).toHaveBeenCalled();

    serviceMocks.createBasket.mockRejectedValueOnce({
      response: { data: { erro: "Erro basket", codigo: "E" } },
    });
    result.current.mutate({ nome: "Top", itens: [] });
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Erro basket"));
  });

  it("handles subscribe success and error", async () => {
    const queryClient = new QueryClient();
    const wrapper = createWrapper(queryClient);
    serviceMocks.subscribeClient.mockResolvedValueOnce({ clienteId: 1 });

    const { result } = renderHook(() => useSubscribeClientMutation(), {
      wrapper,
    });
    result.current.mutate({
      nome: "Nome",
      cpf: "123",
      email: "test@test.com",
      valorMensal: 1000,
    });
    await waitFor(() => expect(toast.success).toHaveBeenCalled());

    serviceMocks.subscribeClient.mockRejectedValueOnce({
      response: { data: { erro: "Erro subscribe", codigo: "E" } },
    });
    result.current.mutate({
      nome: "Nome",
      cpf: "123",
      email: "test@test.com",
      valorMensal: 1000,
    });
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Erro subscribe"),
    );
  });

  it("handles exit/update/purchase flows", async () => {
    const queryClient = new QueryClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    const wrapper = createWrapper(queryClient);
    serviceMocks.exitClient.mockResolvedValueOnce({});
    serviceMocks.updateMonthlyValue.mockResolvedValueOnce({});
    serviceMocks.executePurchase.mockResolvedValueOnce({});

    const { result: exit } = renderHook(() => useExitClientMutation(), {
      wrapper,
    });
    exit.current.mutate(7);

    const { result: update } = renderHook(() => useUpdateMonthlyValueMutation(), {
      wrapper,
    });
    update.current.mutate({ clienteId: 7, novoValorMensal: 2500 });

    const { result: purchase } = renderHook(() => useExecutePurchaseMutation(), {
      wrapper,
    });
    purchase.current.mutate("2026-03-01");

    await waitFor(() =>
      expect(serviceMocks.updateMonthlyValue).toHaveBeenCalledWith(7, {
        novoValorMensal: 2500,
      }),
    );
    expect(serviceMocks.exitClient).toHaveBeenCalledWith(7);
    expect(serviceMocks.executePurchase).toHaveBeenCalledWith({
      dataReferencia: "2026-03-01",
    });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["portfolio", 7] });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["profitability", 7] });
    expect(toast.success).toHaveBeenCalled();
  });
});
