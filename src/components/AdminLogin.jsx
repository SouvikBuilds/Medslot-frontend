import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { adminLogin, loginDoctor } from "../api/api.js";
import AdminContext from "../context/Admin/adminContext.js";
import DoctorContext from "../context/Doctor/doctorContext.js";
import { assets } from "../assets/assets_frontend/assets.js";

const AdminLogin = () => {
  const [mode, setMode] = useState("admin"); // "admin" | "doctor"
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAdmin, setAdminAuthenticated } = useContext(AdminContext);
  const { setDoctor, setDoctorAuthenticated } = useContext(DoctorContext);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    setError("");
    try {
      if (mode === "admin") {
        const res = await adminLogin(data);
        setAdmin(res.data.data.user);
        setAdminAuthenticated(true);
        navigate("/admin-dashboard");
      } else {
        const res = await loginDoctor(data);
        setDoctor(res.data.data.loggedInDoctor);
        setDoctorAuthenticated(true);
        navigate("/doctor-dashboard");
      }
      reset();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 m-auto items-start p-8 w-full max-w-sm border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white"
      >
        <div className="w-full flex justify-center mb-2">
          <img src={assets.logo} alt="logo" className="w-36" />
        </div>

        <p className="text-2xl font-semibold w-full text-center">
          <span className="text-[#5F6FFF]">{mode === "admin" ? "Admin" : "Doctor"}</span> Login
        </p>

        {error && (
          <p className="w-full text-center text-red-500 text-xs bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-[#5F6FFF] transition-all"
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-[#5F6FFF] transition-all"
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#5F6FFF] text-white w-full py-2.5 rounded-md text-base flex items-center justify-center gap-2 cursor-pointer hover:bg-[#4f5ee8] transition-all disabled:opacity-60"
        >
          {isSubmitting && <LoaderCircle className="w-4 h-4 animate-spin" />}
          Login
        </button>

        <p className="w-full text-center">
          {mode === "admin" ? "Doctor Login?" : "Admin Login?"}{" "}
          <span
            className="text-[#5F6FFF] underline cursor-pointer"
            onClick={() => { setMode(mode === "admin" ? "doctor" : "admin"); setError(""); reset(); }}
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
