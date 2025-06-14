import React from "react";
import Header from "../../components/common/Header/Header";
import CategoriesChips from "../../components/common/CategoriesChips";
import ProductsGridWithPagination from "../../components/common/ProductsGridWithPagination";
import Carousel from "../../components/common/Carousel";

const Root = () => {
  return (
    <div>
      <Header />
      <CategoriesChips />
      <Carousel />

      <ProductsGridWithPagination />
    </div>
  );
};

export default Root;
