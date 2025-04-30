import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold text-green-600">
        <Link to="/">CleaningService</Link>
      </div>

      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-green-600 font-bold">Home</Link><span/>
        {isAuthenticated && (
          <>
            <Link to="/bookings" className="text-gray-700 hover:text-green-600 cursor-pointer font-bold">Bookings</Link><span/>
            <Link to="/booking-form" className="text-gray-700 hover:text-green-600 cursor-pointer font-bold">Book Now</Link><span/>
            <button onClick={logout} className="ml-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 font-bold transition duration-200 cursor-pointer"
>
  Logout
</button>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/login" className="text-gray-700 hover:text-green-600 cursor-pointer">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-green-600 cursor-pointer">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
