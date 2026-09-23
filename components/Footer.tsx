import { BRAND, CITY, INSTAGRAM, MAPS, SLOGAN, WHATSAPP } from "@/data/config";
import Link from "next/link";
import { FaInstagram, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-muted/10 border-t">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
          <div>
            <Link
              href="/"
              className="text-foreground hover:text-primary inline-block font-serif text-2xl font-semibold tracking-tight transition-colors"
            >
              {BRAND}
            </Link>

            <p className="text-muted mt-2 font-serif text-sm italic">
              {SLOGAN}
            </p>

            <p className="text-muted mt-5 max-w-xs text-sm leading-relaxed">
              Peças feitas à mão, com cuidado, tempo e carinho para fazer parte
              da sua casa.
            </p>
          </div>

          <div>
            <h3 className="text-foreground text-xs font-semibold tracking-[0.18em] uppercase">
              Navegação
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="/#produtos"
                className="text-muted hover:text-primary w-fit text-sm transition-colors"
              >
                Produtos
              </Link>

              <Link
                href="/?categoria=Pronta+Entrega#produtos"
                className="text-muted hover:text-primary w-fit text-sm transition-colors"
              >
                Pronta entrega
              </Link>

              <Link
                href="/#cores"
                className="text-muted hover:text-primary w-fit text-sm transition-colors"
              >
                Cores
              </Link>

              <Link
                href="/#por-que-florisse"
                className="text-muted hover:text-primary w-fit text-sm transition-colors"
              >
                Por que Florisse?
              </Link>

              <Link
                href="/#sobre"
                className="text-muted hover:text-primary w-fit text-sm transition-colors"
              >
                Sobre
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-foreground text-xs font-semibold tracking-[0.18em] uppercase">
              Atendimento
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary flex w-fit items-center gap-2 text-sm transition-colors"
              >
                <FaWhatsapp className="text-base" />
                WhatsApp
              </a>

              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary flex w-fit items-center gap-2 text-sm transition-colors"
              >
                <FaInstagram className="text-base" />
                Instagram
              </a>

              <a
                href={MAPS}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary flex w-fit items-center gap-2 text-sm transition-colors"
              >
                <FaMapMarkerAlt className="text-base" />
                {CITY}
              </a>
            </div>
          </div>
        </div>

        <div className="bg-border my-10 h-px" />

        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-muted text-xs">
            © {year} {BRAND}
          </p>

          <p className="text-muted font-serif text-xs italic">
            Feito à mão com carinho.
          </p>
        </div>
      </div>
    </footer>
  );
}
