import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Card, CardContent, Pagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InventoryIcon from "@mui/icons-material/Inventory";
import getProductsApi from "../../../utils/apis/products/getProductsApi";
import deleteProductApi from "../../../utils/apis/products/deleteProductApi";
import AddProductForm from "../AddProductForm";
import EditProductForm from "../EditProductForm";
import ProductGridSkeleton from "../../../components/skeleton/ProductGridSkeleton";
import ErrorOnFetchApi from "../../../components/common/ErrorOnFetchApi";

const ProductsView = () => {
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

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
    enabled: !showAddForm && !editingProductId,
  });

  // Get products array - handle both response structures
  const products = productsData?.data?.products || productsData?.data || [];

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddProductClick = () => {
    setShowAddForm(true);
    setEditingProductId(null);
  };

  const handleEditProductClick = (productId) => {
    setEditingProductId(productId);
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
  };

  // Mutation for deleting product
  const deleteProductMutation = useMutation({
    mutationFn: (id) => deleteProductApi(id),
    onSuccess: (result, productId) => {
      if (result?.status === 200 || result?.status === 204) {
        toast.success("Product deleted successfully!");
        // Invalidate products queries to refetch the list
        queryClient.invalidateQueries({ queryKey: ["products"] });
        // If current page becomes empty, go to previous page
        if (products.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        toast.error("Failed to delete product. Please try again.");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while deleting the product.");
      console.error("Error deleting product:", error);
    },
  });

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(productId);
    }
  };

  const handleFormSuccess = () => {
    setShowAddForm(false);
    setEditingProductId(null);
    setCurrentPage(1); // Reset to first page after adding/editing product
  };

  return (
    <div className="space-y-6">
      {/* Products Header */}
      <Card className="shadow-lg border-0" sx={{ borderRadius: "20px" }}>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Products Management
              </h2>
              <p className="text-gray-600 mt-1">Manage your products</p>
            </div>
            {!showAddForm && !editingProductId && (
              <button
                onClick={handleAddProductClick}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <AddIcon />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="space-y-4">
          <button
            onClick={() => setShowAddForm(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            <span>← Back to Products</span>
          </button>
          <AddProductForm onSuccess={handleFormSuccess} />
        </div>
      )}

      {/* Edit Product Form */}
      {editingProductId && (
        <div className="space-y-4">
          <button
            onClick={handleCancelEdit}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            <span>← Back to Products</span>
          </button>
          <EditProductForm
            productId={editingProductId}
            onSuccess={handleFormSuccess}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      {/* Products List */}
      {!showAddForm && !editingProductId && (
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
              <>
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
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product, index) => {
                        const productImage =
                          Array.isArray(product?.images) &&
                          product.images.length > 0
                            ? product.images[0].replace(/^["[]+|["\]]/g, "")
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
                                  alt={product?.title || "Product"}
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
                                ${product?.price?.toFixed(2) || "0.00"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">
                                {product?.category?.name || "Uncategorized"}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-600 max-w-md line-clamp-2">
                                {product?.description || "No description"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    handleEditProductClick(product?.id)
                                  }
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 font-semibold text-sm transform hover:scale-105 active:scale-95"
                                >
                                  <EditIcon fontSize="small" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteProduct(product?.id)
                                  }
                                  disabled={deleteProductMutation.isPending}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                                >
                                  <DeleteIcon fontSize="small" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
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
                      {products.length !== 1 ? "s" : ""} on page {currentPage}{" "}
                      of {totalPages}
                    </p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductsView;
