import { ReactNode } from "react";

type JsonBlockProps = {
  title: string;
  data?: unknown;
  extra?: ReactNode;
};

export function JsonBlock({ title, data, extra }: JsonBlockProps) {
  return (
    <section className="rounded-xl border border-white/10 bg-[#0a2342]/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#e8f1ff]">{title}</h3>
        {extra}
      </div>

      <pre className="max-h-80 overflow-auto rounded-lg bg-[#04152b]/60 p-3 text-xs leading-5 text-[#e8f1ff]">
        {JSON.stringify(data ?? { info: "Sem dados" }, null, 2)}
      </pre>
    </section>
  );
}
