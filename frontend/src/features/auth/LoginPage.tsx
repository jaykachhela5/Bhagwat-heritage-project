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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a5375] via-[#1788ac] to-[#8fc65b] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/60 bg-white/95 p-8 shadow-[0_24px_48px_rgba(10,83,117,0.18)] backdrop-blur-sm">
        <div className="mb-8 text-center">
          <img src="/images/logo.jpg" alt="Logo" className="mx-auto mb-3 h-16 w-16 rounded-full object-cover" />
          <h2 className="text-2xl font-bold text-[#0a5375]">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-1 text-sm text-[#5d7f8b]">Bhagwat Heritage Service Foundation Trust</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-[#dce9ee] bg-[#fffdf7] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ef9a1e]"
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-[#dce9ee] bg-[#fffdf7] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ef9a1e]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-[#dce9ee] bg-[#fffdf7] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ef9a1e]"
          />

          {msg && (
            <p className={`text-sm ${msg.includes("successful") ? "text-green-600" : "text-red-600"}`}>
              {msg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0f678c] py-3 font-semibold text-white transition-colors hover:bg-[#0a5375] disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size="sm" /> : null}
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="font-semibold text-[#0f678c] hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="font-semibold text-[#0f678c] hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>

        <p className="mt-3 text-center">
          <Link to="/" className="text-sm text-[#5d7f8b] hover:text-[#0f678c]">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
