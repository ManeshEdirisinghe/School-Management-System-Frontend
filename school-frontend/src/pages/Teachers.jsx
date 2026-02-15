import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEnvelope, FaPhone, FaChalkboardTeacher } from "react-icons/fa";

// ─── Mock Data ───────────────────────────────────────────────
const mockTeachers = [
  { id: "TCH-001", name: "Mr. Nimal Rajapaksa", subject: "Mathematics", phone: "071-2345678", email: "nimal@school.lk", status: "Active", classes: 5 },
  { id: "TCH-002", name: "Mrs. Kumari Jayasuriya", subject: "Science", phone: "077-8765432", email: "kumari@school.lk", status: "Active", classes: 4 },
  { id: "TCH-003", name: "Mr. Sunil Perera", subject: "English", phone: "076-1112233", email: "sunil@school.lk", status: "On Leave", classes: 3 },
  { id: "TCH-004", name: "Mrs. Anoma Silva", subject: "Sinhala", phone: "078-4455667", email: "anoma@school.lk", status: "Active", classes: 6 },
  { id: "TCH-005", name: "Mr. Rohan Bandara", subject: "History", phone: "070-9988776", email: "rohan@school.lk", status: "Active", classes: 4 },
  { id: "TCH-006", name: "Mrs. Dilani Fernando", subject: "ICT", phone: "071-5566778", email: "dilani@school.lk", status: "Active", classes: 5 },
  { id: "TCH-007", name: "Mr. Chaminda Wijesinghe", subject: "Art", phone: "077-3344556", email: "chaminda@school.lk", status: "Inactive", classes: 0 },
  { id: "TCH-008", name: "Mrs. Priyanka Herath", subject: "Music", phone: "076-6677889", email: "priyanka@school.lk", status: "Active", classes: 3 },
];

const statusBadge = {
  Active: "bg-green-100 text-green-700",
  "On Leave": "bg-yellow-100 text-yellow-700",
  Inactive: "bg-red-100 text-red-700",
};

function Teachers() {
  const [search, setSearch] = useState("");

  const filtered = mockTeachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3"><FaChalkboardTeacher className="text-green-500" /> Teacher Management</h1>
            <p className="text-gray-500 mt-1">{mockTeachers.length} teachers registered</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold shadow">
            <FaPlus /> Add Teacher
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or subject..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Teacher Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div key={t.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-800">{t.name}</h3>
                  <p className="text-sm text-gray-500 font-mono">{t.id}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadge[t.status]}`}>
                  {t.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p><span className="font-medium text-gray-700">Subject:</span> {t.subject}</p>
                <p className="flex items-center gap-2"><FaPhone className="text-gray-400" /> {t.phone}</p>
                <p className="flex items-center gap-2"><FaEnvelope className="text-gray-400" /> {t.email}</p>
                <p><span className="font-medium text-gray-700">Classes Assigned:</span> {t.classes}</p>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-1 text-sm bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition font-medium">
                  <FaEdit /> Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 text-sm bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition font-medium">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center p-10 text-gray-500">No teachers found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default Teachers;
