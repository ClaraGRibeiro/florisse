import Image from "next/image";
import { FaCartPlus, FaInstagram } from "react-icons/fa";
import { FaClover } from "react-icons/fa6";
type HeaderProps = {
  cartLength: number;
  openCart: () => void;
  raffleIsOn: boolean;
  openRaffle: () => void;
};

const navItems = ["Início", "Produtos", "Sobre", "Cuidados"];

export default function Header({
  cartLength,
  openCart,
  raffleIsOn,
  openRaffle,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/15 shadow-sm">
            <Image
              src="/logo.webp"
              alt="Florisse Crochê"
              width={80}
              height={80}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <h1 className="truncate font-serif text-xl font-semibold tracking-tight sm:text-2xl">
              Florisse Crochê
            </h1>

            <p className="hidden text-xs text-muted sm:block">
              Onde o crochê vira paz.
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-4 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-sm font-medium text-foreground-soft transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item}
            </a>
          ))}

          {raffleIsOn && (
            <button
              onClick={openRaffle}
              className="cursor-pointer flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:scale-[1.03] hover:bg-secondary-hover"
            >
              <FaClover size={16} />
              <span>Rifa</span>
            </button>
          )}

          <button
            onClick={openCart}
            className="cursor-pointer flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:scale-[1.03] hover:bg-primary-hover"
          >
            <span>Carrinho</span>

            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {cartLength}
            </span>
          </button>
          <button
            onClick={() =>
              window.open("https://instagram.com/florisse_croche", "_blank")
            }
            className="cursor-pointer flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-primary shadow-md transition-all hover:scale-[1.03]"
          >
            <FaInstagram size={16} />
            <span>Instagram</span>
          </button>
        </nav>
        <div className="flex lg:hidden gap-4">
          {raffleIsOn && (
            <button
              onClick={openRaffle}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-white shadow-md transition hover:scale-105 lg:hidden"
            >
              <FaClover size={20} />
            </button>
          )}

          <button
            onClick={openCart}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-md transition hover:scale-105 lg:hidden"
          >
            <FaCartPlus size={20} />

            {cartLength > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {cartLength}
              </span>
            )}
          </button>
          <button
            onClick={() => window.open("https://instagram.com/florisse", "_blank")}
            className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-md transition hover:scale-105 lg:hidden"
          >
            <FaInstagram size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
