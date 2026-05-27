import { motion } from "framer-motion";

import colorsData from "@/data/colors.json";
import { useState } from "react";
interface Color {
  name: string;
  hex: string;
}
const colors = colorsData as Color[];

type PersonalizedProps = {
  categories: string[]
  setPersonalizedOpen: (value: boolean) => void;
  productsFromCategory: (category: string) => string[]
};

export default function Personalized({
  categories,
  setPersonalizedOpen,
  productsFromCategory
}: PersonalizedProps) {

  const [form, setForm] = useState({
    cores: [] as string[],
    categoria: "",
    item: "",
    largura: "",
    comprimento: "",
    observacoes: "",
  });
  const obsIsRequired =
    form.categoria === "outra" || form.item === "outro";
  const isValid =
    form.cores.length > 0 &&
    form.categoria &&
    form.item &&
    form.largura &&
    form.comprimento &&
    (
      !obsIsRequired ||
      form.observacoes.trim() !== ""
    );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6">

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setPersonalizedOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-4xl bg-card shadow-2xl z-10"
      >

        {/* Fechar */}
        <button
          onClick={() => setPersonalizedOpen(false)}
          className="absolute top-5 right-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-background text-xl shadow-md transition hover:scale-105"
        >
          ✕
        </button>

        {/* Header */}
        <div className="border-b border-border px-6 py-6 md:px-8">
          <h2 className="text-3xl font-bold">
            Personalizar Pedido
          </h2>
          <p className="mt-1 text-sm text-muted">
            Monte seu pedido artesanal 💖
          </p>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 space-y-10 min-h-0">
          {/* COR */}
          <div>
            <p className="mb-2 text-sm font-medium">Cor (pelo menos uma) <span className="text-primary font-bold">*</span></p>

            <div className="flex flex-wrap gap-2">
              {colors.map((color) => {
                const selected = form.cores.includes(color.name);

                return (
                  <button
                    key={color.name}
                    onClick={() => {
                      setForm((prev) => {
                        const exists = prev.cores.includes(color.name);

                        return {
                          ...prev,
                          cores: exists
                            ? prev.cores.filter((c) => c !== color.name)
                            : [...prev.cores, color.name],
                        };
                      });
                    }}
                    className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${selected
                      ? "scale-105 border-primary bg-primary text-primary-foreground shadow-lg"
                      : "border-border bg-background hover:border-primary/40"
                      }`}
                  >

                    <div
                      className="h-6 w-6 rounded-full border border-white sm:h-5 sm:w-5"
                      style={{
                        background: color.hex,
                      }}
                    />
                    <span className="font-medium">{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CATEGORIA */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">Categoria <span className="text-primary font-bold">*</span></p>
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="cursor-pointer w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm shadow-sm outline-none focus:border-primary"
            ><option value="">Selecione a categoria</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option key="outra" value="outra">
                Outra (descrever em "Observações")
              </option>
            </select>
          </div>

          {/* ITEM */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">Item <span className="text-primary font-bold">*</span></p>

            <select
              value={form.item}
              onChange={(e) => setForm({ ...form, item: e.target.value })}
              disabled={!form.categoria}
              className={`w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm shadow-sm outline-none focus:border-primary disabled:opacity-50 ${form.categoria ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
              <option value="">
                {form.categoria
                  ? "Selecione o item"
                  : "Selecione uma categoria primeiro"}
              </option>

              {form.categoria &&
                productsFromCategory(form.categoria).map((product) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}

              <option key="outro" value="outro">
                Outro (descrever em "Observações")
              </option>
            </select>
          </div>

          {/* TAMANHO */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">Tamanho</p>

            <div className="flex gap-6">

              {/* COMPRIMENTO */}
              <div className="flex flex-col gap-1">
                <label className="mb-1 block text-xs text-muted">
                  Comprimento (cm) <span className="text-primary font-bold">*</span>
                </label>

                <input
                  type="number"
                  max={150}
                  value={form.comprimento}
                  onChange={(e) =>
                    setForm({ ...form, comprimento: e.target.value })
                  }
                  placeholder="Ex: 50"
                  className="w-full min-w-0 rounded-2xl border border-border bg-background px-4 py-3 text-sm shadow-sm outline-none focus:border-primary"
                />
              </div>
              {/* LARGURA */}
              <div className="flex flex-col gap-1">
                <label className="mb-1 block text-xs text-muted">
                  Largura (cm) <span className="text-primary font-bold">*</span>
                </label>

                <input
                  type="number"
                  max={150}
                  value={form.largura}
                  onChange={(e) =>
                    setForm({ ...form, largura: e.target.value })
                  }
                  placeholder="Ex: 70"
                  className="w-full min-w-0 rounded-2xl border border-border bg-background px-4 py-3 text-sm shadow-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">Observações  {form.categoria === "outra" || form.item === "outro" ? (<span className="text-primary font-bold">*</span>) : <span className="text-muted">(opcional)</span>}</p>
            <textarea
              value={form.observacoes}
              onChange={(e) =>
                setForm({ ...form, observacoes: e.target.value })
              }
              placeholder="Descreva qualquer detalhe importante..."
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
            />
          </div>
          {/* BOTÃO */}
          <button
            disabled={!isValid}
            onClick={() => {
              const message = `Olá! Vim pelo site da Florisse Crochê.%0A
Gostaria de fazer o seguinte pedido personalizado:%0A
Cor: ${form.cores.join(", ")}%0A
Categoria: ${form.categoria}%0A
Item: ${form.item}%0A
Tamanho: ${form.comprimento}x${form.largura}%0A
Obs: ${form.observacoes}`;

              const whatsappLink = `https://wa.me/5538992030710?text=${message}`;
              window.open(whatsappLink, "_blank");
            }}

            className={`mt-6 w-full rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground shadow-xl transition hover:scale-[1.02] hover:bg-primary-hover ${isValid
              ? "cursor-pointer" : "cursor-not-allowed"
              }`}
          >
            Enviar pedido
          </button>

        </div>
      </motion.div>
    </div>
  );
}
