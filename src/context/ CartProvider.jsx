import { useState } from "react";
import { CartContext } from "./CartContext";

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      try {
        console.log("cart from localStorage:", data);
        return JSON.parse(data);
      } catch (error) {
        console.error("Lỗi parse JSON từ localStorage:", error);
      }
    }
    return {};
  });

  const addToCart = (id) => {
    const newCart = {
      ...cart,
      [id]: (cart[id] || 0) + 1,
    };

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
