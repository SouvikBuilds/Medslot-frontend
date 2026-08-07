import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDoctors } from "../api/api.js";
import { LoaderCircle } from "lucide-react";

const specialities = [
  "General Physician", "Gynecologist", "Dermatologist",
  "Pediatricians", "Neurologist", "Gastroenterologist",
];

const Doctors = () => {
  const { speciality: paramSpeciality } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(paramSpeciality || "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getAllDoctors();
        setDoctors(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filtered = selectedCategory
    ? doctors.filter((d) => d.speciality === selectedCategory)
    : doctors;

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          onClick={() => setOpen((p) => !p)}
          className={`${open ? "bg-[#5F6FFF] text-white" : ""} py-1 px-3 border cursor-pointer rounded text-sm transition-all sm:hidden`}
        >
          Filters
        </button>

        {open && (
          <div className="flex flex-col md:hidden gap-4 text-sm">
            {specialities.map((cat) => (
              <p
                key={cat}
                className="w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer"
                onClick={() => { setSelectedCategory(cat); setOpen(false); }}
              >
                {cat}
              </p>
            ))}
          </div>
        )}

        <div className="flex-col gap-4 text-sm text-gray-600 hidden sm:flex">
          {specialities.map((cat) => (
            <p
              key={cat}
              className={`${selectedCategory === cat ? "bg-[#5F6FFF] text-white" : ""} w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}
              onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
            >
              {cat}
            </p>
          ))}
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center h-40">
            <LoaderCircle className="animate-spin w-8 h-8 text-[#5F6FFF]" />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
            {filtered.map((doc) => (
              <div
                key={doc._id}
                onClick={() => navigate(`/appointment/${doc._id}`)}
                className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500"
              >
                <img className="bg-[#EAEFFF] w-full" src={doc.image || `https://ui-avatars.com/api/?name=${doc.name}&background=EEF2FF&color=5F6FFF&size=200`} alt={doc.name} />
                <div className="p-4">
                  <div className={`flex items-center gap-2 text-sm ${doc.available ? "text-green-500" : "text-red-500"}`}>
                    <p className={`w-2 h-2 rounded-full ${doc.available ? "bg-green-500" : "bg-red-500"}`}></p>
                    <p>{doc.available ? "Available" : "Not Available"}</p>
                  </div>
                  <p className="text-[#262626] text-lg font-medium">{doc.name}</p>
                  <p className="text-[#5C5C5C] text-sm">{doc.speciality}</p>
                </div>
              </div>
            ))}
            {filtered.length === 0 && !loading && (
              <p className="col-span-full text-center text-gray-400 py-10">No doctors found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
