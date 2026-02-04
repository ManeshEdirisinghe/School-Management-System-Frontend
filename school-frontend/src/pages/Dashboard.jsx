function Dashboard() {
  return (
    <div className="flex h-screen items-center justify-center bg-green-100">
      <div className="text-center p-10 bg-white shadow-lg rounded-xl">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Welcome!</h1>
        <p className="text-xl text-gray-700">You have successfully logged in.</p>
        <p className="mt-4 text-gray-500">This is the Dashboard Page.</p>
      </div>
    </div>
  );
}

export default Dashboard;