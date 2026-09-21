type SortOption =
  | "relevancia"
  | "menor-preco"
  | "maior-preco"
  | "az";

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
  .filter((filter) => filter !== "Pronta entrega")
  .reduce(
    (total, filter) => total + (categoryCounts[filter] ?? 0),
    0,
  );
  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      {/* Categorias */}
      <div className="flex flex-wrap justify-center gap-2 rounded-full bg-muted/10 p-1.5">
        {/* Todos */}
        <button
          type="button"
          onClick={() => setCategory("Todos")}
          className={`relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
            category === "Todos"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "border border-border bg-background text-muted hover:border-primary/30 hover:text-primary"
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
          const isReady = filter === "Pronta entrega";

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setCategory(filter)}
              className={`relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                category === filter
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : isReady
                    ? "border border-primary/30 bg-primary/5 text-primary hover:border-primary/50 hover:bg-primary/10"
                    : "border border-border bg-background text-muted hover:border-primary/30 hover:text-primary"
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
      <div className="flex items-center gap-2">
  <span className="text-sm text-muted">
    Ordenar por
  </span>

  <div className="relative">
    <select
      id="sort-products"
      value={sort}
      onChange={(event) =>
        setSort(event.target.value as SortOption)
      }
      className="cursor-pointer appearance-none rounded-full border border-border/70 bg-background py-2.5 pl-4 pr-10 text-sm font-medium text-foreground shadow-sm outline-none transition-all duration-200 hover:border-primary/40 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/10"
    >
      <option value="relevancia">
        Relevância
      </option>

      <option value="menor-preco">
        Menor preço
      </option>

      <option value="maior-preco">
        Maior preço
      </option>

      <option value="az">
        A–Z
      </option>
    </select>

    <svg
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
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
    </div>
  );
}