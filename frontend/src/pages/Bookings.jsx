import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Bookings() {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({
    customer_name: "",
    address: "",
    date_time: "",
    service_id: "",
  });

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, [token]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setBookings(data.data);
      } else {
        toast.error(data.message || "Failed to fetch bookings.");
      }
    } catch (error) {
      toast.error("Error fetching bookings.");
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services");
      const data = await res.json();

      if (res.ok) {
        setServices(data.data || []);
      } else {
        toast.error("Failed to fetch services");
      }
    } catch (error) {
      toast.error("Error loading services");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("Booking deleted");
        fetchBookings();
      } else {
        const data = await res.json();
        toast.error(data.message || "Delete failed");
      }
    } catch (error) {
      toast.error("Error deleting booking.");
    }
  };

  const startEdit = (booking) => {
    setEditingBooking(booking._id);
    setFormData({
      customer_name: booking.customer_name,
      address: booking.address,
      date_time: booking.date_time.slice(0, 16),
      service_id: booking.service_id?._id || "",
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${editingBooking}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Booking updated");
        setEditingBooking(null);
        fetchBookings();
      } else {
        const data = await res.json();
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Error updating booking.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Bookings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Customer</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Date & Time</th>
                <th className="py-2 px-4 border-b">Service</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td className="py-2 px-4 border-b">
                    {editingBooking === b._id ? (
                      <input
                        value={formData.customer_name}
                        onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      b.customer_name
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingBooking === b._id ? (
                      <input
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      b.address
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingBooking === b._id ? (
                      <input
                        type="datetime-local"
                        value={formData.date_time}
                        onChange={(e) => setFormData({ ...formData, date_time: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      new Date(b.date_time).toLocaleString()
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingBooking === b._id ? (
                      <select
                        value={formData.service_id}
                        onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="">Select Service</option>
                        {services.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      b.service_id?.name || "N/A"
                    )}
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
                    {editingBooking === b._id ? (
                      <>
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingBooking(null)}
                          className="bg-gray-400 text-white px-2 py-1 rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(b)}
                          className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
