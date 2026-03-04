import { memo, useState, type FormEvent } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import { donationsApi } from "../../services/api/misc";
import { useApi } from "../../hooks/useApi";
import type { Donation } from "../../types";

export default memo(function DonorDashboardPage() {
  const { user } = useAuth();
  const { data: donations, loading, refetch } = useApi(() => donationsApi.getAll());
  const [form, setForm] = useState({ amount: 1001, name: user?.name ?? "", email: user?.email ?? "" });
  const [msg, setMsg] = useState("");

  const handleDonate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await donationsApi.create(form);
      setMsg("Donation recorded! Thank you 🙏");
      refetch();
    } catch {
      setMsg("Failed to record donation.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d3b66] text-white px-6 py-4">
        <h1 className="text-xl font-bold">Donor Dashboard</h1>
        <p className="text-sm text-gray-300">Welcome, {user?.name}</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#0d3b66] mb-4">Make a Donation</h2>
            <form onSubmit={handleDonate} className="space-y-3">
              <input type="text" placeholder="Your Name" value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
              <input type="email" placeholder="Email" value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
              <div className="flex items-center gap-2">
                <span className="text-gray-500">₹</span>
                <input type="number" placeholder="Amount" value={form.amount} min={1}
                  onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))} required
                  className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
              </div>
              {msg && <p className="text-green-600 text-sm">{msg}</p>}
              <button type="submit" className="btn-primary w-full py-3">
                Donate ₹{form.amount.toLocaleString()}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#0d3b66] mb-4">Donation History</h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <div className="space-y-3">
                {(donations ?? []).slice(0, 10).map((d: Donation) => (
                  <div key={d._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-[#0d3b66]">₹{d.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{new Date(d.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      d.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {d.status}
                    </span>
                  </div>
                ))}
                {(donations ?? []).length === 0 && (
                  <p className="text-gray-500 text-sm">No donations yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
