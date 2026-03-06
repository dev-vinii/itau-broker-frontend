import { ReactNode } from "react";

type JsonBlockProps = {
  title: string;
  data?: unknown;
  extra?: ReactNode;
};

export function JsonBlock({ title, data, extra }: JsonBlockProps) {
  return (
    <section className="group overflow-hidden rounded-lg border border-faint/30 bg-surface-1/80 transition-colors duration-300 hover:border-gold-400/20">
      <div className="flex items-center justify-between border-b border-faint/20 px-5 py-3">
        <h3 className="font-mono text-xs tracking-wide text-muted uppercase transition-colors group-hover:text-cream">
          {title}
        </h3>
        {extra}
      </div>

      <pre className="max-h-80 overflow-auto px-5 py-4 font-mono text-xs leading-6 text-gold-100/80">
        {JSON.stringify(data ?? { info: "Sem dados" }, null, 2)}
      </pre>
    </section>
  );
}
