import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import useStore from "../../store";
import getUserInfoWithTokenApi from "../../utils/apis/users/getUserInfoWithTokenApi";
import { useQuery } from "@tanstack/react-query";
import DashboardSkeleton from "../../components/skeleton/DashboardSkeleton";
import ErrorOnFetchApi from "../../components/common/ErrorOnFetchApi";
import { removeCookie } from "../../utils/helpers/cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../components/common/Header";
import Avatar from "@mui/material/Avatar";
import { Box, Card, CardContent } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import AddProductForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import getProductsApi from "../../utils/apis/products/getProductsApi";
import getCategoriesApi from "../../utils/apis/categories/getCategoriesApi";
import ProductGridSkeleton from "../../components/skeleton/ProductGridSkeleton";

const Dashboard = () => {
  const { access_token, removeState } = useStore();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("profile"); // 'profile', 'products', or 'categories'
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPage, setCategoriesPage] = useState(1);
  const limit = 10;

  const { isPending, error, data } = useQuery({
    queryKey: ["userIno"],
    queryFn: () => getUserInfoWithTokenApi(),
    enabled: access_token != null && access_token != undefined,
  });

  // Fetch products for the table with pagination
  const {
    data: productsData,
    isPending: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products", "dashboard", currentPage],
    queryFn: () => {
      const offset = (currentPage - 1) * limit;
      return getProductsApi(offset, limit);
    },
    enabled: activeView === "products" && !showAddForm,
  });

  // Fetch categories for the table with pagination
  const {
    data: categoriesData,
    isPending: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories", "dashboard", categoriesPage],
    queryFn: () => {
      return getCategoriesApi(limit);
    },
    enabled: activeView === "categories" && !showAddCategoryForm,
  });

  // Get products array - handle both response structures
  const products = productsData?.data?.products || productsData?.data || [];

  // Get categories array - handle both response structures
  const categories =
    categoriesData?.data?.categories || categoriesData?.data || [];

  // Calculate total pages for products
  const totalItems = productsData?.data?.total;
  let totalPages = 1;

  if (totalItems) {
    totalPages = Math.ceil(totalItems / limit);
  } else {
    // If we got a full page, assume there might be more
    if (products.length === limit) {
      totalPages = currentPage + 1;
    } else if (products.length > 0) {
      totalPages = currentPage;
    }
  }

  // Calculate total pages for categories
  const categoriesTotalItems = categoriesData?.data?.total;
  let categoriesTotalPages = 1;

  if (categoriesTotalItems) {
    categoriesTotalPages = Math.ceil(categoriesTotalItems / limit);
  } else {
    // If we got a full page, assume there might be more
    if (categories.length === limit) {
      categoriesTotalPages = categoriesPage + 1;
    } else if (categories.length > 0) {
      categoriesTotalPages = categoriesPage;
    }
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoriesPageChange = (event, value) => {
    setCategoriesPage(value);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    removeCookie("credential");
    removeState();
    toast.warn("logged out successfully , redirecting to login page...");
    setTimeout(() => navigate("/login"), 1000);
  };

  const handleProductsClick = () => {
    setActiveView("products");
    setShowAddForm(false);
    setCurrentPage(1); // Reset to first page
  };

  const handleAddProductClick = () => {
    setShowAddForm(true);
    setActiveView("products");
  };

  const handleCategoriesClick = () => {
    setActiveView("categories");
    setShowAddCategoryForm(false);
    setCategoriesPage(1); // Reset to first page
  };

  const handleAddCategoryClick = () => {
    setShowAddCategoryForm(true);
    setActiveView("categories");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-gray-50">
      <Header />
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 gap-6">
        {access_token != null && access_token != undefined ? (
          <>
            {isPending && <DashboardSkeleton />}
            {error && <ErrorOnFetchApi />}
            {data && (
              <>
                {/* Sidebar */}
                <div className="hidden md:block w-64 flex-shrink-0">
                  <Card
                    className="shadow-xl border-0 sticky top-8"
                    sx={{ borderRadius: "20px" }}
                  >
                    <CardContent className="p-4">
                      <nav className="space-y-2">
                        <button
                          onClick={() => {
                            setActiveView("profile");
                            setShowAddForm(false);
                            setShowAddCategoryForm(false);
                          }}
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
                          onClick={handleProductsClick}
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
                          onClick={handleCategoriesClick}
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

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  {activeView === "profile" && (
                    <div className="space-y-6">
                      {/* Welcome Header Card */}
                      <Card
                        className="relative overflow-hidden shadow-xl border-0"
                        sx={{
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "20px",
                        }}
                      >
                        <CardContent className="p-8 md:p-12">
                          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                            {/* Avatar */}
                            <div className="relative">
                              <Avatar
                                src={data?.data?.avatar}
                                alt="Profile"
                                sx={{
                                  width: { xs: 100, md: 140 },
                                  height: { xs: 100, md: 140 },
                                  border: "4px solid white",
                                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                                }}
                              />
                              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-lg"></div>
                            </div>

                            {/* Welcome Text */}
                            <div className="flex-1 text-center md:text-left">
                              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                Welcome back!
                              </h1>
                              <p className="text-blue-100 text-lg md:text-xl mb-4">
                                {data?.data?.email}
                              </p>
                              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <span className="text-white font-medium text-sm">
                                  {data?.data?.role?.toUpperCase() || "USER"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* User Information Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Card */}
                        <Card
                          className="shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                          sx={{ borderRadius: "16px" }}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md">
                                <PersonIcon className="text-white text-2xl" />
                              </div>
                              <div className="flex-1">
                                <p className="text-gray-500 text-sm font-medium mb-1">
                                  Full Name
                                </p>
                                <p className="text-gray-900 text-xl font-semibold">
                                  {data?.data?.name || "Not provided"}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Email Card */}
                        <Card
                          className="shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                          sx={{ borderRadius: "16px" }}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-md">
                                <EmailIcon className="text-white text-2xl" />
                              </div>
                              <div className="flex-1">
                                <p className="text-gray-500 text-sm font-medium mb-1">
                                  Email Address
                                </p>
                                <p className="text-gray-900 text-xl font-semibold break-all">
                                  {data?.data?.email}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Role Card */}
                        <Card
                          className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 md:col-span-2"
                          sx={{ borderRadius: "16px" }}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-md">
                                <BadgeIcon className="text-white text-2xl" />
                              </div>
                              <div className="flex-1">
                                <p className="text-gray-500 text-sm font-medium mb-1">
                                  Account Role
                                </p>
                                <p className="text-gray-900 text-xl font-semibold">
                                  {data?.data?.role || "User"}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Logout Button */}
                      <div className="flex justify-center pt-4">
                        <button
                          onClick={handleLogout}
                          className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
                        >
                          <span>Logout</span>
                          <LogoutIcon className="group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  )}

                  {activeView === "products" && (
                    <div className="space-y-6">
                      {/* Products Header */}
                      <Card
                        className="shadow-lg border-0"
                        sx={{ borderRadius: "20px" }}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900">
                                Products Management
                              </h2>
                              <p className="text-gray-600 mt-1">
                                Manage your products
                              </p>
                            </div>
                            <button
                              onClick={handleAddProductClick}
                              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                              <AddIcon />
                              <span>Add Product</span>
                            </button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Add Product Form or Products List */}
                      {showAddForm ? (
                        <div className="space-y-4">
                          <button
                            onClick={() => setShowAddForm(false)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                          >
                            <span>← Back to Products</span>
                          </button>
                          <AddProductForm
                            onSuccess={() => {
                              setShowAddForm(false);
                              setCurrentPage(1); // Reset to first page after adding product
                            }}
                          />
                        </div>
                      ) : (
                        <Card
                          className="shadow-lg border-0 overflow-hidden"
                          sx={{ borderRadius: "20px" }}
                        >
                          <CardContent className="p-0">
                            {productsLoading ? (
                              <div className="p-12">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                  {Array.from("123456").map((i) => (
                                    <ProductGridSkeleton key={i} />
                                  ))}
                                </div>
                              </div>
                            ) : productsError ? (
                              <div className="p-12">
                                <ErrorOnFetchApi />
                              </div>
                            ) : products.length === 0 ? (
                              <div className="p-12">
                                <div className="text-center">
                                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <InventoryIcon className="text-gray-400 text-5xl" />
                                  </div>
                                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    No Products Yet
                                  </h3>
                                  <p className="text-gray-600 mb-6">
                                    Your products list is currently empty
                                  </p>
                                  <button
                                    onClick={handleAddProductClick}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                  >
                                    <AddIcon />
                                    <span>Add Your First Product</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="overflow-x-auto">
                                <table className="w-full">
                                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                    <tr>
                                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Image
                                      </th>
                                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Title
                                      </th>
                                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Price
                                      </th>
                                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Category
                                      </th>
                                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Description
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product, index) => {
                                      const productImage =
                                        Array.isArray(product?.images) &&
                                        product.images.length > 0
                                          ? product.images[0].replace(
                                              /^["[]+|["\]]/g,
                                              ""
                                            )
                                          : product?.images ||
                                            "https://via.placeholder.com/150";

                                      return (
                                        <tr
                                          key={product?.id || index}
                                          className="hover:bg-gray-50 transition-colors duration-150"
                                        >
                                          <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex-shrink-0 h-16 w-16">
                                              <img
                                                className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                                                src={productImage}
                                                alt={
                                                  product?.title || "Product"
                                                }
                                                onError={(e) => {
                                                  e.target.src =
                                                    "https://via.placeholder.com/150";
                                                }}
                                              />
                                            </div>
                                          </td>
                                          <td className="px-6 py-4">
                                            <div className="text-sm font-semibold text-gray-900 max-w-xs">
                                              {product?.title || "N/A"}
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-green-600">
                                              $
                                              {product?.price?.toFixed(2) ||
                                                "0.00"}
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">
                                              {product?.category?.name ||
                                                "Uncategorized"}
                                            </div>
                                          </td>
                                          <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 max-w-md line-clamp-2">
                                              {product?.description ||
                                                "No description"}
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            )}
                            {/* Pagination */}
                            {products.length > 0 && totalPages > 1 && (
                              <div className="flex justify-center items-center py-6 px-6 border-t border-gray-200">
                                <Pagination
                                  count={totalPages}
                                  page={currentPage}
                                  onChange={handlePageChange}
                                  color="primary"
                                  size="large"
                                  showFirstButton
                                  showLastButton
                                  sx={{
                                    "& .MuiPaginationItem-root": {
                                      fontSize: "1rem",
                                      fontWeight: 600,
                                    },
                                  }}
                                />
                              </div>
                            )}
                            {/* Products count info */}
                            {products.length > 0 && (
                              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <p className="text-sm text-gray-600 text-center">
                                  Showing {products.length} product
                                  {products.length !== 1 ? "s" : ""} on page{" "}
                                  {currentPage} of {totalPages}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}

                  {activeView === "categories" && (
                    <div className="space-y-6">
                      {/* Categories Header */}
                      <Card
                        className="shadow-lg border-0"
                        sx={{ borderRadius: "20px" }}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900">
                                Categories Management
                              </h2>
                              <p className="text-gray-600 mt-1">
                                Manage your categories
                              </p>
                            </div>
                            <button
                              onClick={handleAddCategoryClick}
                              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                              <AddIcon />
                              <span>Add Category</span>
                            </button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Add Category Form or Categories List */}
                      {showAddCategoryForm ? (
                        <div className="space-y-4">
                          <button
                            onClick={() => setShowAddCategoryForm(false)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                          >
                            <span>← Back to Categories</span>
                          </button>
                          <AddCategoryForm
                            onSuccess={() => {
                              setShowAddCategoryForm(false);
                              setCategoriesPage(1); // Reset to first page after adding category
                            }}
                          />
                        </div>
                      ) : (
                        <Card
                          className="shadow-lg border-0 overflow-hidden"
                          sx={{ borderRadius: "20px" }}
                        >
                          <CardContent className="p-0">
                            {categoriesLoading ? (
                              <div className="p-12">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                  {Array.from("123456").map((i) => (
                                    <ProductGridSkeleton key={i} />
                                  ))}
                                </div>
                              </div>
                            ) : categoriesError ? (
                              <div className="p-12">
                                <ErrorOnFetchApi />
                              </div>
                            ) : categories.length === 0 ? (
                              <div className="p-12">
                                <div className="text-center">
                                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CategoryIcon className="text-gray-400 text-5xl" />
                                  </div>
                                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    No Categories Yet
                                  </h3>
                                  <p className="text-gray-600 mb-6">
                                    Your categories list is currently empty
                                  </p>
                                  <button
                                    onClick={handleAddCategoryClick}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                  >
                                    <AddIcon />
                                    <span>Add Your First Category</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="overflow-x-auto">
                                <table className="w-full">
                                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                    <tr>
                                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Image
                                      </th>
                                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Name
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {categories.map((category, index) => (
                                      <tr
                                        key={category?.id || index}
                                        className="hover:bg-gray-50 transition-colors duration-150"
                                      >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="flex-shrink-0 h-16 w-16">
                                            <img
                                              className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                                              src={
                                                category?.image ||
                                                "https://via.placeholder.com/150"
                                              }
                                              alt={category?.name || "Category"}
                                              onError={(e) => {
                                                e.target.src =
                                                  "https://via.placeholder.com/150";
                                              }}
                                            />
                                          </div>
                                        </td>
                                        <td className="px-6 py-4">
                                          <div className="text-sm font-semibold text-gray-900 max-w-xs">
                                            {category?.name || "N/A"}
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                            {/* Pagination */}
                            {categories.length > 0 &&
                              categoriesTotalPages > 1 && (
                                <div className="flex justify-center items-center py-6 px-6 border-t border-gray-200">
                                  <Pagination
                                    count={categoriesTotalPages}
                                    page={categoriesPage}
                                    onChange={handleCategoriesPageChange}
                                    color="primary"
                                    size="large"
                                    showFirstButton
                                    showLastButton
                                    sx={{
                                      "& .MuiPaginationItem-root": {
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                      },
                                    }}
                                  />
                                </div>
                              )}
                            {/* Categories count info */}
                            {categories.length > 0 && (
                              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <p className="text-sm text-gray-600 text-center">
                                  Showing {categories.length} categor
                                  {categories.length !== 1 ? "ies" : "y"} on
                                  page {categoriesPage} of{" "}
                                  {categoriesTotalPages}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}
                </div>

                {/* Mobile Sidebar */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
                  <div className="flex justify-around items-center py-3">
                    <button
                      onClick={() => {
                        setActiveView("profile");
                        setShowAddForm(false);
                        setShowAddCategoryForm(false);
                      }}
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
                      onClick={handleProductsClick}
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
                      onClick={handleCategoriesClick}
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
              </>
            )}
          </>
        ) : (
          <Card
            className="shadow-xl border-0 text-center"
            sx={{ borderRadius: "20px" }}
          >
            <CardContent className="p-12">
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PersonIcon className="text-gray-400 text-5xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Access Restricted
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Only logged in users can access the dashboard
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span>Go to Login</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
