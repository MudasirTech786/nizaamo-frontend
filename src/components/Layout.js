"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import api from "@/lib/api";

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, ready } = useAuth(); // ✅ USE GLOBAL AUTH

  const router = useRouter();
  const dropdownRef = useRef(null);

  // ✅ handle redirect AFTER auth is ready
  useEffect(() => {
    if (ready && !user) {
      router.replace("/login");
    }
  }, [ready, user]);

  // close dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.log("logout api failed", err?.message);
    }

    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // ✅ wait for auth (no flicker now because global)
  if (!ready) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      
      <Sidebar open={open} />

      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">

          <button
            onClick={() => setOpen(!open)}
            className="text-2xl font-semibold text-gray-700"
          >
            ☰
          </button>

          <div className="flex items-center gap-4 relative" ref={dropdownRef}>

            {/* Bell */}
            <button className="relative p-3 rounded-full bg-gray-800">
              <Bell size={20} className="text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 bg-gray-800 px-2 py-1.5 rounded-full"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-500 text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <span className="hidden sm:block text-sm text-white">
                {user?.name}
              </span>
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-14 w-60 bg-gray-900 text-white rounded-xl">

                <div className="p-4 border-b border-gray-700">
                  <p>{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>

                <div className="flex flex-col">
                  <button className="px-4 py-2 text-sm hover:bg-gray-800 text-left">
                    Profile
                  </button>

                  <button className="px-4 py-2 text-sm hover:bg-gray-800 text-left">
                    Settings
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 text-left"
                  >
                    Logout
                  </button>
                </div>

              </div>
            )}

          </div>
        </header>

        {/* CONTENT */}
        <main className="p-6 flex-1 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}