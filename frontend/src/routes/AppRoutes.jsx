import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Bookings from "../pages/Bookings.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import BookingForm from "../pages/BookingForm.jsx";
import PrivateRoute from "../components/PrivateRoute";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* ✅ Protected User Routes */}
    <Route
      path="/bookings"
      element={
        <PrivateRoute>
          <Bookings />
        </PrivateRoute>
      }
    />
    <Route
      path="/booking-form"
      element={
        <PrivateRoute>
          <BookingForm />
        </PrivateRoute>
      }
    />

    {/* ✅ Admin Dashboard Route */}
    <Route
  path="/admin/dashboard"
  element={
    <PrivateRoute>
      <AdminDashboard />
    </PrivateRoute>
  }
/>
  </Routes>
);

export default AppRoutes;
