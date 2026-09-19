import { INSTAGRAM, WHATSAPP } from "@/data/config";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
          {/* Marca */}
          <div>
            <Link
              href="/"
              className="inline-block font-serif text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
            >
              Florisse Crochê
            </Link>

            <p className="mt-2 font-serif text-sm italic text-muted">
              Onde o crochê vira paz.
            </p>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Peças feitas à mão, com cuidado, tempo e carinho para fazer parte
              da sua casa.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Navegação
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="/#produtos"
                className="w-fit text-sm text-muted transition-colors hover:text-primary"
              >
                Produtos
              </Link>

              <Link
                href="/#cores"
                className="w-fit text-sm text-muted transition-colors hover:text-primary"
              >
                Cores
              </Link>

              <Link
                href="/#por-que-florisse"
                className="w-fit text-sm text-muted transition-colors hover:text-primary"
              >
                Por que Florisse?
              </Link>

              <Link
                href="/#cuidados"
                className="w-fit text-sm text-muted transition-colors hover:text-primary"
              >
                Cuidados
              </Link>

              <Link
                href="/#sobre"
                className="w-fit text-sm text-muted transition-colors hover:text-primary"
              >
                Sobre
              </Link>
            </nav>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Atendimento
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
              >
                <FaWhatsapp className="text-base" />
                WhatsApp
              </a>

              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
              >
                <FaInstagram className="text-base" />
                Instagram
              </a>

              <span className="text-sm text-muted">
                Montes Claros – MG
              </span>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="my-10 h-px bg-border" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted">
            © {year} Florisse Crochê
          </p>

          <p className="font-serif text-xs italic text-muted">
            Feito à mão com carinho.
          </p>
        </div>
      </div>
    </footer>
  );
}