"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  Building2,
  Package,
  ShoppingCart,
  DollarSign,
  Settings,
  ChevronDown,
} from "lucide-react";

export default function Sidebar({ open }) {
  const pathname = usePathname();

  const { can, ready } = useAuth();

  const [activeMenu, setActiveMenu] = useState(null);

  // AUTO OPEN MENU BASED ON ROUTE
  useEffect(() => {
    if (pathname.includes("/users")) setActiveMenu("users");
    else if (pathname.includes("/employees")) setActiveMenu("hr");
    else if (pathname.includes("/products")) setActiveMenu("inventory");
    else if (pathname.includes("/payrolls")) setActiveMenu("payroll");
  }, [pathname]);

  // CLOSE submenu when sidebar collapses
  useEffect(() => {
    if (!open) setActiveMenu(null);
  }, [open]);

  const toggleMenu = (menu) => {
    if (!open) return;
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const isActive = (path) => pathname === path;

  const menuClass = (path) =>
    `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${isActive(path)
      ? "bg-[#2165e8] text-white"
      : "text-white hover:bg-[#2165e8] hover:text-white hover:scale-[1.02]"
    }`;

  const subMenuClass = (path) =>
    `block px-3 py-2 rounded-md transition ${isActive(path)
      ? "bg-[#2165e8] text-white"
      : "text-white hover:bg-[#2165e8] hover:text-white"
    }`;

  // ✅ FIX: prevent UI jump but keep logic safe
  if (!ready) {
    return (
      <div
        className={`h-screen transition-all duration-300 ${open ? "w-64" : "w-20"
          } bg-[#2a2a38] border-r border-white/10 flex flex-col`}
      />
    );
  }

  return (
    <div
      className={`h-screen transition-all duration-300 ${open ? "w-64" : "w-20"
        } bg-[#2a2a38] border-r border-white/10 flex flex-col`}
    >
      {/* HEADER */}
      <div className="flex flex-col items-center px-4 py-6">
        <div className="flex justify-center w-full">
          <img
            src={open ? "/images/Header.png" : "/images/icon.png"}
            alt="Logo"
            className="transition-all duration-300"
          />
        </div>

        <div className="w-full h-px bg-gray-400 mt-5" />
      </div>

      {/* MENU */}
      <div className="flex-1 px-3 space-y-2">

        {/* DASHBOARD */}
        <Link href="/dashboard" className={menuClass("")}>
          <div className="flex items-center gap-4">
            <LayoutDashboard size={20} />
            {open && <span>Dashboard</span>}
          </div>
        </Link>

        {/* USERS */}
        {can("users.view") && (
          <div>
            <div
              onClick={() => toggleMenu("users")}
              className={menuClass("/users")}
            >
              <div className="flex items-center gap-4">
                <Users size={20} />
                {open && <span>Users & Roles</span>}
              </div>

              {open && (
                <ChevronDown
                  size={16}
                  className={`transition ${activeMenu === "users" ? "rotate-180" : ""
                    }`}
                />
              )}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${open && activeMenu === "users"
                  ? "max-h-40 opacity-100 mt-2"
                  : "max-h-0 opacity-0"
                }`}
            >
              <div className="ml-12 border-l border-white/10 pl-4 space-y-2 text-sm">

                {can("users.view") && (
                  <Link href="/dashboard/users" className={subMenuClass("/users")}>
                    Users
                  </Link>
                )}

                {can("roles.view") && (
                  <Link href="/dashboard/roles" className={subMenuClass("/roles")}>
                    Roles
                  </Link>
                )}

                {can("permissions.view") && (
                  <Link href="/dashboard/permissions" className={subMenuClass("/permissions")}>
                    Permissions
                  </Link>
                )}

              </div>
            </div>
          </div>
        )}

        {/* HR */}
        {can("employee.view") && (
          <div>
            <div
              onClick={() => toggleMenu("hr")}
              className={menuClass("/employees")}
            >
              <div className="flex items-center gap-4">
                <Building2 size={20} />
                {open && <span>HR</span>}
              </div>

              {open && (
                <ChevronDown
                  size={16}
                  className={`transition ${activeMenu === "hr" ? "rotate-180" : ""
                    }`}
                />
              )}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${open && activeMenu === "hr"
                  ? "max-h-40 opacity-100 mt-2"
                  : "max-h-0 opacity-0"
                }`}
            >
              <div className="ml-12 border-l border-white/10 pl-4 space-y-2 text-sm">

                {can("employee.view") && (
                  <Link href="/employees">Employees</Link>
                )}

                {can("attendance.view") && (
                  <Link href="/attendance">Attendance</Link>
                )}

                {can("leave.view") && (
                  <Link href="/leaves">Leaves</Link>
                )}

                {can("performance.view") && (
                  <Link href="/performance">Performance</Link>
                )}

              </div>
            </div>
          </div>
        )}

        {/* INVENTORY */}
        {can("product.view") && (
          <div>
            <div
              onClick={() => toggleMenu("inventory")}
              className={menuClass("/products")}
            >
              <div className="flex items-center gap-4">
                <Package size={20} />
                {open && <span>Inventory</span>}
              </div>

              {open && (
                <ChevronDown
                  size={16}
                  className={`transition ${activeMenu === "inventory" ? "rotate-180" : ""
                    }`}
                />
              )}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${open && activeMenu === "inventory"
                  ? "max-h-40 opacity-100 mt-2"
                  : "max-h-0 opacity-0"
                }`}
            >
              <div className="ml-12 border-l border-white/10 pl-4 space-y-2 text-sm">

                {can("product.view") && (
                  <Link href="/products">Products</Link>
                )}

                {can("category.view") && (
                  <Link href="/categories">Categories</Link>
                )}

                {can("supplier.view") && (
                  <Link href="/suppliers">Suppliers</Link>
                )}

                {can("stock.view") && (
                  <Link href="/stock">Stock</Link>
                )}

              </div>
            </div>
          </div>
        )}

        {/* PURCHASES */}
        {can("purchase.view") && (
          <Link href="/purchases" className={menuClass("/purchases")}>
            <div className="flex items-center gap-4">
              <ShoppingCart size={20} />
              {open && <span>Purchases</span>}
            </div>
          </Link>
        )}

        {/* PAYROLL */}
        {can("payroll.view") && (
          <Link href="/payrolls" className={menuClass("/payrolls")}>
            <div className="flex items-center gap-4">
              <DollarSign size={20} />
              {open && <span>Payroll</span>}
            </div>
          </Link>
        )}

        {/* SETTINGS */}
        {can("settings.view") && (
          <Link href="/settings" className={menuClass("/settings")}>
            <div className="flex items-center gap-4">
              <Settings size={20} />
              {open && <span>Settings</span>}
            </div>
          </Link>
        )}

      </div>

      {/* FOOTER */}
      <div className="p-4">
        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-[#2165e8]" />
          {open && (
            <div>
              <p className="text-sm text-white">Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}