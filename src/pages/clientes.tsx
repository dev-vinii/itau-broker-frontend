import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FeaturePageShell } from "@/features/programmed-investment/components/feature-page-shell";
import { LoadingSpinner } from "@/features/programmed-investment/components/loading-spinner";
import { useExitClientMutation } from "@/features/programmed-investment/hooks/use-exit-client-mutation";
import { useProfitabilityQuery } from "@/features/programmed-investment/hooks/use-profitability-query";
import { useSubscribeClientMutation } from "@/features/programmed-investment/hooks/use-subscribe-client-mutation";
import { useUpdateMonthlyValueMutation } from "@/features/programmed-investment/hooks/use-update-monthly-value-mutation";
import { getApiErrorMessage } from "@/features/programmed-investment/services/error";
import {
  formatCpfInput,
  formatIntegerAmountInput,
  onlyDigits,
  parseIntegerAmountInput,
} from "@/lib/input-masks";
import { FormEvent, ReactNode, useMemo, useState } from "react";

function SectionCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-faint/30 bg-surface-1/60 p-6 ${className}`}
    >
      <div className="mb-5 flex items-center gap-3">
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

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatPercent(value: number) {
  return `${value.toFixed(2).replace(".", ",")}%`;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-faint/15 py-2 last:border-b-0">
      <span className="font-mono text-[11px] tracking-wide text-muted uppercase">
        {label}
      </span>
      <span className="text-sm font-medium text-cream">{value}</span>
    </div>
  );
}

function ResultCard({
  title,
  children,
  isLoading = false,
}: {
  title: string;
  children: ReactNode;
  isLoading?: boolean;
}) {
  return (
    <section className="rounded-lg border border-faint/30 bg-surface-1/80 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-base font-semibold text-cream">{title}</h3>
        {isLoading ? <LoadingSpinner /> : null}
      </div>

      {children}
    </section>
  );
}

export function ClientesPage() {
  const [nome, setNome] = useState("Joao da Silva");
  const [cpf, setCpf] = useState(formatCpfInput("12345678901"));
  const [email, setEmail] = useState("joao.silva@email.com");
  const [valorMensal, setValorMensal] = useState(
    formatIntegerAmountInput("3000"),
  );

  const [clienteIdSaida, setClienteIdSaida] = useState("1");
  const [clienteIdValor, setClienteIdValor] = useState("1");
  const [valorMensalAtualizado, setValorMensalAtualizado] = useState(
    formatIntegerAmountInput("6000"),
  );

  const [clienteConsulta, setClienteConsulta] = useState("");
  const [clienteIdSelecionado, setClienteIdSelecionado] = useState<
    number | null
  >(null);
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
      cpf: onlyDigits(cpf),
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
    const parsedNovoValor = parseIntegerAmountInput(valorMensalAtualizado);

    if (!parsedClienteId || parsedClienteId <= 0) {
      setUpdateValidationError("Informe um Cliente ID valido.");
      return;
    }

    if (!parsedNovoValor || parsedNovoValor < 100) {
      setUpdateValidationError(
        "Informe um novo valor mensal valido (minimo R$100).",
      );
      return;
    }

    updateMonthlyValueMutation.mutate({
      clienteId: parsedClienteId,
      valorMensal: parsedNovoValor,
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
                onChange={(event) => setCpf(formatCpfInput(event.target.value))}
                inputMode="numeric"
                maxLength={14}
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
                value={valorMensalAtualizado}
                onChange={(event) =>
                  setValorMensalAtualizado(
                    formatIntegerAmountInput(event.target.value),
                  )
                }
                placeholder="valorMensal"
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
        <ResultCard title="Status da adesao">
          {subscribeMutation.isError ? (
            <p className="text-sm text-danger">
              {getApiErrorMessage(subscribeMutation.error)}
            </p>
          ) : subscribeMutation.data ? (
            <div className="space-y-1">
              <InfoRow
                label="Cliente"
                value={`${subscribeMutation.data.nome} (#${subscribeMutation.data.clienteId})`}
              />
              <InfoRow
                label="Conta grafica"
                value={
                  subscribeMutation.data.contaGrafica?.numeroConta ??
                  "Conta em processamento"
                }
              />
              <InfoRow
                label="Aporte mensal"
                value={formatCurrency(subscribeMutation.data.valorMensal)}
              />
            </div>
          ) : (
            <p className="text-sm text-muted">
              Complete o formulario de adesao para ver o resultado por aqui.
            </p>
          )}
        </ResultCard>

        <ResultCard title="Status da saida">
          {exitMutation.isError ? (
            <p className="text-sm text-danger">{getApiErrorMessage(exitMutation.error)}</p>
          ) : exitMutation.data ? (
            <div className="space-y-1">
              <InfoRow label="Cliente" value={exitMutation.data.nome} />
              <InfoRow
                label="Situacao"
                value={exitMutation.data.ativo ? "Ativo" : "Desligado"}
              />
              <InfoRow label="Mensagem" value={exitMutation.data.mensagem} />
            </div>
          ) : (
            <p className="text-sm text-muted">
              Ao encerrar uma adesao, o status atualizado aparece aqui.
            </p>
          )}
        </ResultCard>

        <ResultCard title="Status da alteracao de valor">
          {updateMonthlyValueMutation.isError ? (
            <p className="text-sm text-danger">
              {getApiErrorMessage(updateMonthlyValueMutation.error)}
            </p>
          ) : updateMonthlyValueMutation.isSuccess ? (
            <p className="text-sm text-success">
              Valor mensal atualizado com sucesso.
            </p>
          ) : (
            <p className="text-sm text-muted">
              Depois de atualizar o aporte, a confirmacao aparece aqui.
            </p>
          )}
        </ResultCard>

        <ResultCard
          title="Rentabilidade detalhada"
          isLoading={profitabilityQuery.isFetching}
        >
          {profitabilityQuery.isError ? (
            <p className="text-sm text-danger">
              {getApiErrorMessage(profitabilityQuery.error)}
            </p>
          ) : profitabilityQuery.data ? (
            <div className="space-y-1">
              <InfoRow label="Cliente" value={profitabilityQuery.data.nome} />
              <InfoRow
                label="Total investido"
                value={formatCurrency(
                  profitabilityQuery.data.rentabilidade.valorTotalInvestido,
                )}
              />
              <InfoRow
                label="Valor da carteira"
                value={formatCurrency(
                  profitabilityQuery.data.rentabilidade.valorAtualCarteira,
                )}
              />
              <InfoRow
                label="P/L total"
                value={formatCurrency(profitabilityQuery.data.rentabilidade.plTotal)}
              />
              <InfoRow
                label="Rentabilidade"
                value={formatPercent(
                  profitabilityQuery.data.rentabilidade.rentabilidadePercentual,
                )}
              />
            </div>
          ) : (
            <p className="text-sm text-muted">
              Consulte um cliente para visualizar a evolucao de rentabilidade.
            </p>
          )}
        </ResultCard>
      </section>
    </FeaturePageShell>
  );
}
