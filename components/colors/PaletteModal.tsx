import { AnimatePresence, motion } from "framer-motion";
import { FaPalette } from "react-icons/fa";

import { Color, Palette } from "@/lib/colors";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";

type PaletteModalProps = {
  isOpen: boolean;
  palettes: Palette[];
  colors: Color[];
  formatColor: (name: string) => string;
  onClose: () => void;
  onSelectColor: (colorName: string) => void;
};

export default function PaletteModal({
  isOpen,
  palettes,
  colors,
  formatColor,
  onClose,
  onSelectColor,
}: PaletteModalProps) {
  const accessibility = useModalAccessibility({
    isOpen,
    onClose,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={accessibility.dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="palette-modal-title"
            aria-describedby="palette-modal-description"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-card relative z-10 flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-4xl shadow-2xl focus:outline-none"
          >
            <div className="border-border border-b px-5 py-6 pr-16 sm:px-8 sm:py-7">
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar ideias de paletas"
                className="bg-background text-foreground hover:bg-input focus-visible:ring-primary absolute top-5 right-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-base shadow-sm transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <span aria-hidden="true">✕</span>
              </button>

              <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
                Inspirações
              </span>

              <h2
                id="palette-modal-title"
                className="mt-2 font-serif text-3xl font-semibold sm:text-4xl"
              >
                Ideias de Paletas
              </h2>

              <p
                id="palette-modal-description"
                className="text-muted mt-2 max-w-2xl text-sm leading-relaxed"
              >
                Combinações pensadas para diferentes estilos, momentos e
                estações do ano.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {palettes.map((palette, paletteIndex) => (
                  <motion.div
                    key={palette.category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: paletteIndex * 0.025,
                    }}
                    className="group border-border bg-background/50 hover:border-primary/20 rounded-3xl border p-5 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-serif text-xl font-semibold">
                        {palette.category}
                      </h3>

                      <FaPalette
                        size={13}
                        aria-hidden="true"
                        className="text-muted group-hover:text-primary"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {palette.colors.map((colorName) => {
                        const foundColor = colors.find(
                          (color) => color.name === colorName,
                        );

                        if (!foundColor) {
                          return null;
                        }

                        return (
                          <button
                            key={colorName}
                            type="button"
                            onClick={() => onSelectColor(colorName)}
                            title={formatColor(foundColor.name)}
                            aria-label={`Ver combinações com ${formatColor(
                              foundColor.name,
                            )}`}
                            className="group/color focus-visible:ring-primary cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                          >
                            <div
                              className="border-border h-14 w-full overflow-hidden rounded-xl border shadow-sm transition-all duration-300 group-hover/color:-translate-y-0.5 group-hover/color:shadow-md sm:h-16"
                              style={{ backgroundColor: foundColor.hex }}
                            >
                              <div className="h-full w-full bg-linear-to-br from-white/15 via-transparent to-black/10 opacity-0 transition-opacity group-hover/color:opacity-100" />
                            </div>

                            <span className="text-muted group-hover/color:text-primary mt-1.5 block truncate text-center text-[10px] font-medium transition-colors sm:text-xs">
                              {formatColor(foundColor.name)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
