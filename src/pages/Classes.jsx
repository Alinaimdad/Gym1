import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const seedClasses = [
  {
    id: 1,
    title: "HIIT",
    trainer: "John Doe",
    days: ["Mon", "Wed", "Fri"],
    timeFrom: "18:00",
    timeTo: "19:00",
    slots: 20,
    status: "Active",
  },
  {
    id: 2,
    title: "Yoga Flow",
    trainer: "Sara Malik",
    days: ["Tue", "Thu"],
    timeFrom: "07:30",
    timeTo: "08:30",
    slots: 15,
    status: "Active",
  },
  {
    id: 3,
    title: "CrossFit",
    trainer: "Zohaib Khan",
    days: ["Sat"],
    timeFrom: "11:00",
    timeTo: "12:30",
    slots: 25,
    status: "Cancelled",
  },
];

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Inactive: "bg-gray-200 text-gray-700",
};

const pageSize = 5;

const Classes = () => {
  const [classes, setClasses] = useState(seedClasses);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [dayFilter, setDayFilter] = useState("All");
  const [page, setPage] = useState(1);

  // modal states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    trainer: "",
    days: [],
    timeFrom: "",
    timeTo: "",
    slots: 0,
    status: "Active",
  });

  // delete confirm
  const [showDelete, setShowDelete] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const filtered = useMemo(() => {
    let data = [...classes];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.trainer.toLowerCase().includes(q) ||
          c.days.join(",").toLowerCase().includes(q)
      );
    }

    if (status !== "All") data = data.filter((c) => c.status === status);
    if (dayFilter !== "All")
      data = data.filter((c) => c.days.includes(dayFilter));

    return data;
  }, [classes, search, status, dayFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page]
  );

  // helpers
  const resetForm = () =>
    setForm({
      title: "",
      trainer: "",
      days: [],
      timeFrom: "",
      timeTo: "",
      slots: 0,
      status: "Active",
    });

  // CRUD
  const openAdd = () => {
    resetForm();
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (cls) => {
    setForm({ ...cls });
    setEditingId(cls.id);
    setShowForm(true);
  };

  const saveClass = () => {
    if (!form.title || !form.trainer || !form.timeFrom || !form.timeTo) {
      alert("Title, Trainer, Time From/To required!");
      return;
    }

    const payload = {
      ...form,
      slots: Number(form.slots),
      days: Array.isArray(form.days) ? form.days : [],
    };

    if (editingId) {
      setClasses((prev) =>
        prev.map((c) => (c.id === editingId ? { ...payload, id: c.id } : c))
      );
    } else {
      const newId = classes.length ? classes[classes.length - 1].id + 1 : 1;
      setClasses((prev) => [...prev, { id: newId, ...payload }]);
    }

    setShowForm(false);
    resetForm();
    setEditingId(null);
  };

  const confirmDelete = (id) => {
    setToDeleteId(id);
    setShowDelete(true);
  };

  const deleteClass = () => {
    setClasses((prev) => prev.filter((c) => c.id !== toDeleteId));
    setShowDelete(false);
    setToDeleteId(null);
  };

  const toggleStatus = (id) => {
    setClasses((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status:
                c.status === "Active"
                  ? "Inactive"
                  : c.status === "Inactive"
                  ? "Active"
                  : "Active",
            }
          : c
      )
    );
  };

  const toggleDay = (day) => {
    setForm((prev) => {
      const exists = prev.days.includes(day);
      return {
        ...prev,
        days: exists ? prev.days.filter((d) => d !== day) : [...prev.days, day],
      };
    });
  };

  const formatTimeRange = (from, to) => {
    const f = from?.slice(0, 5);
    const t = to?.slice(0, 5);
    return `${f} - ${t}`;
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Classes & Schedule</h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={openAdd}
        >
          + Add Class
        </motion.button>
      </div>

      <p className="text-gray-600 mb-4">
        Manage class schedules, trainers and available slots.
      </p>

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
            placeholder="Search by title / trainer / day..."
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
          <option>Cancelled</option>
        </select>

        {/* Day Filter */}
        <select
          value={dayFilter}
          onChange={(e) => {
            setDayFilter(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-red-500"
        >
          <option>All</option>
          {allDays.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </motion.div>

      {/* Table */}
      <div className="bg-white border rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="text-left py-2 px-4">Class</th>
            <th className="text-left py-2 px-4">Trainer</th>
            <th className="text-left py-2 px-4">Days</th>
            <th className="text-left py-2 px-4">Time</th>
            <th className="text-left py-2 px-4">Slots</th>
            <th className="text-left py-2 px-4">Status</th>
            <th className="text-left py-2 px-4">Actions</th>
          </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-500 italic">
                    No classes found
                  </td>
                </tr>
              ) : (
                paged.map((c) => (
                  <motion.tr
                    key={c.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.12 }}
                    className="border-t"
                  >
                    <td className="py-2 px-4 font-medium">{c.title}</td>
                    <td className="py-2 px-4">{c.trainer}</td>
                    <td className="py-2 px-4">{c.days.join(", ")}</td>
                    <td className="py-2 px-4">
                      {formatTimeRange(c.timeFrom, c.timeTo)}
                    </td>
                    <td className="py-2 px-4">{c.slots}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          statusStyles[c.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 space-x-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => openEdit(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => confirmDelete(c.id)}
                      >
                        Delete
                      </button>
                      <button
                        className={`${
                          c.status === "Active"
                            ? "text-orange-600"
                            : "text-green-600"
                        } hover:underline`}
                        onClick={() => toggleStatus(c.id)}
                      >
                        {c.status === "Active" ? "Deactivate" : "Activate"}
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
                {editingId ? "Edit Class" : "Add Class"}
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Class Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Trainer Name"
                  value={form.trainer}
                  onChange={(e) =>
                    setForm({ ...form, trainer: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />

                {/* Days multi-select (simple checkboxes) */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Days
                  </label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {allDays.map((d) => (
                      <label
                        className="flex items-center gap-1 text-sm"
                        key={d}
                      >
                        <input
                          type="checkbox"
                          checked={form.days.includes(d)}
                          onChange={() => toggleDay(d)}
                        />
                        {d}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">From</label>
                    <input
                      type="time"
                      value={form.timeFrom}
                      onChange={(e) =>
                        setForm({ ...form, timeFrom: e.target.value })
                      }
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">To</label>
                    <input
                      type="time"
                      value={form.timeTo}
                      onChange={(e) =>
                        setForm({ ...form, timeTo: e.target.value })
                      }
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>
                </div>

                <input
                  type="number"
                  placeholder="Slots"
                  value={form.slots}
                  onChange={(e) =>
                    setForm({ ...form, slots: Number(e.target.value) })
                  }
                  className="w-full border px-3 py-2 rounded"
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
                  <option>Cancelled</option>
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
                  onClick={saveClass}
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
                Delete this class?
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
                  onClick={deleteClass}
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

export default Classes;
