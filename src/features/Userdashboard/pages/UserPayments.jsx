import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const seedPayments = [
  { id: 5001, member: "Ali Raza", amount: 5000, method: "Cash", date: "2025-07-10", status: "Paid" },
  { id: 5002, member: "Sara Khan", amount: 3000, method: "Bank Transfer", date: "2025-07-05", status: "Pending" },
  { id: 5003, member: "Hassan Ahmed", amount: 12000, method: "Credit Card", date: "2025-06-25", status: "Failed" },
];

const statusStyles = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-700",
};

const pageSize = 5;

const UserPayments = () => {
  const [payments, setPayments] = useState(seedPayments);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    member: "",
    amount: "",
    method: "Cash",
    date: "",
    status: "Paid",
  });

  const [showDelete, setShowDelete] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const resetForm = () =>
    setForm({
      member: "",
      amount: "",
      method: "Cash",
      date: "",
      status: "Paid",
    });

  const filtered = useMemo(() => {
    let data = [...payments];
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (p) =>
          p.member.toLowerCase().includes(q) ||
          String(p.id).includes(q) ||
          p.method.toLowerCase().includes(q)
      );
    }
    if (status !== "All") data = data.filter((p) => p.status === status);
    return data;
  }, [payments, search, status]);

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

  const openEdit = (p) => {
    setForm({ ...p });
    setEditingId(p.id);
    setShowForm(true);
  };

  const savePayment = () => {
    if (!form.member || !form.amount || !form.date) {
      alert("Please fill all required fields!");
      return;
    }

    if (editingId) {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, ...form, amount: Number(form.amount) } : p
        )
      );
    } else {
      const newId = payments.length ? payments[payments.length - 1].id + 1 : 5001;
      setPayments((prev) => [
        ...prev,
        { id: newId, ...form, amount: Number(form.amount) },
      ]);
    }

    setShowForm(false);
    resetForm();
    setEditingId(null);
  };

  const confirmDelete = (id) => {
    setToDeleteId(id);
    setShowDelete(true);
  };

  const deletePayment = () => {
    setPayments((prev) => prev.filter((p) => p.id !== toDeleteId));
    setShowDelete(false);
    setToDeleteId(null);
  };

  return (
    <>
      {/* Header */}
      <div className="pt-16 flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
          onClick={openAdd}
        >
          + Add Payment
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
            placeholder="Search by id, member, method..."
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
          <option>Paid</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
      </motion.div>

      {/* Table */}
      <div className="bg-white border rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left py-2 px-4">#ID</th>
              <th className="text-left py-2 px-4">Member</th>
              <th className="text-left py-2 px-4">Amount (PKR)</th>
              <th className="text-left py-2 px-4">Method</th>
              <th className="text-left py-2 px-4">Date</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500 italic">
                  No payments found
                </td>
              </tr>
            ) : (
              paged.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-2 px-4">{p.id}</td>
                  <td className="py-2 px-4 font-medium">{p.member}</td>
                  <td className="py-2 px-4">₨ {p.amount.toLocaleString()}</td>
                  <td className="py-2 px-4">{p.method}</td>
                  <td className="py-2 px-4">{p.date}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${statusStyles[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => openEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => confirmDelete(p.id)}
                    >
                      Delete
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
              <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Payment" : "Add Payment"}</h2>
              <input
                type="text"
                placeholder="Member Name"
                value={form.member}
                onChange={(e) => setForm({ ...form, member: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              />
              <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              />
              <select
                value={form.method}
                onChange={(e) => setForm({ ...form, method: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              >
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Credit Card</option>
                <option>Other</option>
              </select>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              >
                <option>Paid</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
              <div className="flex justify-end gap-2">
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={savePayment}>Save</button>
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
              <h3 className="text-lg font-semibold mb-3">Delete this payment?</h3>
              <p className="text-gray-600 mb-4">This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowDelete(false)}>Cancel</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={deletePayment}>Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserPayments;
