import React from "react";
import { Card, CardContent } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";

const SidebarNav = ({ activeView, onViewChange }) => {
  return (
    <div className="hidden md:block w-64 flex-shrink-0">
      <Card
        className="shadow-xl border-0 sticky top-8"
        sx={{ borderRadius: "20px" }}
      >
        <CardContent className="p-4">
          <nav className="space-y-2">
            <button
              onClick={() => onViewChange("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                activeView === "profile"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <PersonIcon />
              <span className="font-semibold">Profile</span>
            </button>
            <button
              onClick={() => onViewChange("products")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                activeView === "products"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <InventoryIcon />
              <span className="font-semibold">Products</span>
            </button>
            <button
              onClick={() => onViewChange("categories")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                activeView === "categories"
                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <CategoryIcon />
              <span className="font-semibold">Categories</span>
            </button>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarNav;
