import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Card, CardContent, Pagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";
import getCategoriesApi from "../../../utils/apis/categories/getCategoriesApi";
import deleteCategoryApi from "../../../utils/apis/categories/deleteCategoryApi";
import AddCategoryForm from "../AddCategoryForm";
import EditCategoryForm from "../EditCategoryForm";
import ProductGridSkeleton from "../../../components/skeleton/ProductGridSkeleton";
import ErrorOnFetchApi from "../../../components/common/ErrorOnFetchApi";

const CategoriesView = () => {
  const queryClient = useQueryClient();
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoriesPage, setCategoriesPage] = useState(1);
  const limit = 10;

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
    enabled: !showAddCategoryForm && !editingCategoryId,
  });

  // Get categories array - handle both response structures
  const categories =
    categoriesData?.data?.categories || categoriesData?.data || [];

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

  const handleCategoriesPageChange = (event, value) => {
    setCategoriesPage(value);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddCategoryClick = () => {
    setShowAddCategoryForm(true);
    setEditingCategoryId(null);
  };

  const handleEditCategoryClick = (categoryId) => {
    setEditingCategoryId(categoryId);
    setShowAddCategoryForm(false);
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
  };

  // Mutation for deleting category
  const deleteCategoryMutation = useMutation({
    mutationFn: (id) => deleteCategoryApi(id),
    onSuccess: (result, categoryId) => {
      if (result?.status === 200 || result?.status === 204) {
        toast.success("Category deleted successfully!");
        // Invalidate categories queries to refetch the list
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        // If current page becomes empty, go to previous page
        if (categories.length === 1 && categoriesPage > 1) {
          setCategoriesPage(categoriesPage - 1);
        }
      } else {
        toast.error("Failed to delete category. Please try again.");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while deleting the category.");
      console.error("Error deleting category:", error);
    },
  });

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategoryMutation.mutate(categoryId);
    }
  };

  const handleFormSuccess = () => {
    setShowAddCategoryForm(false);
    setEditingCategoryId(null);
    setCategoriesPage(1); // Reset to first page after adding/editing category
  };

  return (
    <div className="space-y-6">
      {/* Categories Header */}
      <Card className="shadow-lg border-0" sx={{ borderRadius: "20px" }}>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Categories Management
              </h2>
              <p className="text-gray-600 mt-1">Manage your categories</p>
            </div>
            {!showAddCategoryForm && !editingCategoryId && (
              <button
                onClick={handleAddCategoryClick}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <AddIcon />
                <span>Add Category</span>
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Category Form */}
      {showAddCategoryForm && (
        <div className="space-y-4">
          <button
            onClick={() => setShowAddCategoryForm(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            <span>← Back to Categories</span>
          </button>
          <AddCategoryForm onSuccess={handleFormSuccess} />
        </div>
      )}

      {/* Edit Category Form */}
      {editingCategoryId && (
        <div className="space-y-4">
          <button
            onClick={handleCancelEdit}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            <span>← Back to Categories</span>
          </button>
          <EditCategoryForm
            categoryId={editingCategoryId}
            onSuccess={handleFormSuccess}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      {/* Categories List */}
      {!showAddCategoryForm && !editingCategoryId && (
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
              <>
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
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Actions
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleEditCategoryClick(category?.id)
                                }
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 font-semibold text-sm transform hover:scale-105 active:scale-95"
                              >
                                <EditIcon fontSize="small" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category?.id)}
                                disabled={deleteCategoryMutation.isPending}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                              >
                                <DeleteIcon fontSize="small" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                {categories.length > 0 && categoriesTotalPages > 1 && (
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
                      {categories.length !== 1 ? "ies" : "y"} on page{" "}
                      {categoriesPage} of {categoriesTotalPages}
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

export default CategoriesView;
