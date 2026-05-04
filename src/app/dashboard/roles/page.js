"use client";

import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

export default function RolesPage() {
  const { can, ready } = useAuth();

  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [permLoading, setPermLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");

  const [openModal, setOpenModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const [form, setForm] = useState({
    name: "",
    permissions: [],
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
    fetchRoles();
  }, [debouncedSearch, page, sortField, sortOrder]);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/roles?search=${debouncedSearch}&page=${page}&sort=${sortField}&order=${sortOrder}`
      );

      setRoles(res.data.roles || []);
      setLastPage(res.data.meta?.last_page || 1);
    } catch {
      toast.error("Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    setPermLoading(true);
    try {
      const res = await api.get("/permissions?all=1");
      setPermissions(res.data.permissions || []);
    } catch {
      toast.error("Failed to load permissions");
    } finally {
      setPermLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const openCreate = () => {
    setEditingRole(null);
    setForm({ name: "", permissions: [] });
    setOpenModal(true);
  };

  const openEdit = (role) => {
    setEditingRole(role);
    setForm({
      name: role.name,
      permissions: role.permissions?.map((p) => p.id) || [],
    });
    setOpenModal(true);
  };

  const togglePermission = (id) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(id)
        ? prev.permissions.filter((p) => p !== id)
        : [...prev.permissions, id],
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editingRole) {
        await api.put(`/roles/${editingRole.id}`, form);
        toast.success("Role updated");
      } else {
        await api.post("/roles", form);
        toast.success("Role created");
      }

      setOpenModal(false);
      fetchRoles();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this role?")) return;

    try {
      await api.delete(`/roles/${id}`);
      toast.success("Role deleted");
      fetchRoles();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (!ready) return null;

  return (
    <Layout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Roles</h1>
            <p className="text-sm text-gray-500">
              Manage roles & permissions
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search roles..."
              className="border px-3 py-2 text-sm rounded-lg"
            />

            {can("roles.create") && (
              <button
                onClick={openCreate}
                className="bg-black text-white px-4 py-2 text-sm rounded-lg"
              >
                New Role
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="border rounded-xl bg-white overflow-hidden">

          <div className="grid grid-cols-4 bg-gray-50 text-xs uppercase text-gray-500 px-4 py-3">
            <div>#</div>

            <div
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </div>

            <div>Permissions</div>
            <div className="text-right">Actions</div>
          </div>

          {/* BODY */}
          {loading ? (
            <div className="p-4 text-sm text-gray-500">Loading...</div>
          ) : roles.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No roles found</div>
          ) : (
            roles.map((r, i) => (
              <div
                key={r.id}
                className="grid grid-cols-4 px-4 py-3 border-t text-sm hover:bg-gray-50"
              >
                <div className="text-gray-500">
                  {(page - 1) * 10 + i + 1}
                </div>

                <div className="font-medium text-gray-900">{r.name}</div>

                <div className="flex flex-wrap gap-1">
                  {r.permissions?.slice(0, 3).map((p) => (
                    <span
                      key={p.id}
                      className="text-[10px] px-2 py-0.5 bg-gray-100 rounded"
                    >
                      {p.name}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end gap-2">

                  {can("roles.edit") && (
                    <button
                      onClick={() => openEdit(r)}
                      className="text-xs px-3 py-1 bg-gray-900 text-white rounded"
                    >
                      Edit
                    </button>
                  )}

                  {can("roles.delete") && (
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-xs px-3 py-1 bg-red-600 text-white rounded"
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
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <span>Page {page} / {lastPage}</span>

          <button
            disabled={page === lastPage}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>

        {/* MODAL */}
        {openModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white p-6 rounded-xl w-[420px] space-y-3">

              <h2 className="text-lg font-semibold">
                {editingRole ? "Edit Role" : "Create Role"}
              </h2>

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="border p-2 w-full rounded"
              />

              <div className="border rounded p-2 max-h-72 overflow-y-auto grid grid-cols-2 gap-2">

                {permLoading ? (
                  <p className="text-sm text-gray-500">Loading...</p>
                ) : (
                  permissions.map((p) => (
                    <label key={p.id} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={form.permissions.includes(p.id)}
                        onChange={() => togglePermission(p.id)}
                      />
                      {p.name}
                    </label>
                  ))
                )}

              </div>

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