export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-4 py-8 sm:flex-row sm:gap-4 sm:py-7">
        <p className="font-serif text-sm italic text-muted">
          Onde o crochê vira paz.
        </p>

        <span className="hidden text-primary/40 sm:block">✦</span>

        <p className="text-xs text-muted">
          © {year} Florisse Crochê · Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}