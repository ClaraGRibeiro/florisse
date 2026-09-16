import { useMemo } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

import { Color } from "@/types/color";
import { getGradient } from "@/utils/gradient";

type ProductCustomColorProps = {
  colors: Color[];

  search: string;
  selectedColors: string[];

  onSearchChange: (value: string) => void;
  onColorToggle: (colorName: string) => void;
  onColorRemove: (colorName: string) => void;
};

export default function ProductCustomColor({
  colors,
  search,
  selectedColors,
  onSearchChange,
  onColorToggle,
  onColorRemove,
}: ProductCustomColorProps) {
  const filteredColors = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return [];
    }

    return colors.filter((color) =>
      color.name.toLowerCase().includes(normalizedSearch),
    );
  }, [colors, search]);

  const selectedColorData = useMemo(
    () =>
      selectedColors
        .map((colorName) =>
          colors.find((color) => color.name === colorName),
        )
        .filter((color): color is Color => Boolean(color)),
    [colors, selectedColors],
  );

  return (
    <div className="mt-6 rounded-3xl border border-border/70 bg-muted/10 p-5">
      <div>
        <p className="font-serif text-lg font-semibold text-foreground">
          Escolha outras cores
        </p>

        <p className="mt-1 text-sm leading-relaxed text-muted">
          Pesquise e selecione as cores que você deseja combinar na sua peça.
        </p>
      </div>

      <div className="relative mt-5">
        <FaSearch
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-muted"
        />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar cor..."
          aria-label="Buscar uma cor"
          className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>

      {search.trim() && (
        <div className="mt-4 max-h-48 overflow-y-auto rounded-2xl border border-border/70 bg-background p-2">
          {filteredColors.length > 0 ? (
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {filteredColors.map((color) => {
                const isSelected = selectedColors.includes(color.name);

                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => onColorToggle(color.name)}
                    aria-pressed={isSelected}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                      isSelected
                        ? "bg-primary/10"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <span
                      className="h-7 w-7 shrink-0 rounded-full border border-border shadow-sm"
                      style={{
                        background: getGradient([color.hex]),
                      }}
                      aria-hidden="true"
                    />

                    <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                      {color.name}
                    </span>

                    {isSelected && (
                      <span
                        className="text-xs font-semibold text-primary"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="px-3 py-5 text-center text-sm text-muted">
              Nenhuma cor encontrada.
            </p>
          )}
        </div>
      )}

      {selectedColorData.length > 0 && (
        <div className="mt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Cores escolhidas
          </p>

          <div className="flex flex-wrap gap-2">
            {selectedColorData.map((color) => (
              <div
                key={color.name}
                className="flex items-center gap-2 rounded-full border border-border bg-background py-1.5 pl-2 pr-3"
              >
                <span
                  className="h-6 w-6 rounded-full border border-border/70"
                  style={{
                    background: getGradient([color.hex]),
                  }}
                  aria-hidden="true"
                />

                <span className="max-w-32 truncate text-xs font-medium text-foreground">
                  {color.name}
                </span>

                <button
                  type="button"
                  onClick={() => onColorRemove(color.name)}
                  aria-label={`Remover cor ${color.name}`}
                  className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-muted hover:text-foreground"
                >
                  <FaTimes
                    aria-hidden="true"
                    className="text-[9px]"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 rounded-xl bg-primary/5 px-4 py-3 text-xs leading-relaxed text-muted">
        Você pode escolher quantas cores quiser para criar uma combinação
        personalizada.
      </div>
    </div>
  );
}