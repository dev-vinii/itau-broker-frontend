import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FeaturePageShell } from "@/features/programmed-investment/components/feature-page-shell";
import { JsonBlock } from "@/features/programmed-investment/components/json-block";
import { useBasketHistoryQuery } from "@/features/programmed-investment/hooks/use-basket-history-query";
import { useCreateBasketMutation } from "@/features/programmed-investment/hooks/use-create-basket-mutation";
import { useCurrentBasketQuery } from "@/features/programmed-investment/hooks/use-current-basket-query";
import { useMasterCustodyQuery } from "@/features/programmed-investment/hooks/use-master-custody-query";
import { getApiErrorMessage } from "@/features/programmed-investment/services/error";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

const initialBasketItems = [
  { ticker: "PETR4", percentual: "30" },
  { ticker: "VALE3", percentual: "25" },
  { ticker: "ITUB4", percentual: "20" },
  { ticker: "BBDC4", percentual: "15" },
  { ticker: "WEGE3", percentual: "10" },
];

function LoadingSpinner() {
  return <Loader2 className="h-3.5 w-3.5 animate-spin text-gold-400" />;
}

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

  const totalPercent = itens.reduce(
    (sum, item) => sum + Number(item.percentual || 0),
    0,
  );

  return (
    <FeaturePageShell
      title="Administracao da Cesta"
      description="Cadastro de cesta Top Five e consultas administrativas (cesta atual, historico e custodia master)."
    >
      <section className="animate-fade-up rounded-lg border border-faint/30 bg-surface-1/60 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-sm bg-gold-400/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-gold-400 uppercase">
              POST
            </span>
            <h2 className="font-display text-base font-bold text-cream">
              Cadastrar/alterar cesta
            </h2>
          </div>
          <span
            className={`font-mono text-xs ${totalPercent === 100 ? "text-success" : "text-danger"}`}
          >
            {totalPercent}%
          </span>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block font-mono text-[10px] tracking-wider text-muted uppercase">
              Nome da Cesta
            </label>
            <Input
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[10px] tracking-wider text-muted uppercase">
              Composicao
            </p>
            <div className="grid gap-2">
              {itens.map((item, index) => (
                <div
                  key={`${index}-${item.ticker}`}
                  className={`animate-fade-up stagger-${index + 1} grid grid-cols-[1fr_100px] items-center gap-2`}
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
                  <div className="relative">
                    <Input
                      type="number"
                      value={item.percentual}
                      onChange={(event) =>
                        handleItemChange(index, "percentual", event.target.value)
                      }
                      placeholder="%"
                      className="pr-7"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-faint">
                      %
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={createBasketMutation.isPending}>
            {createBasketMutation.isPending ? "Salvando..." : "Salvar cesta"}
          </Button>
        </form>

        {createBasketMutation.isError && (
          <p className="mt-3 font-mono text-xs text-danger">
            {getApiErrorMessage(createBasketMutation.error)}
          </p>
        )}
      </section>

      <div className="gold-line" />

      <section className="grid gap-5 lg:grid-cols-2">
        <JsonBlock
          title="Resposta de criacao da cesta"
          data={createBasketMutation.data}
        />

        <JsonBlock
          title="Cesta atual"
          data={currentBasketQuery.data}
          extra={currentBasketQuery.isFetching ? <LoadingSpinner /> : null}
        />

        <JsonBlock
          title="Historico de cestas"
          data={basketHistoryQuery.data}
          extra={basketHistoryQuery.isFetching ? <LoadingSpinner /> : null}
        />

        <JsonBlock
          title="Custodia da conta master"
          data={masterCustodyQuery.data}
          extra={masterCustodyQuery.isFetching ? <LoadingSpinner /> : null}
        />
      </section>
    </FeaturePageShell>
  );
}
