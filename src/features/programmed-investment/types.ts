export type ApiError = {
  erro: string;
  codigo: string;
};

export type BasketItem = {
  ticker: string;
  percentual: number;
};

export type ClientSubscriptionRequest = {
  nome: string;
  cpf: string;
  email: string;
  valorMensal: number;
};

export type ClientSubscriptionResponse = {
  clienteId: number;
  nome: string;
  cpf: string;
  email: string;
  valorMensal: number;
  ativo: boolean;
  dataAdesao: string;
  contaGrafica: {
    id: number;
    numeroConta: string;
    tipo: string;
    dataCriacao: string;
  };
};

export type ClientExitResponse = {
  clienteId: number;
  nome: string;
  ativo: boolean;
  dataSaida: string;
  mensagem: string;
};

export type UpdateMonthlyValueRequest = {
  novoValorMensal: number;
};

export type UpdateMonthlyValueResponse = {
  clienteId: number;
  valorMensalAnterior: number;
  valorMensalNovo: number;
  dataAlteracao: string;
  mensagem: string;
};

export type PortfolioAsset = {
  ticker: string;
  quantidade: number;
  precoMedio: number;
  cotacaoAtual: number;
  valorAtual: number;
  pl: number;
  plPercentual: number;
  composicaoCarteira: number;
};

export type PortfolioResponse = {
  clienteId: number;
  nome: string;
  contaGrafica: string;
  dataConsulta: string;
  resumo: {
    valorTotalInvestido: number;
    valorAtualCarteira: number;
    plTotal: number;
    rentabilidadePercentual: number;
  };
  ativos: PortfolioAsset[];
};

export type ProfitabilityResponse = {
  clienteId: number;
  nome: string;
  dataConsulta: string;
  rentabilidade: {
    valorTotalInvestido: number;
    valorAtualCarteira: number;
    plTotal: number;
    rentabilidadePercentual: number;
  };
  historicoAportes: {
    data: string;
    valor: number;
    parcela: string;
  }[];
  evolucaoCarteira: {
    data: string;
    valorCarteira: number;
    valorInvestido: number;
    rentabilidade: number;
  }[];
};

export type CreateBasketRequest = {
  nome: string;
  itens: BasketItem[];
};

export type CreateBasketResponse = {
  cestaId: number;
  nome: string;
  ativa: boolean;
  dataCriacao: string;
  itens: BasketItem[];
  rebalanceamentoDisparado: boolean;
  mensagem: string;
  cestaAnteriorDesativada?: {
    cestaId: number;
    nome: string;
    dataDesativacao: string;
  };
  ativosRemovidos?: string[];
  ativosAdicionados?: string[];
};

export type CurrentBasketResponse = {
  cestaId: number;
  nome: string;
  ativa: boolean;
  dataCriacao: string;
  itens: (BasketItem & {
    cotacaoAtual: number;
  })[];
};

export type BasketHistoryResponse = {
  cestas: {
    cestaId: number;
    nome: string;
    ativa: boolean;
    dataCriacao: string;
    dataDesativacao: string | null;
    itens: BasketItem[];
  }[];
};

export type MasterCustodyResponse = {
  contaMaster: {
    id: number;
    numeroConta: string;
    tipo: string;
  };
  custodia: {
    ticker: string;
    quantidade: number;
    precoMedio: number;
    valorAtual: number;
    origem: string;
  }[];
  valorTotalResiduo: number;
};

export type ExecutePurchaseRequest = {
  dataReferencia: string;
};

export type ExecutePurchaseResponse = {
  dataExecucao: string;
  totalClientes: number;
  totalConsolidado: number;
  ordensCompra: {
    ticker: string;
    quantidadeTotal: number;
    detalhes: {
      tipo: string;
      ticker: string;
      quantidade: number;
    }[];
    precoUnitario: number;
    valorTotal: number;
  }[];
  distribuicoes: {
    clienteId: number;
    nome: string;
    valorAporte: number;
    ativos: {
      ticker: string;
      quantidade: number;
    }[];
  }[];
  residuosCustMaster: {
    ticker: string;
    quantidade: number;
  }[];
  eventosIRPublicados: number;
  mensagem: string;
};
