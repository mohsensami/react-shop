import React from "react";
import useStore from "../../../store";
import { Link } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LoginIcon from "@mui/icons-material/Login";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useCartStore from "../../../store/useCartStore";

const Header = () => {
  const { access_token } = useStore();

  const cartItems = useCartStore((state) => state.cartItems);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-200">
              <StorefrontIcon className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Shop
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-blue-700 font-medium transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <ShoppingCartIcon className="text-xl" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link
              to={`/${
                access_token != null && access_token != undefined
                  ? "dashboard"
                  : "login"
              }`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {access_token != null && access_token != undefined ? (
                <>
                  <PermIdentityIcon className="text-lg" />
                  <span className="hidden sm:inline">Dashboard</span>
                </>
              ) : (
                <>
                  <LoginIcon className="text-lg" />
                  <span className="hidden sm:inline">Login</span>
                </>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
