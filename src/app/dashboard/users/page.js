"use client";

import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

export default function UsersPage() {
  const { can, ready } = useAuth();

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
  });

  // debounce
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 250);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch, page]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/users?search=${debouncedSearch}&page=${page}`
      );
      setUsers(res.data.users || []);
      setLastPage(res.data.meta?.last_page || 1);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await api.get("/roles?all=true");
      setRoles(res.data.roles || []);
    } catch {
      toast.error("Failed to load roles");
    }
  };

  const openCreate = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", password: "", role_id: "" });
    setOpenModal(true);
  };

  const openEdit = (u) => {
    setEditingUser(u);
    setForm({
      name: u.name,
      email: u.email,
      password: "",
      role_id: u.role_id ? Number(u.role_id) : "",
    });
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, {
          name: form.name,
          email: form.email,
          role_id: Number(form.role_id),
        });
        toast.success("User updated");
      } else {
        await api.post("/users", {
          ...form,
          role_id: Number(form.role_id),
        });
        toast.success("User created");
      }

      setOpenModal(false);
      fetchUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  if (!ready) return null;

  return (
    <Layout>
      <div className="space-y-6">

        {/* PAGE HEADER (Stripe style) */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
            <p className="text-sm text-gray-500">
              Manage users, roles and permissions
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="border px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
            />

            {can("user.create") && (
              <button
                onClick={openCreate}
                className="bg-black text-white px-4 py-2 text-sm rounded-lg hover:bg-gray-800"
              >
                New User
              </button>
            )}
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="border rounded-xl bg-white overflow-hidden">

          {/* HEADER */}
          <div className="grid grid-cols-4 bg-gray-50 text-xs uppercase text-gray-500 px-4 py-3">
            <div>#</div>
            <div>Name</div>
            <div>Email</div>
            <div className="text-right">Actions</div>
          </div>

          {/* BODY */}
          {loading ? (
            <div className="p-4 text-sm text-gray-500">Loading...</div>
          ) : users.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No users found</div>
          ) : (
            users.map((u, i) => (
              <div
                key={u.id}
                className="grid grid-cols-4 px-4 py-3 border-t text-sm hover:bg-gray-50"
              >
                <div className="text-gray-500">
                  {(page - 1) * 10 + i + 1}
                </div>
                <div className="font-medium text-gray-900">{u.name}</div>
                <div className="text-gray-600">{u.email}</div>

                <div className="flex justify-end gap-2">

                  {can("user.edit") && (
                    <button
                      onClick={() => openEdit(u)}
                      className="text-xs px-3 py-1 rounded bg-gray-900 text-white"
                    >
                      Edit
                    </button>
                  )}

                  {can("user.delete") && (
                    <button
                      className="text-xs px-3 py-1 rounded bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  )}

                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between text-sm text-gray-500">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span>
            Page {page} / {lastPage}
          </span>

          <button
            disabled={page === lastPage}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>

        {/* MODAL */}
        {openModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white p-6 rounded-xl w-[420px] space-y-3">

              <h2 className="text-lg font-semibold">
                {editingUser ? "Edit User" : "Create User"}
              </h2>

              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="border p-2 w-full rounded"
              />

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="border p-2 w-full rounded"
              />

              {!editingUser && (
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              )}

              {/* ROLE CONTROL */}
              <select
                value={form.role_id}
                onChange={(e) =>
                  setForm({ ...form, role_id: e.target.value })
                }
                disabled={editingUser && !can("user.change.role")}
                className="border p-2 w-full rounded"
              >
                <option value="">Select Role</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-2 pt-2">

                <button
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-black text-white rounded-lg"
                >
                  Save
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </Layout>
  );
}