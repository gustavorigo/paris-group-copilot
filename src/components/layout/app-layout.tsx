import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Layout compartilhado das rotas em `pages/`.
 *
 * A navegação vive aqui e em lugar nenhum mais — cada página envolve o
 * seu conteúdo com este componente em vez de repetir o cabeçalho.
 */
export type AppLayoutProps = {
  /** Título exibido no cabeçalho da página. */
  titulo: string;
  /** Conteúdo da página. */
  children: ReactNode;
};

const NAVEGACAO = [
  { href: "/projeto", rotulo: "Projetos" },
  { href: "/hipotese", rotulo: "Hipóteses" },
  { href: "/projects", rotulo: "Projects (pages)" },
] as const;

export function AppLayout({ titulo, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200">
        <nav className="mx-auto flex max-w-3xl gap-4 px-4 py-3 text-sm">
          {NAVEGACAO.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.rotulo}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">{titulo}</h1>
        {children}
      </main>
    </div>
  );
}
