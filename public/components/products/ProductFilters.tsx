type SortOption = "relevancia" | "menor-preco" | "maior-preco" | "az" | "za";

type ProductFiltersProps = {
  category: string;
  setCategory: (category: string) => void;
  filters: string[];
  categoryCounts: Record<string, number>;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
};

export default function ProductFilters({
  category,
  setCategory,
  filters,
  categoryCounts,
  sort,
  setSort,
}: ProductFiltersProps) {
  const totalProducts = filters
    .filter((filter) => filter !== "Pronta Entrega")
    .reduce((total, filter) => total + (categoryCounts[filter] ?? 0), 0);
  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      {/* Categorias */}
      <div className="bg-muted/10 flex flex-wrap justify-center gap-2 rounded-full p-1.5">
        {/* Todos */}
        <button
          type="button"
          onClick={() => setCategory("Todos")}
          className={`relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
            category === "Todos"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-background text-muted hover:border-primary/30 hover:text-primary border"
          }`}
        >
          Todos
          {totalProducts !== undefined && (
            <span
              className={`text-xs ${
                category === "Todos"
                  ? "text-primary-foreground/80"
                  : "text-muted"
              }`}
            >
              {totalProducts}
            </span>
          )}
        </button>

        {filters.map((filter) => {
          const isReady = filter === "Pronta Entrega";

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setCategory(filter)}
              className={`relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                category === filter
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : isReady
                    ? "border-primary/30 bg-primary/5 text-primary hover:border-primary/50 hover:bg-primary/10 border"
                    : "border-border bg-background text-muted hover:border-primary/30 hover:text-primary border"
              }`}
            >
              {isReady && (
                <span
                  className={`text-sm ${
                    category === filter
                      ? "text-primary-foreground"
                      : "text-primary"
                  }`}
                >
                  ✦
                </span>
              )}

              {filter}

              {categoryCounts[filter] !== undefined && (
                <span
                  className={`text-xs ${
                    category === filter
                      ? "text-primary-foreground/80"
                      : "text-muted"
                  }`}
                >
                  {categoryCounts[filter]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Ordenação */}
      {category !== "Pronta Entrega" ? (
        <div className="flex items-center gap-2">
          <span className="text-muted text-sm">Ordenar por</span>

          <div className="relative">
            <select
              id="sort-products"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="border-border/70 bg-background text-foreground hover:border-primary/40 focus:border-primary focus:ring-primary/10 cursor-pointer appearance-none rounded-full border py-2.5 pr-10 pl-4 text-sm font-medium shadow-sm transition-all duration-200 outline-none hover:shadow-md focus:ring-2"
            >
              <option value="relevancia">Relevância</option>

              <option value="menor-preco">Menor preço</option>

              <option value="maior-preco">Maior preço</option>

              <option value="az">A - Z</option>

              <option value="za">Z - A</option>
            </select>

            <svg
              className="text-muted pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="border-primary/20 bg-primary/5 rounded-2xl border px-4 py-3.5 shadow-sm">
          <p className="text-foreground/80 text-sm leading-relaxed">
            <span className="text-primary font-semibold">
              <span>✦</span> Quer receber mais rápido?
            </span>{" "}
            Essas peças já estão prontas para você. Escolha sua favorita e fale
            comigo pelo WhatsApp!
          </p>
        </div>
      )}
    </div>
  );
}
