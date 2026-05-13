"use client";
import productsData from "@/data/products.json";
import { Product } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";
import colorsData from "@/data/colors.json";

export default function Home() {
  const cares = [
    {
      icon: "🧼",
      title: "Lavar com cuidado",
      description:
        "Lave sempre à mão, com sabão neutro e água fria. Evite máquinas para não deformar os pontos.",
    },
    {
      icon: "🌤️",
      title: "Secagem natural",
      description:
        "Deixe secar à sombra, em superfície plana. Evite sol direto para não desbotar as cores.",
    },
    {
      icon: "🧺",
      title: "Armazenamento",
      description:
        "Guarde dobrado em local seco. Evite pendurar para não deformar a peça com o tempo.",
    },
    {
      icon: "🔥",
      title: "Evite calor",
      description:
        "Não passe ferro direto nem exponha a fontes de calor intenso.",
    },
    {
      icon: "🧽",
      title: "Limpeza leve",
      description:
        "Para poeira do dia a dia, use pano seco ou escova bem macia.",
    },
    {
      icon: "💛",
      title: "Cuidado emocional",
      description:
        "Cada peça é feita à mão com tempo e carinho — trate como algo especial.",
    },
  ];
  const colorMap = new Map(colorsData.map((c) => [c.color, c.hex]));
  const products: Product[] = productsData.map((product) => {
    const totalSales = product.sizes.reduce(
      (acc, size) => acc + (size.sales ?? 0),
      0,
    );

    return {
      ...product,
      total_sales: totalSales,
      colors: product.colors.map((color) => {
        const colorParts = color.color.split("-");

        const hex = colorParts.map((part) => colorMap.get(part) || "#000000");

        return {
          ...color,
          hex,
        };
      }),
    };
  });
  const [category, setCategory] = useState<string>("Tapetes");
  const filters = ["Tapetes", "Mesa Posta", "Jogos"];
  const labels = {
    Tapetes: "Tapetes",
    "Mesa Posta": "Mesa Posta",
    Jogos: "Jogos",
  };
  const [selectedSize, setSelectedSize] = useState(0);
  const filtered = products.filter(
    (p) => category === "" || p.category === category,
  );
  const [showTop, setShowTop] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!selectedProduct) return;

    selectedProduct.colors.forEach((color) => {
      const img = new window.Image();

      img.src = `/products/${selectedProduct.name}/${color.color}.png`;
    });
  }, [selectedProduct]);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const best_selling = [...products].sort(
    (a, b) => (b.total_sales ?? 0) - (a.total_sales ?? 0),
  )[0];
  const msg =
    "https://wa.me/5538992030710?text=Olá! Quero fazer um orçamento de um pedido personalizado, Florisse...";
  type CartItem = {
    id: string;
    name: string;
    color: string;
    size: string;
    price: number;
    no_discount?: number;
    image: string;
    quantity: number;
  };

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = () => {
    if (!selectedProduct) return;

    const newItem: CartItem = {
      id: crypto.randomUUID(),
      name: selectedProduct.name,
      color: selectedProduct.colors[selectedColor].color,
      size: selectedProduct.sizes[selectedSize].label,
      price: Number(selectedProduct.sizes[selectedSize].price),
      no_discount: selectedProduct.sizes[selectedSize].no_discount
        ? Number(selectedProduct.sizes[selectedSize].no_discount)
        : undefined,
      image: `/products/${selectedProduct.category}/${selectedProduct.name}/${selectedProduct.colors[selectedColor].color}.png`,
      quantity: 1,
    };

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.name === newItem.name &&
          item.color === newItem.color &&
          item.size === newItem.size,
      );

      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [...prev, newItem];
    });

    setSelectedProduct(null);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const finishOrder = () => {
    if (cart.length === 0) return;

    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const text = `
      Olá, Florisse!

      Quero fazer o seguinte pedido:

      ${cart
        .map(
          (item, index) => `
          ${index + 1}. ${item.name}
          • Cor: ${item.color}
          • Tamanho: ${item.size}
          • Quantidade: ${item.quantity}
          • Valor: R$ ${item.price * item.quantity}
          `,
        )
        .join("\n")}

      Total do pedido: R$ ${total}
    `;

    window.open(
      `https://wa.me/5538992030710?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };
  const formatColor = (color: string) => {
    return color
      .split("-")
      .map(
        (word: string) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      )
      .join("/");
  };
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          {/* LOGO */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/15 shadow-sm">
              <Image
                src="/logo.png"
                alt="Crochê artesanal"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h1 className="truncate font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Florisse
              </h1>

              <p className="hidden text-xs text-muted sm:block">
                Onde o crochê vira paz.
              </p>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-6 lg:flex">
            {["Início", "Produtos", "Sobre", "Cuidados"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-sm font-medium text-foreground-soft transition-colors hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {item}
              </a>
            ))}

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:scale-[1.03] hover:bg-primary-hover cursor-pointer"
            >
              <span className="hidden sm:inline">Carrinho</span>

              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {cart.length}
              </span>
            </button>
          </nav>

          {/* MOBILE ACTIONS */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setCartOpen(true)}
              className="cursor-pointer relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition hover:scale-105"
            >
              🛒
              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <section
        id="início"
        className="relative overflow-hidden scroll-mt-20 bg-linear-to-br from-card-soft to-accent"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center md:py-20">
          {/* TEXTO */}
          <div className="relative z-10 text-center md:text-left">
            <h2 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Peças artesanais que deixam sua casa mais{" "}
              <span className="text-primary">aconchegante</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg md:mx-0">
              Cada peça é feita ponto por ponto, com tempo, carinho e
              intenção... Para transformar ambientes em lugares mais vivos e
              acolhedores.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <a href="#produtos">
                <button className="w-full cursor-pointer rounded-2xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary-hover sm:w-auto">
                  Ver produtos
                </button>
              </a>

              <a href={msg} target="_blank">
                <button className="w-full cursor-pointer rounded-2xl border border-border bg-card px-6 py-3 font-semibold text-foreground transition-all hover:bg-input sm:w-auto">
                  Personalizar Pedido
                </button>
              </a>
            </div>
          </div>

          {/* IMAGEM */}
          <div className="relative flex justify-center">
            <Image
              src="/hero.png"
              alt="Crochê artesanal"
              width={1200}
              height={800}
              priority
              className="w-full max-w-145 rounded-4xl object-cover shadow-2xl"
            />

            {/* CARD FLOUTING */}
            <div className="absolute bottom-4 left-4 rounded-2xl bg-card/95 p-4 shadow-xl backdrop-blur-md sm:bottom-6 sm:left-6 sm:p-5">
              <p className="text-xs text-muted sm:text-sm">
                Mais vendida ({best_selling.total_sales} un)
              </p>

              <h3 className="mt-1 text-lg font-bold sm:text-xl">
                {best_selling.name}
              </h3>
            </div>
          </div>
        </div>

        {/* BLUR DECORATIVO */}
        <div className="absolute -left-20 top-10 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </section>
      <section
        id="produtos"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8"
      >
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
            Produtos em Destaque
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Feitos à mão com muito amor, carinho e atenção em cada detalhe.
          </p>
        </div>

        {/* FILTROS */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setCategory(f)}
              className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                category === f
                  ? "border-transparent bg-primary text-white shadow-md"
                  : "border-border bg-card text-muted hover:border-primary/30 hover:text-primary"
              }`}
            >
              {labels[f as keyof typeof labels]}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <div
              onClick={() => {
                setSelectedProduct(product);
                setSelectedColor(0);
                setSelectedSize(0);
              }}
              key={product.name}
              className="cursor-pointer group overflow-hidden rounded-4xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* IMAGEM */}
              <div className="relative overflow-hidden">
                <Image
                  src={`/products/${product.category}/${product.name}/${product.colors[0].color}.png`}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {product.total_sales >= best_selling.total_sales && (
                  <div className="absolute left-4 top-4 rounded-full bg-accent/90 text-card px-3 py-1 text-xs font-medium shadow-md backdrop-blur">
                    Popular
                  </div>
                )}
              </div>

              {/* CONTEÚDO */}
              <div className="flex flex-col gap-4 p-5">
                <div>
                  <h3 className="line-clamp-1 text-lg font-semibold">
                    {product.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        title={formatColor(color.color)}
                        className="h-6 w-6 rounded-full border-2 border-white shadow-sm"
                        style={{
                          background:
                            color.hex.length === 1
                              ? color.hex[0]
                              : color.hex.length === 2
                                ? `linear-gradient(135deg,${color.hex[0]} 0%,${color.hex[0]} 50%,${color.hex[1]} 50%,${color.hex[1]} 100%)`
                                : `linear-gradient(135deg, ${color.hex.join(", ")})`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* PREÇO */}
                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-primary">
                      R$ {product.sizes[0].price}
                    </span>

                    {product.sizes[0].no_discount && (
                      <span className="text-sm text-muted line-through">
                        R$ {product.sizes[0].no_discount}
                      </span>
                    )}
                  </div>

                  <button className="cursor-pointer rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                    Ver detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        id="sobre"
        className="scroll-mt-20 overflow-hidden bg-card-soft py-16 sm:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:gap-20">
          {/* IMAGEM */}
          <div className="relative flex justify-center">
            <Image
              src="/sobre.png"
              alt="Artesã trabalhando"
              width={1200}
              height={800}
              className="w-full max-w-155 rounded-4xl object-cover shadow-2xl"
            />

            {/* DETALHE DECORATIVO */}
            <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-full bg-primary/10 blur-3xl sm:block" />
          </div>

          {/* TEXTO */}
          <div className="relative z-10 text-left md:text-left">
            <h2 className="mt-5 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Sobre a Florisse
            </h2>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                A Florisse nasceu do crochê como um refúgio pra mim. É onde eu
                desacelero, coloco a mente em ordem e encontro paz em cada
                ponto.
              </p>

              <p>
                Não é só sobre peças decorativas, é sobre o processo. Cada fio
                que eu trabalho me ajuda a aliviar a ansiedade e transformar
                pensamentos em algo bonito, leve e cheio de energia boa.
              </p>

              <p>
                Quando você recebe uma peça, não está levando só crochê. Está
                levando um pouco dessa calma, desse cuidado e dessa intenção de
                fazer tudo com amor.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="cuidados" className="scroll-mt-20 bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* TÍTULO */}
          <div className="text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">
              Como cuidar da sua peça de crochê
            </h2>

            <p className="mt-4 text-muted max-w-2xl mx-auto text-base sm:text-lg">
              Pequenos cuidados fazem sua peça durar muitos anos com a mesma
              beleza e carinho de quando foi feita.
            </p>
          </div>

          {/* CARDS */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cares.map((care, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-border bg-linear-to-b from-card to-card-soft p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* brilho decorativo */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-80" />

                {/* ícone */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl transition group-hover:scale-110">
                  {care.icon}
                </div>

                {/* título */}
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {care.title}
                </h3>

                {/* linha decorativa */}
                <div className="mt-2 h-0.5 w-10 rounded-full bg-primary/30 transition-all group-hover:w-16 group-hover:bg-primary" />

                {/* descrição */}
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {care.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="border-t border-border">
        {/* COPYRIGHT */}
        <div className="text-center py-4">
          <p className="text-sm text-muted">© 2026 Florisse</p>

          <p className="mt-1 text-xs text-muted">
            Todos os direitos reservados.
          </p>
        </div>
      </footer>
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5"
          onClick={() => setSelectedProduct(null)} // fecha ao clicar fora
        >
          <div
            className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-4xl bg-card shadow-2xl animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
          >
            {/* FECHAR */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="cursor-pointer absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-lg shadow-md backdrop-blur transition hover:scale-105"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2">
              {/* IMAGEM */}
              <div className="relative bg-card-soft">
                <Image
                  key={selectedProduct.colors[selectedColor].color}
                  src={`/products/${selectedProduct.category}/${selectedProduct.name}/${selectedProduct.colors[selectedColor].color}.png`}
                  alt={selectedProduct.name}
                  width={700}
                  height={900}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full object-cover transition-opacity duration-200 h-65 sm:h-80 md:h-125 lg:h-162.5"
                />

                <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-md backdrop-blur">
                  {selectedProduct.sizes[selectedSize].sales} vendidos
                </div>
              </div>

              {/* CONTEÚDO */}
              <div className="flex flex-col justify-between p-5 sm:p-7 md:p-8">
                <div>
                  {/* TÍTULO */}
                  <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                    {selectedProduct.name}
                  </h2>

                  {/* PREÇO */}
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="text-2xl font-bold text-primary sm:text-3xl">
                      R$ {selectedProduct.sizes[selectedSize].price}
                    </span>

                    {selectedProduct.sizes[selectedSize].no_discount && (
                      <span className="text-sm text-muted line-through">
                        R$ {selectedProduct.sizes[selectedSize].no_discount}
                      </span>
                    )}
                  </div>

                  {/* CORES */}
                  <div className="mt-7">
                    <p className="mb-3 text-sm font-medium">Escolha a cor:</p>

                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((color: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(i)}
                          className={`cursor-pointer flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${
                            selectedColor === i
                              ? "scale-105 border-primary bg-primary text-primary-foreground shadow-lg"
                              : "border-border bg-background hover:border-primary/40"
                          }`}
                        >
                          <div
                            className="h-6 w-6 rounded-full border border-white sm:h-5 sm:w-5"
                            style={{
                              background:
                                color.hex.length === 1
                                  ? color.hex[0]
                                  : color.hex.length === 2
                                    ? `linear-gradient(
                                  135deg,
                                  ${color.hex[0]} 0%,
                                  ${color.hex[0]} 50%,
                                  ${color.hex[1]} 50%,
                                  ${color.hex[1]} 100%
                                )`
                                    : `linear-gradient(135deg, ${color.hex.join(", ")})`,
                            }}
                          />

                          <span className="font-medium">
                            {formatColor(color.color)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* TAMANHOS */}
                  <div className="mt-7">
                    <p className="mb-3 text-sm font-medium">
                      Escolha o tamanho:
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => setSelectedSize(i)}
                          className={`cursor-pointer rounded-full border px-3 py-2 text-sm transition-all ${
                            selectedSize === i
                              ? "border-primary bg-primary text-white shadow-md"
                              : "border-border bg-background hover:border-primary/40"
                          }`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BOTÃO */}
                <button
                  onClick={addToCart}
                  className="mt-8 w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-xl transition hover:scale-[1.01] hover:bg-primary-hover sm:py-4 sm:text-lg"
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 md:p-6"
          onClick={() => setCartOpen(false)} // fecha ao clicar fora
        >
          <div
            className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-4xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
          >
            <button
              onClick={() => setCartOpen(false)}
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background text-xl shadow-md transition hover:scale-105 cursor-pointer"
            >
              ✕
            </button>

            <div className="border-b border-border px-6 py-6 md:px-8">
              <h2 className="text-3xl font-bold">Seu Carrinho</h2>

              <p className="mt-1 text-sm text-muted">
                {cart.reduce((acc, item) => acc + item.quantity, 0)} itens
                adicionados
              </p>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="mb-5 text-6xl">🧶</div>

                <h3 className="text-2xl font-bold">Seu carrinho está vazio</h3>

                <p className="mt-2 max-w-md text-muted">
                  Adicione peças artesanais para montar seu pedido 💖
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-4 rounded-3xl border border-border bg-background p-4 md:flex-row"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={160}
                          height={160}
                          className="h-32.5 w-full rounded-2xl object-cover md:w-32.5"
                        />

                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {item.name}
                              </h3>

                              <div className="mt-2 space-y-1">
                                <p className="text-sm text-muted">
                                  Cor: {formatColor(item.color)}
                                </p>

                                <p className="text-sm text-muted">
                                  Tamanho: {item.size}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-sm text-muted">
                                {item.quantity}x
                              </p>

                              <span className="text-lg font-bold text-primary whitespace-nowrap">
                                R$ {item.price * item.quantity}
                              </span>

                              {item.no_discount !== undefined && (
                                <p className="font-medium text-muted line-through whitespace-nowrap">
                                  R$ {item.no_discount * item.quantity}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="mt-5 flex gap-3">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="rounded-xl bg-red-100 px-2 py-1 text-sm text-red-600 transition hover:bg-red-200 cursor-pointer"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border bg-background/80 px-6 py-5 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted">Total do pedido</p>

                      <h3 className="text-3xl font-bold text-primary">
                        R${" "}
                        {cart.reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0,
                        )}
                      </h3>
                    </div>

                    <button
                      onClick={finishOrder}
                      className="rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground shadow-xl transition hover:scale-[1.02] hover:bg-primary-hover cursor-pointer"
                    >
                      Finalizar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary-hover"
        >
          ↑
        </button>
      )}
    </main>
  );
}
