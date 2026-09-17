"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CartItem = {
  id: string;
  name: string;
  type: "product" | "custom-order";
  color: string;
  size: string;
  customLength?: string;
  customWidth?: string;
  price: number;
  no_discount?: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  totalItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (
    id: string,
    quantity: number,
  ) => void;
  updateItem: (
    id: string,
    updates: Partial<CartItem>,
  ) => void;
  clearCart: () => void;
};

const CartContext =
  createContext<CartContextType | undefined>(
    undefined,
  );

const STORAGE_KEY = "florisse-cart";

/*
 * Verifica se o valor é um objeto válido.
 */
function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

/*
 * Valida um item recuperado do localStorage.
 *
 * Somente itens que possuem todos os campos
 * obrigatórios e tipos corretos entram no carrinho.
 */
function isValidCartItem(
  value: unknown,
): value is CartItem {
  if (!isRecord(value)) {
    return false;
  }

  /*
   * ID
   */
  if (
    typeof value.id !== "string" ||
    value.id.trim() === ""
  ) {
    return false;
  }

  /*
   * Nome
   */
  if (
    typeof value.name !== "string" ||
    value.name.trim() === ""
  ) {
    return false;
  }

  /*
   * Tipo
   */
  if (
    value.type !== "product" &&
    value.type !== "custom-order"
  ) {
    return false;
  }

  /*
   * Cor
   */
  if (
    typeof value.color !== "string" ||
    value.color.trim() === ""
  ) {
    return false;
  }

  /*
   * Tamanho
   */
  if (
    typeof value.size !== "string" ||
    value.size.trim() === ""
  ) {
    return false;
  }

  /*
   * Preço
   */
  if (
    typeof value.price !== "number" ||
    !Number.isFinite(value.price) ||
    value.price < 0
  ) {
    return false;
  }

  /*
   * Quantidade
   */
  if (
    typeof value.quantity !== "number" ||
    !Number.isFinite(value.quantity) ||
    !Number.isInteger(value.quantity) ||
    value.quantity <= 0
  ) {
    return false;
  }

  /*
   * Imagem
   */
  if (
    typeof value.image !== "string" ||
    value.image.trim() === ""
  ) {
    return false;
  }

  /*
   * Campos opcionais
   */
  if (
    value.customLength !== undefined &&
    typeof value.customLength !== "string"
  ) {
    return false;
  }

  if (
    value.customWidth !== undefined &&
    typeof value.customWidth !== "string"
  ) {
    return false;
  }

  if (
    value.no_discount !== undefined &&
    (
      typeof value.no_discount !== "number" ||
      !Number.isFinite(value.no_discount) ||
      value.no_discount < 0
    )
  ) {
    return false;
  }

  return true;
}

/*
 * Converte o conteúdo salvo no localStorage
 * em um carrinho validado.
 */
function parseStoredCart(
  savedCart: string,
): CartItem[] {
  try {
    const parsed: unknown =
      JSON.parse(savedCart);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidCartItem);
  } catch {
    return [];
  }
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>(
    [],
  );

  const [isLoaded, setIsLoaded] =
    useState(false);

  /*
   * Recupera o carrinho do localStorage.
   *
   * Os dados passam pela validação antes
   * de serem colocados no estado.
   */
  useEffect(() => {
    try {
      const savedCart =
        localStorage.getItem(
          STORAGE_KEY,
        );

      if (savedCart) {
        const validCart =
          parseStoredCart(savedCart);

        setCart(validCart);

        /*
         * Remove do localStorage qualquer
         * item inválido ou incompatível.
         */
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(validCart),
          );
        } catch {
          // Ignora erro de gravação.
        }
      }
    } catch {
      /*
       * Se o localStorage estiver indisponível,
       * inicia com carrinho vazio.
       */
      setCart([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /*
   * Persiste o carrinho depois da
   * recuperação inicial.
   */
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cart),
      );
    } catch {
      // Ignora erro de gravação.
    }
  }, [cart, isLoaded]);

  /*
   * Quantidade total de itens no carrinho.
   *
   * Exemplo:
   *
   * Tapete × 2
   * Bolsa × 1
   *
   * totalItems = 3
   */
  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0,
    );
  }, [cart]);

  /*
   * Adiciona um item ao carrinho.
   *
   * Se já existir um item com a mesma configuração,
   * aumenta a quantidade em vez de criar uma nova linha.
   *
   * Itens com configurações diferentes continuam
   * sendo adicionados separadamente.
   */
  function addToCart(item: CartItem) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (currentItem) =>
          currentItem.name === item.name &&
          currentItem.type === item.type &&
          currentItem.color === item.color &&
          currentItem.size === item.size &&
          currentItem.customLength === item.customLength &&
          currentItem.customWidth === item.customWidth &&
          currentItem.price === item.price &&
          currentItem.no_discount === item.no_discount,
      );

      if (!existingItem) {
        return [...currentCart, item];
      }

      return currentCart.map((currentItem) =>
        currentItem.id === existingItem.id
          ? {
            ...currentItem,
            quantity:
              currentItem.quantity + item.quantity,
          }
          : currentItem,
      );
    });
  }


  /*
   * Remove um item.
   */
  function removeFromCart(id: string) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id,
      ),
    );
  }

  /*
   * Atualiza a quantidade.
   */
  function updateQuantity(
    id: string,
    quantity: number,
  ) {
    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity,
          }
          : item,
      ),
    );
  }

  /*
   * Atualiza propriedades de um item.
   */
  function updateItem(
    id: string,
    updates: Partial<CartItem>,
  ) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
            ...item,
            ...updates,
          }
          : item,
      ),
    );
  }

  /*
   * Limpa o carrinho.
   */
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart deve ser usado dentro de um CartProvider",
    );
  }

  return context;
}
