// src/store/useCartStore.js
import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product, quantity) => {
    const existingItemIndex = get().cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      // اگر محصول از قبل در سبد خرید هست → مقدار جدید جایگزین کن
      const updatedCart = [...get().cartItems];
      updatedCart[existingItemIndex] = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: Array.isArray(product.images)
          ? product.images[0]
          : product.images,
        quantity: quantity,
      };

      set({ cartItems: updatedCart });
    } else {
      // محصول جدید → اضافه کن
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

  removeFromCart: (productId) => {
    const updatedCart = get().cartItems.filter((item) => item.id !== productId);
    set({ cartItems: updatedCart });
  },

  clearCart: () => {
    set({ cartItems: [] });
  },
}));

export default useCartStore;
