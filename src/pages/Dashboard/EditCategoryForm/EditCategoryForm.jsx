import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import updateCategoryApi from "../../../utils/apis/categories/updateCategoryApi";
import getCategoryByIdApi from "../../../utils/apis/categories/getCategoryByIdApi";

const categorySchema = z.object({
  name: z.string().min(1, "Category name cannot be empty!"),
  image: z.string().url("Image must be a valid URL"),
});

const EditCategoryForm = ({ categoryId, onSuccess, onCancel }) => {
  const queryClient = useQueryClient();

  // Fetch category data for editing
  const {
    data: categoryData,
    isPending: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryByIdApi(categoryId),
    enabled: !!categoryId,
  });

  const category = categoryData?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  // Populate form with category data when loaded
  useEffect(() => {
    if (category) {
      reset({
        name: category.name || "",
        image: category.image || "",
      });
    }
  }, [category, reset]);

  // Mutation for updating category
  const updateCategoryMutation = useMutation({
    mutationFn: (data) => updateCategoryApi(categoryId, data),
    onSuccess: (result) => {
      if (result?.status === 200 || result?.status === 201) {
        toast.success("Category updated successfully!");
        // Invalidate categories queries to refetch the list
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        queryClient.invalidateQueries({ queryKey: ["category", categoryId] });
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error("Failed to update category. Please try again.");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while updating the category.");
      console.error("Error updating category:", error);
    },
  });

  const onSubmit = async (data) => {
    updateCategoryMutation.mutate(data);
  };

  if (categoryLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (categoryError || !category) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg font-semibold">
            Failed to load category data
          </p>
          {onCancel && (
            <button
              onClick={onCancel}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Go back
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <fieldset disabled={isSubmitting || updateCategoryMutation.isPending}>
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-gray-700 font-semibold text-sm"
            >
              Category Name
            </label>
            <input
              {...register("name")}
              className={`${
                errors?.name?.message
                  ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              } w-full py-3 px-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder-gray-400`}
              type="text"
              name="name"
              id="name"
              placeholder="Enter category name"
            />
            {errors?.name?.message && (
              <p className="text-red-600 text-sm font-medium mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Image Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="image"
              className="text-gray-700 font-semibold text-sm"
            >
              Category Image URL
            </label>
            <input
              {...register("image")}
              className={`${
                errors?.image?.message
                  ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              } w-full py-3 px-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder-gray-400`}
              type="url"
              name="image"
              id="image"
              placeholder="Enter image URL"
            />
            {errors?.image?.message && (
              <p className="text-red-600 text-sm font-medium mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl py-3.5 px-6 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-3.5 px-6 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              type="submit"
            >
              {isSubmitting || updateCategoryMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating Category...
                </span>
              ) : (
                "Update Category"
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default EditCategoryForm;
