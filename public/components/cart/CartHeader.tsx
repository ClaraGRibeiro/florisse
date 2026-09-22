type CartHeaderProps = {
  totalItems: number;
};

export default function CartHeader({ totalItems }: CartHeaderProps) {
  return (
    <div className="border-border/70 mb-10 border-b pb-7">
      <p className="text-primary mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
        Seu pedido
      </p>

      <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-5xl">
        Seu Carrinho
      </h1>

      <p className="text-muted mt-2 text-sm">
        {totalItems}{" "}
        {totalItems === 1 ? "item adicionado" : "itens adicionados"}
      </p>
    </div>
  );
}
