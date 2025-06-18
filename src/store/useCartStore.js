// src/store/useCartStore.js
import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product, quantity) => {
    const existingItemIndex = get().cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      // اگر محصول از قبل در سبد خرید هست، فقط quantity آپدیت میشه
      const updatedCart = [...get().cartItems];
      updatedCart[existingItemIndex].quantity += quantity;

      set({ cartItems: updatedCart });
    } else {
      // اگر محصول جدید هست اضافه میشه
      set({
        cartItems: [
          ...get().cartItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: Array.isArray(product.images)
              ? product.images[0]
              : product.images,
            quantity: quantity,
          },
        ],
      });
    }
  },

  // میتونی سایر متدها هم اضافه کنی مثل removeFromCart, clearCart ...
}));

export default useCartStore;
