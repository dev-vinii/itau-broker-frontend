import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/main.tsx",
        "src/app.tsx",
        "src/app-router.ts",
        "src/vite-env.d.ts",
        "src/styles/**",
        "src/routes/**",
        "src/components/atoms/card.tsx",
        "src/components/atoms/select.tsx",
        "src/components/molecules/pagination.tsx",
        "src/components/organisms/header.tsx",
        "src/features/programmed-investment/types.ts",
        "src/lib/axios.ts",
        "src/lib/react-query.ts",
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
