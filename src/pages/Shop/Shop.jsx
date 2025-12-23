import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer/Footer";
import ProductsGridWithPagination from "../../components/common/ProductsGridWithPagination";

const Shop = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Our Shop
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our amazing collection of products. Find everything you
            need in one place.
          </p>
        </div>
        <ProductsGridWithPagination />
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
