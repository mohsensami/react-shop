import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import updateProductApi from "../../../utils/apis/products/updateProductApi";
import getCategoriesApi from "../../../utils/apis/categories/getCategoriesApi";
import getProductById from "../../../utils/apis/products/getProductById";

const productSchema = z.object({
  title: z.string().min(1, "Title cannot be empty!"),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than 0"),
  description: z.string().min(1, "Description cannot be empty!"),
  categoryId: z
    .number({
      required_error: "Category is required",
      invalid_type_error: "Please select a category",
    })
    .int("Category ID must be an integer")
    .positive("Please select a valid category"),
  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .min(1, "At least one image URL is required"),
});

const EditProductForm = ({ productId, onSuccess, onCancel }) => {
  const queryClient = useQueryClient();

  // Fetch product data for editing
  const {
    data: productData,
    isPending: productLoading,
    error: productError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

  // Fetch categories for the dropdown
  const { data: categoriesData, isPending: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesApi(),
  });

  const product = productData?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [""],
    },
  });

  const images = watch("images");

  // Populate form with product data when loaded
  useEffect(() => {
    if (product) {
      const productImages =
        Array.isArray(product.images) && product.images.length > 0
          ? product.images
          : typeof product.images === "string"
          ? [product.images]
          : [""];

      reset({
        title: product.title || "",
        price: product.price || 0,
        description: product.description || "",
        categoryId: product.category?.id || product.categoryId || "",
        images: productImages.length > 0 ? productImages : [""],
      });
    }
  }, [product, reset]);

  // Mutation for updating product
  const updateProductMutation = useMutation({
    mutationFn: (data) => updateProductApi(productId, data),
    onSuccess: (result) => {
      if (result?.status === 200 || result?.status === 201) {
        toast.success("Product updated successfully!");
        // Invalidate products queries to refetch the list
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["product", productId] });
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error("Failed to update product. Please try again.");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while updating the product.");
      console.error("Error updating product:", error);
    },
  });

  const handleAddImageField = () => {
    setValue("images", [...images, ""]);
  };

  const handleRemoveImageField = (index) => {
    if (images.length > 1) {
      const newImages = images.filter((_, i) => i !== index);
      setValue("images", newImages);
    }
  };

  const onSubmit = async (data) => {
    // Filter out empty image strings
    const filteredImages = data.images.filter((img) => img.trim() !== "");

    if (filteredImages.length === 0) {
      toast.error("At least one image URL is required");
      return;
    }

    const productData = {
      ...data,
      images: filteredImages,
    };

    updateProductMutation.mutate(productData);
  };

  if (productLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg font-semibold">
            Failed to load product data
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <fieldset disabled={isSubmitting || updateProductMutation.isPending}>
          {/* Title Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-gray-700 font-semibold text-sm"
            >
              Product Title
            </label>
            <input
              {...register("title")}
              className={`${
                errors?.title?.message
                  ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              } w-full py-3 px-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder-gray-400`}
              type="text"
              name="title"
              id="title"
              placeholder="Enter product title"
            />
            {errors?.title?.message && (
              <p className="text-red-600 text-sm font-medium mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Price Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="price"
              className="text-gray-700 font-semibold text-sm"
            >
              Price
            </label>
            <input
              {...register("price", { valueAsNumber: true })}
              className={`${
                errors?.price?.message
                  ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              } w-full py-3 px-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder-gray-400`}
              type="number"
              step="0.01"
              name="price"
              id="price"
              placeholder="Enter product price"
            />
            {errors?.price?.message && (
              <p className="text-red-600 text-sm font-medium mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-gray-700 font-semibold text-sm"
            >
              Description
            </label>
            <textarea
              {...register("description")}
              className={`${
                errors?.description?.message
                  ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              } w-full py-3 px-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder-gray-400 min-h-[100px] resize-y`}
              name="description"
              id="description"
              placeholder="Enter product description"
              rows="4"
            />
            {errors?.description?.message && (
              <p className="text-red-600 text-sm font-medium mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="categoryId"
              className="text-gray-700 font-semibold text-sm"
            >
              Category
            </label>
            <select
              {...register("categoryId", { valueAsNumber: true })}
              className={`${
                errors?.categoryId?.message
                  ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              } w-full py-3 px-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 bg-white`}
              name="categoryId"
              id="categoryId"
              disabled={categoriesLoading}
            >
              <option value="">Select a category</option>
              {categoriesData?.data?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors?.categoryId?.message && (
              <p className="text-red-600 text-sm font-medium mt-1">
                {errors.categoryId.message}
              </p>
            )}
            {categoriesLoading && (
              <p className="text-gray-500 text-sm mt-1">
                Loading categories...
              </p>
            )}
          </div>

          {/* Images Field */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold text-sm">
              Product Images (URLs)
            </label>
            {images.map((_, index) => (
              <div key={index} className="flex gap-2">
                <input
                  {...register(`images.${index}`)}
                  className={`${
                    errors?.images?.[index]?.message
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                  } flex-1 py-3 px-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder-gray-400`}
                  type="url"
                  placeholder={`Image URL ${index + 1}`}
                />
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImageField(index)}
                    className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-200 font-semibold"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {errors?.images && typeof errors.images.message === "string" && (
              <p className="text-red-600 text-sm font-medium mt-1">
                {errors.images.message}
              </p>
            )}
            <button
              type="button"
              onClick={handleAddImageField}
              className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-all duration-200 font-semibold text-sm"
            >
              + Add Another Image
            </button>
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
              {isSubmitting || updateProductMutation.isPending ? (
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
                  Updating Product...
                </span>
              ) : (
                "Update Product"
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default EditProductForm;
