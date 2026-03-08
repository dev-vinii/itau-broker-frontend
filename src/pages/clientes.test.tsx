import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ClientesPage } from "./clientes";

const { useProfitabilityQueryMock } = vi.hoisted(() => ({
  useProfitabilityQueryMock: vi.fn(),
}));

const subscribeMutateMock = vi.fn();
const exitMutateMock = vi.fn();
const updateMutateMock = vi.fn();
const subscribeState = {
  isPending: false,
  isError: false,
  isSuccess: false,
  data: undefined as unknown,
  error: undefined as unknown,
};
const exitState = {
  isPending: false,
  isError: false,
  data: undefined as unknown,
  error: undefined as unknown,
};
const updateState = {
  isPending: false,
  isError: false,
  data: undefined as unknown,
  error: undefined as unknown,
};

vi.mock("@/features/programmed-investment/hooks/use-subscribe-client-mutation", () => ({
  useSubscribeClientMutation: () => ({
    mutate: subscribeMutateMock,
    isPending: subscribeState.isPending,
    isError: subscribeState.isError,
    isSuccess: subscribeState.isSuccess,
    data: subscribeState.data,
    error: subscribeState.error,
  }),
}));

vi.mock("@/features/programmed-investment/hooks/use-exit-client-mutation", () => ({
  useExitClientMutation: () => ({
    mutate: exitMutateMock,
    isPending: exitState.isPending,
    isError: exitState.isError,
    data: exitState.data,
    error: exitState.error,
  }),
}));

vi.mock("@/features/programmed-investment/hooks/use-update-monthly-value-mutation", () => ({
  useUpdateMonthlyValueMutation: () => ({
    mutate: updateMutateMock,
    isPending: updateState.isPending,
    isError: updateState.isError,
    data: updateState.data,
    error: updateState.error,
  }),
}));

vi.mock("@/features/programmed-investment/hooks/use-profitability-query", () => ({
  useProfitabilityQuery: useProfitabilityQueryMock,
}));

describe("ClientesPage", () => {
  beforeEach(() => {
    subscribeMutateMock.mockReset();
    exitMutateMock.mockReset();
    updateMutateMock.mockReset();
    subscribeState.isPending = false;
    subscribeState.isError = false;
    subscribeState.isSuccess = false;
    subscribeState.data = undefined;
    subscribeState.error = undefined;
    exitState.isPending = false;
    exitState.isError = false;
    exitState.data = undefined;
    exitState.error = undefined;
    updateState.isPending = false;
    updateState.isError = false;
    updateState.data = undefined;
    updateState.error = undefined;
    useProfitabilityQueryMock.mockReset();
    useProfitabilityQueryMock.mockReturnValue({
      data: undefined,
      isFetching: false,
    });
  });

  it("does not fetch profitability on initial load", () => {
    render(<ClientesPage />);

    expect(useProfitabilityQueryMock).toHaveBeenCalledWith(null);
  });

  it("submits subscribe payload with parsed monthly value", () => {
    render(<ClientesPage />);
    fireEvent.click(screen.getByRole("button", { name: "Aderir" }));

    expect(subscribeMutateMock).toHaveBeenCalledWith({
      nome: "Joao da Silva",
      cpf: "12345678901",
      email: "joao.silva@email.com",
      valorMensal: 3000,
    });
  });

  it("submits exit and update actions", () => {
    render(<ClientesPage />);
    fireEvent.click(screen.getByRole("button", { name: "Encerrar adesao" }));
    fireEvent.click(screen.getByRole("button", { name: "Atualizar" }));

    expect(exitMutateMock).toHaveBeenCalledWith(1);
    expect(updateMutateMock).toHaveBeenCalledWith({
      clienteId: 1,
      valorMensal: 6000,
    });
  });

  it("shows validation errors for invalid values", () => {
    render(<ClientesPage />);

    const amountInput = screen.getByDisplayValue("3.000");
    fireEvent.change(amountInput, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "Aderir" }));
    expect(
      screen.getByText("Informe um valor mensal valido maior que zero."),
    ).toBeInTheDocument();

    const consultInput = screen.getAllByPlaceholderText("clienteId")[2];
    fireEvent.change(consultInput, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "Consultar" }));
    expect(
      screen.getByText("Informe um Cliente ID valido para consulta."),
    ).toBeInTheDocument();
  });

  it("applies CPF mask in input field", () => {
    render(<ClientesPage />);
    const cpfInput = screen.getByDisplayValue("123.456.789-01");

    fireEvent.change(cpfInput, { target: { value: "98765432100" } });

    expect(screen.getByDisplayValue("987.654.321-00")).toBeInTheDocument();
  });

  it("renders pending and api error states", () => {
    subscribeState.isPending = true;
    subscribeState.isError = true;
    subscribeState.error = {
      response: { data: { erro: "Erro adesao", codigo: "E" } },
    };

    exitState.isPending = true;
    exitState.isError = true;
    exitState.error = {
      response: { data: { erro: "Erro saida", codigo: "E" } },
    };

    updateState.isPending = true;
    updateState.isError = true;
    updateState.error = {
      response: { data: { erro: "Erro update", codigo: "E" } },
    };

    render(<ClientesPage />);

    expect(screen.getByRole("button", { name: "Enviando..." })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Processando..." }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Atualizando..." }),
    ).toBeDisabled();
    expect(screen.getAllByText("Erro adesao").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Erro saida").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Erro update").length).toBeGreaterThan(0);
  });
});
