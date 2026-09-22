"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#14181C" }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 rounded-lg"
        style={{ background: "#1D2329" }}
      >
        <h1 className="text-xl font-bold mb-1" style={{ color: "#EAE6DB" }}>NEC login</h1>
        <p className="text-sm mb-6" style={{ color: "#7FA6B8" }}>Employee &amp; admin access</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-3 rounded-sm outline-none"
          style={{ background: "#14181C", color: "#EAE6DB", border: "1px solid #3E6E86" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-sm outline-none"
          style={{ background: "#14181C", color: "#EAE6DB", border: "1px solid #3E6E86" }}
        />
        {error && <p className="text-sm mb-4" style={{ color: "#E1553F" }}>{error}</p>}
        <button
          disabled={loading}
          className="w-full py-3 rounded-sm text-sm font-semibold disabled:opacity-50"
          style={{ background: "#B5652D", color: "#EAE6DB" }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
