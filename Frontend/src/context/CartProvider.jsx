import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [authUser] = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (authUser) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [authUser]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:4001"}/cart/${authUser._id}`);
      setCart(res.data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const addToCart = async (bookId) => {
    if (!authUser) {
      toast.error("Please login to add to cart");
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:4001"}/cart/add/${authUser._id}`, {
        bookId,
        quantity: 1
      });
      setCart(res.data);
      toast.success("Added to cart!");
      setIsCartOpen(true);
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL || "http://localhost:4001"}/cart/remove/${authUser._id}/${bookId}`);
      setCart(res.data);
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Failed to remove");
    }
  };

  const checkout = async () => {
    if (cart.items.length === 0) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:4001"}/cart/checkout/${authUser._id}`);
      setCart(res.data.cart);
      toast.success("Checkout successful! Books purchased.");
      setIsCartOpen(false);
    } catch (error) {
      toast.error("Checkout failed");
    }
  };

  return (
    <CartContext.Provider value={{ cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
