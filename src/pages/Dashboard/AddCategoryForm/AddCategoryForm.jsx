import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import createCategoryApi from "../../../utils/apis/categories/createCategoryApi";

const categorySchema = z.object({
  name: z.string().min(1, "Category name cannot be empty!"),
  image: z.string().url("Image must be a valid URL"),
});

const AddCategoryForm = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  // Mutation for creating category
  const createCategoryMutation = useMutation({
    mutationFn: (data) => createCategoryApi(data),
    onSuccess: (result) => {
      if (result?.status === 200 || result?.status === 201) {
        toast.success("Category created successfully!");
        reset();
        // Invalidate categories queries to refetch the list
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error("Failed to create category. Please try again.");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while creating the category.");
      console.error("Error creating category:", error);
    },
  });

  const onSubmit = async (data) => {
    createCategoryMutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Add New Category
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <fieldset disabled={isSubmitting || createCategoryMutation.isPending}>
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

          {/* Submit Button */}
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-3.5 px-6 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            type="submit"
          >
            {isSubmitting || createCategoryMutation.isPending ? (
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
                Creating Category...
              </span>
            ) : (
              "Create Category"
            )}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddCategoryForm;
