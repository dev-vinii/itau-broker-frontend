import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { CurrentBasketCard } from "@/features/programmed-investment/components/current-basket-card";
import { FeaturePageShell } from "@/features/programmed-investment/components/feature-page-shell";
import { useBasketHistoryQuery } from "@/features/programmed-investment/hooks/use-basket-history-query";
import { useCreateBasketMutation } from "@/features/programmed-investment/hooks/use-create-basket-mutation";
import { useCurrentBasketQuery } from "@/features/programmed-investment/hooks/use-current-basket-query";
import { getApiErrorMessage } from "@/features/programmed-investment/services/error";
import { formatPercentageInput, parsePercentageInput } from "@/lib/input-masks";
import { FormEvent, useState } from "react";

const createEmptyBasketItems = () =>
  Array.from({ length: 5 }, () => ({ ticker: "", percentual: "" }));

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR");
}

export function AdminCestaPage() {
  const [nome, setNome] = useState("");
  const [itens, setItens] = useState(createEmptyBasketItems);
  const [validationError, setValidationError] = useState("");

  const createBasketMutation = useCreateBasketMutation();
  const currentBasketQuery = useCurrentBasketQuery();
  const basketHistoryQuery = useBasketHistoryQuery();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError("");

    const parsedItems = itens
      .map((item) => ({
        ticker: item.ticker.trim().toUpperCase(),
        percentual: parsePercentageInput(item.percentual),
      }))
      .filter((item) => item.ticker || item.percentual !== null);

    if (!nome.trim()) {
      setValidationError("Informe o nome da cesta.");
      return;
    }

    if (parsedItems.length === 0) {
      setValidationError("Informe ao menos um ativo na composicao.");
      return;
    }

    if (parsedItems.some((item) => !item.ticker || item.percentual === null)) {
      setValidationError("Preencha ticker e percentual para todos os itens informados.");
      return;
    }

    const normalizedItems = parsedItems.map((item) => ({
      ticker: item.ticker,
      percentual: item.percentual as number,
    }));

    const total = normalizedItems.reduce((sum, item) => sum + item.percentual, 0);
    if (Math.abs(total - 100) > 0.001) {
      setValidationError("A soma dos percentuais deve ser 100%.");
      return;
    }

    createBasketMutation.mutate({
      nome: nome.trim(),
      itens: normalizedItems,
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
    (sum, item) => sum + (parsePercentageInput(item.percentual) ?? 0),
    0,
  );

  return (
    <FeaturePageShell
      title="Administracao da Cesta"
      description="Cadastro de cesta Top Five e consultas administrativas (cesta atual e historico)."
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
                  key={index}
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
                      type="text"
                      inputMode="decimal"
                      value={item.percentual}
                      onChange={(event) =>
                        handleItemChange(
                          index,
                          "percentual",
                          formatPercentageInput(event.target.value),
                        )
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
        {validationError && (
          <p className="mt-3 font-mono text-xs text-danger">
            {validationError}
          </p>
        )}
      </section>

      <div className="gold-line" />

      <section className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-lg border border-faint/30 bg-surface-1/80 p-5">
          <h3 className="font-display text-base font-semibold text-cream">
            Resultado da operacao
          </h3>

          {createBasketMutation.isError ? (
            <p className="mt-3 text-sm text-danger">
              {getApiErrorMessage(createBasketMutation.error)}
            </p>
          ) : createBasketMutation.data ? (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted">
                Cesta <span className="font-semibold text-cream">{createBasketMutation.data.nome}</span>{" "}
                salva com sucesso.
              </p>
              <p className="text-sm text-muted">
                ID da cesta:{" "}
                <span className="font-semibold text-cream">
                  {createBasketMutation.data.cestaId}
                </span>
              </p>
              <p className="text-sm text-muted">
                Rebalanceamento:{" "}
                <span className="font-semibold text-cream">
                  {createBasketMutation.data.rebalanceamentoDisparado
                    ? "Disparado"
                    : "Nao disparado"}
                </span>
              </p>
              <p className="text-sm text-muted">
                Itens cadastrados:{" "}
                <span className="font-semibold text-cream">
                  {createBasketMutation.data.itens?.length ?? 0}
                </span>
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted">
              O resultado da criacao da cesta sera exibido aqui.
            </p>
          )}
        </section>

        <CurrentBasketCard
          data={currentBasketQuery.data}
          isFetching={currentBasketQuery.isFetching}
        />

        <section className="rounded-lg border border-faint/30 bg-surface-1/80 p-5 lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-cream">
            Historico de cestas
          </h3>

          {basketHistoryQuery.isFetching ? (
            <p className="mt-3 text-sm text-muted">Carregando historico...</p>
          ) : basketHistoryQuery.data?.cestas?.length ? (
            <div className="mt-4 space-y-3">
              {basketHistoryQuery.data.cestas.map((cesta) => (
                <article
                  key={cesta.cestaId}
                  className="rounded-md border border-faint/20 bg-background/20 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-cream">
                      {cesta.nome} (#{cesta.cestaId})
                    </p>
                    <span
                      className={`font-mono text-[11px] uppercase ${cesta.ativa ? "text-success" : "text-muted"}`}
                    >
                      {cesta.ativa ? "Ativa" : "Encerrada"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    Criada em {formatDate(cesta.dataCriacao)}
                    {cesta.dataDesativacao
                      ? `, desativada em ${formatDate(cesta.dataDesativacao)}`
                      : ""}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(cesta.itens ?? []).map((item) => (
                      <span
                        key={`${cesta.cestaId}-${item.ticker}`}
                        className="rounded-sm border border-faint/25 px-2 py-1 font-mono text-[11px] text-gold-100"
                      >
                        {item.ticker}: {item.percentual.toFixed(2)}%
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted">
              Nenhum historico de cestas disponivel.
            </p>
          )}
        </section>
      </section>
    </FeaturePageShell>
  );
}
