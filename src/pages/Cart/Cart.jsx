import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import {
  DeleteOutline,
  Add,
  Remove,
  ShoppingBagOutlined,
  LocalShippingOutlined,
  PaymentOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Typography, Divider, Paper } from "@mui/material";
import useCartStore from "../../store/useCartStore"; // مسیر store رو تنظیم کن

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              Review your items and proceed to checkout
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBagOutlined className="text-5xl text-gray-400" />
                </div>
                <Typography
                  variant="h5"
                  className="font-bold text-gray-900 mb-3"
                >
                  Your cart is empty
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-8">
                  Looks like you haven't added any items to your cart yet.
                </Typography>
                <Button
                  variant="contained"
                  href="/"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative group overflow-hidden rounded-xl bg-gray-100 w-32 h-32 sm:w-28 sm:h-28 flex-shrink-0">
                        <img
                          src={
                            Array.isArray(item.images)
                              ? item.images[0]
                              : item.image
                          }
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-grow w-full sm:w-auto">
                        <Typography
                          variant="h6"
                          className="font-bold text-gray-900 mb-2"
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-gray-600 mb-4"
                        >
                          ${item.price.toFixed(2)} each
                        </Typography>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2 w-fit">
                          <button
                            onClick={() => handleDecrement(item)}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                          >
                            <Remove />
                          </button>
                          <span className="text-lg font-semibold text-gray-900 min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrement(item)}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                          >
                            <Add />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-4">
                        <Typography
                          variant="h6"
                          className="font-bold text-gray-900 text-xl"
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                        >
                          <DeleteOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="mt-6 px-6 py-3 bg-white border-2 border-red-300 text-red-600 rounded-xl font-semibold hover:bg-red-50 hover:border-red-400 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Clear Cart
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100">
                  <Typography
                    variant="h6"
                    className="font-bold text-gray-900 mb-6 text-xl"
                  >
                    Order Summary
                  </Typography>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2">
                      <Typography className="text-gray-600">
                        Subtotal
                      </Typography>
                      <Typography className="font-semibold text-gray-900">
                        ${subtotal.toFixed(2)}
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <Typography className="text-gray-600">
                        Shipping
                      </Typography>
                      <Typography className="font-semibold text-gray-900">
                        ${shipping.toFixed(2)}
                      </Typography>
                    </div>
                    <Divider className="my-4" />
                    <div className="flex justify-between items-center py-2">
                      <Typography
                        variant="h6"
                        className="font-bold text-gray-900"
                      >
                        Total
                      </Typography>
                      <Typography
                        variant="h6"
                        className="font-bold text-blue-600 text-xl"
                      >
                        ${total.toFixed(2)}
                      </Typography>
                    </div>
                  </div>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mb-6"
                  >
                    Proceed to Checkout
                  </Button>

                  <div className="space-y-4 pt-6 border-t border-gray-200">
                    <div className="flex items-start gap-3 text-gray-600">
                      <div className="bg-green-100 p-2 rounded-lg mt-0.5">
                        <LocalShippingOutlined className="text-green-600 text-sm" />
                      </div>
                      <div>
                        <Typography
                          variant="body2"
                          className="font-medium text-gray-900"
                        >
                          Free shipping
                        </Typography>
                        <Typography variant="body2" className="text-sm">
                          on orders over $100
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-gray-600">
                      <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
                        <PaymentOutlined className="text-blue-600 text-sm" />
                      </div>
                      <div>
                        <Typography
                          variant="body2"
                          className="font-medium text-gray-900"
                        >
                          Secure payment
                        </Typography>
                        <Typography variant="body2" className="text-sm">
                          Your data is protected
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-gray-600">
                      <div className="bg-purple-100 p-2 rounded-lg mt-0.5">
                        <ShoppingBagOutlined className="text-purple-600 text-sm" />
                      </div>
                      <div>
                        <Typography
                          variant="body2"
                          className="font-medium text-gray-900"
                        >
                          Easy returns
                        </Typography>
                        <Typography variant="body2" className="text-sm">
                          30-day return policy
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
