import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FeaturePageShell } from "@/features/programmed-investment/components/feature-page-shell";
import { JsonBlock } from "@/features/programmed-investment/components/json-block";
import { useExecutePurchaseMutation } from "@/features/programmed-investment/hooks/use-purchase-engine";
import { getApiErrorMessage } from "@/features/programmed-investment/services/error";
import { FormEvent, useState } from "react";

export function MotorCompraPage() {
  const [dataReferencia, setDataReferencia] = useState("2026-02-05");
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
          <span className="rounded-sm bg-gold-400/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-gold-400 uppercase">
            POST
          </span>
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
            {executePurchaseMutation.isPending
              ? "Executando..."
              : "Executar"}
          </Button>
        </form>

        {executePurchaseMutation.isError && (
          <p className="mt-4 font-mono text-xs text-danger">
            {getApiErrorMessage(executePurchaseMutation.error)}
          </p>
        )}
      </section>

      <JsonBlock
        title="Resposta da execucao"
        data={executePurchaseMutation.data}
      />
    </FeaturePageShell>
  );
}
