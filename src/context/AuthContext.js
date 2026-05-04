"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import api from "@/lib/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setReady(true);
      return;
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    api.get("/me")
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setReady(true));
  }, []);

  const permissions = useMemo(() => {
    return user?.role?.permissions?.map((p) => p.name) || [];
  }, [user]);

  const isSuperAdmin = user?.role?.name?.toLowerCase() === "super admin";

  const can = (permission) => {
    if (!user) return false;
    if (isSuperAdmin) return true;
    return permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, ready, can, permissions, isSuperAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}