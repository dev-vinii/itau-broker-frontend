import {
  formatIntegerAmountInput,
  formatPercentageInput,
  onlyDigits,
  parseIntegerAmountInput,
  parsePercentageInput,
} from "./input-masks";
import { describe, expect, it } from "vitest";

describe("input-masks", () => {
  it("keeps only digits", () => {
    expect(onlyDigits("abc12-3.4")).toBe("1234");
  });

  it("formats integer amount in pt-BR style", () => {
    expect(formatIntegerAmountInput("1000")).toBe("1.000");
    expect(formatIntegerAmountInput("R$ 50000")).toBe("50.000");
    expect(formatIntegerAmountInput("")).toBe("");
  });

  it("parses integer amount safely", () => {
    expect(parseIntegerAmountInput("1.234")).toBe(1234);
    expect(parseIntegerAmountInput("R$ 50.000")).toBe(50000);
    expect(parseIntegerAmountInput("")).toBeNull();
  });

  it("formats percentage with comma decimal", () => {
    expect(formatPercentageInput("12.34")).toBe("12,34");
    expect(formatPercentageInput("105,98")).toBe("105,98");
    expect(formatPercentageInput("3000")).toBe("300");
  });

  it("parses percentage with dot or comma decimal", () => {
    expect(parsePercentageInput("12,5")).toBe(12.5);
    expect(parsePercentageInput("12.5")).toBe(12.5);
    expect(parsePercentageInput("  ")).toBeNull();
    expect(parsePercentageInput("abc")).toBeNull();
  });
});
