import { Link } from "react-router-dom";
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaSchool, FaSignOutAlt } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col shadow-lg">
      <div className="p-6 text-center text-2xl font-bold border-b border-gray-700 bg-gray-900 flex items-center justify-center gap-2">
        <FaUserGraduate /> SMS System
      </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-4">
        <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition duration-200">
          <FaHome className="text-xl"/> Dashboard
        </Link>
        <Link to="/students" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition duration-200">
          <FaUserGraduate className="text-xl"/> Students
        </Link>
        <Link to="/teachers" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition duration-200">
          <FaChalkboardTeacher className="text-xl"/> Teachers
        </Link>
        <Link to="/classes" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition duration-200">
          <FaSchool className="text-xl"/> Classes
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <Link to="/" className="flex items-center gap-3 p-3 rounded bg-red-600 hover:bg-red-700 transition justify-center font-bold">
          <FaSignOutAlt /> Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;