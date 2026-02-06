import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex">
     
      <Sidebar />

      <div className="flex-1 ml-64 p-10 bg-gray-100 min-h-screen">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard Overview</h1>
            <div className="bg-white px-4 py-2 rounded-lg shadow text-sm font-semibold text-gray-600">
                Welcome, Admin!
            </div>
        </header>
        
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm font-medium uppercase">Total Students</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">1,240</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm font-medium uppercase">Total Teachers</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">45</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm font-medium uppercase">Active Classes</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
          </div>

        </div>

        
        <div className="mt-10 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Activities</h2>
            <p className="text-gray-500">No recent activities found.</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;