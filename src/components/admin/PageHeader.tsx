export function PageHeader({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <header>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-olive">{eyebrow}</p>
      ) : null}
      <h1 className="mt-1 font-sans text-3xl font-bold tracking-tight text-ink">{title}</h1>
      {description ? <p className="mt-2 max-w-2xl text-sm text-ink/60">{description}</p> : null}
    </header>
  );
}
