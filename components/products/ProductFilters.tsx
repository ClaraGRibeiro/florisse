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
          const active = category === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setCategory(filter)}
              className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted hover:text-primary"
              }`}
            >
              {filter}

              <span
                className={`ml-1.5 text-xs ${
                  active
                    ? "text-primary-foreground/75"
                    : "text-muted"
                }`}
              >
                {categoryCounts[filter] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}