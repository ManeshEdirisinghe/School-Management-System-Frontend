import Sidebar from "../components/Sidebar";

function Students() {
  // දැනට බොරු Data ටිකක් (පස්සේ Database එකෙන් ගමු)
  const students = [
    { id: 1, name: "Kasun Perera", age: 16, grade: "10-A" },
    { id: 2, name: "Nethmi De Silva", age: 15, grade: "9-B" },
    { id: 3, name: "Sithija Alwis", age: 17, grade: "11-C" },
  ];

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
                <th className="py-3 px-4 text-left">Age</th>
                <th className="py-3 px-4 text-left">Grade</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {students.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{student.id}</td>
                  <td className="py-3 px-4 font-medium">{student.name}</td>
                  <td className="py-3 px-4">{student.age}</td>
                  <td className="py-3 px-4 text-blue-600 font-bold">{student.grade}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-green-600 hover:underline mr-3">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Students;