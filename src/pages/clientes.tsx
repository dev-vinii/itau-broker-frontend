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
import { FormEvent, useMemo, useState } from "react";

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
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#0a2342]/60 p-6">
          <h2 className="mb-4 text-lg font-semibold">Aderir ao produto</h2>
          <form className="grid gap-3" onSubmit={handleSubscribe}>
            <Input
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
            <Input
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
            />
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              type="number"
              value={valorMensal}
              onChange={(event) => setValorMensal(event.target.value)}
            />
            <Button type="submit" disabled={subscribeMutation.isPending}>
              {subscribeMutation.isPending ? "Enviando..." : "Aderir"}
            </Button>
          </form>
          {subscribeMutation.isError && (
            <p className="mt-3 text-sm text-red-300">
              {getApiErrorMessage(subscribeMutation.error)}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-[#0a2342]/60 p-6">
          <h2 className="mb-4 text-lg font-semibold">Sair do produto</h2>
          <form className="grid gap-3" onSubmit={handleExit}>
            <Input
              type="number"
              value={clienteIdSaida}
              onChange={(event) => setClienteIdSaida(event.target.value)}
              placeholder="clienteId"
            />
            <Button type="submit" disabled={exitMutation.isPending}>
              {exitMutation.isPending ? "Processando..." : "Encerrar adesao"}
            </Button>
          </form>
          {exitMutation.isError && (
            <p className="mt-3 text-sm text-red-300">
              {getApiErrorMessage(exitMutation.error)}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-[#0a2342]/60 p-6 lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Alterar valor mensal</h2>
          <form
            className="grid gap-3 sm:grid-cols-2"
            onSubmit={handleUpdateMonthlyValue}
          >
            <Input
              type="number"
              value={clienteIdValor}
              onChange={(event) => setClienteIdValor(event.target.value)}
              placeholder="clienteId"
            />
            <Input
              type="number"
              value={novoValorMensal}
              onChange={(event) => setNovoValorMensal(event.target.value)}
              placeholder="novoValorMensal"
            />
            <Button
              className="sm:col-span-2"
              type="submit"
              disabled={updateMonthlyValueMutation.isPending}
            >
              {updateMonthlyValueMutation.isPending
                ? "Atualizando..."
                : "Atualizar valor mensal"}
            </Button>
          </form>
          {updateMonthlyValueMutation.isError && (
            <p className="mt-3 text-sm text-red-300">
              {getApiErrorMessage(updateMonthlyValueMutation.error)}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-[#0a2342]/60 p-6 lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">
            Consultar carteira e rentabilidade
          </h2>
          <form
            className="grid gap-3 sm:grid-cols-[1fr_auto]"
            onSubmit={handleConsult}
          >
            <Input
              type="number"
              value={clienteConsulta}
              onChange={(event) => setClienteConsulta(event.target.value)}
              placeholder="clienteId"
            />
            <Button type="submit">Consultar</Button>
          </form>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <JsonBlock
          title="Resposta de adesao"
          data={subscribeMutation.data}
          extra={
            subscribeMutation.isSuccess ? (
              <span className="text-xs text-emerald-300">201 Created</span>
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
          extra={
            portfolioQuery.isFetching ? (
              <span className="text-xs text-[#c1d3ed]">Carregando...</span>
            ) : null
          }
        />

        <JsonBlock
          title="Rentabilidade detalhada"
          data={profitabilityQuery.data}
          extra={
            profitabilityQuery.isFetching ? (
              <span className="text-xs text-[#c1d3ed]">Carregando...</span>
            ) : null
          }
        />
      </section>
    </FeaturePageShell>
  );
}
