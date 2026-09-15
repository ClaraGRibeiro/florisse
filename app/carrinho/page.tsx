"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  FaCheck,
  FaMinus,
  FaPlus,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import colorsData from "@/data/colors.json";

import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import {
  formatColor,
  formatPath,
} from "@/utils/format";

type ColorData = {
  name: string;
  hex: string;
};

export default function Carrinho() {
  const {
    cart,
    clearCart,
    removeFromCart,
    updateQuantity,
    updateItem,
  } = useCart();

  const { products } = useProducts();

  // ============================================================
  // CORES
  // ============================================================

  const colors: ColorData[] = colorsData;

  // ============================================================
  // ITEM SENDO EDITADO
  // ============================================================

  const [editingItemId, setEditingItemId] =
    useState<string | null>(null);

  // ============================================================
  // ESTADOS DA COR
  // ============================================================

  const [selectedColor, setSelectedColor] =
    useState<number | null>(null);

  const [isOtherColor, setIsOtherColor] =
    useState(false);

  const [selectedOtherColors, setSelectedOtherColors] =
    useState<string[]>([]);

  const [colorSearch, setColorSearch] =
    useState("");

  // ============================================================
  // ESTADOS DO TAMANHO
  // ============================================================

  const [selectedSize, setSelectedSize] =
    useState<number | null>(null);

  const [isCustomSize, setIsCustomSize] =
    useState(false);

  const [customLength, setCustomLength] =
    useState("");

  const [customWidth, setCustomWidth] =
    useState("");

  // ============================================================
  // ESTADOS DO MODAL DE CONFIRMAÇÃO
  // ============================================================

  const [confirmationModal, setConfirmationModal] =
    useState<
      | {
        type: "remove";
        itemId: string;
      }
      | {
        type: "clear";
      }
      | null
    >(null);

  // ============================================================
  // ITEM SENDO EDITADO
  // ============================================================

  const editingItem = cart.find(
    (item) => item.id === editingItemId,
  );

  const editingProduct = editingItem
    ? products.find(
      (product) =>
        product.name === editingItem.name,
    )
    : null;

  // ============================================================
  // CORES FILTRADAS
  // ============================================================

  const filteredColors = useMemo(() => {
    const search =
      colorSearch.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return colors.filter((color) =>
      formatColor(color.name)
        .toLowerCase()
        .includes(search),
    );
  }, [colorSearch, colors]);

  // ============================================================
  // GRADIENTE
  // ============================================================

  function getGradient(
    hex: string[],
  ) {
    if (hex.length === 1) {
      return hex[0];
    }

    if (hex.length === 2) {
      return `linear-gradient(135deg, ${hex[0]} 50%, ${hex[1]} 50%)`;
    }

    return `linear-gradient(
      135deg,
      ${hex[0]} 0%,
      ${hex[0]} 33%,
      ${hex[1]} 33%,
      ${hex[1]} 66%,
      ${hex[2]} 66%,
      ${hex[2]} 100%
    )`;
  }

  // ============================================================
  // ABRIR MODAL PARA REMOVER ITEM
  // ============================================================

  function openRemoveModal(
    itemId: string,
  ) {
    setConfirmationModal({
      type: "remove",
      itemId,
    });
  }

  // ============================================================
  // ABRIR MODAL PARA LIMPAR CARRINHO
  // ============================================================

  function openClearCartModal() {
    if (!cart.length) {
      return;
    }

    setConfirmationModal({
      type: "clear",
    });
  }

  // ============================================================
  // FECHAR MODAL
  // ============================================================

  function closeConfirmationModal() {
    setConfirmationModal(null);
  }

  // ============================================================
  // CONFIRMAR REMOÇÃO
  // ============================================================

  function confirmRemoval() {
    if (!confirmationModal) {
      return;
    }

    if (
      confirmationModal.type ===
      "remove"
    ) {
      removeFromCart(
        confirmationModal.itemId,
      );
    }

    if (
      confirmationModal.type ===
      "clear"
    ) {
      clearCart();
    }

    setConfirmationModal(null);
  }

  // ============================================================
  // ABRIR EDITOR
  // ============================================================

  function openEditor(
    item: typeof cart[number],
  ) {
    const product = products.find(
      (p) => p.name === item.name,
    );

    if (!product) {
      return;
    }

    setEditingItemId(item.id);

    // ========================================================
    // CARREGA A COR
    // ========================================================

    const registeredColorIndex =
      product.colors.findIndex(
        (color) => color.name === item.color,
      );

    if (registeredColorIndex >= 0) {
      // Cor cadastrada
      setSelectedColor(
        registeredColorIndex,
      );

      setIsOtherColor(false);

      setSelectedOtherColors([]);
    } else {
      // Outra cor
      setSelectedColor(null);

      setIsOtherColor(true);

      setSelectedOtherColors(
        item.color
          .split("/")
          .map((color) => color.trim())
          .filter(Boolean),
      );
    }

    // Sempre começa com a busca limpa
    setColorSearch("");

    // ========================================================
    // CARREGA O TAMANHO
    // ========================================================

    const registeredSizeIndex =
      product.sizes.findIndex(
        (size) => size.label === item.size,
      );

    if (registeredSizeIndex >= 0) {
      // Tamanho cadastrado
      setSelectedSize(
        registeredSizeIndex,
      );

      setIsCustomSize(false);

      setCustomLength("");
      setCustomWidth("");
    } else {
      // Tamanho personalizado
      setSelectedSize(null);

      setIsCustomSize(true);

      setCustomLength(
        item.customLength ?? "",
      );

      setCustomWidth(
        item.customWidth ?? "",
      );
    }
  }

  // ============================================================
  // FECHAR EDITOR
  // ============================================================

  function closeEditor() {
    setEditingItemId(null);

    setSelectedColor(null);

    setIsOtherColor(false);

    setSelectedOtherColors([]);

    setColorSearch("");

    setSelectedSize(null);

    setIsCustomSize(false);

    setCustomLength("");

    setCustomWidth("");
  }

  // ============================================================
  // COR NORMAL
  // ============================================================

  function handleColorChange(
    index: number,
  ) {
    setSelectedColor(index);

    setIsOtherColor(false);

    setSelectedOtherColors([]);

    setColorSearch("");
  }

  // ============================================================
  // OUTRA COR
  // ============================================================

  function handleOtherColorClick() {
    setIsOtherColor(true);

    setSelectedColor(null);

    setColorSearch("");
  }

  // ============================================================
  // SELECIONAR OUTRA COR
  // ============================================================

  function handleOtherColorChange(
    colorName: string,
  ) {
    setSelectedOtherColors((prev) => {
      if (prev.includes(colorName)) {
        return prev.filter(
          (color) => color !== colorName,
        );
      }

      return [...prev, colorName];
    });

    // ========================================================
    // LIMPA O INPUT APÓS SELECIONAR
    // ========================================================

    setColorSearch("");
  }

  // ============================================================
  // REMOVER OUTRA COR
  // ============================================================

  function removeOtherColor(
    colorName: string,
  ) {
    setSelectedOtherColors((prev) =>
      prev.filter(
        (color) => color !== colorName,
      ),
    );
  }

  // ============================================================
  // TAMANHO
  // ============================================================

  function handleSizeChange(
    index: number,
  ) {
    setSelectedSize(index);

    setIsCustomSize(false);

    setCustomLength("");

    setCustomWidth("");
  }

  // ============================================================
  // OUTRO TAMANHO
  // ============================================================

  function handleCustomSizeClick() {
    setIsCustomSize(true);

    setSelectedSize(null);
  }

  // ============================================================
  // ENCONTRA IMAGEM DA COR
  // ============================================================

  async function findColorImage(
    product: NonNullable<
      typeof editingProduct
    >,
    colorName: string,
    fallback: string,
  ) {
    const basePath =
      `/products/${formatPath(
        product.category,
      )}/${formatPath(
        product.name,
      )}/${colorName}`;

    const extensions = [
      ".webp",
      "-2.webp",
      "-3.webp",
    ];

    for (const extension of extensions) {
      const imagePath =
        `${basePath}${extension}`;

      try {
        const response =
          await fetch(imagePath, {
            method: "HEAD",
          });

        if (response.ok) {
          return imagePath;
        }
      } catch {
        // Continua procurando
      }
    }

    return fallback;
  }

  // ============================================================
  // SALVAR ALTERAÇÕES
  // ============================================================

  async function saveChanges() {
    if (
      !editingItem ||
      !editingProduct
    ) {
      return;
    }

    // ========================================================
    // COR
    // ========================================================

    let newColor =
      editingItem.color;

    if (isOtherColor) {
      if (
        selectedOtherColors.length ===
        0
      ) {
        return;
      }

      newColor =
        selectedOtherColors.join("/");
    } else if (
      selectedColor !== null &&
      editingProduct.colors[
      selectedColor
      ]
    ) {
      newColor =
        editingProduct.colors[
          selectedColor
        ].name;
    }

    // ========================================================
    // TAMANHO
    // ========================================================

    let newSize =
      editingItem.size;

    let newCustomLength:
      | string
      | undefined;

    let newCustomWidth:
      | string
      | undefined;

    if (isCustomSize) {
      if (
        !customLength ||
        !customWidth
      ) {
        return;
      }

      newSize = "Outro";

      newCustomLength =
        customLength;

      newCustomWidth =
        customWidth;
    } else if (
      selectedSize !== null &&
      editingProduct.sizes[
      selectedSize
      ]
    ) {
      newSize =
        editingProduct.sizes[
          selectedSize
        ].label;
    }

    // ========================================================
    // PREÇO
    // ========================================================

    let newPrice =
      editingItem.price;

    let newNoDiscount =
      editingItem.no_discount;

    if (
      !isCustomSize &&
      selectedSize !== null
    ) {
      const size =
        editingProduct.sizes[
        selectedSize
        ] as (typeof editingProduct.sizes)[number] & {
          price?: number;
          no_discount?: number;
        };

      if (
        typeof size.price ===
        "number"
      ) {
        newPrice =
          size.price;
      }

      if (
        typeof size.no_discount ===
        "number"
      ) {
        newNoDiscount =
          size.no_discount;
      } else {
        newNoDiscount =
          undefined;
      }
    }

    // ========================================================
    // IMAGEM
    // ========================================================

    let newImage =
      editingItem.image;

    if (
      !isOtherColor &&
      selectedColor !== null &&
      editingProduct.colors[
      selectedColor
      ]
    ) {
      const colorName =
        editingProduct.colors[
          selectedColor
        ].name;

      newImage =
        await findColorImage(
          editingProduct,
          colorName,
          editingItem.image,
        );
    }

    // ========================================================
    // ATUALIZA ITEM
    // ========================================================

    updateItem(
      editingItem.id,
      {
        color: newColor,

        size: newSize,

        customLength:
          newCustomLength,

        customWidth:
          newCustomWidth,

        price: newPrice,

        no_discount:
          newNoDiscount,

        image: newImage,
      },
    );

    closeEditor();
  }

  // ============================================================
  // TOTAL
  // ============================================================

  const total = cart.reduce(
    (acc, item) =>
      acc +
      item.price *
      item.quantity,
    0,
  );

  const totalItems = cart.reduce(
    (acc, item) =>
      acc + item.quantity,
    0,
  );

  // ============================================================
  // FINALIZAR PEDIDO
  // ============================================================

  const finishOrder = () => {
    if (!cart.length) {
      return;
    }

    const items = cart
      .map(
        (item, index) => {
          const customSize =
            item.customLength &&
              item.customWidth
              ? ` (${item.customLength} × ${item.customWidth} cm)`
              : "";

          return `
${index + 1}. ${item.name}
• Cor: ${formatColor(item.color)}
• Tamanho: ${item.size}${customSize}
• Quantidade: ${item.quantity}
• Valor: R$ ${(item.price * item.quantity).toFixed(2)}
`;
        },
      )
      .join("\n");

    const text = `
Olá, Florisse Crochê!

Quero fazer o seguinte pedido:

${items}

Total do pedido: R$ ${total.toFixed(2)}
`;

    window.open(
      `https://wa.me/5538992030710?text=${encodeURIComponent(
        text,
      )}`,
      "_blank",
    );
  };

  // ============================================================
  // LIMPA O EDITOR SE O ITEM FOR REMOVIDO
  // ============================================================

  useEffect(() => {
    if (
      editingItemId &&
      !cart.some(
        (item) =>
          item.id ===
          editingItemId,
      )
    ) {
      closeEditor();
    }
  }, [
    cart,
    editingItemId,
  ]);

  // ============================================================
  // ESC FECHA O MODAL
  // ============================================================

  useEffect(() => {
    if (!confirmationModal) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        closeConfirmationModal();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [confirmationModal]);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ====================================================== */}
      {/* MODAL DE CONFIRMAÇÃO */}
      {/* ====================================================== */}

      {confirmationModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeConfirmationModal();
            }
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 10,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-2xl"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            {/* ÍCONE */}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <FaTimes
                size={20}
                className="text-primary"
              />
            </div>

            {/* TEXTO */}

            <div className="mt-5 text-center">
              <h2 className="text-xl font-semibold">
                Tem certeza disso?
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                {confirmationModal.type ===
                  "clear"
                  ? "Todos os produtos serão removidos do seu carrinho."
                  : "Este produto será removido do seu carrinho."}
              </p>
            </div>

            {/* BOTÕES */}

            <div className="mt-6 grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={
                  closeConfirmationModal
                }
                className="cursor-pointer rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium transition hover:border-primary hover:bg-primary/5"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={
                  confirmRemoval
                }
                className="cursor-pointer rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary-hover"
              >
                Sim, remover
              </button>

            </div>
          </motion.div>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-8 sm:px-6 md:py-12">

        {/* ================================================== */}
        {/* CABEÇALHO */}
        {/* ================================================== */}

        <div className="mb-6 border-b border-border pb-6">
          <h1 className="text-3xl font-bold md:text-4xl">
            Seu Carrinho
          </h1>

          <p className="mt-1 text-sm text-muted">
            {totalItems}{" "}
            {totalItems === 1
              ? "item adicionado"
              : "itens adicionados"}
          </p>
        </div>

        {/* ================================================== */}
        {/* CARRINHO VAZIO */}
        {/* ================================================== */}

        {!cart.length ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center"
          >
            <div className="mb-5 text-6xl">
              😿🧶
            </div>

            <h2 className="text-2xl font-bold">
              Seu carrinho está vazio
            </h2>

            <Link
              href="/#produtos"
              className="block"
            >
              <p className="mt-2 max-w-md text-muted">
                <span className="underline">
                  Adicione
                </span>{" "}
                peças artesanais para
                montar seu pedido 💖
              </p>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* ================================================== */}
            {/* LISTA DE ITENS */}
            {/* ================================================== */}

            <div className="space-y-4">
              {cart.map((item) => {
                const subtotal =
                  item.price *
                  item.quantity;

                const isEditing =
                  editingItemId ===
                  item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="rounded-3xl border border-border bg-card p-4 shadow-sm"
                  >

                    {/* ================================================== */}
                    {/* PRODUTO */}
                    {/* ================================================== */}

                    <div className="flex flex-col gap-4 md:flex-row">

                      {/* IMAGEM */}

                      <Link
                        href={`/produto/${formatPath(
                          item.name,
                        )}`}
                        className="block shrink-0"
                      >
                        <Image
                          src={
                            item.image
                          }
                          alt={
                            item.name
                          }
                          width={160}
                          height={160}
                          loading="lazy"
                          className="h-40 w-full rounded-2xl object-cover duration-200 hover:scale-105 md:h-32.5 md:w-32.5"
                        />
                      </Link>

                      {/* INFORMAÇÕES */}

                      <div className="flex flex-1 flex-col justify-between">

                        <div className="flex items-start justify-between gap-4">

                          <div>
                            <h2 className="text-lg font-semibold">
                              {
                                item.name
                              }
                            </h2>

                            <div className="mt-2 space-y-1">

                              <p className="text-sm text-muted">
                                Cor:{" "}
                                {formatColor(
                                  item.color,
                                )}
                              </p>

                              <p className="text-sm text-muted">
                                Tamanho:{" "}
                                {
                                  item.size
                                }

                                {item.customLength &&
                                  item.customWidth && (
                                    <>
                                      {" "}
                                      (
                                      {
                                        item.customLength
                                      }{" "}
                                      ×{" "}
                                      {
                                        item.customWidth
                                      }{" "}
                                      cm)
                                    </>
                                  )}
                              </p>

                            </div>
                          </div>

                          {/* PREÇO */}

                          <div className="text-right">

                            <p className="text-lg font-bold text-primary">
                              R${" "}
                              {subtotal.toFixed(
                                2,
                              )}
                            </p>

                            {item.no_discount && (
                              <p className="whitespace-nowrap text-sm font-medium text-muted line-through">
                                R${" "}
                                {(
                                  item.no_discount *
                                  item.quantity
                                ).toFixed(
                                  2,
                                )}
                              </p>
                            )}

                          </div>

                        </div>

                        {/* ================================================== */}
                        {/* CONTROLES */}
                        {/* ================================================== */}

                        <div className="mt-5 flex flex-wrap items-center gap-2">

                          {/* QUANTIDADE */}

                          <div className="flex items-center overflow-hidden rounded-xl border border-border bg-background">

                            <button
                              type="button"
                              onClick={() => {
                                if (
                                  item.quantity <=
                                  1
                                ) {
                                  openRemoveModal(
                                    item.id,
                                  );

                                  return;
                                }

                                updateQuantity(
                                  item.id,
                                  item.quantity -
                                  1,
                                );
                              }}
                              className="flex h-9 w-9 cursor-pointer items-center justify-center text-muted transition hover:bg-primary/10 hover:text-primary"
                              aria-label="Diminuir quantidade"
                            >
                              <FaMinus
                                size={10}
                              />
                            </button>

                            <span className="flex h-9 min-w-10 items-center justify-center border-x border-border px-2 text-sm font-semibold">
                              {
                                item.quantity
                              }
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity +
                                  1,
                                )
                              }
                              className="flex h-9 w-9 cursor-pointer items-center justify-center text-muted transition hover:bg-primary/10 hover:text-primary"
                              aria-label="Aumentar quantidade"
                            >
                              <FaPlus
                                size={10}
                              />
                            </button>

                          </div>

                          {/* EDITAR */}

                          <button
                            type="button"
                            onClick={() =>
                              isEditing
                                ? closeEditor()
                                : openEditor(
                                  item,
                                )
                            }
                            className="cursor-pointer rounded-xl border border-border px-3 py-2 text-sm transition hover:border-primary hover:text-primary"
                          >
                            {isEditing
                              ? "Fechar edição"
                              : "Editar opções"}
                          </button>

                          {/* REMOVER */}

                          <button
                            type="button"
                            onClick={() =>
                              openRemoveModal(
                                item.id,
                              )
                            }
                            className="cursor-pointer rounded-xl bg-red-100 px-3 py-2 text-sm text-red-600 transition hover:bg-red-200"
                          >
                            Remover
                          </button>

                        </div>

                      </div>
                    </div>

                    {/* ================================================== */}
                    {/* EDITOR */}
                    {/* ================================================== */}

                    {isEditing &&
                      editingProduct && (
                        <div className="mt-6 border-t border-border pt-6">

                          {/* ================================================= */}
                          {/* CORES */}
                          {/* ================================================= */}

                          <div>
                            <p className="mb-3 text-sm font-medium">
                              Escolha a cor:
                            </p>

                            <div className="flex flex-wrap gap-2">

                              {/* CORES COM FOTO */}

                              {editingProduct.colors.map(
                                (
                                  color,
                                  index,
                                ) => (
                                  <button
                                    key={
                                      color.name
                                    }
                                    type="button"
                                    onClick={() =>
                                      handleColorChange(
                                        index,
                                      )
                                    }
                                    className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${!isOtherColor &&
                                        selectedColor ===
                                        index
                                        ? "border-primary bg-primary text-white shadow-md"
                                        : "border-border bg-background hover:border-primary/40"
                                      }`}
                                  >
                                    <span
                                      className="h-5 w-5 shrink-0 rounded-full border border-white"
                                      style={{
                                        background:
                                          getGradient(
                                            color.hex,
                                          ),
                                      }}
                                    />

                                    {formatColor(
                                      color.name,
                                    )}
                                  </button>
                                ),
                              )}

                              {/* OUTRA COR */}

                              <button
                                type="button"
                                onClick={
                                  handleOtherColorClick
                                }
                                className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${isOtherColor
                                    ? "border-primary bg-primary text-white shadow-md"
                                    : "border-border bg-background hover:border-primary/40"
                                  }`}
                              >
                                <span className="h-5 w-5 shrink-0 rounded-full border border-white bg-[#fbf6ee]" />

                                {selectedOtherColors.length >
                                  0
                                  ? `Outra (${selectedOtherColors.length})`
                                  : "Outra"}
                              </button>

                            </div>

                            {/* ================================================= */}
                            {/* ÁREA DE OUTRA COR */}
                            {/* ================================================= */}

                            {isOtherColor && (
                              <div className="relative mt-3 w-full max-w-md">

                                {/* INPUT */}

                                <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 transition focus-within:border-primary">

                                  <FaSearch
                                    size={13}
                                    className="shrink-0 text-muted"
                                  />

                                  <input
                                    type="text"
                                    value={
                                      colorSearch
                                    }
                                    onChange={(
                                      event,
                                    ) =>
                                      setColorSearch(
                                        event
                                          .target
                                          .value,
                                      )
                                    }
                                    placeholder="Digite uma cor..."
                                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
                                  />

                                  {colorSearch && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setColorSearch(
                                          "",
                                        )
                                      }
                                      aria-label="Limpar busca"
                                      className="cursor-pointer text-muted transition hover:text-foreground"
                                    >
                                      <FaTimes
                                        size={13}
                                      />
                                    </button>
                                  )}

                                </div>

                                {/* ================================================= */}
                                {/* RESULTADOS */}
                                {/* ================================================= */}

                                {colorSearch.trim() !==
                                  "" && (
                                    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-border bg-background p-2 shadow-xl">

                                      {filteredColors.length >
                                        0 ? (
                                        filteredColors.map(
                                          (
                                            color,
                                          ) => {
                                            const isSelected =
                                              selectedOtherColors.includes(
                                                color.name,
                                              );

                                            return (
                                              <button
                                                key={
                                                  color.name
                                                }
                                                type="button"
                                                onClick={() =>
                                                  handleOtherColorChange(
                                                    color.name,
                                                  )
                                                }
                                                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${isSelected
                                                    ? "bg-primary text-white"
                                                    : "hover:bg-primary/10"
                                                  }`}
                                              >

                                                <span
                                                  className="h-6 w-6 shrink-0 rounded-full border border-border"
                                                  style={{
                                                    background:
                                                      color.hex,
                                                  }}
                                                />

                                                <span className="flex-1">
                                                  {formatColor(
                                                    color.name,
                                                  )}
                                                </span>

                                                {isSelected && (
                                                  <FaCheck
                                                    size={
                                                      12
                                                    }
                                                  />
                                                )}

                                              </button>
                                            );
                                          },
                                        )
                                      ) : (
                                        <p className="px-3 py-3 text-sm text-muted">
                                          Nenhuma cor
                                          encontrada.
                                        </p>
                                      )}

                                    </div>
                                  )}

                                {/* ================================================= */}
                                {/* CORES SELECIONADAS */}
                                {/* ================================================= */}

                                {selectedOtherColors.length >
                                  0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">

                                      {selectedOtherColors.map(
                                        (
                                          colorName,
                                        ) => {
                                          const color =
                                            colors.find(
                                              (
                                                item,
                                              ) =>
                                                item.name ===
                                                colorName,
                                            );

                                          if (
                                            !color
                                          ) {
                                            return null;
                                          }

                                          return (
                                            <button
                                              key={
                                                colorName
                                              }
                                              type="button"
                                              onClick={() =>
                                                removeOtherColor(
                                                  colorName,
                                                )
                                              }
                                              className="flex cursor-pointer items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs text-primary transition hover:bg-primary/20"
                                              title="Remover cor"
                                            >

                                              <span
                                                className="h-4 w-4 rounded-full border border-border"
                                                style={{
                                                  background:
                                                    color.hex,
                                                }}
                                              />

                                              {formatColor(
                                                colorName,
                                              )}

                                              <FaTimes
                                                size={
                                                  9
                                                }
                                              />

                                            </button>
                                          );
                                        },
                                      )}

                                    </div>
                                  )}

                                {/* TEXTO */}

                                <p className="mt-2 text-xs text-muted">
                                  A quantidade de cores pode variar conforme o modelo.
                                </p>

                              </div>
                            )}
                          </div>

                          {/* ================================================= */}
                          {/* TAMANHOS */}
                          {/* ================================================= */}

                          <div className="mt-7">

                            <p className="mb-3 text-sm font-medium">
                              Escolha o tamanho:
                            </p>

                            <div className="flex flex-wrap gap-2">

                              {/* TAMANHOS CADASTRADOS */}

                              {editingProduct.sizes.map(
                                (
                                  size,
                                  index,
                                ) => (
                                  <button
                                    key={
                                      size.label
                                    }
                                    type="button"
                                    onClick={() =>
                                      handleSizeChange(
                                        index,
                                      )
                                    }
                                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all ${!isCustomSize &&
                                        selectedSize ===
                                        index
                                        ? "border-primary bg-primary text-white shadow-md"
                                        : "border-border bg-background hover:border-primary/40"
                                      }`}
                                  >

                                    <span>
                                      {
                                        size.label
                                      }
                                    </span>

                                    {size.no_discount && (
                                      <span
                                        className={
                                          !isCustomSize &&
                                            selectedSize ===
                                            index
                                            ? "text-[10px] font-bold text-white/80"
                                            : "text-[10px] font-bold text-red-500"
                                        }
                                      >
                                        -10%
                                      </span>
                                    )}

                                  </button>
                                ),
                              )}

                              {/* OUTRO TAMANHO */}

                              <button
                                type="button"
                                onClick={
                                  handleCustomSizeClick
                                }
                                className={`cursor-pointer rounded-xl border px-3 py-2 text-sm transition-all ${isCustomSize
                                    ? "border-primary bg-primary text-white shadow-md"
                                    : "border-border bg-background hover:border-primary/40"
                                  }`}
                              >
                                Outro
                              </button>

                            </div>

                            {/* ================================================= */}
                            {/* TAMANHO PERSONALIZADO */}
                            {/* ================================================= */}

                            {isCustomSize && (
                              <div className="mt-3 w-full max-w-md">

                                <div className="grid grid-cols-2 gap-3">

                                  {/* COMPRIMENTO */}

                                  <div>

                                    <label
                                      htmlFor={`custom-length-${item.id}`}
                                      className="mb-2 block text-xs font-medium text-muted"
                                    >
                                      Comprimento
                                    </label>

                                    <div className="flex items-center rounded-2xl border border-border bg-background px-4 py-3 transition focus-within:border-primary">

                                      <input
                                        id={`custom-length-${item.id}`}
                                        type="number"
                                        min="1"
                                        step="0.1"
                                        value={
                                          customLength
                                        }
                                        onChange={(
                                          event,
                                        ) =>
                                          setCustomLength(
                                            event
                                              .target
                                              .value,
                                          )
                                        }
                                        placeholder="Ex.: 150"
                                        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
                                      />

                                      <span className="ml-2 text-xs text-muted">
                                        cm
                                      </span>

                                    </div>
                                  </div>

                                  {/* LARGURA */}

                                  <div>

                                    <label
                                      htmlFor={`custom-width-${item.id}`}
                                      className="mb-2 block text-xs font-medium text-muted"
                                    >
                                      Largura
                                    </label>

                                    <div className="flex items-center rounded-2xl border border-border bg-background px-4 py-3 transition focus-within:border-primary">

                                      <input
                                        id={`custom-width-${item.id}`}
                                        type="number"
                                        min="1"
                                        step="0.1"
                                        value={
                                          customWidth
                                        }
                                        onChange={(
                                          event,
                                        ) =>
                                          setCustomWidth(
                                            event
                                              .target
                                              .value,
                                          )
                                        }
                                        placeholder="Ex.: 200"
                                        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
                                      />

                                      <span className="ml-2 text-xs text-muted">
                                        cm
                                      </span>

                                    </div>
                                  </div>

                                </div>

                                <p className="mt-2 text-xs text-muted">
                                  O valor para tamanho
                                  personalizado será
                                  negociado.
                                </p>

                              </div>
                            )}

                          </div>

                          {/* ================================================= */}
                          {/* BOTÕES */}
                          {/* ================================================= */}

                          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                            <button
                              type="button"
                              onClick={
                                closeEditor
                              }
                              className="cursor-pointer rounded-xl border border-border px-4 py-2.5 text-sm transition hover:bg-primary/10"
                            >
                              Cancelar
                            </button>

                            <button
                              type="button"
                              onClick={
                                saveChanges
                              }
                              disabled={
                                (!isOtherColor &&
                                  selectedColor ===
                                  null) ||
                                (isOtherColor &&
                                  selectedOtherColors.length ===
                                  0) ||
                                (isCustomSize &&
                                  (!customLength ||
                                    !customWidth)) ||
                                (!isCustomSize &&
                                  selectedSize ===
                                  null)
                              }
                              className="cursor-pointer rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Salvar alterações
                            </button>

                          </div>

                        </div>
                      )}
                  </motion.div>
                );
              })}
            </div>

            {/* ================================================== */}
            {/* AVISO */}
            {/* ================================================== */}

            <p className="mt-3 text-sm text-muted">
              Personalizações de cor ou tamanho
              podem alterar o valor do produto.
            </p>

            {/* ================================================== */}
            {/* RESUMO */}
            {/* ================================================== */}

            <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-sm text-muted">
                    Total do pedido
                  </p>

                  <h2 className="text-3xl font-bold text-primary">
                    R$ {total.toFixed(2)}
                  </h2>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                  <button
                    type="button"
                    onClick={
                      openClearCartModal
                    }
                    className="cursor-pointer rounded-xl px-3 py-2 text-sm text-red-300 underline transition hover:text-red-600"
                  >
                    Limpar Carrinho
                  </button>

                  <button
                    type="button"
                    onClick={
                      finishOrder
                    }
                    className="w-full cursor-pointer rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground shadow-xl transition hover:scale-[1.02] hover:bg-primary-hover sm:w-auto"
                  >
                    Finalizar pedido
                  </button>

                </div>

              </div>
            </div>

          </>
        )}
      </div>
    </div>
  );
}