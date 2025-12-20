import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductGridSkeleton from "../../skeleton/ProductGridSkeleton";
import ErrorOnFetchApi from "../ErrorOnFetchApi";
import { Link } from "react-router-dom";
import getProductsApi from "../../../utils/apis/products/getProductsApi";
import Pagination from "@mui/material/Pagination";

const ProductsGridWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  const { isPending, error, data } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => {
      const offset = (currentPage - 1) * limit;
      return getProductsApi(offset, limit);
    },
  });

  // Get products array - handle both response structures
  const products = data?.data?.products || data?.data || [];

  // Calculate total pages
  // If API provides total, use it; otherwise estimate based on current page and items received
  const totalItems = data?.data?.total;
  let totalPages = 1;

  if (totalItems) {
    totalPages = Math.ceil(totalItems / limit);
  } else {
    // If we got a full page, assume there might be more
    // Show at least current page + 1 if we got limit items
    if (products.length === limit) {
      totalPages = currentPage + 1;
    } else if (products.length > 0) {
      totalPages = currentPage;
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isPending &&
            Array.from("123456").map((i) => <ProductGridSkeleton key={i} />)}
          {error && <ErrorOnFetchApi />}
          {data &&
            products.map((product) => (
              <Link
                to={`/products/${product?.id}`}
                key={product?.id}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={
                      product?.images[0]?.replace(/^["[]+|["\]]/g, "") ||
                      product?.images[0]
                    }
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={product?.title}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Quick view badge */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {product?.title}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product?.price}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-sm text-gray-600 ml-1">4.5</span>
                    </div>
                  </div>
                  {/* Add to cart button on hover */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // You can add quick add to cart functionality here
                    }}
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
      {data && totalPages > 1 && (
        <div className="my-12 flex justify-center">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <Pagination
              onChange={(event, value) => {
                setCurrentPage(value);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              size="large"
              count={totalPages}
              page={currentPage}
              boundaryCount={2}
              sx={{
                "& .MuiPaginationItem-root": {
                  "&.Mui-selected": {
                    backgroundColor: "#2563eb",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#1d4ed8",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsGridWithPagination;
