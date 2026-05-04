"use client";

import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

export default function PermissionsPage() {
  const { can, ready } = useAuth();

  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");

  const [openModal, setOpenModal] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);

  const [form, setForm] = useState({
    name: "",
  });

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 250);

    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    fetchPermissions();
  }, [debouncedSearch, page, sortField, sortOrder]);

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/permissions?search=${debouncedSearch}&page=${page}&sort=${sortField}&order=${sortOrder}`
      );

      setPermissions(res.data.permissions || []);
      setLastPage(res.data.meta?.last_page || 1);
    } catch {
      toast.error("Failed to load permissions");
    } finally {
      setLoading(false);
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
    setEditingPermission(null);
    setForm({ name: "" });
    setOpenModal(true);
  };

  const openEdit = (p) => {
    setEditingPermission(p);
    setForm({ name: p.name });
    setOpenModal(true);
  };

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!form.name) return toast.error("Name required");

    try {
      if (editingPermission) {
        await api.put(`/permissions/${editingPermission.id}`, form);
        toast.success("Permission updated");
      } else {
        await api.post("/permissions", form);
        toast.success("Permission created");
      }

      setOpenModal(false);
      fetchPermissions();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete permission?")) return;

    try {
      await api.delete(`/permissions/${id}`);
      toast.success("Deleted");
      fetchPermissions();
    } catch {
      toast.error("Failed");
    }
  };

  if (!ready) return null;

  return (
    <Layout>
      <div className="space-y-6">

        {/* HEADER (Stripe style) */}
        <div className="flex items-center justify-between border-b pb-4">

          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Permissions
            </h1>
            <p className="text-sm text-gray-500">
              Control system access rules
            </p>
          </div>

          <div className="flex gap-2 items-center">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search permissions..."
              className="border px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
            />

            {can("permissions.create") && (
              <button
                onClick={openCreate}
                className="bg-black text-white px-4 py-2 text-sm rounded-lg hover:bg-gray-800"
              >
                New
              </button>
            )}

          </div>
        </div>

        {/* TABLE */}
        <div className="border rounded-xl bg-white overflow-hidden">

          {/* HEADER */}
          <div className="grid grid-cols-3 bg-gray-50 text-xs uppercase text-gray-500 px-4 py-3">
            <div>#</div>

            <div
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </div>

            <div className="text-right">Actions</div>
          </div>

          {/* BODY */}
          {loading ? (
            <div className="p-4 text-sm text-gray-500">Loading...</div>
          ) : permissions.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">
              No permissions found
            </div>
          ) : (
            permissions.map((p, i) => (
              <div
                key={p.id}
                className="grid grid-cols-3 px-4 py-3 border-t text-sm hover:bg-gray-50"
              >

                <div className="text-gray-500">
                  {(page - 1) * 10 + i + 1}
                </div>

                <div className="font-medium text-gray-900">
                  {p.name}
                </div>

                <div className="flex justify-end gap-2">

                  {can("permissions.edit") && (
                    <button
                      onClick={() => openEdit(p)}
                      className="text-xs px-3 py-1 bg-gray-900 text-white rounded"
                    >
                      Edit
                    </button>
                  )}

                  {can("permissions.delete") && (
                    <button
                      onClick={() => handleDelete(p.id)}
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
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span>Page {page} / {lastPage}</span>

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
                {editingPermission ? "Edit Permission" : "Create Permission"}
              </h2>

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="border p-2 w-full rounded"
                placeholder="Permission name"
              />

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