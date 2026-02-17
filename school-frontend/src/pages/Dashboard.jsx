import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaDollarSign,
  FaCalendarAlt,
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaChartBar,
  FaClock,
  FaMoneyBillWave,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";
import api, { endpoints } from "../services/api";

// ─── Mock Data ───────────────────────────────────────────────
const colorMap = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-500" },
  green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-500" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-500" },
  orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-500" },
};

const recentActivities = [
  { text: "New student Kasun Perera enrolled in Grade 10 - A", time: "2 hours ago", type: "student" },
  { text: "Teacher Nimal Rajapaksa updated Grade 11 - B marks", time: "4 hours ago", type: "teacher" },
  { text: "Class Grade 9 - C schedule was modified", time: "6 hours ago", type: "class" },
  { text: "Fee payment of LKR 25,000 received from STU-1002", time: "8 hours ago", type: "payment" },
  { text: "New teacher Mrs. Kumari joined Mathematics dept.", time: "1 day ago", type: "teacher" },
  { text: "Annual exam timetable published for Term 2", time: "1 day ago", type: "class" },
];

const upcomingEvents = [
  { title: "Parent-Teacher Meeting", date: "Feb 15, 2026", tag: "Meeting" },
  { title: "Term 2 Examinations Begin", date: "Feb 20, 2026", tag: "Exam" },
  { title: "Science Fair", date: "Mar 01, 2026", tag: "Event" },
  { title: "Sports Day", date: "Mar 10, 2026", tag: "Event" },
];

const attendanceData = [
  { day: "Mon", percent: 92 },
  { day: "Tue", percent: 88 },
  { day: "Wed", percent: 95 },
  { day: "Thu", percent: 78 },
  { day: "Fri", percent: 91 },
];

const tagColor = {
  Meeting: "bg-blue-100 text-blue-700",
  Exam: "bg-red-100 text-red-700",
  Event: "bg-green-100 text-green-700",
};

