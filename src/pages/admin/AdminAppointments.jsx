import { useEffect, useState } from "react";
import { getAllAppointments, adminCancelAppointment } from "../../api/api.js";
import { LoaderCircle, X } from "lucide-react";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await getAllAppointments();
      setAppointments(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleCancel = async (id) => {
    try {
      await adminCancelAppointment(id);
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const getAge = (dob) => {
    if (!dob) return "N/A";
    return Math.floor((Date.now() - new Date(dob)) / (365.25 * 24 * 60 * 60 * 1000));
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
      <p className="text-xl font-semibold text-gray-700 mb-5">All Appointments</p>

      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] gap-2 px-6 py-3 border-b bg-gray-50 text-sm font-medium text-gray-500">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        <div className="divide-y">
          {appointments.length === 0 && (
            <p className="text-center text-gray-400 py-10">No appointments found</p>
          )}
          {appointments.map((apt, index) => (
            <div
              key={apt._id}
              className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] gap-2 items-start sm:items-center px-6 py-4 text-sm text-gray-600 hover:bg-gray-50 transition-all"
            >
              <p className="text-gray-400">{index + 1}</p>

              <div className="flex items-center gap-2">
                <img
                  src={apt.patient?.image || `https://ui-avatars.com/api/?name=${apt.patient?.name}&background=EEF2FF&color=5F6FFF&size=40`}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover bg-[#EAEFFF]"
                />
                <p className="font-medium text-gray-700 truncate">{apt.patient?.name}</p>
              </div>

              <p>{getAge(apt.patient?.dob)}</p>

              <p>
                {new Date(apt.appointmentDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}, {apt.slot}
              </p>

              <div className="flex items-center gap-2">
                <img
                  src={apt.doctor?.image || `https://ui-avatars.com/api/?name=${apt.doctor?.name}&background=EEF2FF&color=5F6FFF&size=40`}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover bg-[#EAEFFF]"
                />
                <p className="truncate">{apt.doctor?.name}</p>
              </div>

              <p>${apt.amount}</p>

              {apt.status === "cancelled" ? (
                <span className="text-red-400 font-medium">Cancelled</span>
              ) : apt.status === "completed" ? (
                <span className="text-green-500 font-medium">Completed</span>
              ) : (
                <button
                  onClick={() => handleCancel(apt._id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-red-400" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;
