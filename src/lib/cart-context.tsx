"use client";

import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useCallback,
    useState,
    type ReactNode,
} from "react";
import type { Product } from "@/types";

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

type CartAction =
    | { type: "ADD_ITEM"; product: Product; quantity?: number }
    | { type: "REMOVE_ITEM"; productId: string }
    | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
    | { type: "CLEAR" }
    | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find(
                (i) => i.product.id === action.product.id,
            );
            if (existing) return state;
            return {
                items: [
                    ...state.items,
                    { product: action.product, quantity: 1 },
                ],
            };
        }
        case "REMOVE_ITEM":
            return {
                items: state.items.filter(
                    (i) => i.product.id !== action.productId,
                ),
            };
        case "UPDATE_QUANTITY":
            return {
                items:
                    action.quantity <= 0
                        ? state.items.filter(
                              (i) => i.product.id !== action.productId,
                          )
                        : state.items.map((i) =>
                              i.product.id === action.productId
                                  ? { ...i, quantity: action.quantity }
                                  : i,
                          ),
            };
        case "CLEAR":
            return { items: [] };
        case "HYDRATE":
            return { items: action.items };
        default:
            return state;
    }
}

interface CartContextValue {
    items: CartItem[];
    itemCount: number;
    total: number;
    hydrated: boolean;
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "leonix-cart";

function loadCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        dispatch({ type: "HYDRATE", items: loadCart() });
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
        }
    }, [state.items]);

    const addItem = useCallback((product: Product) => {
        dispatch({ type: "ADD_ITEM", product, quantity: 1 });
    }, []);

    const removeItem = useCallback((productId: string) => {
        dispatch({ type: "REMOVE_ITEM", productId });
    }, []);

    const updateQuantity = useCallback(
        (productId: string, quantity: number) => {
            dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
        },
        [],
    );

    const clearCart = useCallback(() => {
        dispatch({ type: "CLEAR" });
    }, []);

    const isInCart = useCallback(
        (productId: string) =>
            state.items.some((i) => i.product.id === productId),
        [state.items],
    );

    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const total = state.items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0,
    );

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                itemCount,
                total,
                hydrated,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                isInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within a CartProvider");
    return ctx;
}
