import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getProductById from "../../utils/apis/products/getProductById";
import Header from "../../components/common/Header";
import ProductSkeleton from "../../components/skeleton/ProductSkeleton/ProductSkeleton";
import ErrorOnFetchApi from "../../components/common/ErrorOnFetchApi";
import useCartStore from "../../store/useCartStore";

const Products = () => {
  const { id } = useParams() || "";
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { isPending, error, data } = useQuery({
    queryKey: ["productById", id],
    queryFn: () => getProductById(id),
  });

  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!data?.data) return;

    addToCart(data.data, quantity);
    console.log("Cart Items:", cartItems);
  };

  useEffect(() => {
    console.log("Cart updated:", cartItems);
  }, [cartItems]);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {isPending && <ProductSkeleton />}
        {error && <ErrorOnFetchApi />}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images Section */}
            <div className="flex flex-col gap-4">
              <img
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                src={
                  Array.isArray(data?.data?.images)
                    ? data.data.images[activeImageIndex]
                    : data?.data?.images
                }
                alt={data?.data?.title}
              />
              <div className="flex gap-2 flex-wrap">
                {Array.isArray(data?.data?.images) &&
                  data.data.images.map((image, index) => (
                    <img
                      onClick={() => setActiveImageIndex(index)}
                      key={index}
                      src={image}
                      alt={`${data?.data?.title} - ${index + 1}`}
                      className={`w-[80px] h-[80px] object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                        index === activeImageIndex
                          ? "border-2 border-blue-500 shadow-lg"
                          : "border-2 border-transparent hover:border-blue-300"
                      }`}
                    />
                  ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl font-bold text-gray-800">
                {data?.data?.title}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold text-blue-600">
                  ${data?.data?.price}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {data?.data?.description}
              </p>

              <div className="border-t border-b border-gray-200 py-6 my-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={handleDecrement}
                      className="px-4 py-2 text-lg hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-lg font-medium border-x">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="px-4 py-2 text-lg hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
