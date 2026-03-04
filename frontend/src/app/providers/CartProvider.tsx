import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem } from "../../types";

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QTY"; id: string; quantity: number }
  | { type: "CLEAR" };

interface CartState {
  items: CartItem[];
}

interface CartContextValue extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
  }
}

function loadCart(): CartState {
  try {
    const raw = localStorage.getItem("bh_cart");
    return raw ? { items: JSON.parse(raw) as CartItem[] } : { items: [] };
  } catch {
    return { items: [] };
  }
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  const persist = (items: CartItem[]) => {
    localStorage.setItem("bh_cart", JSON.stringify(items));
  };

  const addItem = useCallback(
    (item: CartItem) => {
      dispatch({ type: "ADD", item });
      persist([...state.items.filter((i) => i.id !== item.id), item]);
    },
    [state.items]
  );

  const removeItem = useCallback(
    (id: string) => {
      dispatch({ type: "REMOVE", id });
      persist(state.items.filter((i) => i.id !== id));
    },
    [state.items]
  );

  const updateQty = useCallback(
    (id: string, quantity: number) => {
      dispatch({ type: "UPDATE_QTY", id, quantity });
      persist(state.items.map((i) => (i.id === id ? { ...i, quantity } : i)));
    },
    [state.items]
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
    localStorage.removeItem("bh_cart");
  }, []);

  const total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
