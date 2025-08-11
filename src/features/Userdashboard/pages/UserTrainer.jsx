import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const seedTrainers = [
  { id: 3001, name: "Ahmed Khan", email: "ahmed@gym.com", specialty: "Strength Training", join: "2024-05-01", status: "Active" },
  { id: 3002, name: "Sana Malik", email: "sana@gym.com", specialty: "Yoga", join: "2024-07-15", status: "On Leave" },
  { id: 3003, name: "Bilal Hussain", email: "bilal@gym.com", specialty: "Cardio", join: "2023-09-10", status: "Active" },
];

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  "On Leave": "bg-yellow-100 text-yellow-700",
  Suspended: "bg-red-100 text-red-700",
};

const pageSize = 5;

const UserTrainers = () => {
  const [trainers, setTrainers] = useState(seedTrainers);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    specialty: "",
    join: "",
    status: "Active",
  });

  const [showDelete, setShowDelete] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const resetForm = () =>
    setForm({
      name: "",
      email: "",
      specialty: "",
      join: "",
      status: "Active",
    });

  const filtered = useMemo(() => {
    let data = [...trainers];
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q) ||
          String(t.id).includes(q)
      );
    }
    if (status !== "All") data = data.filter((t) => t.status === status);
    return data;
  }, [trainers, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page]
  );

  const openAdd = () => {
    resetForm();
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (t) => {
    setForm({ ...t });
    setEditingId(t.id);
    setShowForm(true);
  };

  const saveTrainer = () => {
    if (!form.name || !form.email || !form.specialty || !form.join) {
      alert("Please fill all required fields!");
      return;
    }

    if (editingId) {
      setTrainers((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, ...form } : t))
      );
    } else {
      const newId = trainers.length ? trainers[trainers.length - 1].id + 1 : 3001;
      setTrainers((prev) => [...prev, { id: newId, ...form }]);
    }

    setShowForm(false);
    resetForm();
    setEditingId(null);
  };

  const confirmDelete = (id) => {
    setToDeleteId(id);
    setShowDelete(true);
  };

  const deleteTrainer = () => {
    setTrainers((prev) => prev.filter((t) => t.id !== toDeleteId));
    setShowDelete(false);
    setToDeleteId(null);
  };

  const toggleSuspend = (id) => {
    setTrainers((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "Suspended" ? "Active" : "Suspended",
            }
          : t
      )
    );
  };

  return (
    <>
      {/* Header */}
      <div className="pt-16 flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Trainers</h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-400 transition-colors duration-200"
          onClick={openAdd}
        >
          + Add Trainer
        </motion.button>
      </div>

      {/* Search + Filter */}
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
          <option>On Leave</option>
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
              <th className="text-left py-2 px-4">Specialty</th>
              <th className="text-left py-2 px-4">Join Date</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500 italic">
                  No trainers found
                </td>
              </tr>
            ) : (
              paged.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="py-2 px-4">{t.id}</td>
                  <td className="py-2 px-4 font-medium">{t.name}</td>
                  <td className="py-2 px-4 text-gray-500">{t.email}</td>
                  <td className="py-2 px-4">{t.specialty}</td>
                  <td className="py-2 px-4">{t.join}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${statusStyles[t.status]}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => openEdit(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => confirmDelete(t.id)}
                    >
                      Delete
                    </button>
                    <button
                      className={`${t.status === "Suspended" ? "text-green-600" : "text-orange-600"} hover:underline`}
                      onClick={() => toggleSuspend(t.id)}
                    >
                      {t.status === "Suspended" ? "Activate" : "Suspend"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <p className="text-gray-600">
          Showing {filtered.length ? (page - 1) * pageSize + 1 : 0} to{" "}
          {Math.min(page * pageSize, filtered.length)} of {filtered.length} results
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded border hover:bg-gray-50 disabled:opacity-50"
          >
            <HiChevronLeft />
          </button>
          <span>{page} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded border hover:bg-gray-50 disabled:opacity-50"
          >
            <HiChevronRight />
          </button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Trainer" : "Add Trainer"}</h2>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              />
              <input
                type="text"
                placeholder="Specialty"
                value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              />
              <input
                type="date"
                value={form.join}
                onChange={(e) => setForm({ ...form, join: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              >
                <option>Active</option>
                <option>On Leave</option>
                <option>Suspended</option>
              </select>
              <div className="flex justify-end gap-2">
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={saveTrainer}>Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {showDelete && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-3">Delete this trainer?</h3>
              <p className="text-gray-600 mb-4">This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowDelete(false)}>Cancel</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={deleteTrainer}>Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserTrainers;
