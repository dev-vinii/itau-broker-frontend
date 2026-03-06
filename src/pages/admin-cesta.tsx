import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FeaturePageShell } from "@/features/programmed-investment/components/feature-page-shell";
import { JsonBlock } from "@/features/programmed-investment/components/json-block";
import { useBasketHistoryQuery } from "@/features/programmed-investment/hooks/use-basket-history-query";
import { useCreateBasketMutation } from "@/features/programmed-investment/hooks/use-create-basket-mutation";
import { useCurrentBasketQuery } from "@/features/programmed-investment/hooks/use-current-basket-query";
import { useMasterCustodyQuery } from "@/features/programmed-investment/hooks/use-master-custody-query";
import { getApiErrorMessage } from "@/features/programmed-investment/services/error";
import { FormEvent, useState } from "react";

const initialBasketItems = [
  { ticker: "PETR4", percentual: "30" },
  { ticker: "VALE3", percentual: "25" },
  { ticker: "ITUB4", percentual: "20" },
  { ticker: "BBDC4", percentual: "15" },
  { ticker: "WEGE3", percentual: "10" },
];

export function AdminCestaPage() {
  const [nome, setNome] = useState("Top Five - Fevereiro 2026");
  const [itens, setItens] = useState(initialBasketItems);

  const createBasketMutation = useCreateBasketMutation();
  const currentBasketQuery = useCurrentBasketQuery();
  const basketHistoryQuery = useBasketHistoryQuery();
  const masterCustodyQuery = useMasterCustodyQuery();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createBasketMutation.mutate({
      nome,
      itens: itens.map((item) => ({
        ticker: item.ticker,
        percentual: Number(item.percentual),
      })),
    });
  };

  const handleItemChange = (
    index: number,
    field: "ticker" | "percentual",
    value: string,
  ) => {
    setItens((previous) =>
      previous.map((item, currentIndex) =>
        currentIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  return (
    <FeaturePageShell
      title="Administracao da Cesta"
      description="Cadastro de cesta Top Five e consultas administrativas (cesta atual, historico e custodia master)."
    >
      <section className="rounded-xl border border-white/10 bg-[#0a2342]/60 p-6">
        <h2 className="mb-4 text-lg font-semibold">Cadastrar/alterar cesta</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />

          <div className="grid gap-3 md:grid-cols-2">
            {itens.map((item, index) => (
              <div
                key={`${index}-${item.ticker}`}
                className="grid gap-2 sm:grid-cols-2"
              >
                <Input
                  value={item.ticker}
                  onChange={(event) =>
                    handleItemChange(
                      index,
                      "ticker",
                      event.target.value.toUpperCase(),
                    )
                  }
                  placeholder="Ticker"
                />
                <Input
                  type="number"
                  value={item.percentual}
                  onChange={(event) =>
                    handleItemChange(index, "percentual", event.target.value)
                  }
                  placeholder="Percentual"
                />
              </div>
            ))}
          </div>

          <Button type="submit" disabled={createBasketMutation.isPending}>
            {createBasketMutation.isPending ? "Salvando..." : "Salvar cesta"}
          </Button>
        </form>

        {createBasketMutation.isError && (
          <p className="mt-3 text-sm text-red-300">
            {getApiErrorMessage(createBasketMutation.error)}
          </p>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <JsonBlock
          title="Resposta de criacao da cesta"
          data={createBasketMutation.data}
        />

        <JsonBlock
          title="Cesta atual"
          data={currentBasketQuery.data}
          extra={
            currentBasketQuery.isFetching ? (
              <span className="text-xs text-[#c1d3ed]">Carregando...</span>
            ) : null
          }
        />

        <JsonBlock
          title="Historico de cestas"
          data={basketHistoryQuery.data}
          extra={
            basketHistoryQuery.isFetching ? (
              <span className="text-xs text-[#c1d3ed]">Carregando...</span>
            ) : null
          }
        />

        <JsonBlock
          title="Custodia da conta master"
          data={masterCustodyQuery.data}
          extra={
            masterCustodyQuery.isFetching ? (
              <span className="text-xs text-[#c1d3ed]">Carregando...</span>
            ) : null
          }
        />
      </section>
    </FeaturePageShell>
  );
}
