import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import loginApi from "../../../utils/apis/auth/loginApi";
import { toast } from "react-toastify";
import { setCookie } from "../../../utils/helpers/cookie";
import useStore from "../../../store";
import { useNavigate } from "react-router-dom";
import createUserApi from "../../../utils/apis/users/createUserApi";
import { Link } from "react-router-dom";

const signupSchema = z
  .object({
    name: z.string().min(4, "at least 4 character"),
    email: z.string().min(1, "it cant be empty!").email("enter a valid email"),
    password: z.string().min(4, "at least 4 character"),
    avatar: z.string(),
    gender: z.string(),
  })
  .refine(
    (data) =>
      (data.avatar = `https://avatar.iran.liara.run/public/${data.gender}`)
  );

const SignupForm = () => {
  const navigate = useNavigate();
  const { access_token } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (access_token != null && access_token != undefined) {
      toast.warn("you are already logged in!");
      navigate("/dashboard");
    }
  }, []);

  const handleSignup = async (data) => {
    const result = await createUserApi(data);
    if (result?.status == 200 || result?.status == 201) {
      toast.success("register successfully , redirecting to login ...");
      setTimeout(() => navigate("/login"), 1000);
    } else toast.error("something goes wrong , try again later");
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => await handleSignup(data))}
      className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
    >
      <fieldset disabled={isSubmitting} className="flex flex-col gap-6">
        <input type="hidden" name="avatar" {...register("avatar")} />

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-700 font-semibold text-sm">
            Full Name
          </label>
          <input
            {...register("name")}
            className={`${
              errors?.name?.message
                ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
            } w-full py-3 px-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder-gray-400`}
            type="text"
            name="name"
            id="name"
            placeholder="Enter your full name"
          />
          {errors?.name?.message && (
            <p className="text-red-600 text-sm font-medium mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-gray-700 font-semibold text-sm"
          >
            Email Address
          </label>
          <input
            {...register("email")}
            className={`${
              errors?.email?.message
                ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
            } w-full py-3 px-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder-gray-400`}
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
          {errors?.email?.message && (
            <p className="text-red-600 text-sm font-medium mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-gray-700 font-semibold text-sm"
          >
            Password
          </label>
          <input
            {...register("password")}
            className={`${
              errors?.password?.message
                ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
            } w-full py-3 px-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 text-gray-900 placeholder-gray-400`}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
          {errors?.password?.message && (
            <p className="text-red-600 text-sm font-medium mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-gray-700 font-semibold text-sm">Gender</label>
          <div className="flex gap-6">
            <label
              htmlFor="male"
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                {...register("gender")}
                type="radio"
                defaultChecked
                value="boy"
                name="gender"
                id="male"
                className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors duration-200 font-medium">
                Male
              </span>
            </label>
            <label
              htmlFor="female"
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                {...register("gender")}
                type="radio"
                value="girl"
                name="gender"
                id="female"
                className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors duration-200 font-medium">
                Female
              </span>
            </label>
          </div>
        </div>

        <button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-3.5 px-6 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          type="submit"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="text-center pt-2">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 underline-offset-2 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </fieldset>
    </form>
  );
};

export default SignupForm;
