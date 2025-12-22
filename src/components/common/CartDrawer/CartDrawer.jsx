import React from "react";
import {
  DeleteOutline,
  Add,
  Remove,
  ShoppingBagOutlined,
  Close,
} from "@mui/icons-material";
import useCartStore from "../../../store/useCartStore";
import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }) => {
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleIncrement = (item) => {
    addToCart(item, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      addToCart(item, item.quantity - 1);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Close className="text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBagOutlined className="text-5xl text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="relative overflow-hidden rounded-lg bg-gray-100 w-20 h-20 flex-shrink-0">
                        <img
                          src={
                            Array.isArray(item.images)
                              ? item.images[0]
                              : item.image
                          }
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          ${item.price.toFixed(2)} each
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-white rounded-lg p-1 w-fit">
                          <button
                            onClick={() => handleDecrement(item)}
                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-all duration-200 active:scale-95"
                          >
                            <Remove className="text-sm" />
                          </button>
                          <span className="text-sm font-semibold text-gray-900 min-w-[30px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrement(item)}
                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-all duration-200 active:scale-95"
                          >
                            <Add className="text-sm" />
                          </button>
                        </div>
                      </div>

                      {/* Price and Delete */}
                      <div className="flex flex-col items-end justify-between">
                        <p className="font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-all duration-200 hover:scale-110 active:scale-95"
                        >
                          <DeleteOutline className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-lg">Total</span>
                  <span className="font-bold text-blue-600 text-xl">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                to="/cart"
                onClick={onClose}
                className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mb-3"
              >
                View Cart
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
