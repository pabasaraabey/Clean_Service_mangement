import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/admin"); 

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {!hideLayout && <Navbar />}
      <div className="flex-grow">
        <AppRoutes />
      </div>
      {!hideLayout && <Footer />}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
