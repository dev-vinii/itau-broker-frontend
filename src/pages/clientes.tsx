import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FeaturePageShell } from "@/features/programmed-investment/components/feature-page-shell";
import { JsonBlock } from "@/features/programmed-investment/components/json-block";
import { useExitClientMutation } from "@/features/programmed-investment/hooks/use-exit-client-mutation";
import { usePortfolioQuery } from "@/features/programmed-investment/hooks/use-portfolio-query";
import { useProfitabilityQuery } from "@/features/programmed-investment/hooks/use-profitability-query";
import { useSubscribeClientMutation } from "@/features/programmed-investment/hooks/use-subscribe-client-mutation";
import { useUpdateMonthlyValueMutation } from "@/features/programmed-investment/hooks/use-update-monthly-value-mutation";
import { getApiErrorMessage } from "@/features/programmed-investment/services/error";
import { Loader2 } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

function SectionCard({
  title,
  tag,
  children,
  className = "",
}: {
  title: string;
  tag?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-faint/30 bg-surface-1/60 p-6 ${className}`}
    >
      <div className="mb-5 flex items-center gap-3">
        {tag && (
          <span className="rounded-sm bg-gold-400/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-gold-400 uppercase">
            {tag}
          </span>
        )}
        <h2 className="font-display text-base font-bold text-cream">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block font-mono text-[10px] tracking-wider text-muted uppercase">
      {children}
    </label>
  );
}

function LoadingSpinner() {
  return <Loader2 className="h-3.5 w-3.5 animate-spin text-gold-400" />;
}

export function ClientesPage() {
  const [nome, setNome] = useState("Joao da Silva");
  const [cpf, setCpf] = useState("12345678901");
  const [email, setEmail] = useState("joao.silva@email.com");
  const [valorMensal, setValorMensal] = useState("3000");

  const [clienteIdSaida, setClienteIdSaida] = useState("1");
  const [clienteIdValor, setClienteIdValor] = useState("1");
  const [novoValorMensal, setNovoValorMensal] = useState("6000");

  const [clienteConsulta, setClienteConsulta] = useState("1");
  const [clienteIdSelecionado, setClienteIdSelecionado] = useState<
    number | null
  >(1);

  const subscribeMutation = useSubscribeClientMutation();
  const exitMutation = useExitClientMutation();
  const updateMonthlyValueMutation = useUpdateMonthlyValueMutation();

  const portfolioQuery = usePortfolioQuery(clienteIdSelecionado);
  const profitabilityQuery = useProfitabilityQuery(clienteIdSelecionado);

  const clientIdNumber = useMemo(
    () => Number(clienteConsulta),
    [clienteConsulta],
  );

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    subscribeMutation.mutate({
      nome,
      cpf,
      email,
      valorMensal: Number(valorMensal),
    });
  };

  const handleExit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    exitMutation.mutate(Number(clienteIdSaida));
  };

  const handleUpdateMonthlyValue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateMonthlyValueMutation.mutate({
      clienteId: Number(clienteIdValor),
      novoValorMensal: Number(novoValorMensal),
    });
  };

  const handleConsult = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClienteIdSelecionado(clientIdNumber || null);
  };

  return (
    <FeaturePageShell
      title="Clientes"
      description="Fluxos de adesao, saida, ajuste de aporte e consultas de custodia/rentabilidade."
    >
      <section className="grid gap-5 lg:grid-cols-2">
        <SectionCard
          title="Aderir ao produto"
          tag="POST"
          className="animate-fade-up stagger-1"
        >
          <form className="grid gap-4" onSubmit={handleSubscribe}>
            <div>
              <FieldLabel>Nome</FieldLabel>
              <Input
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </div>
            <div>
              <FieldLabel>CPF</FieldLabel>
              <Input
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Valor Mensal (R$)</FieldLabel>
              <Input
                type="number"
                value={valorMensal}
                onChange={(event) => setValorMensal(event.target.value)}
              />
            </div>
            <Button type="submit" disabled={subscribeMutation.isPending}>
              {subscribeMutation.isPending ? "Enviando..." : "Aderir"}
            </Button>
          </form>
          {subscribeMutation.isError && (
            <p className="mt-3 font-mono text-xs text-danger">
              {getApiErrorMessage(subscribeMutation.error)}
            </p>
          )}
        </SectionCard>

        <SectionCard
          title="Sair do produto"
          tag="DELETE"
          className="animate-fade-up stagger-2"
        >
          <form className="grid gap-4" onSubmit={handleExit}>
            <div>
              <FieldLabel>Cliente ID</FieldLabel>
              <Input
                type="number"
                value={clienteIdSaida}
                onChange={(event) => setClienteIdSaida(event.target.value)}
                placeholder="clienteId"
              />
            </div>
            <Button type="submit" disabled={exitMutation.isPending}>
              {exitMutation.isPending ? "Processando..." : "Encerrar adesao"}
            </Button>
          </form>
          {exitMutation.isError && (
            <p className="mt-3 font-mono text-xs text-danger">
              {getApiErrorMessage(exitMutation.error)}
            </p>
          )}
        </SectionCard>

        <SectionCard
          title="Alterar valor mensal"
          tag="PATCH"
          className="animate-fade-up stagger-3 lg:col-span-2"
        >
          <form
            className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
            onSubmit={handleUpdateMonthlyValue}
          >
            <div>
              <FieldLabel>Cliente ID</FieldLabel>
              <Input
                type="number"
                value={clienteIdValor}
                onChange={(event) => setClienteIdValor(event.target.value)}
                placeholder="clienteId"
              />
            </div>
            <div>
              <FieldLabel>Novo Valor (R$)</FieldLabel>
              <Input
                type="number"
                value={novoValorMensal}
                onChange={(event) => setNovoValorMensal(event.target.value)}
                placeholder="novoValorMensal"
              />
            </div>
            <Button
              type="submit"
              disabled={updateMonthlyValueMutation.isPending}
            >
              {updateMonthlyValueMutation.isPending
                ? "Atualizando..."
                : "Atualizar"}
            </Button>
          </form>
          {updateMonthlyValueMutation.isError && (
            <p className="mt-3 font-mono text-xs text-danger">
              {getApiErrorMessage(updateMonthlyValueMutation.error)}
            </p>
          )}
        </SectionCard>

        <SectionCard
          title="Consultar carteira e rentabilidade"
          tag="GET"
          className="animate-fade-up stagger-4 lg:col-span-2"
        >
          <form
            className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end"
            onSubmit={handleConsult}
          >
            <div>
              <FieldLabel>Cliente ID</FieldLabel>
              <Input
                type="number"
                value={clienteConsulta}
                onChange={(event) => setClienteConsulta(event.target.value)}
                placeholder="clienteId"
              />
            </div>
            <Button type="submit">Consultar</Button>
          </form>
        </SectionCard>
      </section>

      <div className="gold-line" />

      <section className="grid gap-5 lg:grid-cols-2">
        <JsonBlock
          title="Resposta de adesao"
          data={subscribeMutation.data}
          extra={
            subscribeMutation.isSuccess ? (
              <span className="font-mono text-[10px] text-success">
                201 CREATED
              </span>
            ) : null
          }
        />

        <JsonBlock title="Resposta de saida" data={exitMutation.data} />
        <JsonBlock
          title="Resposta de alteracao de valor"
          data={updateMonthlyValueMutation.data}
        />

        <JsonBlock
          title="Carteira do cliente"
          data={portfolioQuery.data}
          extra={portfolioQuery.isFetching ? <LoadingSpinner /> : null}
        />

        <JsonBlock
          title="Rentabilidade detalhada"
          data={profitabilityQuery.data}
          extra={profitabilityQuery.isFetching ? <LoadingSpinner /> : null}
        />
      </section>
    </FeaturePageShell>
  );
}
