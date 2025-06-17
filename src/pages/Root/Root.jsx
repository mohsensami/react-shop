import React from "react";
import Header from "../../components/common/Header/Header";
import CategoriesChips from "../../components/common/CategoriesChips";
import ProductsGridWithPagination from "../../components/common/ProductsGridWithPagination";
import Carousel from "../../components/common/Carousel";
import Footer from "../../components/common/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Header />
      <CategoriesChips />
      <div className="mt-4">
        <Carousel />
      </div>

      <ProductsGridWithPagination />
      <Footer />
    </div>
  );
};

export default Root;
