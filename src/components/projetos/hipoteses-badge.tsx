/**
 * Selo com a quantidade de hipóteses de um projeto.
 *
 * Projeto sem hipótese recebe tratamento diferente de propósito: é um
 * sinal de que o enquadramento ainda não virou aposta testável.
 */
export type HipotesesBadgeProps = {
  /** Quantidade de hipóteses registradas para o projeto. */
  quantidade: number;
};

export function HipotesesBadge({ quantidade }: HipotesesBadgeProps) {
  const vazio = quantidade === 0;

  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium " +
        (vazio ? "bg-slate-100 text-slate-600" : "bg-sky-100 text-sky-900")
      }
      title={
        vazio
          ? "Nenhuma hipótese registrada — o enquadramento ainda não virou aposta testável."
          : `${quantidade} hipótese(s) registrada(s)`
      }
    >
      {vazio ? "sem hipótese" : `${quantidade} hipótese${quantidade > 1 ? "s" : ""}`}
    </span>
  );
}
