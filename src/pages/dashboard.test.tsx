import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { DashboardPage } from "./dashboard";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    ...props
  }: {
    children: ReactNode;
    to: string;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("DashboardPage", () => {
  it("renders the available feature links", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Clientes")).toBeInTheDocument();
    expect(screen.getByText("Admin - Cesta")).toBeInTheDocument();
    expect(screen.getByText("Motor de Compra")).toBeInTheDocument();
  });
});
