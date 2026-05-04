"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      const res = await api.post("/register", form);
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* 📱 Mobile fallback */}
      <div className="absolute inset-0 md:hidden bg-[url('/images/fallback.jpg')] bg-cover bg-center"></div>

      {/* 🎥 Background Video (ALL DEVICES like login page) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/world.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/25 z-10"></div>

      {/* 📦 Center Content */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-4 sm:px-6">

        {/* ✨ Glow (responsive like login) */}
        <div className="absolute w-[280px] sm:w-[380px] md:w-[420px] h-[280px] sm:h-[380px] md:h-[420px] bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>

        {/* 📦 Card */}
        <div className="
          relative w-full
          max-w-xs sm:max-w-sm md:max-w-md
          p-5 sm:p-6 md:p-7
          rounded-2xl
          bg-white/20 backdrop-blur-xl
          border border-white/30
          shadow-[0_0_50px_rgba(0,150,255,0.35)]
        ">

          {/* 🖼️ Logo (same sizing as login) */}
          <div className="flex justify-center mb-5 sm:mb-6">
            <Image
              src="/images/Header.png"
              alt="Logo"
              width={220}
              height={140}
              className="w-44 sm:w-56 md:w-64 lg:w-72 h-auto drop-shadow-lg"
            />
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl mb-5 font-bold text-center text-white">
            Create Account
          </h1>

          {/* Inputs */}
          {["name", "email", "password"].map((field) => (
            <input
              key={field}
              className="
                w-full mb-3 p-3 rounded-lg
                bg-white/10 text-white
                border border-white/20
                placeholder:text-gray-300
                focus:outline-none
                focus:ring-2 focus:ring-blue-400
                transition
              "
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              type={field === "password" ? "password" : "text"}
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value })
              }
            />
          ))}

          {/* Register Button */}
          <button
            onClick={register}
            className="
              w-full p-3 mt-2 rounded-lg
              bg-blue-500 hover:bg-blue-600
              shadow-[0_0_20px_rgba(0,150,255,0.7)]
              text-white font-semibold
              transition-all duration-300
            "
          >
            Register
          </button>

          {/* Login Link */}
          <button
            onClick={() => router.push("/login")}
            className="mt-4 text-sm text-blue-300 w-full hover:underline"
          >
            Already have an account? Login
          </button>

        </div>
      </div>
    </div>
  );
} 