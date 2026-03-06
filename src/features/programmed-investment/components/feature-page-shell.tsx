import { ReactNode } from "react";

type FeaturePageShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function FeaturePageShell({
  title,
  description,
  children,
}: FeaturePageShellProps) {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-6 py-10 lg:px-8">
      <header className="animate-fade-up">
        <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-gold-400/70 uppercase">
          Compra Programada
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-cream md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {description}
        </p>
        <div className="gold-line mt-6" />
      </header>
      {children}
    </main>
  );
}
