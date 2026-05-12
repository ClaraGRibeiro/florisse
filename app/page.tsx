"use client";
import productsData from "@/data/products.json";
import { Product } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const products: Product[] = productsData;
  const [type, setType] = useState<string>("Tapetes");
  const filters = ["Tapetes", "Mesa Posta", "Jogos"];
  const labels = {
    Tapetes: "Tapetes",
    "Mesa Posta": "Mesa Posta",
    Jogos: "Jogos",
  };
  const [selectedSize, setSelectedSize] = useState(0);
  const filtered = products.filter((p) => type === "" || p.type === type);
  const [showTop, setShowTop] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
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
    <main className="min-h-screen bg-background text-foreground">
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

      <section
        id="início"
        className="scroll-mt-20 relative bg-linear-to-br from-card-soft to-accent overflow-hidden"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mt-6 text-5xl font-extrabold leading-tight">
              Peças artesanais que deixam sua casa mais{" "}
              <span className="text-primary">aconchegante</span>
            </h2>

            <p className="mt-6 text-lg text-muted">
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

      <section
        id="produtos"
        className="scroll-mt-20 mx-auto max-w-7xl px-6 py-14"
      >
        {" "}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold">
            Produtos em Destaque
          </h2>

          <p className="mt-3 text-[var(--muted)]">
            Feitos à mão com muito amor.
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setType(f)}
              className={`cursor-pointer rounded-full px-5 py-2 text-sm transition border ${
                type === f
                  ? "bg-[var(--primary)] text-white border-transparent"
                  : "bg-white text-[var(--muted)] border-[var(--border)] hover:text-[var(--primary)]"
              }`}
            >
              {labels[f as keyof typeof labels]}
            </button>
          ))}
        </div>
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {filtered.map((product) => (
            <div
              key={product.name}
              className="break-inside-avoid rounded-2xl overflow-hidden bg-[var(--card)] shadow-sm hover:shadow-xl transition"
            >
              <div className="relative">
                <Image
                  src={`/products/${product.slug}/${product.variants[0].image}`}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full object-cover transition duration-300 hover:scale-[1.02]"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>

                <div className="flex items-center gap-2 mt-3">
                  {product.variants.map((variant, index) => (
                    <div
                      key={index}
                      title={variant.color}
                      className="h-5 w-5 rounded-full border-2 border-white shadow-sm"
                      style={{
                        background:
                          variant.color === "Cru"
                            ? "#F5E6CC"
                            : variant.color === "Azul Marinho"
                              ? "#1E3A5F"
                              : "#ccc",
                      }}
                    />
                  ))}

                  <span className="text-xs text-muted ml-1">
                    {product.variants.length} cores
                  </span>
                </div>

                <div className="mt-3 flex flex-row justify-between align-middle items-center">
                  <span className="text-[var(--primary)] font-bold">
                    R$ {product.sizes[0].price}{" "}
                    {product.sizes[0].no_discount && (
                      <span className="font-medium text-muted line-through">
                        {product.sizes[0].no_discount}
                      </span>
                    )}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedColor(0);
                      setSelectedSize(0);
                    }}
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

      <section id="sobre" className="scroll-mt-20 py-20 bg-card-soft">
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

      <footer className="border-t border-border py-6 text-center text-sm text-muted">
        © 2026 Florisse — Todos os direitos reservados.
      </footer>
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-card shadow-2xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-xl backdrop-blur transition hover:scale-105"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2">
              <div className="bg-card-soft p-5">
                <Image
                  src={`/products/${selectedProduct.slug}/${selectedProduct.variants[selectedColor].image}`}
                  alt={selectedProduct.name}
                  width={1000}
                  height={1000}
                  className="h-full w-full rounded-[1.5rem] object-cover"
                />
              </div>
              <div className="flex flex-col justify-between p-8">
                <div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {selectedProduct.sales} vendidos
                  </span>

                  <h2 className="mt-4 text-4xl font-bold">
                    {selectedProduct.name}
                  </h2>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="text-3xl font-bold text-primary">
                      R$ {selectedProduct.sizes[selectedSize].price}{" "}
                    </span>

                    {selectedProduct.sizes[selectedSize].no_discount && (
                      <span className="text-muted line-through">
                        R$ {selectedProduct.sizes[selectedSize].no_discount}
                      </span>
                    )}
                  </div>

                  <div className="mt-8">
                    <p className="mb-3 text-sm font-medium">Escolha a cor:</p>

                    <div className="flex flex-wrap gap-3">
                      {selectedProduct.variants.map((v: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(i)}
                          className={`flex items-center gap-3 rounded-full border px-4 py-2 transition-all ${
                            selectedColor === i
                              ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105"
                              : "border-border bg-background hover:border-primary/40"
                          }`}
                        >
                          <div
                            className="h-5 w-5 rounded-full border border-white"
                            style={{
                              backgroundColor: v.hex,
                            }}
                          />

                          <span className="text-sm font-medium">{v.color}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-8">
                      <p className="mb-3 text-sm font-medium">
                        Escolha o tamanho:
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {selectedProduct.sizes.map((size: any, i: number) => (
                          <button
                            key={i}
                            onClick={() => setSelectedSize(i)}
                            className={`rounded-full border px-4 py-2 transition-all ${
                              selectedSize === i
                                ? "border-primary bg-primary text-white"
                                : "border-border bg-background"
                            }`}
                          >
                            {size.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/5538992030710?text=Olá! Quero o produto: ${
                    selectedProduct.name
                  } na cor ${
                    selectedProduct.variants[selectedColor].color
                  } no tamanho ${selectedProduct.sizes[selectedSize].label}`}
                  target="_blank"
                >
                  <button className="mt-10 w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-primary-foreground shadow-xl transition hover:scale-[1.02] hover:bg-primary-hover">
                    Pedir no WhatsApp 💬
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xl hover:bg-[var(--primary-hover)]"
        >
          ↑
        </button>
      )}
    </main>
  );
}
