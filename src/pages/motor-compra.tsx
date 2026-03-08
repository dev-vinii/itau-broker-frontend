import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FeaturePageShell } from "@/features/programmed-investment/components/feature-page-shell";
import { useExecutePurchaseMutation } from "@/features/programmed-investment/hooks/use-purchase-engine";
import { getApiErrorMessage } from "@/features/programmed-investment/services/error";
import { FormEvent, useState } from "react";

function getTodayDateInputValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function MotorCompraPage() {
  const [dataReferencia, setDataReferencia] = useState(getTodayDateInputValue);
  const executePurchaseMutation = useExecutePurchaseMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    executePurchaseMutation.mutate(dataReferencia);
  };

  return (
    <FeaturePageShell
      title="Motor de Compra"
      description="Executa manualmente a compra programada para uma data de referencia."
    >
      <section className="animate-fade-up rounded-lg border border-faint/30 bg-surface-1/60 p-6">
        <div className="mb-5 flex items-center gap-3">
          <h2 className="font-display text-base font-bold text-cream">
            Executar compra manual
          </h2>
        </div>

        <form
          className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="mb-1 block font-mono text-[10px] tracking-wider text-muted uppercase">
              Data de Referencia
            </label>
            <Input
              value={dataReferencia}
              onChange={(event) => setDataReferencia(event.target.value)}
              placeholder="AAAA-MM-DD"
              aria-label="Data de referencia"
            />
          </div>
          <Button type="submit" disabled={executePurchaseMutation.isPending}>
            {executePurchaseMutation.isPending ? "Executando..." : "Executar"}
          </Button>
        </form>

        {executePurchaseMutation.isError && (
          <p className="mt-4 font-mono text-xs text-danger">
            {getApiErrorMessage(executePurchaseMutation.error)}
          </p>
        )}
      </section>

      <section className="rounded-lg border border-faint/30 bg-surface-1/80 p-5">
        <h3 className="font-display text-base font-semibold text-cream">
          Resultado da execucao
        </h3>

        {executePurchaseMutation.isPending ? (
          <p className="mt-3 text-sm text-muted">Executando motor de compra...</p>
        ) : executePurchaseMutation.isError ? (
          <p className="mt-3 text-sm text-danger">
            {getApiErrorMessage(executePurchaseMutation.error)}
          </p>
        ) : executePurchaseMutation.data ? (
          <div className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-md border border-faint/20 bg-background/20 p-3">
                <p className="font-mono text-[10px] tracking-wider text-muted uppercase">
                  Data da execucao
                </p>
                <p className="mt-1 text-sm font-semibold text-cream">
                  {new Date(executePurchaseMutation.data.dataExecucao).toLocaleDateString(
                    "pt-BR",
                  )}
                </p>
              </div>
              <div className="rounded-md border border-faint/20 bg-background/20 p-3">
                <p className="font-mono text-[10px] tracking-wider text-muted uppercase">
                  Clientes processados
                </p>
                <p className="mt-1 text-sm font-semibold text-cream">
                  {executePurchaseMutation.data.totalClientes}
                </p>
              </div>
              <div className="rounded-md border border-faint/20 bg-background/20 p-3">
                <p className="font-mono text-[10px] tracking-wider text-muted uppercase">
                  Valor consolidado
                </p>
                <p className="mt-1 text-sm font-semibold text-cream">
                  {formatCurrency(executePurchaseMutation.data.totalConsolidado)}
                </p>
              </div>
              <div className="rounded-md border border-faint/20 bg-background/20 p-3">
                <p className="font-mono text-[10px] tracking-wider text-muted uppercase">
                  Eventos IR
                </p>
                <p className="mt-1 text-sm font-semibold text-cream">
                  {executePurchaseMutation.data.eventosIRPublicados}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-cream">Ordens de compra</h4>
              {executePurchaseMutation.data.ordensCompra.length ? (
                <div className="mt-2 space-y-2">
                  {executePurchaseMutation.data.ordensCompra.map((ordem) => (
                    <article
                      key={ordem.ticker}
                      className="rounded-md border border-faint/20 bg-background/20 p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-cream">{ordem.ticker}</p>
                        <span className="font-mono text-xs text-gold-200">
                          {ordem.quantidadeTotal} cotas
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        Valor total: {formatCurrency(ordem.valorTotal)}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-muted">
                  Nenhuma ordem de compra foi gerada.
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">
            O resumo da execucao aparecera aqui apos processar uma data.
          </p>
        )}
      </section>
    </FeaturePageShell>
  );
}
