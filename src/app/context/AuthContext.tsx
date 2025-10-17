"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean; // State baru untuk menangani pengecekan status awal
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Mulai dengan status loading
  const router = useRouter();

  // Efek ini hanya berjalan sekali di sisi client saat aplikasi pertama kali dimuat
  useEffect(() => {
    try {
      // Periksa localStorage untuk melihat apakah user sudah login sebelumnya
      const storedLoginStatus = localStorage.getItem("isLoggedIn");
      if (storedLoginStatus === "true") {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Gagal mengakses localStorage:", error);
    } finally {
      setIsLoading(false); // Selesai memeriksa, matikan loading
    }
  }, []);

  const login = () => {
    localStorage.setItem("isLoggedIn", "true"); // Simpan status ke localStorage
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn"); // Hapus status dari localStorage
    setIsLoggedIn(false);
    router.push("/login"); // Arahkan kembali ke halaman login setelah logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
