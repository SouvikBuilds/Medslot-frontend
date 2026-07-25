import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button.jsx";

const AdminLogin = () => {
  const [admin, setAdmin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
    } catch (error) {}
  };

  const handleSwitch = () => {
    setAdmin((prev) => !prev);
  };
  return (
    <form
      className="min-h-[80vh] flex items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {admin ? (
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-95 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto">
            <span className="text-[#5F6FFF]">Admin</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              {...register("password", {
                required: [true, "password is required"],
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
              className={
                "bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base"
              }
            />
          </div>
          <p>
            Doctor Login?{" "}
            <span
              className="text-[#5F6FFF] underline cursor-pointer"
              onClick={handleSwitch}
            >
              Click here
            </span>
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-95 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto">
            <span className="text-[#5F6FFF]">Doctor</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              {...register("password", {
                required: [true, "password is required"],
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
              className={
                "bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base"
              }
            />
          </div>
          <p>
            Admin Login?{" "}
            <span
              className="text-[#5F6FFF] underline cursor-pointer"
              onClick={handleSwitch}
            >
              Click here
            </span>
          </p>
        </div>
      )}
    </form>
  );
};

export default AdminLogin;
