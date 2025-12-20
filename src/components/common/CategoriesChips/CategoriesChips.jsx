import React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { useQuery } from "@tanstack/react-query";
import getCategoriesApi from "../../../utils/apis/categories/getCategoriesApi";
import CategoriesChipsSkeleton from "../../skeleton/CategoriesChipsSkeleton";
import ErrorOnFetchApi from "../ErrorOnFetchApi";
import { Link } from "react-router-dom";

const CategoriesChips = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesApi(),
  });

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Shop by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {isPending && <CategoriesChipsSkeleton />}
          {error && <ErrorOnFetchApi />}
          {data &&
            data?.data.map((category) => (
              <Link
                to={`/categories/${category?.id}`}
                key={category?.id}
                className="group"
              >
                <div className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-400 transform hover:-translate-y-1 cursor-pointer min-w-[140px] sm:min-w-[160px]">
                  <div className="p-4 flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                      <Avatar
                        sx={{
                          width: "5rem !important",
                          height: "5rem !important",
                          border: "3px solid #e5e7eb",
                          transition: "all 0.3s",
                        }}
                        className="group-hover:border-blue-400 group-hover:scale-110"
                        alt={`${category?.name} image`}
                        src={category?.image}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-200 text-center">
                      {category?.name}
                    </span>
                  </div>
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesChips;
