"use client";
import products from "@/data/products.json";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const best_selling = [...products].sort(
    (a, b) => (b.sales ?? 0) - (a.sales ?? 0),
  )[0];

  const msg =
    "https://wa.me/5538992030710?text=Olá! Quero fazer um orçamento, Florisse...";

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center text-primary text-lg">
              <Image
                src="/logo.png"
                alt="Crochê artesanal"
                width={1200}
                height={800}
                className="rounded-4xl shadow-2xl"
              />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                Florisse
              </h1>
              <p className="text-xs text-muted">Onde o crochê vira paz.</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {["Início", "Produtos", "Sobre"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-foreground-soft hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href={msg}
              target="_blank"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition shadow-sm"
            >
              Orçamento
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="início" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <span className="rounded-full bg-[var(--card)] px-4 py-2 text-sm font-medium shadow text-[var(--foreground)]">
              ✨ Feito com carinho
            </span>

            <h2 className="mt-6 text-5xl font-extrabold leading-tight">
              Peças artesanais que deixam sua casa mais{" "}
              <span className="text-primary">aconchegante</span>
            </h2>

            <p className="mt-6 text-lg text-[var(--muted)]">
              Cada peça é feita ponto por ponto, com tempo, carinho e intenção —
              para transformar ambientes em lugares mais vivos e acolhedores.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#produtos">
                <button className="cursor-pointer rounded-2xl bg-[var(--primary)] px-6 py-3 font-semibold text-[var(--primary-foreground)] shadow-lg transition hover:scale-105 hover:bg-[var(--primary-hover)]">
                  Ver produtos
                </button>
              </a>

              <a href={msg} target="_blank">
                <button className="cursor-pointer rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-3 font-semibold text-[var(--foreground)] transition hover:bg-[var(--input)]">
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

            <div className="absolute -bottom-6 -left-6 rounded-3xl bg-[var(--card)] p-5 shadow-xl text-[var(--foreground)]">
              <p className="text-sm text-[var(--muted)]">
                Mais vendida ({best_selling.sales} un)
              </p>
              <h3 className="text-xl font-bold">{best_selling.name}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTOS */}

      <section id="produtos" className="mx-auto max-w-7xl px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold">
            Produtos em Destaque
          </h2>

          <p className="mt-3 text-[var(--muted)]">
            Feitos à mão com muito amor.
          </p>
        </div>

        {/* FILTERS estilo Pinterest chips */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setType(f)}
              className={`rounded-full px-5 py-2 text-sm transition border ${
                type === f
                  ? "bg-[var(--primary)] text-white border-transparent"
                  : "bg-white text-[var(--muted)] border-[var(--border)] hover:text-[var(--primary)]"
              }`}
            >
              {labels[f as keyof typeof labels]}
            </button>
          ))}
        </div>

        {/* 🧱 PINTEREST GRID */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {filtered.map((product) => (
            <div
              key={product.name}
              className="break-inside-avoid rounded-2xl overflow-hidden bg-[var(--card)] shadow-sm hover:shadow-xl transition"
            >
              <div className="relative">
                <Image
                  src={`/products/${product.name}.png`}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>

                <p className="text-sm text-[var(--muted)] mt-1">
                  {product.details}
                </p>

                <div className="mt-3 flex flex-row justify-between align-middle items-center">
                  <span className="text-[var(--primary)] font-bold">
                    R$ {product.price} {" "}
                    <span className="font-medium text-muted line-through">
                      {product.no_discount}
                    </span>
                  </span>

                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/5538992030710?text=Olá! Quero esse produto: ${product.name}`,
                        "_blank",
                      )
                    }
                    className="text-[var(--muted)] px-2 py-1 rounded-md transition cursor-pointer hover:text-[var(--primary-foreground)] hover:bg-[var(--primary)]"
                  >
                    Quero!
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="bg-[var(--card)] py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <Image
            src="/sobre.png"
            alt="Artesã trabalhando"
            width={1200}
            height={800}
            className="rounded-4xl shadow-xl"
          />

          <div>
            <h2 className="text-4xl font-bold text-[#2f211b]">
              Sobre a Florisse
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-[#6f5749]">
              A Florisse nasceu do crochê como um refúgio pra mim. É onde eu
              desacelero, coloco a mente em ordem e encontro paz em cada ponto.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#6f5749]">
              Não é só sobre peças decorativas — é sobre o processo. Cada fio
              que eu trabalho me ajuda a aliviar a ansiedade e transformar
              pensamentos em algo bonito, leve e cheio de energia boa.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#6f5749]">
              Quando você recebe uma peça, não está levando só crochê. Está
              levando um pouco dessa calma, desse cuidado e dessa intenção de
              fazer tudo com amor.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] bg-[var(--card)] py-6 text-center text-sm text-[var(--muted)]">
        © 2026 Florisse — Todos os direitos reservados.
      </footer>

      {/* BOTÃO TO TOP */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xl hover:bg-[var(--primary-hover)]"
        >
          ↑
        </button>
      )}
    </main>
  );
}
