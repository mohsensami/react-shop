const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product, quantity) => {
    const existingItemIndex = get().cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
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

  updateQuantity: (productId, quantity) => {
    const updatedCart = get().cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    set({ cartItems: updatedCart });
  },

  removeFromCart: (productId) => {
    const updatedCart = get().cartItems.filter((item) => item.id !== productId);
    set({ cartItems: updatedCart });
  },

  clearCart: () => {
    set({ cartItems: [] });
  },
}));
