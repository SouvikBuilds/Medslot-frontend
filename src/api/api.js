import axios from "axios";

const BASE = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({ baseURL: BASE, withCredentials: true });

// ── Auth ──────────────────────────────────────────────────────────────────────
export const getCurrentUser = () => api.get("/api/v1/users/me");
export const registerUser = (data) => api.post("/api/v1/users/register", data);
export const loginUser = (data) => api.post("/api/v1/users/login", data);
export const logOutUser = () => api.post("/api/v1/users/logout", {});
export const requestMagicLink = (data) =>
  api.post("/api/v1/users/magic-link", data);
export const loginThroughMagicLink = (token) =>
  api.post("/api/v1/users/magic-login", { token });
export const updateProfile = (data) =>
  api.patch("/api/v1/users/update-profile", data);

// ── Admin ─────────────────────────────────────────────────────────────────────
export const adminLogin = (data) => api.post("/api/v1/admin/login", data);
export const getAdminDashboard = () => api.get("/api/v1/admin/dashboard");
export const getAllAdminDoctors = () => api.get("/api/v1/admin/doctors");
export const registerDoctor = (data) =>
  api.post("/api/v1/admin/doctors", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteDoctor = (id) => api.delete(`/api/v1/admin/doctors/${id}`);
export const getAllAdminUsers = () => api.get("/api/v1/admin/users");

// ── Doctors ───────────────────────────────────────────────────────────────────
export const getAllDoctors = () => api.get("/api/v1/doctors");
export const getDoctorById = (id) => api.get(`/api/v1/doctors/${id}`);
export const loginDoctor = (data) => api.post("/api/v1/doctors/login", data);
export const logOutDoctor = () => api.post("/api/v1/doctors/logout", {});
export const getCurrentDoctor = () => api.get("/api/v1/doctors/me");
export const updateDoctorProfile = (data) =>
  api.patch("/api/v1/doctors/update-profile", data);
export const updateDoctorAvailability = (data) =>
  api.patch("/api/v1/doctors/update-availability", data);
export const updateDoctorProfileImage = (formData) =>
  api.patch("/api/v1/doctors/update-profile-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ── Appointments ──────────────────────────────────────────────────────────────
export const bookAppointment = (data) =>
  api.post("/api/v1/appointments/book", data);
export const getMyAppointments = () =>
  api.get("/api/v1/appointments/my-appointments");
export const cancelAppointment = (id) =>
  api.patch(`/api/v1/appointments/cancel/${id}`);
export const getBookedSlots = (doctorId, date) =>
  api.get("/api/v1/appointments/booked-slots", { params: { doctorId, date } });

// Doctor appointment APIs
export const getDoctorAppointments = () =>
  api.get("/api/v1/appointments/doctor-appointments");
export const getDoctorDashboard = () =>
  api.get("/api/v1/appointments/doctor-dashboard");
export const markAppointmentComplete = (id) =>
  api.patch(`/api/v1/appointments/complete/${id}`);
export const doctorCancelAppointment = (id) =>
  api.patch(`/api/v1/appointments/doctor-cancel/${id}`);

// Admin appointment APIs
export const getAllAppointments = () => api.get("/api/v1/appointments/all");
export const adminCancelAppointment = (id) =>
  api.patch(`/api/v1/appointments/admin-cancel/${id}`);

// Razorpay
export const createRazorpayOrder = (appointmentId) =>
  api.post("/api/v1/appointments/razorpay/create-order", { appointmentId });
export const verifyRazorpayPayment = (data) =>
  api.post("/api/v1/appointments/razorpay/verify", data);
