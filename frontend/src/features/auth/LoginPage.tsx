import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import { authApi } from "../../services/api/auth";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

type Mode = "login" | "signup";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      if (mode === "signup") {
        await authApi.signup({ name, email, password });
        setMsg("Signup successful! Please login.");
        setMode("login");
      } else {
        const res = await authApi.login({ email, password });
        const data = res.data;

        if (data.success && data.token) {
          login({
            id: "",
            name: data.name ?? "",
            email,
            role: data.role ?? "user",
            token: data.token,
          });

          const role = data.role ?? "user";
          if (role === "admin") navigate("/dashboard/admin");
          else if (role === "donor") navigate("/dashboard/donor");
          else if (role === "volunteer") navigate("/dashboard/volunteer");
          else navigate("/");
        } else {
          setMsg("Invalid email or password");
        }
      }
    } catch {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d3b66] to-[#1fa3b8] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img src="/images/logo.jpg" alt="Logo" className="h-16 w-16 rounded-full mx-auto mb-3 object-cover" />
          <h2 className="text-2xl font-bold text-[#0d3b66]">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">Bhagwat Heritage Service Foundation Trust</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
          />

          {msg && (
            <p className={`text-sm ${msg.includes("successful") ? "text-green-600" : "text-red-600"}`}>
              {msg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0d3b66] text-white py-3 rounded-lg font-semibold hover:bg-[#1a5276] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <LoadingSpinner size="sm" /> : null}
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-[#0d3b66] font-semibold hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-[#0d3b66] font-semibold hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>

        <p className="text-center mt-3">
          <Link to="/" className="text-sm text-gray-500 hover:text-[#0d3b66]">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
