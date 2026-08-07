import { useEffect, useState } from "react";
import { getMyAppointments, cancelAppointment, createRazorpayOrder, verifyRazorpayPayment } from "../api/api.js";
import { LoaderCircle } from "lucide-react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);

  const fetchAppointments = async () => {
    try {
      const res = await getMyAppointments();
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
      await cancelAppointment(id);
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayOnline = async (appointmentId, amount, doctorName) => {
    setPayingId(appointmentId);
    try {
      const res = await createRazorpayOrder(appointmentId);
      const { order } = res.data.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "MedSlot",
        description: `Appointment with ${doctorName}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointmentId,
            });
            fetchAppointments();
          } catch (err) {
            console.error("Payment verification failed", err);
          }
        },
        theme: { color: "#5F6FFF" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    } finally {
      setPayingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoaderCircle className="animate-spin w-8 h-8 text-[#5F6FFF]" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <p className="text-xl font-semibold text-gray-700 mb-6">My appointments</p>

      {appointments.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p>No appointments found.</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {appointments.map((apt) => (
          <div key={apt._id} className="grid grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 border rounded-xl p-4 sm:p-6 hover:shadow-sm transition-all bg-white">
            {/* Doctor image */}
            <img
              src={apt.doctor?.image || `https://ui-avatars.com/api/?name=${apt.doctor?.name}&background=EEF2FF&color=5F6FFF&size=160`}
              alt={apt.doctor?.name}
              className="w-28 sm:w-36 rounded-lg object-cover bg-[#EAEFFF]"
            />

            {/* Info */}
            <div className="flex flex-col gap-1 text-sm text-gray-600">
              <p className="text-base font-semibold text-gray-800">{apt.doctor?.name}</p>
              <p className="text-gray-500">{apt.doctor?.speciality}</p>
              <p className="font-medium text-gray-700 mt-1">Address:</p>
              <p className="text-gray-500">{apt.doctor?.address}</p>
              <p className="mt-1">
                <span className="font-medium text-gray-700">Date & Time: </span>
                {new Date(apt.appointmentDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} | {apt.slot}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 justify-center min-w-[140px]">
              {apt.status === "cancelled" ? (
                <button className="border border-red-400 text-red-400 text-sm px-4 py-2 rounded-full">
                  Appointment cancelled
                </button>
              ) : apt.status === "completed" ? (
                <button className="border border-green-500 text-green-500 text-sm px-4 py-2 rounded-full">
                  Completed
                </button>
              ) : (
                <>
                  {apt.paymentStatus !== "paid" ? (
                    <button
                      onClick={() => handlePayOnline(apt._id, apt.amount, apt.doctor?.name)}
                      disabled={payingId === apt._id}
                      className="border border-gray-300 text-sm px-4 py-2 rounded-full hover:bg-[#5F6FFF] hover:text-white hover:border-[#5F6FFF] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {payingId === apt._id && <LoaderCircle className="w-3 h-3 animate-spin" />}
                      Pay Online
                    </button>
                  ) : (
                    <button className="border border-green-500 text-green-500 text-sm px-4 py-2 rounded-full cursor-default">
                      Paid Online
                    </button>
                  )}
                  <button
                    onClick={() => handleCancel(apt._id)}
                    className="border border-gray-300 text-sm px-4 py-2 rounded-full hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-all cursor-pointer"
                  >
                    Cancel appointment
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
