import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../../store";
import getUserInfoWithTokenApi from "../../utils/apis/users/getUserInfoWithTokenApi";
import { useQuery } from "@tanstack/react-query";
import DashboardSkeleton from "../../components/skeleton/DashboardSkeleton";
import ErrorOnFetchApi from "../../components/common/ErrorOnFetchApi";
import PersonIcon from "@mui/icons-material/Person";
import Header from "../../components/common/Header";
import { Card, CardContent } from "@mui/material";
import ProfileView from "./ProfileView";
import ProductsView from "./ProductsView";
import CategoriesView from "./CategoriesView";
import SidebarNav from "./SidebarNav";
import MobileSidebar from "./MobileSidebar";

const Dashboard = () => {
  const { access_token } = useStore();
  const [activeView, setActiveView] = useState("profile");

  const { isPending, error, data } = useQuery({
    queryKey: ["userIno"],
    queryFn: () => getUserInfoWithTokenApi(),
    enabled: access_token != null && access_token != undefined,
  });

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-gray-50">
      <Header />
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 gap-6">
        {access_token != null && access_token != undefined ? (
          <>
            {isPending && <DashboardSkeleton />}
            {error && <ErrorOnFetchApi />}
            {data && (
              <>
                {/* Sidebar */}
                <SidebarNav
                  activeView={activeView}
                  onViewChange={handleViewChange}
                />

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  {activeView === "profile" && (
                    <ProfileView userData={data?.data} />
                  )}

                  {activeView === "products" && <ProductsView />}

                  {activeView === "categories" && <CategoriesView />}
                </div>

                {/* Mobile Sidebar */}
                <MobileSidebar
                  activeView={activeView}
                  onViewChange={handleViewChange}
                />
              </>
            )}
          </>
        ) : (
          <Card
            className="shadow-xl border-0 text-center"
            sx={{ borderRadius: "20px" }}
          >
            <CardContent className="p-12">
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PersonIcon className="text-gray-400 text-5xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Access Restricted
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Only logged in users can access the dashboard
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span>Go to Login</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
