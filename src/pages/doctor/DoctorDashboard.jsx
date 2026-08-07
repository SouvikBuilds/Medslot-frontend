import { useEffect, useState } from "react";
import { getDoctorDashboard, markAppointmentComplete, doctorCancelAppointment } from "../../api/api.js";
import { LoaderCircle, DollarSign, CalendarDays, Users, X, Check } from "lucide-react";

const DoctorDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await getDoctorDashboard();
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  const handleComplete = async (id) => {
    try { await markAppointmentComplete(id); fetchDashboard(); } catch (err) { console.error(err); }
  };

  const handleCancel = async (id) => {
    try { await doctorCancelAppointment(id); fetchDashboard(); } catch (err) { console.error(err); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoaderCircle className="animate-spin w-8 h-8 text-[#5F6FFF]" />
      </div>
    );
  }

  const stats = [
    { label: "Earnings", value: `$${data?.earnings ?? 0}`, icon: DollarSign, color: "text-[#5F6FFF]", bg: "bg-[#F2F3FF]" },
    { label: "Appointments", value: data?.totalAppointments ?? 0, icon: CalendarDays, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Patients", value: data?.totalPatients ?? 0, icon: Users, color: "text-gray-600", bg: "bg-gray-100" },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="flex items-center gap-4 bg-white border rounded-xl px-6 py-5 min-w-44 cursor-pointer hover:scale-105 transition-all">
            <div className={`${bg} p-3 rounded-full`}>
              <Icon className={`w-8 h-8 ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-xl">
        <div className="flex items-center gap-2.5 px-6 py-4 border-b">
          <CalendarDays className="w-5 h-5 text-[#5F6FFF]" />
          <p className="font-semibold text-gray-700">Latest Bookings</p>
        </div>

        <div className="divide-y">
          {data?.latestAppointments?.length === 0 && (
            <p className="text-center text-gray-400 py-10">No appointments yet</p>
          )}
          {data?.latestAppointments?.map((apt) => (
            <div key={apt._id} className="flex items-center gap-4 px-6 py-4">
              <img
                src={apt.patient?.image || `https://ui-avatars.com/api/?name=${apt.patient?.name}&background=EEF2FF&color=5F6FFF&size=40`}
                alt=""
                className="w-10 h-10 rounded-full object-cover bg-[#EAEFFF]"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{apt.patient?.name}</p>
                <p className="text-xs text-gray-500">
                  Booking on {new Date(apt.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              {apt.status === "cancelled" ? (
                <span className="text-red-400 text-sm font-medium">Cancelled</span>
              ) : apt.status === "completed" ? (
                <span className="text-green-500 text-sm font-medium">Completed</span>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={() => handleCancel(apt._id)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer">
                    <X className="w-4 h-4 text-gray-400 hover:text-red-400" />
                  </button>
                  <button onClick={() => handleComplete(apt._id)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-green-50 hover:border-green-200 transition-all cursor-pointer">
                    <Check className="w-4 h-4 text-gray-400 hover:text-green-500" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
