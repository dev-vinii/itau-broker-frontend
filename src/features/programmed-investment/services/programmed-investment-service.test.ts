import { axiosInstance } from "@/lib/axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { programmedInvestmentService } from "./programmed-investment-service";

vi.mock("@/lib/axios", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

describe("programmedInvestmentService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls subscribe client endpoint", async () => {
    vi.mocked(axiosInstance.post).mockResolvedValueOnce({ data: { ok: true } });
    await programmedInvestmentService.subscribeClient({
      nome: "Nome",
      cpf: "123",
      email: "mail@test.com",
      valorMensal: 1000,
    });
    expect(axiosInstance.post).toHaveBeenCalledWith("/clientes/adesao", {
      nome: "Nome",
      cpf: "123",
      email: "mail@test.com",
      valorMensal: 1000,
    });
  });

  it("calls all read endpoints", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { ok: true } });
    await programmedInvestmentService.getProfitability(1);
    await programmedInvestmentService.getCurrentBasket();
    await programmedInvestmentService.getBasketHistory();

    expect(axiosInstance.get).toHaveBeenCalledWith("/clientes/1/rentabilidade");
    expect(axiosInstance.get).toHaveBeenCalledWith("/admin/cesta/atual");
    expect(axiosInstance.get).toHaveBeenCalledWith("/admin/cesta/historico");
  });

  it("calls mutation endpoints", async () => {
    vi.mocked(axiosInstance.post).mockResolvedValue({ data: { ok: true } });
    vi.mocked(axiosInstance.put).mockResolvedValue({ data: { ok: true } });

    await programmedInvestmentService.exitClient(10);
    await programmedInvestmentService.updateMonthlyValue(10, {
      valorMensal: 2000,
    });
    await programmedInvestmentService.createBasket({
      nome: "Top",
      itens: [{ ticker: "ITUB4", percentual: 100 }],
    });
    await programmedInvestmentService.executePurchase({
      dataReferencia: "2026-03-01",
    });

    expect(axiosInstance.post).toHaveBeenCalledWith("/clientes/10/saida");
    expect(axiosInstance.put).toHaveBeenCalledWith(
      "/clientes/10/valor-mensal",
      { valorMensal: 2000 },
    );
    expect(axiosInstance.post).toHaveBeenCalledWith("/admin/cesta", {
      nome: "Top",
      itens: [{ ticker: "ITUB4", percentual: 100 }],
    });
    expect(axiosInstance.post).toHaveBeenCalledWith("/motor/executar-compra", {
      dataReferencia: "2026-03-01",
    });
  });
});
