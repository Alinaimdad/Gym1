import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const seedPlans = [
  {
    id: 1,
    name: "Monthly",
    price: 3000,
    durationDays: 30,
    features: ["Access to all equipment", "Locker room", "Basic classes"],
    status: "Active",
  },
  {
    id: 2,
    name: "Quarterly",
    price: 8000,
    durationDays: 90,
    features: ["Access to all equipment", "Locker room", "All classes"],
    status: "Active",
  },
  {
    id: 3,
    name: "Yearly",
    price: 30000,
    durationDays: 365,
    features: ["Access to all equipment", "Locker room", "Premium classes"],
    status: "Inactive",
  },
];

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-200 text-gray-700",
};

const Plans = () => {
  const [plans, setPlans] = useState(seedPlans);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("price"); // name | price | duration
  const [sortDir, setSortDir] = useState("asc");

  // modal states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    durationDays: 30,
    features: "Access to all equipment, Locker room",
    status: "Active",
  });

  // delete confirm
  const [showDelete, setShowDelete] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  // helpers
  const resetForm = () =>
    setForm({
      name: "",
      price: 0,
      durationDays: 30,
      features: "",
      status: "Active",
    });

  const filtered = useMemo(() => {
    let data = [...plans];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          String(p.price).includes(q) ||
          String(p.durationDays).includes(q)
      );
    }

    if (status !== "All") data = data.filter((p) => p.status === status);

    // sorting
    data.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
      if (sortBy === "duration")
        return (a.durationDays - b.durationDays) * dir;
      // price default
      return (a.price - b.price) * dir;
    });

    return data;
  }, [plans, search, status, sortBy, sortDir]);

  // CRUD
  const openAdd = () => {
    resetForm();
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setForm({
      ...p,
      features: p.features.join(", "),
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const savePlan = () => {
    if (!form.name || !form.price || !form.durationDays) {
      alert("Name, Price aur Duration required hain!");
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      durationDays: Number(form.durationDays),
      features: form.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    };

    if (editingId) {
      setPlans((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...payload } : p)));
    } else {
      const newId = plans.length ? plans[plans.length - 1].id + 1 : 1;
      setPlans((prev) => [...prev, { id: newId, ...payload }]);
    }

    setShowForm(false);
    resetForm();
    setEditingId(null);
  };

  const confirmDelete = (id) => {
    setToDeleteId(id);
    setShowDelete(true);
  };

  const deletePlan = () => {
    setPlans((prev) => prev.filter((p) => p.id !== toDeleteId));
    setShowDelete(false);
    setToDeleteId(null);
  };

  const toggleStatus = (id) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Membership Plans</h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={openAdd}
        >
          + Create Plan
        </motion.button>
      </div>

      <p className="text-gray-600 mb-4">
        Configure pricing, duration and features for gym memberships.
      </p>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="bg-white border rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center"
      >
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name / price / duration..."
            className="pl-9 pr-3 py-2 border rounded w-72 focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Status filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-red-500"
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="price">Price</option>
            <option value="duration">Duration</option>
            <option value="name">Name</option>
          </select>
          <button
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            className="px-2 py-1 border rounded text-sm"
          >
            {sortDir === "asc" ? "▲" : "▼"}
          </button>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 italic">
              No plans found
            </div>
          ) : (
            filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.12 }}
                className="bg-white border rounded-lg shadow p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="text-gray-500">
                      {p.durationDays} days
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      statusStyles[p.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <p className="text-2xl font-bold mt-2">Rs. {p.price}</p>

                <ul className="text-sm text-gray-600 mt-3 space-y-1 list-disc list-inside">
                  {p.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => openEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => confirmDelete(p.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded ${
                      p.status === "Active"
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    onClick={() => toggleStatus(p.id)}
                  >
                    {p.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
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
                {editingId ? "Edit Plan" : "Create Plan"}
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Plan Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />

                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Price (Rs.)"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: Number(e.target.value) })
                    }
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Duration (days)"
                    value={form.durationDays}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        durationDays: Number(e.target.value),
                      })
                    }
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <textarea
                  placeholder="Features (comma separated)"
                  value={form.features}
                  onChange={(e) =>
                    setForm({ ...form, features: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded min-h-[90px]"
                />

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
                  onClick={savePlan}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
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
                Delete this plan?
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
                  onClick={deletePlan}
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

export default Plans;
