import { useState } from "react";
import { supabase } from "../supabase";
import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

export default function AdminLogin() {
  const { user, loading } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // WAIT until auth is known
  if (loading) {
    return <p className="p-6">Loading admin session...</p>;
  }

  // Already logged in → redirect
  if (user) {
    return <Navigate to="/admin" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          SnapIt Events – Admin Login
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full border p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          Login
        </button>
      </form>
    </div>
  );
}
