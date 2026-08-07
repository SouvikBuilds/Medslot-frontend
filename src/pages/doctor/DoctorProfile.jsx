import { useContext, useEffect, useState } from "react";
import { LoaderCircle, Upload, CheckCircle } from "lucide-react";
import DoctorContext from "../../context/Doctor/doctorContext.js";
import { getCurrentDoctor, updateDoctorProfile, updateDoctorAvailability, updateDoctorProfileImage } from "../../api/api.js";

const DoctorProfile = () => {
  const { doctor, setDoctor } = useContext(DoctorContext);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(!doctor);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ experience: "", about: "", fees: "", address: "", available: true });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await getCurrentDoctor();
        setDoctor(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (!doctor) fetchDoctor();
  }, []);

  useEffect(() => {
    if (doctor) {
      setForm({
        experience: doctor.experience ?? "",
        about: doctor.about ?? "",
        fees: doctor.fees ?? "",
        address: doctor.address ?? "",
        available: doctor.available ?? true,
      });
    }
  }, [doctor]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateDoctorProfile({ experience: form.experience, bio: form.about, fees: form.fees, address: form.address });
      await updateDoctorAvailability({ available: form.available });
      setDoctor({ ...doctor, ...res.data.data, available: form.available });
      setEdit(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await updateDoctorProfileImage(fd);
      setDoctor({ ...doctor, image: res.data.data.image });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoaderCircle className="animate-spin w-8 h-8 text-[#5F6FFF]" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {success && (
        <div className="fixed top-5 right-5 flex items-center gap-2 bg-white border border-green-200 shadow-lg rounded-xl px-5 py-3 z-50">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <p className="text-sm font-medium text-gray-700">Profile Updated</p>
          <div className="absolute bottom-0 left-0 h-1 bg-green-500 rounded-b-xl animate-[shrink_3s_linear_forwards] w-full" />
        </div>
      )}

      {/* Profile image */}
      <div className="relative w-full max-w-xs mb-6 cursor-pointer group" onClick={() => document.getElementById("doc-img-upload").click()}>
        <img
          src={doctor?.image || `https://ui-avatars.com/api/?name=${doctor?.name}&background=EEF2FF&color=5F6FFF&size=300`}
          alt={doctor?.name}
          className="w-full rounded-xl object-cover bg-[#EAEFFF]"
        />
        <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <input id="doc-img-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      </div>

      <div className="bg-white border rounded-xl p-6">
        <p className="text-2xl font-semibold text-gray-800">{doctor?.name}</p>
        <p className="text-sm text-gray-500 mt-1">
          {doctor?.degree} - {doctor?.speciality} &nbsp;
          <span className="border border-gray-300 text-xs px-2 py-0.5 rounded-full">{doctor?.experience} Years</span>
        </p>

        <div className="mt-5">
          <p className="text-sm font-medium text-gray-700 mb-1">About :</p>
          {edit ? (
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:border-[#5F6FFF] resize-none"
              rows={4}
              value={form.about}
              onChange={(e) => setForm({ ...form, about: e.target.value })}
            />
          ) : (
            <p className="text-sm text-gray-600">{doctor?.about}</p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-6">
          <div>
            <p className="text-sm font-medium text-gray-700">Appointment fee:</p>
            {edit ? (
              <input
                type="number"
                className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#5F6FFF] mt-1 w-28"
                value={form.fees}
                onChange={(e) => setForm({ ...form, fees: e.target.value })}
              />
            ) : (
              <p className="text-sm text-gray-600 mt-1">$ {doctor?.fees}</p>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Address:</p>
            {edit ? (
              <input
                className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#5F6FFF] mt-1 w-48"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            ) : (
              <p className="text-sm text-gray-600 mt-1">{doctor?.address}</p>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="available"
            checked={form.available}
            onChange={(e) => edit && setForm({ ...form, available: e.target.checked })}
            className="accent-[#5F6FFF] w-4 h-4"
            disabled={!edit}
          />
          <label htmlFor="available" className="text-sm text-gray-700 cursor-pointer">Available</label>
        </div>

        <div className="mt-6">
          {edit ? (
            <button
              onClick={handleSave}
              disabled={saving}
              className="border border-[#5F6FFF] text-[#5F6FFF] px-8 py-2 rounded-full hover:bg-[#5F6FFF] hover:text-white transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {saving && <LoaderCircle className="w-4 h-4 animate-spin" />}
              Save
            </button>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className="border border-gray-300 px-8 py-2 rounded-full hover:border-[#5F6FFF] hover:text-[#5F6FFF] transition-all cursor-pointer"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
