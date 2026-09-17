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
import { getGradient } from "@/utils/gradient";

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

    if (isCustomSize) {
      newPrice = 0;
      newNoDiscount = undefined;
    } else if (selectedSize !== null) {
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
        type: isCustomSize ? "custom-order" : "product",

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
      item.type === "product"
        ? acc + item.price * item.quantity
        : acc,
    0,
  );

  const hasCustomOrders = cart.some(
    (item) => item.type === "custom-order",
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

          const value =
            item.type === "custom-order"
              ? "Sob consulta"
              : `R$ ${(item.price * item.quantity).toFixed(2)}`;

          return `
${index + 1}. ${item.name}
• Cor: ${formatColor(item.color)}
• Tamanho: ${item.size}${customSize}
• Quantidade: ${item.quantity}
• Valor: ${value}
`;
        },
      )
      .join("\n");

    const text = `
Olá, Florisse Crochê!

Quero fazer o seguinte pedido:

${items}

${hasCustomOrders ? `Subtotal dos itens com preço definido: R$ ${total.toFixed(2)}\n` : `Total do pedido: R$ ${total.toFixed(2)}\n`}
${hasCustomOrders ? "Há itens personalizados com valor sob consulta. O valor final será confirmado pela Florisse." : ""}
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
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
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
            className="w-full max-w-sm rounded-[1.75rem] border border-border/80 bg-card p-7 shadow-2xl"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            {/* ÍCONE */}

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
              <FaTimes
                size={20}
                className="text-primary"
              />
            </div>

            {/* TEXTO */}

            <div className="mt-6 text-center">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
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

            <div className="mt-7 grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={
                  closeConfirmationModal
                }
                className="cursor-pointer rounded-full border border-border bg-background px-4 py-3 text-sm font-medium transition-all duration-300 hover:border-primary hover:bg-primary/5"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={
                  confirmRemoval
                }
                className="cursor-pointer rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
              >
                Sim, remover
              </button>

            </div>
          </motion.div>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-10 sm:px-6 md:py-14">

        {/* ================================================== */}
        {/* CABEÇALHO */}
        {/* ================================================== */}

        <div className="mb-10 border-b border-border/70 pb-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Seu pedido
          </p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-5xl">
            Seu Carrinho
          </h1>

          <p className="mt-2 text-sm text-muted">
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
            className="flex min-h-[52vh] flex-col items-center justify-center rounded-[2rem] border border-border/70 bg-card/40 px-6 py-16 text-center"
          >
            <div className="mb-6 text-5xl">
              😿🧶
            </div>

            <h2 className="font-serif text-3xl font-semibold tracking-tight">
              Seu carrinho está vazio
            </h2>

            <Link
              href="/#produtos"
              className="block"
            >
              <p className="mt-3 max-w-md leading-relaxed text-muted">
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

            <div className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-muted">
              <span className="h-px w-8 bg-primary/40" />
              <span>Suas escolhas</span>
            </div>

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
                    className="rounded-[1.75rem] border border-border/80 bg-card p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-5"
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
                          className="h-40 w-full rounded-[1.25rem] object-cover transition-transform duration-500 hover:scale-[1.025] md:h-36 md:w-36"
                        />
                      </Link>

                      {/* INFORMAÇÕES */}

                      <div className="flex flex-1 flex-col justify-between">

                        <div className="flex items-start justify-between gap-4">

                          <div>
                            <h2 className="font-serif text-xl font-semibold leading-tight tracking-tight">
                              {
                                item.name
                              }
                            </h2>

                            <div className="mt-3 space-y-1.5">

                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                                Cor:{" "}
                                {formatColor(
                                  item.color,
                                )}
                              </p>

                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
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

                            {item.type === "custom-order" && (
                              <div className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                                Pedido personalizado · valor sob consulta
                              </div>
                            )}
                          </div>

                          {/* PREÇO */}

                          <div className="text-right">

                            {item.type === "custom-order" ? (
                              <p className="font-serif text-xl font-semibold text-primary">
                                Sob consulta
                              </p>
                            ) : (
                              <>
                                <p className="font-serif text-xl font-semibold text-primary">
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
                              </>
                            )}

                          </div>

                        </div>

                        {/* ================================================== */}
                        {/* CONTROLES */}
                        {/* ================================================== */}

                        <div className="mt-6 flex flex-wrap items-center gap-2">

                          {/* QUANTIDADE */}

                          <div className="flex items-center overflow-hidden rounded-full border border-border bg-background shadow-sm">

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
                              className="flex h-10 w-10 cursor-pointer items-center justify-center text-muted transition hover:bg-primary/10 hover:text-primary"
                              aria-label="Diminuir quantidade"
                            >
                              <FaMinus
                                size={10}
                              />
                            </button>

                            <span className="flex h-10 min-w-11 items-center justify-center border-x border-border px-3 text-sm font-semibold">
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
                              className="flex h-10 w-10 cursor-pointer items-center justify-center text-muted transition hover:bg-primary/10 hover:text-primary"
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
                            className="cursor-pointer rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
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
                            className="cursor-pointer rounded-full border border-border px-4 py-2.5 text-sm font-medium text-muted transition-all duration-300 hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
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
                        <div className="mt-7 rounded-[1.5rem] border border-border/70 bg-muted/10 p-5 sm:p-6">

                          {/* ================================================= */}
                          {/* CORES */}
                          {/* ================================================= */}

                          <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                              Cor da peça:
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
                                <span
                                  className="h-5 w-5 shrink-0 rounded-full border border-white shadow-sm"
                                  style={{
                                    background:
                                      "conic-gradient(#f59e0b 0deg 72deg, #ef4444 72deg 144deg, #a855f7 144deg 216deg, #3b82f6 216deg 288deg, #22c55e 288deg 360deg)",
                                  }}
                                />
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

                                {/* AVISO DE IMAGEM ILUSTRATIVA */}

                                <div className="mt-3 flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3.5">
                                  <div className="mt-0.5 shrink-0 text-primary">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v4m0 4h.01M10.29 3.86l-8.1 14a2 2 0 001.73 2.64h16.16a2 2 0 001.73-2.64l-8.1-14a2 2 0 00-3.42 0z"
                                      />
                                    </svg>
                                  </div>

                                  <p className="text-xs leading-relaxed text-muted">
                                    <span className="font-semibold text-foreground">
                                      A imagem é ilustrativa.
                                    </span>{" "}
                                    A peça será produzida nas cores escolhidas.
                                  </p>
                                </div>

                              </div>
                            )}
                          </div>

                          {/* ================================================= */}
                          {/* TAMANHOS */}
                          {/* ================================================= */}

                          <div className="mt-7">

                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                              Tamanho da peça:
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

                          <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                            <button
                              type="button"
                              onClick={
                                closeEditor
                              }
                              className="cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
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
                              className="cursor-pointer rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
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

            <p className="mt-4 text-sm leading-relaxed text-muted">
              Pedidos com tamanho personalizado têm valor sob consulta. A Florisse confirma o preço final pelo WhatsApp antes da produção.
            </p>

            {/* ================================================== */}
            {/* RESUMO */}
            {/* ================================================== */}

            <div className="mt-8 rounded-[1.75rem] border border-border/80 bg-card p-6 shadow-sm sm:p-7">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    Resumo do pedido
                  </p>

                  <h2 className="mt-1 font-serif text-3xl font-semibold text-primary">
                    {hasCustomOrders && total === 0
                      ? "Sob consulta"
                      : `R$ ${total.toFixed(2)}`}
                  </h2>

                  {hasCustomOrders && (
                    <p className="mt-1 max-w-md text-xs leading-relaxed text-muted">
                      Subtotal dos itens com preço definido. Os itens personalizados serão confirmados pelo WhatsApp.
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                  <button
                    type="button"
                    onClick={
                      openClearCartModal
                    }
                    className="cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-destructive/5 hover:text-destructive"
                  >
                    Limpar Carrinho
                  </button>

                  <button
                    type="button"
                    onClick={
                      finishOrder
                    }
                    className="w-full cursor-pointer rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl sm:w-auto"
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