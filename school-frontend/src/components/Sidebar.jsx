import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-gray-800 text-white flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">School Admin</div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/students" className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
              Students
            </Link>
          </li>
          <li>
            <Link to="/teachers" className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
              Teachers
            </Link>
          </li>
          <li>
            <Link to="/classes" className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
              Classes
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">&copy; 2026 School System</div>
    </aside>
  );
};

export default Sidebar;
