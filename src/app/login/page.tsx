"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { User, Lock, ArrowRight, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

// ==========================================================
// 1️⃣ BACKGROUND — Optimized Aurora Orbs
// ==========================================================
const InteractiveBackground = memo(() => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty(
            "--mouse-x",
            `${(e.clientX / window.innerWidth) * 100}%`
          );
          document.documentElement.style.setProperty(
            "--mouse-y",
            `${(e.clientY / window.innerHeight) * 100}%`
          );
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const orbColor = isDark ? ["#4c1d95", "#1e1b4b"] : ["#a5b4fc", "#bae6fd"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbColor.map((color, i) => (
        <div
          key={i}
          className="absolute w-[400px] h-[400px] rounded-full opacity-40 blur-3xl transition-transform duration-500"
          style={{
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            top:
              i === 0
                ? "calc(var(--mouse-y) - 200px)"
                : "calc(100% - var(--mouse-y) - 200px)",
            left:
              i === 0
                ? "calc(var(--mouse-x) - 200px)"
                : "calc(100% - var(--mouse-x) - 200px)",
            transitionDelay: i === 1 ? "0.2s" : "0s",
          }}
        />
      ))}
    </div>
  );
});
InteractiveBackground.displayName = "InteractiveBackground";

// ==========================================================
// 2️⃣ FORM LOGIN — Clean UI + Optimized Validation
// ==========================================================
const LoginForm = memo(({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Isi semua kolom terlebih dahulu.");
      return;
    }
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      if (form.username === "smkn2surabaya" && form.password === "123456") {
        onLoginSuccess();
      } else {
        setError("Username atau password salah.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 w-full max-w-md"
    >
      <div
        className={`rounded-2xl p-8 border backdrop-blur-md shadow-2xl transition-all duration-500 ${
          isDark
            ? "bg-slate-900/60 border-slate-700/60"
            : "bg-white/70 border-slate-200/80"
        }`}
      >
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg ${
              isDark
                ? "bg-gradient-to-br from-indigo-600 to-purple-600"
                : "bg-gradient-to-br from-blue-500 to-cyan-400"
            }`}
          >
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1
            className={`text-3xl font-bold mb-1 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Login Sekarang
          </h1>
          <p
            className={`text-sm ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["username", "password"].map((field) => (
            <div key={field} className="relative">
              {field === "username" ? (
                <User className="absolute left-4 top-3.5 text-slate-400" />
              ) : (
                <Lock className="absolute left-4 top-3.5 text-slate-400" />
              )}
              <input
                type={field === "password" && !showPass ? "password" : "text"}
                name={field}
                value={form[field as "username" | "password"]}
                onChange={handleChange}
                placeholder={field === "username" ? "Username" : "Password"}
                className={`w-full rounded-xl pl-12 pr-12 py-3 bg-transparent border text-sm focus:outline-none transition-all ${
                  isDark
                    ? "border-slate-600 text-white focus:border-indigo-400"
                    : "border-slate-300 text-slate-900 focus:border-blue-400"
                }`}
              />
              {field === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-3 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
          ))}

          {error && (
            <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 mt-2 rounded-xl font-semibold text-white flex items-center justify-center gap-2 relative overflow-hidden transition-all ${
              isDark
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400"
            } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Masuk</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
});
LoginForm.displayName = "LoginForm";

// ==========================================================
// 3️⃣ MODAL SUKSES LOGIN — Simpler Animation
// ==========================================================
const LoginSuccessModal = memo(
  ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-slate-900/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-2xl max-w-sm w-full border border-slate-200 dark:border-slate-700"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
              Login Berhasil!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Selamat datang kembali! Anda akan diarahkan sebentar lagi.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition"
            >
              Lanjutkan
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
);
LoginSuccessModal.displayName = "LoginSuccessModal";

// ==========================================================
// 4️⃣ MAIN PAGE
// ==========================================================
export default function LoginPage() {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const { resolvedTheme } = useTheme();
  const { login } = useAuth();
  const router = useRouter();

  const handleLoginSuccess = useCallback(() => {
    login(); // Panggil fungsi login dari context
    setIsLoginSuccess(true);
    // Secara otomatis arahkan ke halaman utama setelah 1.5 detik
    setTimeout(() => {
      router.push("/");
    }, 1500);
  }, [login, router]);

  const handleCloseModalAndRedirect = useCallback(() => {
    setIsLoginSuccess(false);
    router.push("/");
  }, [router]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-700 ${
        resolvedTheme === "dark" ? "bg-slate-950" : "bg-sky-100"
      }`}
    >
      <InteractiveBackground />
      <LoginForm onLoginSuccess={handleLoginSuccess} />
      <LoginSuccessModal
        isOpen={isLoginSuccess}
        onClose={handleCloseModalAndRedirect}
      />
    </div>
  );
}
