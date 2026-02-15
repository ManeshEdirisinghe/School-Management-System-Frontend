import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { FaSearch, FaPlus, FaUserGraduate, FaChalkboardTeacher, FaClock, FaSchool } from "react-icons/fa";

// ─── Mock Data ───────────────────────────────────────────────
const mockClasses = [
  { id: "CLS-001", name: "Grade 6 - A", teacher: "Mrs. Kumari Jayasuriya", subject: "Science", students: 38, schedule: "Mon, Wed, Fri - 8:00 AM", room: "Room 101", status: "Active" },
  { id: "CLS-002", name: "Grade 7 - B", teacher: "Mr. Nimal Rajapaksa", subject: "Mathematics", students: 35, schedule: "Tue, Thu - 9:00 AM", room: "Room 205", status: "Active" },
  { id: "CLS-003", name: "Grade 8 - A", teacher: "Mr. Sunil Perera", subject: "English", students: 40, schedule: "Mon, Wed - 10:00 AM", room: "Room 302", status: "Active" },
  { id: "CLS-004", name: "Grade 9 - C", teacher: "Mrs. Anoma Silva", subject: "Sinhala", students: 32, schedule: "Tue, Thu, Fri - 11:00 AM", room: "Room 110", status: "Suspended" },
  { id: "CLS-005", name: "Grade 10 - A", teacher: "Mr. Rohan Bandara", subject: "History", students: 36, schedule: "Mon, Wed, Fri - 1:00 PM", room: "Room 401", status: "Active" },
  { id: "CLS-006", name: "Grade 11 - B", teacher: "Mrs. Dilani Fernando", subject: "ICT", students: 28, schedule: "Tue, Thu - 2:00 PM", room: "Lab 01", status: "Active" },
  { id: "CLS-007", name: "Grade 12 - A", teacher: "Mrs. Priyanka Herath", subject: "Music", students: 20, schedule: "Fri - 3:00 PM", room: "Music Hall", status: "Active" },
  { id: "CLS-008", name: "Grade 10 - B", teacher: "Mr. Chaminda Wijesinghe", subject: "Art", students: 25, schedule: "Wed - 2:00 PM", room: "Art Room", status: "Completed" },
];

const statusBadge = {
  Active: "bg-green-100 text-green-700",
  Suspended: "bg-yellow-100 text-yellow-700",
  Completed: "bg-gray-200 text-gray-600",
};

function Classes() {
  const [search, setSearch] = useState("");

  const filtered = mockClasses.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase())
  );

  const totalStudents = mockClasses.reduce((sum, c) => sum + c.students, 0);
  const activeClasses = mockClasses.filter((c) => c.status === "Active").length;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3"><FaSchool className="text-purple-500" /> Class Management</h1>
            <p className="text-gray-500 mt-1">{mockClasses.length} classes &middot; {totalStudents} students &middot; {activeClasses} active</p>
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

        {/* Table */}
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
      </div>
    </div>
  );
}

export default Classes;