const activityIcon = {
  student: <FaUserGraduate className="text-blue-500" />,
  teacher: <FaChalkboardTeacher className="text-green-500" />,
  class: <FaSchool className="text-purple-500" />,
  payment: <FaMoneyBillWave className="text-orange-500" />,
};

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState(null);
  
  const [recentStudents, setRecentStudents] = useState([]);
  const [loadingRecentStudents, setLoadingRecentStudents] = useState(true);
  const [errorRecentStudents, setErrorRecentStudents] = useState(null);

  useEffect(() => {
    loadStats();
    loadRecentStudents();
  }, []);

  const loadStats = async () => {
    try {
      setLoadingStats(true);
      setErrorStats(null);
      const result = await api.get(endpoints.dashboard.getStats);
       to match component structure
      const statsData = [
        { 
          title: "Total Students", 
          value: result.data.totalStudents?.toString() || "0", 
          change: result.data.studentsChange || "+0%", 
          up: result.data.studentsChange?.startsWith("+") || false, 
          icon: <FaUserGraduate />, 
          color: "blue" 
        },
        { 
          title: "Total Teachers", 
          value: result.data.totalTeachers?.toString() || "0", 
          change: result.data.teachersChange || "+0%", 
          up: result.data.teachersChange?.startsWith("+") || false, 
          icon: <FaChalkboardTeacher />, 
          color: "green" 
        },
        { 
          title: "Active Classes", 
          value: result.data.activeClasses?.toString() || "0", 
          change: result.data.classesChange || "+0%", 
          up: result.data.classesChange?.startsWith("+") || false, 
          icon: <FaSchool />, 
          color: "purple" 
        },
        { 
          title: "Revenue (LKR)", 
          value: result.data.revenue || "0", 
          change: result.data.revenueChange || "+0%", 
          up: result.data.revenueChange?.startsWith("+") || false, 
          icon: <FaDollarSign />, 
          color: "orange" 
        },
      ];
      
      setStats(statsData);
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
      setErrorStats("Failed to load statistics. Please try again later.");
    } finally {
      setLoadingStats(false);
    }
  };

  const loadRecentStudents = async () => {
    try {
      setLoadingRecentStudents(true);
      setErrorRecentStudents(null);
      const result = await api.get(endpoints.dashboard.getRecentStudents);
      setRecentStudents(result.data);
    } catch (error) {
      console.error("Error loading recent students:", error);
      setErrorRecentStudents("Failed to load recent students. Please try again later.");
    } finally {
      setLoadingRecentStudents(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3"><FaChartBar className="text-blue-500" /> Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back, Admin! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition">
              <FaBell className="text-gray-600 text-lg" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </button>
            <div className="bg-white px-4 py-2 rounded-lg shadow text-sm font-semibold text-gray-600">
              <FaCalendarAlt className="inline mr-1" /> {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "short", day: "numeric" })}
            </div>
          </div>
        </header>

        {/* Loading State for Stats */}
        {loadingStats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center" style={{ height: "140px" }}>
                <FaSpinner className="text-blue-500 text-3xl animate-spin" />
              </div>
            ))}
          </div>
        )}

        {/* Error State for Stats */}
        {errorStats && !loadingStats && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 flex items-start gap-4">
            <FaExclamationTriangle className="text-red-500 text-2xl flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-red-800 font-semibold mb-1">Error Loading Statistics</h3>
              <p className="text-red-600 text-sm mb-3">{errorStats}</p>
              <button 
                onClick={loadStats}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Stat Cards */}
        {!loadingStats && !errorStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => {
            const c = colorMap[s.color];
            return (
              <div key={i} className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${c.border} hover:shadow-lg transition`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium uppercase">{s.title}</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{s.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${c.bg}`}>
                    <span className={`text-xl ${c.text}`}>{s.icon}</span>
                  </div>
                </div>
                <p className={`text-sm mt-3 flex items-center gap-1 ${s.up ? "text-green-600" : "text-red-500"}`}>
                  {s.up ? <FaArrowUp /> : <FaArrowDown />} {s.change} <span className="text-gray-400 ml-1">vs last month</span>
                </p>
              </div>
            );
          })}
        </div>
        )}

        {/* Middle Row — Attendance Chart + Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Attendance (simple bar chart) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2"><FaChartBar className="text-blue-500" /> Weekly Attendance</h2>
            <div className="flex items-end gap-4" style={{ height: "200px" }}>
              {attendanceData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                  <span className="text-xs font-semibold text-gray-600 mb-1">{d.percent}%</span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-300 transition-all duration-500"
                    style={{ height: `${d.percent}%`, minHeight: "4px" }}
                  />
                  <span className="text-xs text-gray-500 mt-2 font-medium">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" /> Upcoming Events
            </h2>
            <ul className="space-y-4">
              {upcomingEvents.map((ev, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 font-bold text-sm shrink-0">
                    {ev.date.split(" ")[1].replace(",", "")}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-700 text-sm">{ev.title}</p>
                    <p className="text-xs text-gray-400">{ev.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${tagColor[ev.tag]}`}>{ev.tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Row — Recent Students + Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Students Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2"><FaUserGraduate className="text-blue-500" /> Recently Enrolled Students</h2>
            </div>
            
            {/* Loading State */}
            {loadingRecentStudents && (
              <div className="p-12 flex flex-col items-center justify-center">
                <FaSpinner className="text-blue-500 text-3xl animate-spin mb-4" />
                <p className="text-gray-600 text-sm">Loading recent students...</p>
              </div>
            )}
            
            {/* Error State */}
            {errorRecentStudents && !loadingRecentStudents && (
              <div className="p-6 flex items-start gap-4">
                <FaExclamationTriangle className="text-red-500 text-xl flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-red-600 text-sm mb-3">{errorRecentStudents}</p>
                  <button 
                    onClick={loadRecentStudents}
                    className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition text-sm font-medium"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
            
            {/* Data Table */}
            {!loadingRecentStudents && !errorRecentStudents && (
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
                  <th className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                  <th className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase">Class</th>
                  <th className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="py-3 px-5 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentStudents.length > 0 ? (
                  recentStudents.map((st, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-5 text-sm text-gray-600 font-mono">{st.id}</td>
                      <td className="py-3 px-5 text-sm font-medium text-gray-800">{st.name}</td>
                      <td className="py-3 px-5 text-sm text-gray-600">{st.grade}</td>
                      <td className="py-3 px-5 text-sm text-gray-500">{st.date}</td>
                      <td className="py-3 px-5 text-center">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            st.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {st.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">
                      No recent students enrolled.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            )}
          </div>

          {/* Activity Feed */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2"><FaClock className="text-blue-500" /> Recent Activity</h2>
            <ul className="space-y-4">
              {recentActivities.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{activityIcon[a.type]}</span>
                  <div>
                    <p className="text-sm text-gray-700">{a.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-sm text-gray-400">
          School Management System &copy; {new Date().getFullYear()} — All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;