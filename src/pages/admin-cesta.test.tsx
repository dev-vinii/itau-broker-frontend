import { fireEvent, render, screen } from "@testing-library/react";
import { AdminCestaPage } from "./admin-cesta";

const createMutateMock = vi.fn();
const createState = {
  isPending: false,
  isError: false,
  data: undefined as unknown,
  error: undefined as unknown,
};
const queryState = {
  isFetching: false,
};

vi.mock("@/features/programmed-investment/hooks/use-create-basket-mutation", () => ({
  useCreateBasketMutation: () => ({
    mutate: createMutateMock,
    isPending: createState.isPending,
    isError: createState.isError,
    data: createState.data,
    error: createState.error,
  }),
}));

vi.mock("@/features/programmed-investment/hooks/use-current-basket-query", () => ({
  useCurrentBasketQuery: () => ({
    data: undefined,
    isFetching: queryState.isFetching,
  }),
}));

vi.mock("@/features/programmed-investment/hooks/use-basket-history-query", () => ({
  useBasketHistoryQuery: () => ({
    data: undefined,
    isFetching: queryState.isFetching,
  }),
}));

vi.mock("@/features/programmed-investment/hooks/use-master-custody-query", () => ({
  useMasterCustodyQuery: () => ({
    data: undefined,
    isFetching: queryState.isFetching,
  }),
}));

describe("AdminCestaPage", () => {
  beforeEach(() => {
    createMutateMock.mockReset();
    createState.isPending = false;
    createState.isError = false;
    createState.data = undefined;
    createState.error = undefined;
    queryState.isFetching = false;
  });

  it("keeps focus while typing ticker and submits valid basket", () => {
    render(<AdminCestaPage />);

    const [nameInput] = screen.getAllByRole("textbox");
    fireEvent.change(nameInput, { target: { value: "Top Five" } });

    const tickerInputs = screen.getAllByPlaceholderText("Ticker");
    const percentInputs = screen.getAllByPlaceholderText("%");

    tickerInputs[0].focus();
    fireEvent.change(tickerInputs[0], { target: { value: "TICK1" } });
    expect(document.activeElement).toBe(tickerInputs[0]);

    tickerInputs.slice(1).forEach((input, index) => {
      fireEvent.change(input, { target: { value: `TICK${index + 2}` } });
    });

    percentInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "20" } });
    });

    fireEvent.click(screen.getByRole("button", { name: "Salvar cesta" }));

    expect(createMutateMock).toHaveBeenCalledWith({
      nome: "Top Five",
      itens: [
        { ticker: "TICK1", percentual: 20 },
        { ticker: "TICK2", percentual: 20 },
        { ticker: "TICK3", percentual: 20 },
        { ticker: "TICK4", percentual: 20 },
        { ticker: "TICK5", percentual: 20 },
      ],
    });
  });

  it("shows validation and api error states", () => {
    createState.isError = true;
    createState.error = {
      response: { data: { erro: "Erro na cesta", codigo: "E" } },
    };
    queryState.isFetching = true;

    render(<AdminCestaPage />);

    fireEvent.click(screen.getByRole("button", { name: "Salvar cesta" }));
    expect(screen.getByText("Informe o nome da cesta.")).toBeInTheDocument();
    expect(screen.getByText("Erro na cesta")).toBeInTheDocument();
  });
});
