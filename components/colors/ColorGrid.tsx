import Link from "next/link";
import { FaPalette } from "react-icons/fa";
import { Color } from "@/lib/colors";
import { formatPath } from "@/utils/format";
type ColorGridProps = {
  colors: Color[];
  formatColor: (name: string) => string;
  onOpenPalette: () => void;
};
export default function ColorGrid({
  colors,
  formatColor,
  onOpenPalette,
}: ColorGridProps) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-5 gap-x-3 gap-y-6 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
      {colors.map((color) => {
        const isLight =
          color.hex.toLowerCase() === "#ffffff" ||
          color.hex.toLowerCase() === "#fff";
        return (
          <Link
            key={color.name}
            href={`/cores/${formatPath(color.name)}`}
            className="group focus-visible:ring-primary flex cursor-pointer flex-col items-center rounded-2xl p-1 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label={`Ver peças na cor ${formatColor(color.name)}`}
          >
            <div
              className={`relative h-14 w-14 overflow-hidden rounded-full shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg sm:h-16 sm:w-16 ${isLight ? "border-border border" : ""}`}
              style={{ backgroundColor: color.hex }}
            >
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <span className="text-foreground-soft group-hover:text-primary mt-2 max-w-20 text-center text-[11px] leading-tight font-medium transition-colors sm:text-xs">
              {formatColor(color.name)}
            </span>
          </Link>
        );
      })}
      <button
        type="button"
        onClick={onOpenPalette}
        aria-label="Abrir ideias de paletas"
        className="group focus-visible:ring-primary flex cursor-pointer flex-col items-center rounded-2xl p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <div className="border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-lg sm:h-16 sm:w-16">
          <FaPalette size={20} aria-hidden="true" />
          <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <span className="text-foreground-soft group-hover:text-primary mt-2 max-w-20 text-center text-[11px] leading-tight font-medium transition-colors sm:text-xs">
          Ideias de paleta
        </span>
      </button>
    </div>
  );
}
