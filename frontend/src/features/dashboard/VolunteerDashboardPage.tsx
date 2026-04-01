import { memo } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import { useApi } from "../../hooks/useApi";
import { volunteersApi } from "../../services/api/volunteers";

export default memo(function VolunteerDashboardPage() {
  const { user } = useAuth();
  const { data: volunteer, loading } = useApi(
    () => volunteersApi.getAll(),
    []
  );

  const myRecord = Array.isArray(volunteer)
    ? volunteer.find((v) => v.email === user?.email)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0f678c] text-white px-6 py-4">
        <h1 className="text-xl font-bold">Volunteer Dashboard</h1>
        <p className="text-sm text-gray-300">Welcome, {user?.name}</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {loading ? (
          <p>Loading...</p>
        ) : myRecord ? (
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#0f678c]/10 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-2xl text-[#0f678c]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0f678c]">{myRecord.fullName}</h2>
                <p className="text-gray-500">{myRecord.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Seva Area</p>
                <p className="font-semibold text-[#0f678c]">{myRecord.sevaArea}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <span className={`text-sm px-2 py-1 rounded-full font-semibold ${
                  myRecord.status === "Approved" ? "bg-green-100 text-green-700" :
                  myRecord.status === "Rejected" ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"}`}>
                  {myRecord.status}
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="font-semibold">{myRecord.phone}</p>
              </div>
              {myRecord.skills && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Skills</p>
                  <p className="font-semibold">{myRecord.skills}</p>
                </div>
              )}
            </div>

            {myRecord.adminNotes && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600 mb-1">Admin Notes</p>
                <p className="text-sm text-blue-800">{myRecord.adminNotes}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <p className="text-gray-500 mb-4">No volunteer application found for your account.</p>
            <a href="/volunteer" className="btn-primary">Apply to Volunteer</a>
          </div>
        )}
      </div>
    </div>
  );
});

