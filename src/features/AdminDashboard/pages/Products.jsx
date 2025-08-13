import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const seedProducts = [
  {
    id: 1,
    sku: "SKU-001",
    name: "Whey Protein",
    category: "Supplement",
    stock: 42,
    price: 4999,
    status: "Active",
  },
  {
    id: 2,
    sku: "SKU-002",
    name: "Creatine Monohydrate",
    category: "Supplement",
    stock: 8,
    price: 2499,
    status: "Active",
  },
  {
    id: 3,
    sku: "SKU-003",
    name: "Gym Gloves",
    category: "Accessory",
    stock: 0,
    price: 1500,
    status: "Inactive",
  },
];

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-200 text-gray-700",
};

const pageSize = 5;

const Products = () => {
  const [products, setProducts] = useState(seedProducts);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name"); // name | price | stock
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  // modal states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    sku: "",
    name: "",
    category: "Supplement",
    stock: 0,
    price: 0,
    status: "Active",
  });

  // delete confirm
  const [showDelete, setShowDelete] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    let data = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          String(p.price).includes(q)
      );
    }

    if (status !== "All") data = data.filter((p) => p.status === status);
    if (category !== "All") data = data.filter((p) => p.category === category);

    // sort
    data.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
      if (sortBy === "price") return (a.price - b.price) * dir;
      if (sortBy === "stock") return (a.stock - b.stock) * dir;
      return 0;
    });

    return data;
  }, [products, search, status, category, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page]
  );

  // helpers
  const resetForm = () =>
    setForm({
      sku: "",
      name: "",
      category: "Supplement",
      stock: 0,
      price: 0,
      status: "Active",
    });

  // CRUD
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

  const saveProduct = () => {
    if (!form.name || !form.sku || !form.price) {
      alert("Name, SKU, Price required!");
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...payload } : p))
      );
    } else {
      const newId = products.length ? products[products.length - 1].id + 1 : 1;
      setProducts((prev) => [...prev, { id: newId, ...payload }]);
    }

    setShowForm(false);
    resetForm();
    setEditingId(null);
  };

  const confirmDelete = (id) => {
    setToDeleteId(id);
    setShowDelete(true);
  };

  const deleteProduct = () => {
    setProducts((prev) => prev.filter((p) => p.id !== toDeleteId));
    setShowDelete(false);
    setToDeleteId(null);
  };

  const toggleStatus = (id) => {
    setProducts((prev) =>
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

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={openAdd}
        >
          + Add Product
        </motion.button>
      </div>

      <p className="text-gray-600 mb-4">
        Manage gym supplements, accessories and other inventory items.
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
            placeholder="Search by name / sku / price..."
            className="pl-9 pr-3 py-2 border rounded w-72 focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-red-500"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

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

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
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
      <div className="bg-white border rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left py-2 px-4">SKU</th>
              <th className="text-left py-2 px-4">
                <SortBtn col="name" label="Name" />
              </th>
              <th className="text-left py-2 px-4">Category</th>
              <th className="text-left py-2 px-4">
                <SortBtn col="stock" label="Stock" />
              </th>
              <th className="text-left py-2 px-4">
                <SortBtn col="price" label="Price (Rs.)" />
              </th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-500 italic">
                    No products found
                  </td>
                </tr>
              ) : (
                paged.map((p) => (
                  <motion.tr
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.12 }}
                    className="border-t"
                  >
                    <td className="py-2 px-4">{p.sku}</td>
                    <td className="py-2 px-4 font-medium">{p.name}</td>
                    <td className="py-2 px-4">{p.category}</td>
                    <td className="py-2 px-4">
                      {p.stock}
                      {p.stock === 0 && (
                        <span className="ml-2 text-xs text-red-600">Out</span>
                      )}
                      {p.stock > 0 && p.stock <= 10 && (
                        <span className="ml-2 text-xs text-orange-600">
                          Low
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4">Rs. {p.price.toLocaleString()}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          statusStyles[p.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
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
                      <button
                        className={`${
                          p.status === "Active"
                            ? "text-orange-600"
                            : "text-green-600"
                        } hover:underline`}
                        onClick={() => toggleStatus(p.id)}
                      >
                        {p.status === "Active" ? "Deactivate" : "Activate"}
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
                {editingId ? "Edit Product" : "Add Product"}
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="SKU"
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                >
                  <option>Supplement</option>
                  <option>Accessory</option>
                  <option>Equipment</option>
                </select>

                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: Number(e.target.value) })
                    }
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Price (Rs.)"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: Number(e.target.value) })
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
                  onClick={saveProduct}
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
                Delete this product?
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
                  onClick={deleteProduct}
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

export default Products;
