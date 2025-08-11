import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const seedTrainers = [
  {
    id: 3001,
    name: "Hassan Ahmed",
    email: "hassan@gym.com",
    specialty: "Strength",
    members: 28,
    rating: 4.7,
    status: "Active",
  },
  {
    id: 3002,
    name: "Sara Malik",
    email: "sara@gym.com",
    specialty: "Yoga",
    members: 15,
    rating: 4.9,
    status: "Inactive",
  },
  {
    id: 3003,
    name: "Zohaib Khan",
    email: "zohaib@gym.com",
    specialty: "CrossFit",
    members: 20,
    rating: 4.3,
    status: "Active",
  },
];

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-200 text-gray-700",
};

const pageSize = 5;

const Trainers = () => {
  const [trainers, setTrainers] = useState(seedTrainers);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [specialty, setSpecialty] = useState("All");
  const [page, setPage] = useState(1);

  // modal states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    specialty: "Strength",
    members: 0,
    rating: 0,
    status: "Active",
  });

  // delete confirm
  const [showDelete, setShowDelete] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const specialties = useMemo(() => {
    const set = new Set(trainers.map((t) => t.specialty));
    return ["All", ...Array.from(set)];
  }, [trainers]);

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
    if (specialty !== "All")
      data = data.filter((t) => t.specialty === specialty);

    return data;
  }, [trainers, search, status, specialty]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page]
  );

  // helpers
  const resetForm = () =>
    setForm({
      name: "",
      email: "",
      specialty: "Strength",
      members: 0,
      rating: 0,
      status: "Active",
    });

  // CRUD
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
    if (!form.name || !form.email) {
      alert("Name & Email required!");
      return;
    }

    if (editingId) {
      setTrainers((prev) =>
        prev.map((t) => (t.id === editingId ? { ...form } : t))
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

  const toggleStatus = (id) => {
    setTrainers((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Active" ? "Inactive" : "Active" }
          : t
      )
    );
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Trainers</h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={openAdd}
        >
          + Add Trainer
        </motion.button>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="bg-white border rounded-lg shadow p-4 mb-4 flex flex-col md:flex-row gap-3 md:items-center"
      >
        {/* Search */}
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

        {/* Status */}
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
          <option>Inactive</option>
        </select>

        {/* Specialty */}
        <select
          value={specialty}
          onChange={(e) => {
            setSpecialty(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-red-500"
        >
          {specialties.map((s) => (
            <option key={s}>{s}</option>
          ))}
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
              <th className="text-left py-2 px-4">Members</th>
              <th className="text-left py-2 px-4">Rating</th>
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
                    No trainers found
                  </td>
                </tr>
              ) : (
                paged.map((t) => (
                  <motion.tr
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.12 }}
                    className="border-t"
                  >
                    <td className="py-2 px-4">{t.id}</td>
                    <td className="py-2 px-4 font-medium">{t.name}</td>
                    <td className="py-2 px-4 text-gray-500">{t.email}</td>
                    <td className="py-2 px-4">{t.specialty}</td>
                    <td className="py-2 px-4">{t.members}</td>
                    <td className="py-2 px-4">{t.rating.toFixed(1)}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          statusStyles[t.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
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
                        className={`${
                          t.status === "Inactive"
                            ? "text-green-600"
                            : "text-orange-600"
                        } hover:underline`}
                        onClick={() => toggleStatus(t.id)}
                      >
                        {t.status === "Inactive" ? "Activate" : "Deactivate"}
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

      {/* Add/Edit Modal */}
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
                {editingId ? "Edit Trainer" : "Add Trainer"}
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
                  value={form.specialty}
                  onChange={(e) =>
                    setForm({ ...form, specialty: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                >
                  <option>Strength</option>
                  <option>Yoga</option>
                  <option>CrossFit</option>
                  <option>Cardio</option>
                  <option>Bodybuilding</option>
                </select>

                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Members"
                    value={form.members}
                    onChange={(e) =>
                      setForm({ ...form, members: Number(e.target.value) })
                    }
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Rating"
                    value={form.rating}
                    onChange={(e) =>
                      setForm({ ...form, rating: Number(e.target.value) })
                    }
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
                  <option>Inactive</option>
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
                  onClick={saveTrainer}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
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
                Delete this trainer?
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
                  onClick={deleteTrainer}
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

export default Trainers;
