"use client";

import { BRAND, INSTAGRAM, RAFFLE, SLOGAN } from "@/data/config";
import { useCart } from "@/hooks/useCart";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaBars,
  FaCartPlus,
  FaInstagram,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import CepModal from "@/components/freight/CepModal";
import { formatStoredCep, useFreightCep } from "@/hooks/useFreight";
import { FaClover } from "react-icons/fa6";

const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Produtos", href: "/#produtos" },
  { label: "Cores", href: "/#cores" },
  { label: "Cuidados", href: "/#cuidados" },
  { label: "Sobre", href: "/#sobre" },
];

export default function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cepModalOpen, setCepModalOpen] = useState(false);
  const { cep } = useFreightCep();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const { dialogRef: mobileMenuRef } = useModalAccessibility({
    isOpen: menuOpen,
    onClose: closeMenu,
  });

  return (
    <>
      <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="block" onClick={closeMenu}>
            <div className="flex min-w-0 items-center gap-3">
              <div className="bg-primary/15 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm">
                <Image
                  src="/logo.webp"
                  alt={BRAND}
                  width={80}
                  height={80}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <h1 className="max-w-22.5 font-serif text-base leading-tight font-semibold tracking-tight wrap-break-word sm:max-w-none sm:text-2xl">
                  {BRAND}
                </h1>

                <p className="text-muted hidden text-xs sm:block">{SLOGAN}</p>
              </div>
            </div>
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-4 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground-soft hover:text-primary after:bg-primary relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}

            {RAFFLE && (
              <Link
                href="/rifa"
                className="border-secondary/20 bg-secondary/10 text-secondary hover:bg-secondary/15 flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:scale-[1.03]"
              >
                <FaClover size={14} aria-hidden="true" />

                <span>Rifa</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setCepModalOpen(true)}
              className="border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5 flex max-w-44 cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium shadow-sm transition-all hover:scale-[1.02]"
              title={
                cep
                  ? `CEP salvo: ${formatStoredCep(cep)}`
                  : "Definir CEP para calcular o frete"
              }
            >
              <FaMapMarkerAlt
                className="text-primary shrink-0"
                size={14}
                aria-hidden="true"
              />
              <span className="truncate">
                {cep ? formatStoredCep(cep) : "Definir CEP"}
              </span>
            </button>

            <Link
              href="/carrinho"
              className="bg-primary text-primary-foreground hover:bg-primary-hover flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-md transition-all hover:scale-[1.03]"
            >
              <FaCartPlus size={16} aria-hidden="true" />

              <span>Carrinho</span>

              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {totalItems}
              </span>
            </Link>

            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Florisse Crochê"
              className="text-primary focus-visible:ring-primary flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium shadow-md transition-all hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <FaInstagram size={16} aria-hidden="true" />

              <span>Instagram</span>
            </a>
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setCepModalOpen(true)}
              aria-label={
                cep ? `Alterar CEP ${formatStoredCep(cep)}` : "Definir CEP"
              }
              className="border-border bg-background text-primary flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border shadow-sm transition hover:scale-105"
            >
              <FaMapMarkerAlt size={17} aria-hidden="true" />
            </button>

            <Link
              href="/carrinho"
              aria-label="Abrir carrinho"
              className="bg-primary relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white shadow-md transition hover:scale-105"
            >
              <FaCartPlus size={20} aria-hidden="true" />

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              aria-label="Instagram da Florisse Crochê"
              className="border-border text-primary focus-visible:ring-primary relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border bg-white shadow-md transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <FaInstagram size={16} aria-hidden="true" />
            </a>

            <button
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="border-border bg-background text-foreground hover:bg-muted flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border shadow-sm transition"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <aside
        ref={mobileMenuRef}
        className={`border-border bg-background fixed top-0 right-0 z-50 flex h-full w-[min(85vw,360px)] flex-col border-l shadow-2xl transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        tabIndex={-1}
        aria-hidden={!menuOpen}
      >
        <div className="border-border flex items-center justify-between border-b px-5 py-5">
          <div>
            <p
              id="mobile-menu-title"
              className="font-serif text-xl font-semibold"
            >
              {BRAND}
            </p>

            <p className="text-muted mt-0.5 text-xs">{SLOGAN}</p>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Fechar menu"
            className="border-border text-foreground hover:bg-muted focus-visible:ring-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <FaTimes size={18} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-col px-5 py-6">
          <button
            type="button"
            onClick={() => {
              closeMenu();
              setCepModalOpen(true);
            }}
            className="border-border text-foreground hover:text-primary flex items-center gap-3 border-b py-4 text-left text-base font-medium transition-colors"
          >
            <FaMapMarkerAlt
              className="text-primary"
              size={16}
              aria-hidden="true"
            />
            <span>
              {cep
                ? `Frete para ${formatStoredCep(cep)}`
                : "Definir CEP para o frete"}
            </span>
          </button>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="border-border text-foreground hover:text-primary border-b py-4 text-base font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}

          {RAFFLE && (
            <Link
              href="/rifa"
              onClick={closeMenu}
              className="border-border text-secondary hover:text-secondary-hover flex items-center gap-3 border-b py-4 text-base font-semibold transition-colors"
            >
              <FaClover size={16} aria-hidden="true" />

              <span>Rifa</span>

              <span className="bg-secondary/10 text-secondary ml-auto rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
                Concorra!
              </span>
            </Link>
          )}
        </nav>

        <div className="border-border mt-auto border-t p-5">
          <Link
            href="/carrinho"
            onClick={closeMenu}
            className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <FaCartPlus size={16} aria-hidden="true" />

            <span>Meu carrinho</span>

            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {totalItems}
            </span>
          </Link>

          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            aria-label="Instagram da Florisse Crochê"
            className="border-border text-primary hover:bg-muted focus-visible:ring-primary mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border bg-white px-5 py-3 text-sm font-medium shadow-sm transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <FaInstagram size={16} aria-hidden="true" />

            <span>Instagram</span>
          </a>
        </div>
      </aside>

      <CepModal isOpen={cepModalOpen} onClose={() => setCepModalOpen(false)} />
    </>
  );
}
