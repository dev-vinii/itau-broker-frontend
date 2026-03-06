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
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 text-white sm:px-6 lg:px-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-[#c1d3ed]">{description}</p>
      </header>
      {children}
    </main>
  );
}
