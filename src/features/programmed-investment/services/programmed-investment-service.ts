import { axiosInstance } from "@/lib/axios";
import {
  BasketHistoryResponse,
  ClientExitResponse,
  ClientSubscriptionRequest,
  ClientSubscriptionResponse,
  CreateBasketRequest,
  CreateBasketResponse,
  CurrentBasketResponse,
  ExecutePurchaseRequest,
  ExecutePurchaseResponse,
  ProfitabilityResponse,
  UpdateMonthlyValueRequest,
  UpdateMonthlyValueResponse,
} from "../types";

const programmedInvestmentService = {
  subscribeClient: async (payload: ClientSubscriptionRequest) => {
    const { data } = await axiosInstance.post<ClientSubscriptionResponse>(
      "/clientes/adesao",
      payload,
    );
    return data;
  },

  exitClient: async (clienteId: number) => {
    const { data } = await axiosInstance.post<ClientExitResponse>(
      `/clientes/${clienteId}/saida`,
    );
    return data;
  },

  updateMonthlyValue: async (
    clienteId: number,
    payload: UpdateMonthlyValueRequest,
  ) => {
    const { data } = await axiosInstance.put<UpdateMonthlyValueResponse>(
      `/clientes/${clienteId}/valor-mensal`,
      payload,
    );
    return data;
  },

  getProfitability: async (clienteId: number) => {
    const { data } = await axiosInstance.get<ProfitabilityResponse>(
      `/clientes/${clienteId}/rentabilidade`,
    );
    return data;
  },

  createBasket: async (payload: CreateBasketRequest) => {
    const { data } = await axiosInstance.post<CreateBasketResponse>(
      "/admin/cesta",
      payload,
    );
    return data;
  },

  getCurrentBasket: async () => {
    const { data } =
      await axiosInstance.get<CurrentBasketResponse>("/admin/cesta/atual");
    return data;
  },

  getBasketHistory: async () => {
    const { data } = await axiosInstance.get<BasketHistoryResponse>(
      "/admin/cesta/historico",
    );
    return data;
  },

  executePurchase: async (payload: ExecutePurchaseRequest) => {
    const { data } = await axiosInstance.post<ExecutePurchaseResponse>(
      "/motor/executar-compra",
      payload,
    );
    return data;
  },
};

export { programmedInvestmentService };
