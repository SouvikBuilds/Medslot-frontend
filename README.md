# 🩺 MedSlot

> A full-stack doctor appointment booking platform designed to simplify the process of discovering doctors, managing appointments, and handling healthcare-related operations.

MedSlot is a modern healthcare appointment management platform built with the **MERN stack**. It provides separate experiences for patients, doctors, and administrators, with secure authentication and appointment management.

---

## ✨ Features

### 👤 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Secure cookie-based authentication
- Magic Link / passwordless login
- Protected routes
- Role-based access control

### 🧑‍⚕️ Doctor Management
- Browse available doctors
- View doctor profiles
- Doctor information and profile images
- Doctor application/employment workflow
- Admin-controlled doctor management

### 📅 Appointment Management
- Book doctor appointments
- View appointments
- Manage appointment status
- Patient-doctor appointment workflow

### 🛡️ Admin Dashboard
- Admin authentication
- Manage doctors
- Manage users
- Monitor appointments
- Handle doctor applications

### ☁️ Cloud Integration
- Cloudinary integration for image uploads
- Secure backend API
- Environment-based configuration

---

## 🏗️ Tech Stack

### Frontend

- React.js
- React Router
- Tailwind CSS
- Vite
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cookie-based authentication

### Services & Tools

- Cloudinary
- Vercel
- Render
- Git & GitHub

---

## 📂 Project Structure

```text
MedSlot/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vercel.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── app.js
│   └── server.js
│
└── README.md
