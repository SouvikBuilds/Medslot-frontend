import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoaderCircle, Upload } from "lucide-react";
import { registerDoctor } from "../../api/api.js";

const specialities = [
  "General Physician", "Gynecologist", "Dermatologist",
  "Pediatricians", "Neurologist", "Gastroenterologist",
];

const degrees = ["MBBS", "MD", "MS", "DM", "MCh", "BDS", "MDS", "BAMS", "BHMS", "BUMS", "DNB"];

const AddDoctor = () => {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { speciality: "General Physician", degree: "MBBS", experience: "1" },
  });

  const onSubmit = async (data) => {
    setError(""); setSuccess("");
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => formData.append(k, v));
      if (imageFile) formData.append("image", imageFile);
      await registerDoctor(formData);
      setSuccess("Doctor added successfully!");
      reset();
      setPreview(null);
      setImageFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add doctor");
    }
  };

  return (
    <div>
      <p className="text-xl font-semibold text-gray-700 mb-5">Add Doctor</p>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border rounded-xl p-6 sm:p-8">
        {success && <p className="mb-4 text-green-600 bg-green-50 border border-green-200 rounded px-4 py-2 text-sm">{success}</p>}
        {error && <p className="mb-4 text-red-500 bg-red-50 border border-red-200 rounded px-4 py-2 text-sm">{error}</p>}

        {/* Image upload */}
        <div className="flex items-center gap-4 mb-8 cursor-pointer" onClick={() => document.getElementById("doc-img").click()}>
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
            {preview ? (
              <img src={preview} alt="" className="w-full h-full object-cover" />
            ) : (
              <Upload className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <p className="text-sm text-gray-500">Upload doctor picture</p>
          <input
            id="doc-img"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) { setImageFile(file); setPreview(URL.createObjectURL(file)); }
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm text-gray-600">Your name</label>
            <input className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-[#5F6FFF]" placeholder="Name" {...register("name", { required: "Name is required" })} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-600">Speciality</label>
            <select className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-[#5F6FFF]" {...register("speciality")}>
              {specialities.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Doctor Email</label>
            <input className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-[#5F6FFF]" type="email" placeholder="Email" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-600">Degree</label>
            <select className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-[#5F6FFF]" {...register("degree")}>
              {degrees.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Set Password</label>
            <input className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-[#5F6FFF]" type="password" placeholder="Password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })} />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-600">Address</label>
            <input className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-[#5F6FFF]" placeholder="Address 1" {...register("address", { required: "Address is required" })} />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-600">Experience</label>
            <select className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-[#5F6FFF]" {...register("experience")}>
              {[1,2,3,4,5,6,7,8,9,10].map((y) => <option key={y} value={y}>{y} Year{y > 1 ? "s" : ""}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Fees</label>
            <input className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-[#5F6FFF]" type="number" placeholder="Doctor fees" {...register("fees", { required: "Fees is required" })} />
            {errors.fees && <p className="text-red-500 text-xs mt-1">{errors.fees.message}</p>}
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm text-gray-600">About Doctor</label>
          <textarea className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none focus:border-[#5F6FFF] resize-none" rows={4} placeholder="Write about doctor" {...register("about", { required: "About is required" })} />
          {errors.about && <p className="text-red-500 text-xs mt-1">{errors.about.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 bg-[#5F6FFF] text-white px-10 py-3 rounded-full flex items-center gap-2 cursor-pointer hover:bg-[#4f5ee8] transition-all disabled:opacity-60"
        >
          {isSubmitting && <LoaderCircle className="w-4 h-4 animate-spin" />}
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
