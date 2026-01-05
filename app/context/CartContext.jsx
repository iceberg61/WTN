"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};

export const CartProvider = ({ children }) => {
  // { productId: quantity }
  const [cartItems, setCartItems] = useState({});

  const addToCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (quantity <= 0) {
        delete updated[productId];
      } else {
        updated[productId] = quantity;
      }
      return updated;
    });
  };

  const clearCart = () => setCartItems({});

  const getCartCount = useMemo(() => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartQuantity,
        clearCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
