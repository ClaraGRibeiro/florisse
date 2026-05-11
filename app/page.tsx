"use client";
import { useEffect, useState } from "react";
import products from "@/data/products.json";
import { Product } from "@/types/product";
import Image from "next/image";

export default function Home() {
  const [type, setType] = useState<string>("");
  const filters = ["", "Tapetes", "Mesa Posta", "Jogos"];
  const labels = {
    "": "Todos",
    Tapetes: "Tapetes",
    "Mesa Posta": "Mesa Posta",
    Jogos: "Jogos",
  };
  const filtered = products.filter((p) => type === "" || p.type === type);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Florisse</h1>

            <p className="text-sm text-muted">Crochê artesanal feito à mão</p>
          </div>

          <nav className="hidden gap-6 md:flex">
            <a
              href="#inicio"
              className="scroll-smooth transition hover:text-primary"
            >
              Início
            </a>

            <a
              href="#produtos"
              className="scroll-smooth transition hover:text-primary"
            >
              Produtos
            </a>

            <a
              href="#sobre"
              className="scroll-smooth transition hover:text-primary"
            >
              Sobre
            </a>

            <a
              href="#contato"
              className="scroll-smooth transition hover:text-primary"
            >
              Contato
            </a>
          </nav>
        </div>
      </header>

      <section
        id="inicio"
        className="relative overflow-hidden bg-linear-to-br from-secondary via-background to-primary"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <span className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow">
              Feito com carinho 🧶
            </span>

            <h2 className="mt-6 text-5xl font-extrabold leading-tight">
              Peças artesanais que deixam sua casa mais aconchegante
            </h2>

            <p className="mt-6 text-lg text-muted">
              Tapetes, sousplats, cestos e muito mais produzidos manualmente com
              atenção a cada detalhe.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#produtos">
                <button className="cursor-pointer rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-primary-hover">
                  Ver produtos
                </button>
              </a>
              <a href="#contato">
                <button className="cursor-pointer rounded-2xl border border-border bg-card px-6 py-3 font-semibold transition hover:bg-input">
                  Fazer orçamento
                </button>
              </a>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/hero.png"
              alt="Crochê artesanal"
              width={1200}
              height={800}
              className="rounded-4xl shadow-2xl"
            />

            <div className="absolute -bottom-6 -left-6 rounded-3xl bg-card p-5 shadow-xl">
              <p className="text-sm text-muted">Clientes satisfeitos</p>

              <h3 className="text-3xl font-bold">+500</h3>
            </div>
          </div>
        </div>
      </section>

      <section id="produtos" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Produtos em destaque</h2>

          <p className="mt-3 text-muted">Feitos à mão com muito amor.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setType(f)}
                className={`cursor-pointer relative rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300
        ${
          type === f
            ? "bg-primary text-white shadow-lg scale-[1.02]"
            : "bg-card text-muted hover:bg-input hover:text-foreground"
        }`}
              >
                {labels[f as keyof typeof labels]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {filtered.length === 0 ? (
            <div className="col-span-4 text-center py-20 text-muted">
              Nenhum produto encontrado nessa categoria 🧶
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.name}
                className="group relative overflow-hidden rounded-3xl bg-card shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* BADGES */}
                <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
                  {product.sales && (
                    <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white shadow">
                      {product.sales} vendidos
                    </span>
                  )}
                </div>

                {/* IMAGE */}
                <div className="overflow-hidden">
                  <Image
                    src={"/products/" + product.name + ".png"}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  {/* TITLE + PRICE */}
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold leading-snug">
                        {product.name}
                      </h3>
                      {/* DETAILS */}
                      {product.details && (
                        <p className="mt-2 text-sm text-muted">
                          {product.details}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="block text-xl font-bold text-primary">
                        {product.price}
                      </span>

                      {product.no_discount && (
                        <span className="text-xs line-through text-muted">
                          {product.no_discount}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/5538992030710?text=Olá! Quero esse produto: ${product.name}`,
                        "_blank",
                      )
                    }
                    className="cursor-pointer mt-5 w-full rounded-xl bg-dark px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary hover:scale-[1.02]"
                  >
                    Comprar pelo WhatsApp
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section id="sobre" className="bg-card py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <Image
            src="/hero2.png"
            alt="Artesã trabalhando"
            width={1200}
            height={800}
            className="rounded-4xl shadow-xl"
          />

          <div>
            <h2 className="text-4xl font-bold">Sobre a loja</h2>

            <p className="mt-6 text-lg leading-relaxed text-muted">
              Cada peça é criada manualmente com muito cuidado, trazendo um
              toque único e acolhedor para sua casa. Nosso objetivo é unir
              beleza, conforto e exclusividade em cada detalhe.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-input p-6">
                <h3 className="text-3xl font-bold">100%</h3>

                <p className="mt-2 text-sm text-muted">Artesanal</p>
              </div>

              <div className="rounded-3xl bg-input p-6">
                <h3 className="text-3xl font-bold">+5 anos</h3>

                <p className="mt-2 text-sm text-muted">de experiência</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-4xl bg-dark p-10 text-white shadow-2xl">
          <h2 className="text-4xl font-bold">Faça seu pedido</h2>

          <p className="mt-4 text-[#E6DCCF]">
            Entre em contato para encomendas personalizadas.
          </p>

          <form className="mt-10 grid gap-5">
            <input
              type="text"
              placeholder="Seu nome"
              className="rounded-2xl border border-border bg-input px-5 py-4 text-foreground outline-none transition focus:border-secondary"
            />

            <input
              type="email"
              placeholder="Seu e-mail"
              className="rounded-2xl border border-border bg-input px-5 py-4 text-foreground outline-none transition focus:border-secondary"
            />

            <textarea
              placeholder="Escreva sua mensagem"
              rows={5}
              className="rounded-2xl border border-border bg-input px-5 py-4 text-foreground outline-none transition focus:border-secondary"
            />

            <button className="cursor-pointer rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-white transition hover:bg-primary-hover">
              Enviar mensagem
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border bg-card py-6 text-center text-sm text-muted">
        © 2026 Florisse — Todos os direitos reservados.
      </footer>
      {showTop && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-white shadow-xl transition-all hover:scale-110 hover:bg-primary-hover"
        >
          ↑
        </button>
      )}
    </main>
  );
}
