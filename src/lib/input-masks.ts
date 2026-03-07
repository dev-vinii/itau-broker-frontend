export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function formatIntegerAmountInput(value: string) {
  const digits = onlyDigits(value);
  if (!digits) return "";
  return Number(digits).toLocaleString("pt-BR");
}

export function parseIntegerAmountInput(value: string) {
  const digits = onlyDigits(value);
  if (!digits) return null;

  const parsed = Number(digits);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatCpfInput(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  if (!digits) return "";

  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 9);
  const part4 = digits.slice(9, 11);

  let formatted = part1;
  if (part2) formatted += `.${part2}`;
  if (part3) formatted += `.${part3}`;
  if (part4) formatted += `-${part4}`;

  return formatted;
}

export function formatPercentageInput(value: string) {
  const normalized = value.replace(",", ".").replace(/[^\d.]/g, "");
  const [rawInteger, ...rawDecimal] = normalized.split(".");

  const integerPart = rawInteger.slice(0, 3);
  const decimalPart = rawDecimal.join("").slice(0, 2);
  const hasDecimalSeparator = normalized.includes(".");

  if (hasDecimalSeparator) {
    return `${integerPart}${decimalPart ? `,${decimalPart}` : ","}`;
  }

  return integerPart;
}

export function parsePercentageInput(value: string) {
  const normalized = value.trim().replace(",", ".").replace(/[^\d.]/g, "");

  if (!normalized) return null;

  const [rawInteger, ...rawDecimals] = normalized.split(".");
  const candidate = rawDecimals.length
    ? `${rawInteger}.${rawDecimals.join("")}`
    : rawInteger;

  const parsed = Number(candidate);
  return Number.isFinite(parsed) ? parsed : null;
}
