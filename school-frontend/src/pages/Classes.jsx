import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaUserGraduate, FaChalkboardTeacher, FaClock, FaSchool, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import api, { endpoints } from "../services/api";

const statusBadge = {
  Active: "bg-green-100 text-green-700",
  Suspended: "bg-yellow-100 text-yellow-700",
  Completed: "bg-gray-200 text-gray-600",
};

function Classes() {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.get(endpoints.classes.getAll);
      setClasses(result.data);
    } catch (error) {
      console.error("Error loading classes:", error);
      setError("Failed to load classes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase())
  );

  const totalStudents = classes.reduce((sum, c) => sum + c.students, 0);
  const activeClasses = classes.filter((c) => c.status === "Active").length;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3"><FaSchool className="text-purple-500" /> Class Management</h1>
            <p className="text-gray-500 mt-1">{classes.length} classes &middot; {totalStudents} students &middot; {activeClasses} active</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold shadow">
            <FaPlus /> Add Class
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by class, teacher or subject..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center">
            <FaSpinner className="text-purple-500 text-4xl animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Loading classes...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
            <FaExclamationTriangle className="text-red-500 text-2xl flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-red-800 font-semibold mb-1">Error Loading Classes</h3>
              <p className="text-red-600 text-sm mb-3">{error}</p>
              <button 
                onClick={loadClasses}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-5 text-left text-xs font-semibold uppercase">Class</th>
                <th className="py-3 px-5 text-left text-xs font-semibold uppercase">Subject</th>
                <th className="py-3 px-5 text-left text-xs font-semibold uppercase">Teacher</th>
                <th className="py-3 px-5 text-center text-xs font-semibold uppercase">Students</th>
                <th className="py-3 px-5 text-left text-xs font-semibold uppercase">Schedule</th>
                <th className="py-3 px-5 text-left text-xs font-semibold uppercase">Room</th>
                <th className="py-3 px-5 text-center text-xs font-semibold uppercase">Status</th>
                <th className="py-3 px-5 text-center text-xs font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-5">
                    <p className="font-semibold text-gray-800">{c.name}</p>
                    <p className="text-xs text-gray-400 font-mono">{c.id}</p>
                  </td>
                  <td className="py-3 px-5 text-gray-600">{c.subject}</td>
                  <td className="py-3 px-5 text-gray-700 flex items-center gap-2">
                    <FaChalkboardTeacher className="text-gray-400" /> {c.teacher}
                  </td>
                  <td className="py-3 px-5 text-center">
                    <span className="inline-flex items-center gap-1 text-gray-700 font-medium">
                      <FaUserGraduate className="text-gray-400" /> {c.students}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-gray-500 flex items-center gap-1">
                    <FaClock className="text-gray-400" /> {c.schedule}
                  </td>
                  <td className="py-3 px-5 text-gray-600">{c.room}</td>
                  <td className="py-3 px-5 text-center">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadge[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-center">
                    <button className="text-blue-600 hover:underline mr-3 font-medium">Edit</button>
                    <button className="text-red-600 hover:underline font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-center p-8 text-gray-500">No classes found matching your search.</p>
          )}
        </div>
        )}
      </div>
    </div>
  );
}

export default Classes;
