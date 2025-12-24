import React from "react";
import SignupForm from "../../components/forms/SignupForm";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-xl text-gray-600">
              Join us today and start shopping
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
