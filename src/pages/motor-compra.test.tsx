import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MotorCompraPage } from "./motor-compra";

const mutateMock = vi.fn();
const hookState = {
  isPending: false,
  isError: false,
  data: undefined as unknown,
  error: undefined as unknown,
};

vi.mock("@/features/programmed-investment/hooks/use-purchase-engine", () => ({
  useExecutePurchaseMutation: () => ({
    mutate: mutateMock,
    isPending: hookState.isPending,
    isError: hookState.isError,
    data: hookState.data,
    error: hookState.error,
  }),
}));

describe("MotorCompraPage", () => {
  beforeEach(() => {
    mutateMock.mockReset();
    hookState.isPending = false;
    hookState.isError = false;
    hookState.data = undefined;
    hookState.error = undefined;
  });

  it("submits reference date to purchase engine mutation", () => {
    render(<MotorCompraPage />);
    const input = screen.getByLabelText("Data de referencia");

    fireEvent.change(input, { target: { value: "2026-03-07" } });
    fireEvent.click(screen.getByRole("button", { name: "Executar" }));

    expect(mutateMock).toHaveBeenCalledWith("2026-03-07");
  });

  it("renders pending and error states", () => {
    hookState.isPending = true;
    hookState.isError = true;
    hookState.error = {
      response: { data: { erro: "Falha no motor", codigo: "E" } },
    };

    render(<MotorCompraPage />);
    expect(screen.getByRole("button", { name: "Executando..." })).toBeDisabled();
    expect(screen.getByText("Falha no motor")).toBeInTheDocument();
  });
});
