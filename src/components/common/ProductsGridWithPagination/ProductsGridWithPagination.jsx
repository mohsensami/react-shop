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
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap gap-4 px-8 items-center justify-center my-8">
        {isPending &&
          Array.from("123456").map((i) => <ProductGridSkeleton key={i} />)}
        {error && <ErrorOnFetchApi />}
        {data &&
          products.map((product) => (
            <Link
              to={`/products/${product?.id}`}
              key={product?.id}
              className="rounded-xl flex flex-col shadow-lg gap-4 items-center justify-center pb-4 w-5/12 lg:w-3/12"
            >
              <img
                src={
                  product?.images[0]?.replace(/^["[]+|["\]]/g, "") ||
                  product?.images[0]
                }
                className="rounded-t-xl h-[15rem]"
                alt={product?.title}
              />
              <p>{product?.title}</p>
              <p>{product?.price}$</p>
            </Link>
          ))}
      </div>
      {data && totalPages > 1 && (
        <div className="my-8">
          <Pagination
            onChange={(event, value) => {
              setCurrentPage(value);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            size="large"
            count={totalPages}
            page={currentPage}
            boundaryCount={2}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsGridWithPagination;
