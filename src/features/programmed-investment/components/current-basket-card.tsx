import { CurrentBasketResponse } from "../types";
import { LoadingSpinner } from "./loading-spinner";

type CurrentBasketCardProps = {
  data: CurrentBasketResponse | undefined;
  isFetching: boolean;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return dateFormatter.format(date);
}

export function CurrentBasketCard({ data, isFetching }: CurrentBasketCardProps) {
  return (
    <article className="rounded-lg border border-faint/30 bg-surface-1/60 p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-display text-base font-bold text-cream">Cesta ativa</h2>
        {isFetching ? <LoadingSpinner /> : null}
      </div>

      {!data ? (
        <p className="font-mono text-xs text-muted">Nenhuma cesta ativa carregada.</p>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-2 rounded-md border border-faint/20 bg-surface-0/40 p-3 font-mono text-xs text-muted sm:grid-cols-2">
            <p>
              Nome: <span className="text-cream">{data.nome}</span>
            </p>
            <p>
              ID: <span className="text-cream">{data.cestaId}</span>
            </p>
            <p>
              Status:{" "}
              <span className={data.ativa ? "text-success" : "text-danger"}>
                {data.ativa ? "Ativa" : "Inativa"}
              </span>
            </p>
            <p>
              Criacao: <span className="text-cream">{formatDate(data.dataCriacao)}</span>
            </p>
          </div>

          <div className="space-y-2">
            {data.itens.map((item) => (
              <div
                key={item.ticker}
                className="rounded-md border border-faint/20 bg-surface-0/30 p-3"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-mono text-xs text-cream">{item.ticker}</p>
                  <p className="font-mono text-xs text-gold-400">
                    {item.percentual.toFixed(2)}%
                  </p>
                </div>
                <div className="h-1.5 rounded-full bg-faint/20">
                  <div
                    className="h-full rounded-full bg-gold-400/80"
                    style={{ width: `${Math.min(Math.max(item.percentual, 0), 100)}%` }}
                  />
                </div>
                <p className="mt-2 font-mono text-[11px] text-muted">
                  Cotacao atual: {currencyFormatter.format(item.cotacaoAtual)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
