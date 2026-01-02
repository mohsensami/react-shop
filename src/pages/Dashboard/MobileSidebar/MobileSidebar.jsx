import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";

const MobileSidebar = ({ activeView, onViewChange }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center py-3">
        <button
          onClick={() => onViewChange("profile")}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
            activeView === "profile"
              ? "text-blue-600 bg-blue-50"
              : "text-gray-600"
          }`}
        >
          <PersonIcon />
          <span className="text-xs font-medium">Profile</span>
        </button>
        <button
          onClick={() => onViewChange("products")}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
            activeView === "products"
              ? "text-purple-600 bg-purple-50"
              : "text-gray-600"
          }`}
        >
          <InventoryIcon />
          <span className="text-xs font-medium">Products</span>
        </button>
        <button
          onClick={() => onViewChange("categories")}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
            activeView === "categories"
              ? "text-green-600 bg-green-50"
              : "text-gray-600"
          }`}
        >
          <CategoryIcon />
          <span className="text-xs font-medium">Categories</span>
        </button>
      </div>
    </div>
  );
};

export default MobileSidebar;


