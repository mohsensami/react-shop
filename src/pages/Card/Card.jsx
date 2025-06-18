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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Typography variant="h4" className="mb-8 font-bold text-gray-800">
          Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Typography variant="h6" className="text-center text-gray-600">
            Your cart is empty.
          </Typography>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Paper key={item.id} className="p-4 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <Typography variant="h6" className="font-medium">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      ${item.price.toFixed(2)}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconButton
                      size="small"
                      onClick={() => handleDecrement(item)}
                    >
                      <Remove />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleIncrement(item)}
                    >
                      <Add />
                    </IconButton>
                  </div>
                  <Typography variant="h6" className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteOutline />
                  </IconButton>
                </Paper>
              ))}

              <Button
                variant="outlined"
                color="secondary"
                onClick={clearCart}
                className="mt-4"
              >
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Paper className="p-6">
                <Typography variant="h6" className="font-bold mb-4">
                  Order Summary
                </Typography>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Typography>Subtotal</Typography>
                    <Typography>${subtotal.toFixed(2)}</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography>Shipping</Typography>
                    <Typography>${shipping.toFixed(2)}</Typography>
                  </div>
                  <Divider />
                  <div className="flex justify-between font-bold">
                    <Typography>Total</Typography>
                    <Typography>${total.toFixed(2)}</Typography>
                  </div>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    className="mt-4 bg-black hover:bg-gray-800"
                  >
                    Proceed to Checkout
                  </Button>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <LocalShippingOutlined />
                      <Typography variant="body2">
                        Free shipping on orders over $100
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <PaymentOutlined />
                      <Typography variant="body2">Secure payment</Typography>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <ShoppingBagOutlined />
                      <Typography variant="body2">Easy returns</Typography>
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
