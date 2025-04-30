import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    service_id: "",
    date_time: "",
    address: "",
  });

  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  // available services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/services");
        const data = await res.json();
        if (res.ok) {
          setServices(data.data || []);
        } else {
          toast.error("Failed to load services");
        }
      } catch (err) {
        toast.error("Server error while loading services");
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to book a service.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Booking created!");
        navigate("/bookings");
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Book a Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="customer_name"
          placeholder="Your Name"
          value={formData.customer_name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="service_id"
          value={formData.service_id}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="date_time"
          value={formData.date_time}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
