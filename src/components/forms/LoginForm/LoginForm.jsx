import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import loginApi from "../../../utils/apis/auth/loginApi";
import { toast } from "react-toastify";
import { setCookie } from "../../../utils/helpers/cookie";
import useStore from "../../../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().min(1, "it cant be empty!").email("enter a valid email"),
  password: z.string().min(1, "it cant be empty!"),
});

const LoginForm = () => {
  const { setState, access_token } = useStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (access_token != null && access_token != undefined) {
      toast.warn("you are already logged in!");
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (data) => {
    const result = await loginApi(data);
    if (result?.status == 200 || result?.status == 201) {
      const access_token = result?.data?.access_token;
      const refresh_token = result?.data?.refresh_token;

      await setCookie("credential", {
        access_token: access_token,
        refresh_token: refresh_token,
      });
      setState({ access_token: access_token, refresh_token: refresh_token });

      toast.success("logged in successfully , redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else toast.error("invalid username password!");
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => await handleLogin(data))}
      className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
    >
      <fieldset disabled={isSubmitting} className="flex flex-col gap-6">
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
              Logging in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        <div className="text-center pt-2">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 underline-offset-2 transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </fieldset>
    </form>
  );
};

export default LoginForm;
