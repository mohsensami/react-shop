import React from "react";
import Header from "../../components/common/Header/Header";
import CategoriesChips from "../../components/common/CategoriesChips";
import ProductsGridWithPagination from "../../components/common/ProductsGridWithPagination";

const Root = () => {
  return (
    <div>
      <Header />
      <CategoriesChips />
      <ProductsGridWithPagination />
    </div>
  );
};

export default Root;
