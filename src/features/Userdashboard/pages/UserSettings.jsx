import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

/* ----------------------------------------------------------------
   MOCK API — replace with your real endpoints later
------------------------------------------------------------------*/

async function mockFetchSettings() {
  await new Promise((r) => setTimeout(r, 300));
  return {
    gym: {
      name: "Beast Mode Gym",
      email: "support@gym.com",
      phone: "+92 300 1234567",
      address: "Block 5, Clifton, Karachi",
      logoUrl: "",
    },
    preferences: {
      theme: "light",
      currency: "PKR",
      timezone: "Asia/Karachi",
    },
    notifications: {
      invoicePaid: true,
      planExpiring: true,
      newSignup: true,
      trainerNote: false,
    },
    billing: {
      plan: "Pro", // Free | Pro | Expired
      renewsOn: "2025-12-31",
      amount: 2999,
      currency: "PKR",
      invoicesCount: 12,
    },
    security: {
      twoFAEnabled: false,
    },
    invoices: [
      { id: "INV-001", member: "Ali Raza", amount: 3000, date: "2025-07-01", status: "Paid" },
      { id: "INV-002", member: "Sara Khan", amount: 8000, date: "2025-07-05", status: "Paid" },
      { id: "INV-003", member: "Usman Ali", amount: 3000, date: "2025-07-10", status: "Pending" },
      { id: "INV-004", member: "Nimra Ahmed", amount: 3000, date: "2025-07-12", status: "Paid" },
      { id: "INV-005", member: "Hassan Iqbal", amount: 30000, date: "2025-07-15", status: "Paid" },
    ],
  };
}

async function mockUpdateSettings(payload) {
  await new Promise((r) => setTimeout(r, 600));
  if (Math.random() < 0.05) throw new Error("Random API error (demo)");
  return payload;
}

async function mockChangePassword({ current, next }) {
  await new Promise((r) => setTimeout(r, 600));
  if (current !== "admin123") throw new Error("Current password incorrect");
  return true;
}

async function mockLogoutAllSessions() {
  await new Promise((r) => setTimeout(r, 500));
  return true;
}

async function mockUploadLogo(file) {
  await new Promise((r) => setTimeout(r, 800));
  // return fake CDN URL
  return URL.createObjectURL(file);
}

async function mockManageSubscription(plan) {
  await new Promise((r) => setTimeout(r, 800));
  // Return a possibly updated billing payload
  return {
    plan: plan === "Free" ? "Pro" : "Pro",
    renewsOn: "2026-01-01",
    amount: 2999,
    currency: "PKR",
    invoicesCount: 13,
  };
}

async function mockToggle2FA(enable) {
  await new Promise((r) => setTimeout(r, 500));
  return enable;
}

async function mockDeleteAccount() {
  await new Promise((r) => setTimeout(r, 800));
  return true;
}

/* ----------------------------------------------------------------
   Component
------------------------------------------------------------------*/

