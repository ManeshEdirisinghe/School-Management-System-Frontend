import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaUserGraduate, FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// ─── Mock Data ───────────────────────────────────────────────
const mockStudents = [
  { id: "STU-1001", firstName: "Kasun", lastName: "Perera", address: "123 Galle Road, Colombo 03", grade: "Grade 10 - A", phone: "071-1234567", status: "Active" },
  { id: "STU-1002", firstName: "Nimali", lastName: "Fernando", address: "45 Kandy Road, Peradeniya", grade: "Grade 11 - B", phone: "077-2345678", status: "Active" },
  { id: "STU-1003", firstName: "Amal", lastName: "Silva", address: "78 Main Street, Matara", grade: "Grade 9 - C", phone: "076-3456789", status: "Inactive" },
  { id: "STU-1004", firstName: "Dilini", lastName: "Jayawardena", address: "12 Temple Road, Kurunegala", grade: "Grade 12 - A", phone: "078-4567890", status: "Active" },
  { id: "STU-1005", firstName: "Ruwan", lastName: "Bandara", address: "90 Lake Drive, Anuradhapura", grade: "Grade 8 - B", phone: "070-5678901", status: "Active" },
  { id: "STU-1006", firstName: "Sachini", lastName: "Dissanayake", address: "34 Hill Street, Nuwara Eliya", grade: "Grade 10 - B", phone: "071-6789012", status: "Active" },
  { id: "STU-1007", firstName: "Tharindu", lastName: "Wickramasinghe", address: "56 Beach Road, Negombo", grade: "Grade 11 - A", phone: "077-7890123", status: "On Leave" },
  { id: "STU-1008", firstName: "Hiruni", lastName: "Rathnayake", address: "21 Park Avenue, Gampaha", grade: "Grade 7 - A", phone: "076-8901234", status: "Active" },
  { id: "STU-1009", firstName: "Sandun", lastName: "Karunaratne", address: "67 Station Road, Badulla", grade: "Grade 9 - A", phone: "078-9012345", status: "Active" },
  { id: "STU-1010", firstName: "Maleesha", lastName: "Gunasekara", address: "88 River Lane, Ratnapura", grade: "Grade 12 - B", phone: "070-0123456", status: "Inactive" },
];

const statusBadge = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
  "On Leave": "bg-yellow-100 text-yellow-700",
};

function Students() {
  const [students, setStudents] = useState(mockStudents);
  const [search, setSearch] = useState("");

  // Uncomment below to fetch from backend instead of using mock data
  // useEffect(() => {
  //   loadStudents();
  // }, []);
  //
  // const loadStudents = async () => {
  //   try {
  //     const result = await axios.get("http://localhost:8080/api/v1/student/getAll");
  //     setStudents(result.data);
  //   } catch (error) {
  //     console.error("Error loading students:", error);
  //   }
  // };

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

        {/* Student Table */}
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

      </div>
    </div>
  );
}

export default Students;