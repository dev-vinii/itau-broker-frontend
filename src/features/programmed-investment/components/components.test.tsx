import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CurrentBasketCard } from "./current-basket-card";
import { FeaturePageShell } from "./feature-page-shell";
import { JsonBlock } from "./json-block";

describe("feature components", () => {
  it("renders FeaturePageShell", () => {
    render(
      <FeaturePageShell title="Titulo" description="Descricao">
        <div>Conteudo</div>
      </FeaturePageShell>,
    );

    expect(screen.getByRole("heading", { name: "Titulo" })).toBeInTheDocument();
    expect(screen.getByText("Descricao")).toBeInTheDocument();
    expect(screen.getByText("Conteudo")).toBeInTheDocument();
  });

  it("renders JsonBlock with fallback and data", () => {
    const { rerender } = render(<JsonBlock title="JSON" />);
    expect(screen.getByText("JSON")).toBeInTheDocument();
    expect(screen.getByText(/Sem dados/i)).toBeInTheDocument();

    rerender(<JsonBlock title="JSON" data={{ ok: true }} />);
    expect(screen.getByText(/"ok": true/)).toBeInTheDocument();
  });

  it("renders CurrentBasketCard empty and with data", () => {
    const { rerender } = render(
      <CurrentBasketCard data={undefined} isFetching={false} />,
    );
    expect(screen.getByText("Cesta ativa")).toBeInTheDocument();
    expect(
      screen.getByText("Nenhuma cesta ativa carregada."),
    ).toBeInTheDocument();

    rerender(
      <CurrentBasketCard
        isFetching
        data={{
          cestaId: 10,
          nome: "Top",
          ativa: true,
          dataCriacao: "2026-03-01T12:00:00.000Z",
          itens: [{ ticker: "ITUB4", percentual: 100, cotacaoAtual: 30.5 }],
        }}
      />,
    );

    expect(screen.getByText("Top")).toBeInTheDocument();
    expect(screen.getByText("ITUB4")).toBeInTheDocument();
    expect(screen.getByText("100.00%")).toBeInTheDocument();
    expect(screen.getByText(/R\$/)).toBeInTheDocument();
  });
});
