"use client";

import { INSTAGRAM } from "@/data/config";
import { useCart } from "@/hooks/useCart";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaBars,
  FaCartPlus,
  FaInstagram,
  FaTimes,
} from "react-icons/fa";

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

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const { dialogRef: mobileMenuRef } =
    useModalAccessibility({
      isOpen: menuOpen,
      onClose: closeMenu,
    });

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          {/* LOGO */}
          <Link href="/" className="block" onClick={closeMenu}>
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
                <h1 className="font-serif text-base font-semibold leading-tight tracking-tight sm:text-2xl">
                  <span className="sm:hidden">
                    Florisse
                    <br />
                    Crochê
                  </span>

                  <span className="hidden sm:inline">
                    Florisse Crochê
                  </span>
                </h1>

                <p className="hidden text-xs text-muted sm:block">
                  Onde o crochê vira paz.
                </p>
              </div>
            </div>
          </Link>

          {/* DESKTOP */}
          <nav className="hidden items-center gap-4 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-sm font-medium text-foreground-soft transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"

              >
                {item.label}
              </a>
            ))}

            {/* CARRINHO */}
            <Link
              href="/carrinho"
              className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:scale-[1.03] hover:bg-primary-hover"
            >
              <FaCartPlus size={16} />

              <span>Carrinho</span>

              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {totalItems}
              </span>
            </Link>

            {/* INSTAGRAM */}
            <button
              type="button"
              onClick={() =>
                window.open(
                  INSTAGRAM,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-primary shadow-md transition-all hover:scale-[1.03]"
            >
              <FaInstagram size={16} />
              <span>Instagram</span>
            </button>
          </nav>

          {/* MOBILE */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* CARRINHO MOBILE */}
            <Link href="/carrinho" aria-label="Abrir carrinho">
              <button
                type="button"
                className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md transition hover:scale-105"
              >
                <FaCartPlus size={20} />

                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>
            <button
              type="button"
              onClick={() => {
                closeMenu();

                window.open(
                  INSTAGRAM,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-primary shadow-md transition hover:scale-105"
            >
              <FaInstagram size={16} />
            </button>

            {/* MENU */}
            <button
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:bg-muted"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* MENU LATERAL MOBILE */}
      <aside
        ref={mobileMenuRef}
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(85vw,360px)] flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 lg:hidden ${menuOpen
          ? "translate-x-0"
          : "translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        tabIndex={-1}
        aria-hidden={!menuOpen}
      >
        {/* CABEÇALHO DO MENU */}
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          <div>
            <p
              id="mobile-menu-title"
              className="font-serif text-xl font-semibold"
            >
              Florisse Crochê
            </p>

            <p className="mt-0.5 text-xs text-muted">
              Onde o crochê vira paz.
            </p>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Fechar menu"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <FaTimes
              size={18}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* NAVEGAÇÃO */}
        <nav className="flex flex-col px-5 py-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="border-b border-border py-4 text-base font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* AÇÕES */}
        <div className="mt-auto border-t border-border p-5">
          <Link
            href="/carrinho"
            onClick={closeMenu}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-md transition hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <FaCartPlus
              size={16}
              aria-hidden="true"
            />

            <span>Meu carrinho</span>

            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {totalItems}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => {
              closeMenu();

              window.open(
                INSTAGRAM,
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-primary shadow-sm transition hover:bg-muted"
          >
            <FaInstagram size={16} />

            <span>Instagram</span>
          </button>
        </div>
      </aside>
    </>
  );
}