import { dashboardLinks } from "./dashboard-links";

describe("dashboardLinks", () => {
  it("contains expected navigation entries", () => {
    expect(dashboardLinks).toHaveLength(3);
    expect(dashboardLinks.map((item) => item.to)).toEqual([
      "/clientes",
      "/admin/cesta",
      "/motor",
    ]);
  });
});
