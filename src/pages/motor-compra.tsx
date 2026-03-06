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
      <section className="rounded-xl border border-white/10 bg-[#0a2342]/60 p-6">
        <form
          className="grid gap-4 sm:grid-cols-[1fr_auto]"
          onSubmit={handleSubmit}
        >
          <Input
            value={dataReferencia}
            onChange={(event) => setDataReferencia(event.target.value)}
            placeholder="AAAA-MM-DD"
            aria-label="Data de referencia"
          />
          <Button type="submit" disabled={executePurchaseMutation.isPending}>
            {executePurchaseMutation.isPending
              ? "Executando..."
              : "Executar compra manual"}
          </Button>
        </form>

        {executePurchaseMutation.isError && (
          <p className="mt-4 text-sm text-red-300">
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
