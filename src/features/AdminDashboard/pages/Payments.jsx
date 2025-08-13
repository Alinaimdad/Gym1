import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const seedInvoices = [
  {
    id: 1,
    number: "INV-001",
    member: "Ali Raza",
    amount: 3000,
    method: "Cash",
    date: "2025-07-25",
    status: "Paid",
  },
  {
    id: 2,
    number: "INV-002",
    member: "Sara Khan",
    amount: 8000,
    method: "Card",
    date: "2025-07-24",
    status: "Pending",
  },
  {
    id: 3,
    number: "INV-003",
    member: "Hassan Ahmed",
    amount: 2500,
    method: "Online",
    date: "2025-07-20",
    status: "Refunded",
  },
];

const statusStyles = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Refunded: "bg-red-100 text-red-700",
};

const methods = ["Cash", "Card", "Bank", "Online"];
const pageSize = 5;

const Payments = () => {
  const [invoices, setInvoices] = useState(seedInvoices);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [method, setMethod] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("date"); // date | amount | number
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);

  // Create Invoice modal
  const [showCreate, setShowCreate] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    number: nextNumber(seedInvoices),
    member: "",
    amount: "",
    method: "Cash",
    date: "",
    status: "Paid",
  });

  // Delete confirm (optional: still here if you want it)
  const [showDelete, setShowDelete] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  // --------- Helpers ----------
  function nextNumber(list) {
    // INV-XYZ pattern
    const last = list[list.length - 1];
    if (!last) return "INV-001";
    const num = parseInt(last.number.replace(/\D/g, ""), 10) + 1;
    return `INV-${String(num).padStart(3, "0")}`;
  }

  const filtered = useMemo(() => {
    let data = [...invoices];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (inv) =>
          inv.number.toLowerCase().includes(q) ||
          inv.member.toLowerCase().includes(q) ||
          String(inv.amount).includes(q)
      );
    }

    if (status !== "All") data = data.filter((inv) => inv.status === status);
    if (method !== "All") data = data.filter((inv) => inv.method === method);

    if (dateFrom) data = data.filter((inv) => new Date(inv.date) >= new Date(dateFrom));
    if (dateTo) data = data.filter((inv) => new Date(inv.date) <= new Date(dateTo));

    // sort
    data.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortBy === "date") return (new Date(a.date) - new Date(b.date)) * dir;
      if (sortBy === "amount") return (a.amount - b.amount) * dir;
      if (sortBy === "number") return a.number.localeCompare(b.number) * dir;
      return 0;
    });

    return data;
  }, [invoices, search, status, method, dateFrom, dateTo, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page]
  );

  // Quick Stats
  const stats = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayRevenue = invoices
      .filter((i) => i.status === "Paid" && i.date === todayStr)
      .reduce((sum, i) => sum + i.amount, 0);

    const pendingCount = invoices.filter((i) => i.status === "Pending").length;

    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const refundsThisMonth = invoices
      .filter((i) => {
        const d = new Date(i.date);
        return i.status === "Refunded" && d.getMonth() === month && d.getFullYear() === year;
      })
      .reduce((sum, i) => sum + i.amount, 0);

    return { todayRevenue, pendingCount, refundsThisMonth };
  }, [invoices]);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const SortBtn = ({ col, label }) => (
    <button
      onClick={() => handleSort(col)}
      className="inline-flex items-center gap-1 hover:underline"
    >
      {label}
      {sortBy === col && (
        <span className="text-xs">{sortDir === "asc" ? "▲" : "▼"}</span>
      )}
    </button>
  );

  // --------- Create invoice ----------
  const openCreate = () => {
    setNewInvoice({
      number: nextNumber(invoices),
      member: "",
      amount: "",
      method: "Cash",
      date: "",
      status: "Paid",
    });
    setShowCreate(true);
  };

  const saveInvoice = (e) => {
    e.preventDefault();
    if (!newInvoice.member || !newInvoice.amount || !newInvoice.date) {
      alert("Member, Amount, Date required!");
      return;
    }

    const payload = {
      id: invoices.length ? invoices[invoices.length - 1].id + 1 : 1,
      ...newInvoice,
      amount: Number(newInvoice.amount),
    };

    setInvoices((prev) => [...prev, payload]);
    setShowCreate(false);
  };

  // --------- Actions ----------
  const markPaid = (id) =>
    setInvoices((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "Paid" } : i))
    );

  const refundInvoice = (id) =>
    setInvoices((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "Refunded" } : i))
    );

  const confirmDelete = (id) => {
    setToDeleteId(id);
    setShowDelete(true);
  };
  const deleteInvoice = () => {
    setInvoices((prev) => prev.filter((i) => i.id !== toDeleteId));
    setShowDelete(false);
    setToDeleteId(null);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Payments & Billing</h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={openCreate}
        >
          + Create Invoice
        </motion.button>
      </div>

      <p className="text-gray-600 mb-4">
        Track membership payments, invoices and dues.
      </p>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="bg-white border rounded-lg shadow p-4 mb-6 flex flex-wrap items-center gap-3"
      >
        {/* Search */}
        <div className="relative w-full md:w-auto">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by invoice # / member / amount..."
            className="pl-9 pr-3 py-2 border rounded w-full md:w-72 focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Method */}
        <select
          value={method}
          onChange={(e) => {
            setMethod(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-red-500 w-full md:w-auto"
        >
          <option>All</option>
          {methods.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-red-500 w-full md:w-auto"
        >
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Refunded</option>
        </select>

        {/* Date range */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <label className="text-sm text-gray-500">From</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setPage(1);
            }}
            className="border rounded px-2 py-1 w-full sm:w-40"
          />
          <label className="text-sm text-gray-500">To</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setPage(1);
            }}
            className="border rounded px-2 py-1 w-full sm:w-40"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-sm text-gray-500">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="number">Invoice #</option>
          </select>
          <button
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            className="px-2 py-1 border rounded text-sm"
          >
            {sortDir === "asc" ? "▲" : "▼"}
          </button>
        </div>
      </motion.div>

      {/* Table */}
      <div className="bg-white border rounded-lg shadow overflow-x-auto mb-6">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left py-2 px-4">
                <SortBtn col="number" label="Invoice #" />
              </th>
              <th className="text-left py-2 px-4">Member</th>
              <th className="text-left py-2 px-4">
                <SortBtn col="amount" label="Amount (Rs.)" />
              </th>
              <th className="text-left py-2 px-4">Method</th>
              <th className="text-left py-2 px-4">
                <SortBtn col="date" label="Date" />
              </th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-500 italic">
                    No invoices found
                  </td>
                </tr>
              ) : (
                paged.map((inv) => (
                  <motion.tr
                    key={inv.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.12 }}
                    className="border-t"
                  >
                    <td className="py-2 px-4 font-medium">{inv.number}</td>
                    <td className="py-2 px-4">{inv.member}</td>
                    <td className="py-2 px-4">Rs. {inv.amount.toLocaleString()}</td>
                    <td className="py-2 px-4">{inv.method}</td>
                    <td className="py-2 px-4">{inv.date}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          statusStyles[inv.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 space-x-2">
                      {inv.status === "Paid" && (
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => refundInvoice(inv.id)}
                        >
                          Refund
                        </button>
                      )}
                      {inv.status === "Pending" && (
                        <button
                          className="text-green-600 hover:underline"
                          onClick={() => markPaid(inv.id)}
                        >
                          Mark Paid
                        </button>
                      )}
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => confirmDelete(inv.id)}
                      >
                        Delete
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

      {/* Quick Stats */}
      <h2 className="text-lg font-semibold mt-8 mb-2">Quick Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Today’s Revenue</p>
          <p className="text-2xl font-semibold">
            Rs. {stats.todayRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white border rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Pending Invoices</p>
          <p className="text-2xl font-semibold">{stats.pendingCount}</p>
        </div>
        <div className="bg-white border rounded-lg shadow p-4">
          <p className="text-gray-500 text-sm">Refunds This Month</p>
          <p className="text-2xl font-semibold">
            Rs. {stats.refundsThisMonth.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Create Invoice Modal */}
      <AnimatePresence>
        {showCreate && (
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
              <h2 className="text-xl font-bold mb-4">Create Invoice</h2>

              <form
                onSubmit={saveInvoice}
                className="space-y-3"
              >
                <input
                  type="text"
                  value={newInvoice.number}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-50"
                />
                <input
                  type="text"
                  placeholder="Member Name"
                  value={newInvoice.member}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, member: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />

                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Amount (Rs.)"
                    value={newInvoice.amount}
                    onChange={(e) =>
                      setNewInvoice({
                        ...newInvoice,
                        amount: e.target.value,
                      })
                    }
                    className="w-full border px-3 py-2 rounded"
                  />
                  <select
                    value={newInvoice.method}
                    onChange={(e) =>
                      setNewInvoice({ ...newInvoice, method: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                  >
                    {methods.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <input
                  type="date"
                  value={newInvoice.date}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, date: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />

                <select
                  value={newInvoice.status}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, status: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                >
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Refunded</option>
                </select>

                <div className="flex justify-end gap-3 mt-5">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 rounded"
                    onClick={() => setShowCreate(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal (optional) */}
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
                Delete this invoice?
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
                  onClick={deleteInvoice}
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

export default Payments;
