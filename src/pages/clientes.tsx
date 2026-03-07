import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FeaturePageShell } from "@/features/programmed-investment/components/feature-page-shell";
import { JsonBlock } from "@/features/programmed-investment/components/json-block";
import { LoadingSpinner } from "@/features/programmed-investment/components/loading-spinner";
import { useExitClientMutation } from "@/features/programmed-investment/hooks/use-exit-client-mutation";
import { useProfitabilityQuery } from "@/features/programmed-investment/hooks/use-profitability-query";
import { useSubscribeClientMutation } from "@/features/programmed-investment/hooks/use-subscribe-client-mutation";
import { useUpdateMonthlyValueMutation } from "@/features/programmed-investment/hooks/use-update-monthly-value-mutation";
import { getApiErrorMessage } from "@/features/programmed-investment/services/error";
import { formatIntegerAmountInput, onlyDigits, parseIntegerAmountInput } from "@/lib/input-masks";
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
        <h2 className="font-display text-base font-bold text-cream">{title}</h2>
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

export function ClientesPage() {
  const [nome, setNome] = useState("Joao da Silva");
  const [cpf, setCpf] = useState("12345678901");
  const [email, setEmail] = useState("joao.silva@email.com");
  const [valorMensal, setValorMensal] = useState(
    formatIntegerAmountInput("3000"),
  );

  const [clienteIdSaida, setClienteIdSaida] = useState("1");
  const [clienteIdValor, setClienteIdValor] = useState("1");
  const [novoValorMensal, setNovoValorMensal] = useState(
    formatIntegerAmountInput("6000"),
  );

  const [clienteConsulta, setClienteConsulta] = useState("1");
  const [clienteIdSelecionado, setClienteIdSelecionado] = useState<
    number | null
  >(1);
  const [subscribeValidationError, setSubscribeValidationError] = useState("");
  const [exitValidationError, setExitValidationError] = useState("");
  const [updateValidationError, setUpdateValidationError] = useState("");
  const [consultValidationError, setConsultValidationError] = useState("");

  const subscribeMutation = useSubscribeClientMutation();
  const exitMutation = useExitClientMutation();
  const updateMonthlyValueMutation = useUpdateMonthlyValueMutation();

  const profitabilityQuery = useProfitabilityQuery(clienteIdSelecionado);

  const clientIdNumber = useMemo(
    () => Number(clienteConsulta),
    [clienteConsulta],
  );

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribeValidationError("");

    const parsedValorMensal = parseIntegerAmountInput(valorMensal);
    if (!parsedValorMensal || parsedValorMensal <= 0) {
      setSubscribeValidationError("Informe um valor mensal valido maior que zero.");
      return;
    }

    subscribeMutation.mutate({
      nome,
      cpf,
      email,
      valorMensal: parsedValorMensal,
    });
  };

  const handleExit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setExitValidationError("");

    const parsedClienteId = Number(onlyDigits(clienteIdSaida));
    if (!parsedClienteId || parsedClienteId <= 0) {
      setExitValidationError("Informe um Cliente ID valido.");
      return;
    }

    exitMutation.mutate(parsedClienteId);
  };

  const handleUpdateMonthlyValue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUpdateValidationError("");

    const parsedClienteId = Number(onlyDigits(clienteIdValor));
    const parsedNovoValor = parseIntegerAmountInput(novoValorMensal);

    if (!parsedClienteId || parsedClienteId <= 0) {
      setUpdateValidationError("Informe um Cliente ID valido.");
      return;
    }

    if (!parsedNovoValor || parsedNovoValor <= 0) {
      setUpdateValidationError("Informe um novo valor mensal valido.");
      return;
    }

    updateMonthlyValueMutation.mutate({
      clienteId: parsedClienteId,
      novoValorMensal: parsedNovoValor,
    });
  };

  const handleConsult = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConsultValidationError("");

    if (!clientIdNumber || clientIdNumber <= 0) {
      setConsultValidationError("Informe um Cliente ID valido para consulta.");
      return;
    }

    setClienteIdSelecionado(clientIdNumber);
  };

  return (
    <FeaturePageShell
      title="Clientes"
      description="Fluxos de adesao, saida, ajuste de aporte e consulta de rentabilidade."
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
                type="text"
                inputMode="numeric"
                value={valorMensal}
                onChange={(event) =>
                  setValorMensal(formatIntegerAmountInput(event.target.value))
                }
              />
            </div>
            <Button type="submit" disabled={subscribeMutation.isPending}>
              {subscribeMutation.isPending ? "Enviando..." : "Aderir"}
            </Button>
          </form>
          {subscribeValidationError && (
            <p className="mt-3 font-mono text-xs text-danger">
              {subscribeValidationError}
            </p>
          )}
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
                type="text"
                inputMode="numeric"
                value={clienteIdSaida}
                onChange={(event) =>
                  setClienteIdSaida(onlyDigits(event.target.value))
                }
                placeholder="clienteId"
              />
            </div>
            <Button type="submit" disabled={exitMutation.isPending}>
              {exitMutation.isPending ? "Processando..." : "Encerrar adesao"}
            </Button>
          </form>
          {exitValidationError && (
            <p className="mt-3 font-mono text-xs text-danger">
              {exitValidationError}
            </p>
          )}
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
                type="text"
                inputMode="numeric"
                value={clienteIdValor}
                onChange={(event) =>
                  setClienteIdValor(onlyDigits(event.target.value))
                }
                placeholder="clienteId"
              />
            </div>
            <div>
              <FieldLabel>Novo Valor (R$)</FieldLabel>
              <Input
                type="text"
                inputMode="numeric"
                value={novoValorMensal}
                onChange={(event) =>
                  setNovoValorMensal(
                    formatIntegerAmountInput(event.target.value),
                  )
                }
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
          {updateValidationError && (
            <p className="mt-3 font-mono text-xs text-danger">
              {updateValidationError}
            </p>
          )}
          {updateMonthlyValueMutation.isError && (
            <p className="mt-3 font-mono text-xs text-danger">
              {getApiErrorMessage(updateMonthlyValueMutation.error)}
            </p>
          )}
        </SectionCard>

        <SectionCard
          title="Consultar rentabilidade"
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
                type="text"
                inputMode="numeric"
                value={clienteConsulta}
                onChange={(event) =>
                  setClienteConsulta(onlyDigits(event.target.value))
                }
                placeholder="clienteId"
              />
            </div>
            <Button type="submit">Consultar</Button>
          </form>
          {consultValidationError && (
            <p className="mt-3 font-mono text-xs text-danger">
              {consultValidationError}
            </p>
          )}
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
          title="Rentabilidade detalhada"
          data={profitabilityQuery.data}
          extra={profitabilityQuery.isFetching ? <LoadingSpinner /> : null}
        />
      </section>
    </FeaturePageShell>
  );
}
