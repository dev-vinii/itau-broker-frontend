import { AxiosError } from "axios";
import { ApiError } from "../types";

export function getApiErrorMessage(error: unknown) {
  const axiosError = error as AxiosError<ApiError>;
  return axiosError.response?.data?.erro ?? "Erro ao processar a requisicao.";
}
