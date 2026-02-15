import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaUserGraduate, FaSearch, FaPlus, FaEdit, FaTrash, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import api, { endpoints } from "../services/api";

const statusBadge = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
  "On Leave": "bg-yellow-100 text-yellow-700",
};

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.get(endpoints.students.getAll);
      setStudents(result.data);
    } catch (error) {
      console.error("Error loading students:", error);
      setError("Failed to load students. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = students.filter(
    (s) =>
      s.firstName.toLowerCase().includes(search.toLowerCase()) ||
      s.lastName.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.grade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FaUserGraduate className="text-blue-500" /> Student Management
            </h1>
            <p className="text-gray-500 mt-1">{students.length} students registered</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold shadow">
            <FaPlus /> Add Student
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, ID or grade..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center">
            <FaSpinner className="text-blue-500 text-4xl animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Loading students...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
            <FaExclamationTriangle className="text-red-500 text-2xl flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-red-800 font-semibold mb-1">Error Loading Students</h3>
              <p className="text-red-600 text-sm mb-3">{error}</p>
              <button 
                onClick={loadStudents}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Student Table */}
        {!loading && !error && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-5 text-left text-xs font-semibold uppercase">ID</th>
                <th className="py-3 px-5 text-left text-xs font-semibold uppercase">Name</th>
                <th className="py-3 px-5 text-left text-xs font-semibold uppercase">Grade</th>
                <th className="py-3 px-5 text-left text-xs font-semibold uppercase">Address</th>
                <th className="py-3 px-5 text-left text-xs font-semibold uppercase">Phone</th>
                <th className="py-3 px-5 text-center text-xs font-semibold uppercase">Status</th>
                <th className="py-3 px-5 text-center text-xs font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filtered.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-5 text-gray-600 font-mono">{student.id}</td>
                  <td className="py-3 px-5 font-medium text-gray-800">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="py-3 px-5 text-gray-600">{student.grade}</td>
                  <td className="py-3 px-5 text-gray-500">{student.address}</td>
                  <td className="py-3 px-5 text-gray-600">{student.phone}</td>
                  <td className="py-3 px-5 text-center">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadge[student.status]}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-center">
                    <button className="text-blue-600 hover:text-blue-800 mr-3" title="Edit">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-800" title="Delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-center p-8 text-gray-500">No students found matching your search.</p>
          )}
        </div>
        )}

      </div>
    </div>
  );
}

export default Students;