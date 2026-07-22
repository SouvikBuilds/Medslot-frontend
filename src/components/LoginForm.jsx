import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button.jsx";

const LoginForm = () => {
  const [login, setLogin] = useState(false);
  const {
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const password = watch("password");
  const onSubmit = async () => {};

  const handleSwitch = () => {
    setLogin((prev) => !prev);
  };
  return (
    <form className="min-h-[80vh] flex items-center">
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
            {errors.passwords && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="w-full" onClick={handleSubmit(onSubmit)}>
            <Button
              title={"Login"}
              className={`bg-blue-600 cursor-pointer active:bg-blue-800 transition-all duration-300 ease-in-out text-white w-full py-2 my-2 rounded-md text-base`}
            />
          </div>

          <p>
            Create an new account?{" "}
            <span
              onClick={handleSwitch}
              class="text-blue-600 underline cursor-pointer"
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
              type="email"
              placeholder="full name"
              {...register("name", {
                required: "Full Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            {errors.email && (
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

          <div className="w-full" onClick={handleSubmit(onSubmit)}>
            <Button
              title={"Login"}
              className={`bg-blue-600 cursor-pointer active:bg-blue-800 transition-all duration-300 ease-in-out text-white w-full py-2 my-2 rounded-md text-base`}
            />
          </div>

          <p>
            Already have an new account?{" "}
            <span
              onClick={handleSwitch}
              class="text-blue-600 underline cursor-pointer"
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
