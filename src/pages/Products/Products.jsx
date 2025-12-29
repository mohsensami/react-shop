import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import getProductById from "../../utils/apis/products/getProductById";
import getRelatedProducts from "../../utils/apis/products/getRelatedProductsApi";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
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

  const {
    isPending: isRelatedPending,
    error: relatedError,
    data: relatedData,
  } = useQuery({
    queryKey: ["relatedProducts", id],
    queryFn: () => getRelatedProducts(id),
    enabled: !!id && !!data?.data,
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isPending && <ProductSkeleton />}
          {error && <ErrorOnFetchApi />}
          {data && (
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-12">
                  {/* Product Images Section */}
                  <div className="flex flex-col gap-6">
                    <div className="relative group overflow-hidden rounded-2xl bg-gray-100 aspect-square">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={
                          Array.isArray(data?.data?.images)
                            ? data.data.images[activeImageIndex]
                            : data?.data?.images
                        }
                        alt={data?.data?.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      {Array.isArray(data?.data?.images) &&
                        data.data.images.map((image, index) => (
                          <button
                            onClick={() => setActiveImageIndex(index)}
                            key={index}
                            className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                              index === activeImageIndex
                                ? "ring-4 ring-blue-500 shadow-xl scale-105"
                                : "ring-2 ring-gray-200 hover:ring-blue-300 hover:scale-105"
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${data?.data?.title} - ${index + 1}`}
                              className="w-20 h-20 object-cover"
                            />
                            {index === activeImageIndex && (
                              <div className="absolute inset-0 bg-blue-500/20" />
                            )}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="flex flex-col gap-6 justify-center">
                    <div>
                      <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {data?.data?.title}
                      </h1>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                          ${data?.data?.price}
                        </span>
                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                          <svg
                            className="w-5 h-5 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <span className="text-sm font-semibold text-gray-700">
                            4.8
                          </span>
                          <span className="text-xs text-gray-500 ml-1">
                            (124 reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg">
                      {data?.data?.description}
                    </p>

                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-semibold text-lg">
                          Quantity:
                        </span>
                        <div className="flex items-center bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
                          <button
                            onClick={handleDecrement}
                            className="px-5 py-3 text-xl font-semibold text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200 active:scale-95"
                          >
                            −
                          </button>
                          <span className="px-6 py-3 text-xl font-bold text-gray-900 border-x-2 border-gray-200 min-w-[60px] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={handleIncrement}
                            className="px-5 py-3 text-xl font-semibold text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200 active:scale-95"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        Add to Cart
                      </button>
                      <button className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        Wishlist
                      </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">
                          Free Shipping
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">
                          Secure Payment
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <svg
                            className="w-5 h-5 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">
                          30-Day Returns
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 p-2 rounded-lg">
                          <svg
                            className="w-5 h-5 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">
                          Fast Delivery
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Related Products Carousel */}
          {data?.data && (
            <div className="max-w-7xl mx-auto mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Related Products
              </h2>
              {isRelatedPending && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl shadow-md animate-pulse"
                    >
                      <div className="aspect-square bg-gray-200 rounded-t-2xl" />
                      <div className="p-5 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-6 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {relatedError && (
                <div className="text-center py-8 text-gray-500">
                  Failed to load related products
                </div>
              )}
              {relatedData?.data && relatedData.data.length > 0 && (
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={24}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                  className="related-products-swiper"
                >
                  {relatedData.data.map((product) => (
                    <SwiperSlide key={product?.id}>
                      <Link
                        to={`/products/${product?.id}`}
                        className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 transform hover:-translate-y-2 block"
                      >
                        {/* Image Container */}
                        <div className="relative overflow-hidden bg-gray-100 aspect-square">
                          <img
                            src={
                              Array.isArray(product?.images)
                                ? product.images[0]?.replace(
                                    /^["[]+|["\]]/g,
                                    ""
                                  ) || product.images[0]
                                : product?.images
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
                              <svg
                                className="w-5 h-5 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                              <span className="text-sm text-gray-600 ml-1">
                                4.5
                              </span>
                            </div>
                          </div>
                          {/* Add to cart button on hover */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product, 1);
                            }}
                            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              {relatedData?.data && relatedData.data.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No related products found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
