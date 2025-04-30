import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { token, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", price: "" });
  const [editServiceId, setEditServiceId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setBookings(data.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch services
  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setServices(data.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  // Delete Booking
  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setBookings(bookings.filter((b) => b._id !== id));
        alert(data.message);
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      alert("Error deleting booking.");
    }
  };

  // Handle form inputs
  const handleServiceChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  // Add Service
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newService),
      });
      const data = await res.json();
      if (res.ok) {
        setServices([...services, data.data]);
        setNewService({ name: "", price: "" });
        alert("Service added successfully!");
      } else {
        alert(data.message || "Failed to add service.");
      }
    } catch (err) {
      alert("Error adding service.");
    }
  };

  // Delete Service
  const handleDeleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setServices(services.filter((s) => s._id !== id));
        alert("Service deleted.");
      } else {
        alert(data.message || "Failed to delete service.");
      }
    } catch (err) {
      alert("Error deleting service.");
    }
  };

  // Update Service
  const handleUpdateService = async (e, id) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newService),
      });
      const data = await res.json();
      if (res.ok) {
        const updated = services.map((s) =>
          s._id === id ? data.data : s
        );
        setServices(updated);
        setNewService({ name: "", price: "" });
        setEditServiceId(null);
        alert("Service updated.");
      } else {
        alert(data.message || "Failed to update service.");
      }
    } catch (err) {
      alert("Error updating service.");
    }
  };

  
  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Bookings Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Bookings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Customer</th>
                <th className="border px-2 py-1">Service</th>
                <th className="border px-2 py-1">Address</th>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">User</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="border px-2 py-1">{booking.customer_name}</td>
                  <td className="border px-2 py-1">{booking.service_id?.name}</td>
                  <td className="border px-2 py-1">{booking.address}</td>
                  <td className="border px-2 py-1">
                    {new Date(booking.date_time).toLocaleString()}
                  </td>
                  <td className="border px-2 py-1">
                    {booking.user_id?.name}
                    <br />
                    <small>{booking.user_id?.email}</small>
                  </td>
                  <td className="border px-2 py-1">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      onClick={() => deleteBooking(booking._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Services Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Services</h2>
        <ul className="space-y-2 mb-4">
          {services.map((service) => (
            <li key={service._id} className="flex justify-between items-center bg-white p-2 rounded shadow">
              {editServiceId === service._id ? (
                <form onSubmit={(e) => handleUpdateService(e, service._id)} className="flex gap-2 items-center w-full">
                  <input
                    type="text"
                    name="name"
                    value={newService.name}
                    onChange={handleServiceChange}
                    className="border px-2 py-1 rounded w-1/3"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    value={newService.price}
                    onChange={handleServiceChange}
                    className="border px-2 py-1 rounded w-1/4"
                    required
                  />
                  <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                  <button type="button" onClick={() => setEditServiceId(null)} className="text-gray-500 hover:underline">Cancel</button>
                </form>
              ) : (
                <>
                  <span>{service.name} - ${service.price}</span>
                  <div className="space-x-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      onClick={() => {
                        setEditServiceId(service._id);
                        setNewService({ name: service.name, price: service.price });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      onClick={() => handleDeleteService(service._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Add Service Form */}
        <form onSubmit={handleServiceSubmit} className="bg-gray-100 p-4 rounded max-w-sm">
          <h3 className="font-semibold mb-2">Add New Service</h3>
          <input
            type="text"
            name="name"
            value={newService.name}
            onChange={handleServiceChange}
            placeholder="Service Name"
            className="w-full px-2 py-1 mb-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={newService.price}
            onChange={handleServiceChange}
            placeholder="Price"
            className="w-full px-2 py-1 mb-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            Add Service
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminDashboard;