const UserSettings = () => {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: mockFetchSettings,
  });

  // local editable states
  const [gym, setGym] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [security, setSecurity] = useState(null);

  const [logoPreview, setLogoPreview] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const logoInputRef = useRef(null);

  // password form
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdErr, setPwdErr] = useState("");

  // delete account modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // initialize local state
  React.useEffect(() => {
    if (data) {
      setGym(data.gym);
      setPreferences(data.preferences);
      setNotifications(data.notifications);
      setSecurity(data.security);
      setLogoPreview(data.gym.logoUrl || "");
    }
  }, [data]);

  /* ----------------- Mutations ----------------- */

  const updateMutation = useMutation({
    mutationFn: mockUpdateSettings,
    onSuccess: (payload) => {
      alert("Settings saved!");
      qc.setQueryData(["settings"], (old) => ({
        ...old,
        ...payload,
        gym: { ...payload.gym },
        preferences: { ...payload.preferences },
        notifications: { ...payload.notifications },
      }));
    },
    onError: (e) => alert(e.message || "Failed to save settings"),
  });

  const uploadLogoMutation = useMutation({
    mutationFn: mockUploadLogo,
    onSuccess: (url) => {
      setLogoPreview(url);
      // not saving to server yet; will be saved with handleSave()
    },
    onError: () => alert("Logo upload failed"),
  });

  const changePwdMutation = useMutation({
    mutationFn: mockChangePassword,
    onSuccess: () => {
      alert("Password updated!");
      setPwd({ current: "", next: "", confirm: "" });
      setPwdErr("");
    },
    onError: (e) => setPwdErr(e.message || "Failed to change password"),
  });

  const logoutAllMutation = useMutation({
    mutationFn: mockLogoutAllSessions,
    onSuccess: () => alert("All sessions logged out."),
  });

  const manageSubMutation = useMutation({
    mutationFn: async () => {
      const currentPlan = data?.billing?.plan || "Free";
      const newBilling = await mockManageSubscription(currentPlan);
      return newBilling;
    },
    onSuccess: (billing) => {
      alert("Subscription updated / managed!");
      qc.setQueryData(["settings"], (old) => ({
        ...old,
        billing,
      }));
    },
    onError: () => alert("Failed to manage subscription"),
  });

  const twoFAMutation = useMutation({
    mutationFn: mockToggle2FA,
    onSuccess: (enabled) => {
      setSecurity((prev) => ({ ...prev, twoFAEnabled: enabled }));
      alert(`2FA ${enabled ? "enabled" : "disabled"} successfully.`);
    },
    onError: () => alert("Failed to toggle 2FA"),
  });

  const deleteAccountMutation = useMutation({
    mutationFn: mockDeleteAccount,
    onSuccess: () => {
      alert("Account deleted. Redirect user to goodbye / login page.");
      setShowDeleteConfirm(false);
    },
    onError: () => alert("Failed to delete account"),
  });

  /* ----------------- Derived ----------------- */

  const canSave = useMemo(() => gym && preferences && notifications, [
    gym,
    preferences,
    notifications,
  ]);

  /* ----------------- Handlers ----------------- */

  const handleSave = () => {
    if (!canSave) return;

    updateMutation.mutate({
      gym: {
        ...gym,
        logoUrl: logoPreview, // real app: response URL from upload
      },
      preferences,
      notifications,
    });
  };

  const handlePwdSubmit = () => {
    setPwdErr("");
    if (!pwd.current || !pwd.next || !pwd.confirm) {
      setPwdErr("All password fields are required");
      return;
    }
    if (pwd.next.length < 8) {
      setPwdErr("New password must be at least 8 characters");
      return;
    }
    if (pwd.next !== pwd.confirm) {
      setPwdErr("New password & confirm password do not match");
      return;
    }
    changePwdMutation.mutate({ current: pwd.current, next: pwd.next });
  };

  const onLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    uploadLogoMutation.mutate(file);
  };

  const handle2FAToggle = () => {
    twoFAMutation.mutate(!security.twoFAEnabled);
  };

  const handleExportCSV = () => {
    const rows = data?.invoices || [];
    if (!rows.length) return;
    const header = Object.keys(rows[0]);
    const csv = [
      header.join(","),
      ...rows.map((r) =>
        header
          .map((h) => {
            const val = r[h] ?? "";
            if (typeof val === "string" && val.includes(",")) {
              return `"${val.replace(/"/g, '""')}"`;
            }
            return val;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "invoices.csv");
    link.click();
  };

  const handleExportXLSX = () => {
    const rows = data?.invoices || [];
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invoices");
    XLSX.writeFile(wb, "invoices.xlsx");
  };

  const handleDownloadInvoicePDF = (inv) => {
    const doc = new jsPDF();
    let y = 15;
    doc.setFontSize(16);
    doc.text("Gym Invoice", 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`Invoice #: ${inv.id}`, 10, y); y += 7;
    doc.text(`Member: ${inv.member}`, 10, y); y += 7;
    doc.text(`Amount: Rs. ${inv.amount.toLocaleString()}`, 10, y); y += 7;
    doc.text(`Date: ${inv.date}`, 10, y); y += 7;
    doc.text(`Status: ${inv.status}`, 10, y);
    doc.save(`${inv.id}.pdf`);
  };

  const manageButtonText = (plan) => {
    if (plan === "Free") return "Upgrade Plan";
    if (plan === "Expired") return "Renew Subscription";
    return "Manage Subscription";
  };

  if (isLoading || !gym || !preferences || !notifications || !security) {
    return <div className="text-gray-500">Loading settings…</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Gym Info */}
        <motion.section
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border rounded-lg shadow p-4"
        >
          <h2 className="text-lg font-semibold mb-4">Gym Information</h2>

          {/* Logo */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Logo</p>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded border bg-gray-50 flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Logo</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onLogoChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                  disabled={uploadLogoMutation.isLoading}
                >
                  {uploadLogoMutation.isLoading ? "Uploading..." : "Upload Logo"}
                </button>
                {logoPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoPreview("");
                      setLogoFile(null);
                      if (logoInputRef.current) {
                        logoInputRef.current.value = "";
                      }
                    }}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Gym Name"
              value={gym.name}
              onChange={(e) => setGym({ ...gym, name: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              placeholder="Support Email"
              value={gym.email}
              onChange={(e) => setGym({ ...gym, email: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              placeholder="Phone"
              value={gym.phone}
              onChange={(e) => setGym({ ...gym, phone: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              placeholder="Address"
              value={gym.address}
              onChange={(e) => setGym({ ...gym, address: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={updateMutation.isLoading}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-400 disabled:opacity-50"
          >
            {updateMutation.isLoading ? "Saving..." : "Save"}
          </button>
        </motion.section>

        {/* Preferences */}
        <motion.section
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border rounded-lg shadow p-4"
        >
          <h2 className="text-lg font-semibold mb-4">Preferences</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Theme */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Theme</label>
            <select
              value={preferences.theme}
              onChange={(e) =>
                setPreferences({ ...preferences, theme: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Timezone</label>
            <select
              value={preferences.timezone}
              onChange={(e) =>
                setPreferences({ ...preferences, timezone: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            >
              <option>Asia/Karachi</option>
              <option>Asia/Dubai</option>
              <option>Asia/Kolkata</option>
              <option>UTC</option>
            </select>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Currency</label>
            <select
              value={preferences.currency}
              onChange={(e) =>
                setPreferences({ ...preferences, currency: e.target.value })
              }
              className="border rounded px-3 py-2 w-full"
            >
              <option>PKR</option>
              <option>USD</option>
              <option>AED</option>
              <option>INR</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={updateMutation.isLoading}
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-500 disabled:opacity-50"
        >
          {updateMutation.isLoading ? "Saving..." : "Save"}
        </button>
      </motion.section>

      {/* Notifications */}
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border rounded-lg shadow p-4"
      >
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>

        <div className="space-y-3">
          <Toggle
            label="Invoice Paid"
            checked={notifications.invoicePaid}
            onChange={(val) =>
              setNotifications({ ...notifications, invoicePaid: val })
            }
          />
          <Toggle
            label="Plan Expiring"
            checked={notifications.planExpiring}
            onChange={(val) =>
              setNotifications({ ...notifications, planExpiring: val })
            }
          />
          <Toggle
            label="New Signup"
            checked={notifications.newSignup}
            onChange={(val) =>
              setNotifications({ ...notifications, newSignup: val })
            }
          />
          <Toggle
            label="Trainer note to member"
            checked={notifications.trainerNote}
            onChange={(val) =>
              setNotifications({ ...notifications, trainerNote: val })
            }
          />
        </div>

        <button
          onClick={handleSave}
          disabled={updateMutation.isLoading}
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-500 disabled:opacity-50"
        >
          {updateMutation.isLoading ? "Saving..." : "Save"}
        </button>
      </motion.section>

      {/* Billing */}
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border rounded-lg shadow p-4"
      >
        <h2 className="text-lg font-semibold mb-4">Billing</h2>
        <p className="text-gray-600 text-sm mb-4">
          Manage your subscription and invoices.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Info label="Plan" value={data.billing.plan} />
          <Info label="Renews On" value={formatDate(data.billing.renewsOn)} />
          <Info
            label="Amount"
            value={`${data.billing.currency} ${data.billing.amount.toLocaleString()}`}
          />
          <Info label="Invoices" value={data.billing.invoicesCount} />
        </div>

        <button
          onClick={() => manageSubMutation.mutate()}
          disabled={manageSubMutation.isLoading}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {manageSubMutation.isLoading
            ? "Processing..."
            : manageButtonText(data.billing.plan)}
        </button>

        {/* Invoices Table */}
        <div className="mt-6 bg-white border rounded-lg shadow overflow-x-auto">
          <div className="flex justify-between items-center p-4">
            <h3 className="font-semibold">Recent Invoices</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              >
                Export CSV
              </button>
              <button
                onClick={handleExportXLSX}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              >
                Export Excel
              </button>
            </div>
          </div>

          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="text-left py-2 px-4">Invoice #</th>
                <th className="text-left py-2 px-4">Member</th>
                <th className="text-left py-2 px-4">Amount</th>
                <th className="text-left py-2 px-4">Date</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.invoices.map((inv) => (
                <tr key={inv.id} className="border-t">
                  <td className="py-2 px-4">{inv.id}</td>
                  <td className="py-2 px-4">{inv.member}</td>
                  <td className="py-2 px-4">
                    Rs. {inv.amount.toLocaleString()}
                  </td>
                  <td className="py-2 px-4">{inv.date}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        inv.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleDownloadInvoicePDF(inv)}
                      className="text-blue-600 hover:underline"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
              {!data.invoices.length && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No invoices found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Security */}
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border rounded-lg shadow p-4"
      >
        <h2 className="text-lg font-semibold mb-4">Security</h2>

        {/* 2FA */}
        <div className="mb-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span>Enable Two‑Factor Authentication (2FA)</span>
            <span
              onClick={handle2FAToggle}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                security.twoFAEnabled ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                  security.twoFAEnabled ? "translate-x-6" : ""
                }`}
              />
            </span>
          </label>
          {twoFAMutation.isLoading && (
            <p className="text-xs text-gray-500 mt-1">Updating...</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            value={pwd.current}
            onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="password"
            placeholder="New Password"
            value={pwd.next}
            onChange={(e) => setPwd({ ...pwd, next: e.target.value })}
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={pwd.confirm}
            onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
            className="border rounded px-3 py-2 w-full md:col-span-2"
          />
        </div>

        {pwdErr && <p className="text-gray-900 text-sm mt-2">{pwdErr}</p>}

        <button
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-500 disabled:opacity-50"
          onClick={handlePwdSubmit}
          disabled={changePwdMutation.isLoading}
        >
          {changePwdMutation.isLoading ? "Changing..." : "Change Password"}
        </button>
      </motion.section>

      {/* Danger Zone */}
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-red-200 rounded-lg shadow p-4"
      >
        <h2 className="text-lg font-semibold mb-2 text-red-600">
          Danger Zone
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Sensitive actions — use with caution.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-500 disabled:opacity-50"
            onClick={() => {
              if (confirm("Logout all active sessions?")) {
                logoutAllMutation.mutate();
              }
            }}
            disabled={logoutAllMutation.isLoading}
          >
            {logoutAllMutation.isLoading
              ? "Logging out..."
              : "Logout All Sessions"}
          </button>

          <button
            className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Account
          </button>
        </div>
      </motion.section>
    </div>

    {/* Delete Account Confirm Modal */}
    <AnimatePresence>
      {showDeleteConfirm && (
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
            <h3 className="text-lg font-semibold mb-3 text-gray-900">
              Delete Account?
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              This action is irreversible. Are you sure you want to proceed?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50"
                onClick={() => deleteAccountMutation.mutate()}
                disabled={deleteAccountMutation.isLoading}
              >
                {deleteAccountMutation.isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
};

export default UserSettings;

/* ------------------ helpers ------------------ */

const Info = ({ label, value }) => (
  <div className="bg-gray-50 rounded p-3 border">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const Toggle = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span>{label}</span>
      <span
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          checked ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
            checked ? "translate-x-6" : ""
          }`}
        />
      </span>
    </label>
  );
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}
