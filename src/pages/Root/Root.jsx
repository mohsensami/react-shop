import React from "react";
import Header from "../../components/common/Header/Header";
import CategoriesChips from "../../components/common/CategoriesChips";
import ProductsGridWithPagination from "../../components/common/ProductsGridWithPagination";
import Carousel from "../../components/common/Carousel";
import Footer from "../../components/common/Footer/Footer";

const Root = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <Header />
      <CategoriesChips />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12">
        <Carousel />
      </div>
      <ProductsGridWithPagination />
      <Footer />
    </div>
  );
};

export default Root;
