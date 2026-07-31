import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button.jsx";
import { useContext } from "react";
import AuthContext from "../context/Authentication/authContext.js";
import { registerUser, loginUser, requestMagicLink } from "../api/api.js";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const {
    user,
    authenticated,
    loading,
    setUser,
    setAuthenticated,
    setLoading,
  } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const {
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const {
    register: registerMagic,
    handleSubmit: handleMagicSubmit,
    reset: resetMagic,
    formState: { errors: magicErrors },
  } = useForm();

  const password = watch("password");
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (login) {
        const response = await loginUser(data);
        setUser(response.data);
        setAuthenticated(true);
        reset();
        navigate("/");
        location.reload();
      } else {
        const response = await registerUser(data);
        setUser(response.data);
        reset();
        setLogin(true);
      }
    } catch (error) {
      console.log("Error while registering user", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onMagicLinkSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await requestMagicLink({
        email: data.email,
      });

      console.log(response);
      resetMagic();
      location.reload();
    } catch (error) {
      console.log("Error while sending magic link", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = () => {
    setLogin((prev) => !prev);
  };
  return (
    <form
      className="min-h-[80vh] flex items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {login ? (
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold">Login</p>
          <p>Please login to book appointment</p>

          <div className="w-full">
            <label htmlFor="email" className="cursor-pointer">
              Email
            </label>
            <input
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="password" className="cursor-pointer">
              Password
            </label>
            <input
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="w-full">
            <Button
              title={"Login"}
              className={`bg-blue-600 cursor-pointer active:bg-blue-800 transition-all duration-300 ease-in-out text-white w-full py-2 my-2 rounded-md text-base`}
            />
          </div>

          <div className="w-full flex items-center gap-3 my-3">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-2">
            <h1 className="text-xl font-semibold text-gray-700">
              Login with Magic Link
            </h1>

            <p className="text-xs text-gray-500 text-center mb-1">
              We'll send a secure login link to your email.
            </p>

            <input
              type="email"
              className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-blue-500 transition-all duration-300"
              {...registerMagic("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              placeholder="Enter your email"
            />

            {magicErrors.email && (
              <p className="text-red-600 text-xs w-full">
                {magicErrors.email.message}
              </p>
            )}

            <div className="w-full">
              <button
                type="button"
                onClick={handleMagicSubmit(onMagicLinkSubmit)}
                className="bg-blue-600 cursor-pointer active:bg-blue-800 transition-all duration-300 ease-in-out text-white w-full py-2 my-2 rounded-md text-base"
              >
                Send Magic Link
              </button>
            </div>
          </div>

          <p>
            Create an new account?{" "}
            <span
              onClick={handleSwitch}
              className="text-blue-600 underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold">Create account</p>
          <p>Please signup to book appointment</p>

          <div className="w-full">
            <label htmlFor="name" className="cursor-pointer">
              Full Name
            </label>
            <input
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              placeholder="full name"
              {...register("name", {
                required: "Full Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="email" className="cursor-pointer">
              Email
            </label>
            <input
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="password" className="cursor-pointer">
              Password
            </label>
            <input
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="w-full">
            <Button
              title={"Create account"}
              className={`bg-blue-600 cursor-pointer active:bg-blue-800 transition-all duration-300 ease-in-out text-white w-full py-2 my-2 rounded-md text-base`}
            />
          </div>

          <p>
            Already have an new account?{" "}
            <span
              onClick={handleSwitch}
              className="text-blue-600 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
