import { useEffect, useState } from "react";
import { getAllAdminDoctors, deleteDoctor } from "../../api/api.js";
import { LoaderCircle, Trash2 } from "lucide-react";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const res = await getAllAdminDoctors();
      setDoctors(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this doctor?")) return;
    try {
      await deleteDoctor(id);
      fetchDoctors();
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
    <div>
      <p className="text-xl font-semibold text-gray-700 mb-5">All Doctors</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {doctors.map((doc) => (
          <div key={doc._id} className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition-all group">
            <div className="bg-[#EAEFFF] h-48 overflow-hidden">
              <img
                src={doc.image || `https://ui-avatars.com/api/?name=${doc.name}&background=EEF2FF&color=5F6FFF&size=200`}
                alt={doc.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-4">
              <p className="font-medium text-gray-800">{doc.name}</p>
              <p className="text-sm text-gray-500 mb-3">{doc.speciality}</p>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={doc.available}
                    readOnly
                    className="accent-[#5F6FFF]"
                  />
                  <span className={doc.available ? "text-green-600" : "text-gray-400"}>
                    {doc.available ? "Available" : "Unavailable"}
                  </span>
                </label>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-red-50 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <p className="text-center text-gray-400 py-20">No doctors found</p>
      )}
    </div>
  );
};

export default DoctorsList;
