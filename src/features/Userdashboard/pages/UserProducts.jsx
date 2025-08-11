import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const seedProducts = [
  { id: 4001, name: "Dumbbell Set", category: "Equipment", price: 3500, stock: 10, status: "In Stock" },
  { id: 4002, name: "Yoga Mat", category: "Accessories", price: 1500, stock: 0, status: "Out of Stock" },
  { id: 4003, name: "Protein Powder", category: "Supplements", price: 4500, stock: 25, status: "In Stock" },
];

const statusStyles = {
  "In Stock": "bg-green-100 text-green-700",
  "Out of Stock": "bg-red-100 text-red-700",
};

const pageSize = 5;

const UserProducts = () => {
  const [products, setProducts] = useState(seedProducts);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "In Stock",
  });

  const [showDelete, setShowDelete] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const resetForm = () =>
    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "In Stock",
    });

  const filtered = useMemo(() => {
    let data = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          String(p.id).includes(q)
      );
    }
    if (status !== "All") data = data.filter((p) => p.status === status);
    return data;
  }, [products, search, status]);

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

  const saveProduct = () => {
    if (!form.name || !form.category || !form.price || form.stock === "") {
      alert("Please fill all required fields!");
      return;
    }

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p))
      );
    } else {
      const newId = products.length ? products[products.length - 1].id + 1 : 4001;
      setProducts((prev) => [
        ...prev,
        { id: newId, ...form, price: Number(form.price), stock: Number(form.stock) },
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

  const deleteProduct = () => {
    setProducts((prev) => prev.filter((p) => p.id !== toDeleteId));
    setShowDelete(false);
    setToDeleteId(null);
  };

  return (
    <>
      {/* Header */}
      <div className="pt-16 flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-500 transition-colors duration-200"
          onClick={openAdd}
        >
          + Add Product
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
            placeholder="Search by id, name, category..."
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
          <option>In Stock</option>
          <option>Out of Stock</option>
        </select>
      </motion.div>

      {/* Table */}
      <div className="bg-white border rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left py-2 px-4">#ID</th>
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Category</th>
              <th className="text-left py-2 px-4">Price (PKR)</th>
              <th className="text-left py-2 px-4">Stock</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500 italic">
                  No products found
                </td>
              </tr>
            ) : (
              paged.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-2 px-4">{p.id}</td>
                  <td className="py-2 px-4 font-medium">{p.name}</td>
                  <td className="py-2 px-4">{p.category}</td>
                  <td className="py-2 px-4">₨ {p.price.toLocaleString()}</td>
                  <td className="py-2 px-4">{p.stock}</td>
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
              <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Product" : "Add Product"}</h2>
              <input
                type="text"
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              />
              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              />
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              />
              <input
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-3"
              >
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
              <div className="flex justify-end gap-2">
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={saveProduct}>Save</button>
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
              <h3 className="text-lg font-semibold mb-3">Delete this product?</h3>
              <p className="text-gray-600 mb-4">This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowDelete(false)}>Cancel</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={deleteProduct}>Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserProducts;
