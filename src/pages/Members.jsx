import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const seedMembers = [
  { id: 2001, name: "Ali Raza", email: "ali@gym.com", plan: "3 Months", start: "2025-07-01", end: "2025-10-01", status: "Active" },
  { id: 2002, name: "Sara Khan", email: "sara@gym.com", plan: "1 Month", start: "2025-06-20", end: "2025-07-20", status: "Expired" },
  { id: 2003, name: "Hassan Ahmed", email: "hassan@gym.com", plan: "Annual", start: "2025-01-01", end: "2025-12-31", status: "Suspended" },
];

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Expired: "bg-gray-200 text-gray-700",
  Suspended: "bg-red-100 text-red-700",
};

const pageSize = 5;

const Members = () => {
  const [members, setMembers] = useState(seedMembers);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  // Modal states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    plan: "1 Month",
    start: "",
    end: "",
    status: "Active",
  });

  // Delete confirm
  const [showDelete, setShowDelete] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  // ---- Helpers ----
  const resetForm = () =>
    setForm({
      name: "",
      email: "",
      plan: "1 Month",
      start: "",
      end: "",
      status: "Active",
    });

  // ---- Filter / pagination ----
  const filtered = useMemo(() => {
    let data = [...members];
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          String(m.id).includes(q)
      );
    }
    if (status !== "All") data = data.filter((m) => m.status === status);
    return data;
  }, [members, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page]
  );

  // ---- CRUD ----
  const openAdd = () => {
    resetForm();
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (m) => {
    setForm({ ...m });
    setEditingId(m.id);
    setShowForm(true);
  };

  const saveMember = () => {
    // Basic validation
    if (!form.name || !form.email || !form.start || !form.end) {
      alert("Please fill all required fields!");
      return;
    }

    if (editingId) {
      setMembers((prev) =>
        prev.map((m) => (m.id === editingId ? { ...m, ...form } : m))
      );
    } else {
      const newId = members.length ? members[members.length - 1].id + 1 : 2001;
      setMembers((prev) => [...prev, { id: newId, ...form }]);
    }

    setShowForm(false);
    resetForm();
    setEditingId(null);
  };

  const confirmDelete = (id) => {
    setToDeleteId(id);
    setShowDelete(true);
  };

  const deleteMember = () => {
    setMembers((prev) => prev.filter((m) => m.id !== toDeleteId));
    setShowDelete(false);
    setToDeleteId(null);
  };

  const toggleSuspend = (id) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: m.status === "Suspended" ? "Active" : "Suspended",
            }
          : m
      )
    );
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Members</h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={openAdd}
        >
          + Add Member
        </motion.button>
      </div>

      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="bg-white border rounded-lg shadow p-4 mb-4 flex flex-col md:flex-row gap-3 md:items-center"
      >
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by id, name, email..."
            className="pl-9 pr-3 py-2 border rounded w-72 focus:ring-2 focus:ring-red-500"
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-red-500"
        >
          <option>All</option>
          <option>Active</option>
          <option>Expired</option>
          <option>Suspended</option>
        </select>
      </motion.div>

      {/* Table */}
      <div className="bg-white border rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left py-2 px-4">#ID</th>
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Email</th>
              <th className="text-left py-2 px-4">Plan</th>
              <th className="text-left py-2 px-4">Start</th>
              <th className="text-left py-2 px-4">End</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No members found
                  </td>
                </tr>
              ) : (
                paged.map((m) => (
                  <motion.tr
                    key={m.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.12 }}
                    className="border-t"
                  >
                    <td className="py-2 px-4">{m.id}</td>
                    <td className="py-2 px-4 font-medium">{m.name}</td>
                    <td className="py-2 px-4 text-gray-500">{m.email}</td>
                    <td className="py-2 px-4">{m.plan}</td>
                    <td className="py-2 px-4">{m.start}</td>
                    <td className="py-2 px-4">{m.end}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          statusStyles[m.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 space-x-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => openEdit(m)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => confirmDelete(m.id)}
                      >
                        Delete
                      </button>
                      <button
                        className={`${
                          m.status === "Suspended"
                            ? "text-green-600"
                            : "text-orange-600"
                        } hover:underline`}
                        onClick={() => toggleSuspend(m.id)}
                      >
                        {m.status === "Suspended" ? "Activate" : "Suspend"}
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-semibold">
            {filtered.length ? (page - 1) * pageSize + 1 : 0}
          </span>{" "}
          to{" "}
          <span className="font-semibold">
            {Math.min(page * pageSize, filtered.length)}
          </span>{" "}
          of <span className="font-semibold">{filtered.length}</span> results
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiChevronLeft />
          </button>
          <span className="px-2">
            {page} / {totalPages}
          </span>
          <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="p-2 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiChevronRight />
        </button>
        </div>
      </div>

      {/* Add/Edit Member Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4">
                {editingId ? "Edit Member" : "Add New Member"}
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
                <select
                  value={form.plan}
                  onChange={(e) => setForm({ ...form, plan: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option>1 Month</option>
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>Annual</option>
                </select>

                <div className="flex gap-2">
                  <input
                    type="date"
                    value={form.start}
                    onChange={(e) =>
                      setForm({ ...form, start: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="date"
                    value={form.end}
                    onChange={(e) => setForm({ ...form, end: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                >
                  <option>Active</option>
                  <option>Expired</option>
                  <option>Suspended</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                    setEditingId(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={saveMember}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {showDelete && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold mb-3">
                Delete this member?
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => {
                    setShowDelete(false);
                    setToDeleteId(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={deleteMember}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Members;
