import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app.tsx";
import { queryClient } from "@/lib/react-query.ts";
import { QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
