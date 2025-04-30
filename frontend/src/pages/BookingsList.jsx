import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (res.ok) {
        setBookings(data.data || []);
      } else {
        toast.error(data.message || "Failed to fetch bookings");
      }
    } catch (err) {
      toast.error("Server error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Booking deleted");
        fetchBookings(); 
      } else {
        toast.error(data.message || "Failed to delete booking");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">All Bookings</h2>

      {loading ? (
        <p className="text-center">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Service</th>
              <th className="p-2 text-left">Date & Time</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t">
                <td className="p-2">{booking.customer_name}</td>
                <td className="p-2">{booking.service_id?.name || "N/A"}</td>
                <td className="p-2">
                  {new Date(booking.date_time).toLocaleString()}
                </td>
                <td className="p-2">{booking.address}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingsList;
