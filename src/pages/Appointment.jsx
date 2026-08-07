import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorById, getBookedSlots, bookAppointment } from "../api/api.js";
import { LoaderCircle, BadgeCheck, Info } from "lucide-react";
import AuthContext from "../context/Authentication/authContext.js";

const TIME_SLOTS = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

const getDaysFromToday = () => {
  const days = [];
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({ date: d, label: dayNames[d.getDay()], day: d.getDate() });
  }
  return days;
};

const Appointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days] = useState(getDaysFromToday);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await getDoctorById(id);
        setDoctor(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!id || !days[selectedDay]) return;
      try {
        const dateStr = days[selectedDay].date.toISOString().split("T")[0];
        const res = await getBookedSlots(id, dateStr);
        setBookedSlots(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSlots();
    setSelectedSlot(null);
  }, [selectedDay, id]);

  const handleBook = async () => {
    if (!user) { navigate("/login"); return; }
    if (!selectedSlot) { setError("Please select a time slot"); return; }
    setError(""); setBooking(true);
    try {
      await bookAppointment({
        doctorId: id,
        appointmentDate: days[selectedDay].date.toISOString(),
        slot: selectedSlot,
      });
      navigate("/my-appointments");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoaderCircle className="animate-spin w-8 h-8 text-[#5F6FFF]" />
      </div>
    );
  }

  if (!doctor) return <p className="text-center py-20 text-gray-400">Doctor not found</p>;

  return (
    <div className="py-8">
      {/* Doctor info */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:max-w-72 bg-[#EAEFFF] rounded-xl overflow-hidden flex-shrink-0">
          <img src={doctor.image || `https://ui-avatars.com/api/?name=${doctor.name}&background=EEF2FF&color=5F6FFF&size=300`} alt={doctor.name} className="w-full object-cover" />
        </div>

        <div className="flex-1 border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-2xl font-semibold text-gray-800">{doctor.name}</p>
            <BadgeCheck className="w-5 h-5 text-[#5F6FFF]" />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            {doctor.degree} - {doctor.speciality} &nbsp;
            <span className="border border-gray-300 text-xs px-2 py-0.5 rounded-full">{doctor.experience} Years</span>
          </p>

          <div className="flex items-center gap-1 mb-2">
            <p className="text-sm font-medium text-gray-700">About</p>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 mb-4">{doctor.about}</p>
          <p className="text-sm font-medium text-gray-700">Appointment fee: <span className="text-gray-800">${doctor.fees}</span></p>
        </div>
      </div>

      {/* Booking slots */}
      <div className="mt-8">
        <p className="text-gray-700 font-medium mb-4">Booking slots</p>

        {/* Day selector */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`flex flex-col items-center px-4 py-3 rounded-full border cursor-pointer transition-all flex-shrink-0 ${
                selectedDay === i
                  ? "bg-[#5F6FFF] text-white border-[#5F6FFF]"
                  : "border-gray-300 text-gray-600 hover:border-[#5F6FFF]"
              }`}
            >
              <span className="text-xs font-medium">{d.label}</span>
              <span className="text-sm font-semibold">{d.day}</span>
            </button>
          ))}
        </div>

        {/* Time slots */}
        <div className="flex flex-wrap gap-3 mt-4">
          {TIME_SLOTS.map((slot) => {
            const isBooked = bookedSlots.includes(slot);
            const isSelected = selectedSlot === slot;
            return (
              <button
                key={slot}
                disabled={isBooked}
                onClick={() => !isBooked && setSelectedSlot(slot)}
                className={`px-5 py-2 rounded-full text-sm border transition-all cursor-pointer ${
                  isBooked
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : isSelected
                    ? "bg-[#5F6FFF] text-white border-[#5F6FFF]"
                    : "border-gray-300 text-gray-600 hover:border-[#5F6FFF]"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <button
          onClick={handleBook}
          disabled={booking}
          className="mt-6 bg-[#5F6FFF] text-white px-14 py-3 rounded-full flex items-center gap-2 cursor-pointer hover:bg-[#4f5ee8] transition-all disabled:opacity-60"
        >
          {booking && <LoaderCircle className="w-4 h-4 animate-spin" />}
          Book an appointment
        </button>
      </div>
    </div>
  );
};

export default Appointment;
