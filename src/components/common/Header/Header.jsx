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
    <header className="px-4 my-4">
      <div className="flex justify-between items-center bg-slate-700 p-4 text-slate-50 rounded-lg shadow-md">
        <Link to="/" className="capitalize flex gap-1 items-center">
          <StorefrontIcon />
          <span>Shop</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative capitalize bg-slate-500 px-4 py-2 rounded-md flex items-center gap-2"
          >
            <span>cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
            <ShoppingCartIcon />
          </Link>
          <Link
            to={`/${
              access_token != null && access_token != undefined
                ? "dashboard"
                : "login"
            }`}
            className="capitalize bg-slate-500 px-4 py-2 rounded-md flex items-center gap-2"
          >
            {access_token != null && access_token != undefined ? (
              <>
                <span>dashboard</span>
                <PermIdentityIcon />
              </>
            ) : (
              <>
                <span>login/signup</span>
                <LoginIcon />
              </>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
