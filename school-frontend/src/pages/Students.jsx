import { useEffect, useState } from "react";
import axios from "axios"; // Data ගෙන්නගන්න මෙයා ඕනේ
import Sidebar from "../components/Sidebar";

function Students() {
  const [students, setStudents] = useState([]);

  // Page එක Load වෙද්දිම Data ගෙන්නගන්න
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      // Backend එකෙන් Data ඉල්ලනවා (URL එක හරියට බලන්න)
      const result = await axios.get("http://localhost:8080/api/v1/student/getAll");
      setStudents(result.data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-10 bg-gray-100 min-h-screen">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">🎓 Student Management</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Add New Student
          </button>
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {students.map((student, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  {/* 1. ID එක */}
                  <td className="py-3 px-4">{student.studentId || student.id}</td>

                  {/* 2. Name එක (First Name සහ Last Name එකතු කරලා) */}
                  <td className="py-3 px-4 font-medium">
                    {student.firstName} {student.lastName}
                  </td>

                  {/* 3. Address එක */}
                  <td className="py-3 px-4">{student.address}</td>

                  <td className="py-3 px-4 text-center">
                    <button className="text-green-600 hover:underline mr-3">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Data නැත්නම් පෙන්නන්න පණිවිඩයක් */}
          {students.length === 0 && (
            <p className="text-center p-5 text-gray-500">No students found yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Students;