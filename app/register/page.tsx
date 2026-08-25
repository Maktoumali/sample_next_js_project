"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Box, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
      });

      if (res.ok) {
        toast.success("Account created successfully! Please log in.");
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create account");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-white font-sans selection:bg-[#333] selection:text-white">
      <div className="w-full max-w-[360px] flex flex-col items-center">
        {/* Logo Section */}
        <div className="w-12 h-12 bg-[#111] border border-[#222] rounded-sm flex items-center justify-center mb-6 shadow-sm">
          <Box className="w-6 h-6 text-[#888]" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-xl font-bold tracking-tight mb-2">TECH_MONO</h1>
        <p className="text-[#888] text-sm mb-10">Create a new account</p>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {error && (
            <div className="bg-red-950/50 border border-red-900/50 text-red-500 text-xs p-3 rounded-sm text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-[#888] uppercase tracking-widest pl-1">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                required
                className="w-full bg-[#111] border border-[#222] text-[#eee] text-sm rounded-sm pl-10 pr-4 py-3 focus:outline-none focus:border-[#444] transition-colors placeholder:text-[#444]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-[#888] uppercase tracking-widest pl-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-[#111] border border-[#222] text-[#eee] text-sm rounded-sm pl-10 pr-4 py-3 focus:outline-none focus:border-[#444] transition-colors placeholder:text-[#444]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-[#888] uppercase tracking-widest pl-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#111] border border-[#222] text-[#eee] text-sm rounded-sm pl-10 pr-4 py-3 focus:outline-none focus:border-[#444] transition-colors placeholder:text-[#444]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ededed] text-black hover:bg-white transition-colors py-3 rounded-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="font-mono text-xs font-bold tracking-widest uppercase">
              {isLoading ? "Creating account..." : "Sign Up"}
            </span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>

          <div className="flex justify-center items-center mt-2">
            <span className="text-[#888] text-[10px] font-mono tracking-widest uppercase">
              Already have an account?{" "}
            </span>
            <Link href="/login" className="text-[#eee] text-[10px] font-mono tracking-widest uppercase ml-2 hover:text-white underline decoration-[#555] underline-offset-4 transition-colors">
              Sign In
            </Link>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-12 text-[10px] font-mono tracking-widest text-[#555]">
          Protected by TECH_MONO Core Protocol
        </p>
      </div>
    </div>
  );
}
