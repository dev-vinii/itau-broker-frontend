import { AxiosError } from "axios";
import { describe, expect, it } from "vitest";
import { getApiErrorMessage } from "./error";

describe("getApiErrorMessage", () => {
  it("returns API message when present", () => {
    const error = {
      response: {
        data: {
          erro: "Falha de validacao",
          codigo: "VALIDATION_ERROR",
        },
      },
    } as AxiosError;

    expect(getApiErrorMessage(error)).toBe("Falha de validacao");
  });

  it("returns fallback message when API error payload is missing", () => {
    expect(getApiErrorMessage(new Error("boom"))).toBe(
      "Erro ao processar a requisicao.",
    );
  });
});
