import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardContent, Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import useStore from "../../../store";
import { removeCookie } from "../../../utils/helpers/cookie";

const ProfileView = ({ userData }) => {
  const navigate = useNavigate();
  const { removeState } = useStore();

  const handleLogout = () => {
    removeCookie("credential");
    removeState();
    toast.warn("logged out successfully , redirecting to login page...");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header Card */}
      <Card
        className="relative overflow-hidden shadow-xl border-0"
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "20px",
        }}
      >
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            {/* Avatar */}
            <div className="relative">
              <Avatar
                src={userData?.avatar}
                alt="Profile"
                sx={{
                  width: { xs: 100, md: 140 },
                  height: { xs: 100, md: 140 },
                  border: "4px solid white",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-lg"></div>
            </div>

            {/* Welcome Text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Welcome back!
              </h1>
              <p className="text-blue-100 text-lg md:text-xl mb-4">
                {userData?.email}
              </p>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white font-medium text-sm">
                  {userData?.role?.toUpperCase() || "USER"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Card */}
        <Card
          className="shadow-lg hover:shadow-xl transition-all duration-300 border-0"
          sx={{ borderRadius: "16px" }}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md">
                <PersonIcon className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Full Name
                </p>
                <p className="text-gray-900 text-xl font-semibold">
                  {userData?.name || "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Card */}
        <Card
          className="shadow-lg hover:shadow-xl transition-all duration-300 border-0"
          sx={{ borderRadius: "16px" }}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-md">
                <EmailIcon className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Email Address
                </p>
                <p className="text-gray-900 text-xl font-semibold break-all">
                  {userData?.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role Card */}
        <Card
          className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 md:col-span-2"
          sx={{ borderRadius: "16px" }}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-md">
                <BadgeIcon className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Account Role
                </p>
                <p className="text-gray-900 text-xl font-semibold">
                  {userData?.role || "User"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleLogout}
          className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
        >
          <span>Logout</span>
          <LogoutIcon className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
