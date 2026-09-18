type ProductFiltersProps = {
  category: string;
  setCategory: (category: string) => void;
  filters: string[];
  categoryCounts: Record<string, number>;
};

export default function ProductFilters({
  category,
  setCategory,
  filters,
  categoryCounts,
}: ProductFiltersProps) {
  return (
    <div className="mt-10 flex justify-center">
      <div className="flex flex-wrap justify-center gap-2 rounded-full bg-muted/10 p-1.5">
        {filters.map((filter) => {
          const isReady = filter === "Pronta entrega";

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setCategory(filter)}
              className={`relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${category === filter
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : isReady
                    ? "border border-primary/30 bg-primary/5 text-primary hover:border-primary/50 hover:bg-primary/10"
                    : "border border-border bg-background text-muted hover:border-primary/30 hover:text-primary"
                }`}
            >
              {isReady && (
                <span
                  className={`text-sm ${category === filter
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
                  className={`text-xs ${category === filter
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
    </div>
  );
}