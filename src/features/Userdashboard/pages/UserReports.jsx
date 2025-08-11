import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { addDays, format, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiFilter, FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

const COLORS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#6366f1"];

/* ------------------------------ API (mock) ------------------------------ */

async function mockFetchReports({ from, to, branches }) {
  // simulate network
  await new Promise((r) => setTimeout(r, 250));

  // These are your “server-side” datasets (replace with real API)
  const months = [
    "2025-01",
    "2025-02",
    "2025-03",
    "2025-04",
    "2025-05",
    "2025-06",
    "2025-07",
  ];

  const revenue = [
    { month: "2025-01", revenue: 900000 },
    { month: "2025-02", revenue: 1050000 },
    { month: "2025-03", revenue: 1150000 },
    { month: "2025-04", revenue: 980000 },
    { month: "2025-05", revenue: 1200000 },
    { month: "2025-06", revenue: 1280000 },
    { month: "2025-07", revenue: 1250000 },
  ];

  const signups = [
    { month: "2025-01", signups: 62 },
    { month: "2025-02", signups: 74 },
    { month: "2025-03", signups: 80 },
    { month: "2025-04", signups: 69 },
    { month: "2025-05", signups: 91 },
    { month: "2025-06", signups: 95 },
    { month: "2025-07", signups: 82 },
  ];

  const planDist = [
    { name: "Monthly", value: 480 },
    { name: "Quarterly", value: 260 },
    { name: "Half-Yearly", value: 120 },
    { name: "Annual", value: 420 },
  ];

  const branchMembers = [
    { branch: "Karachi", members: 540 },
    { branch: "Lahore", members: 320 },
    { branch: "Islamabad", members: 210 },
    { branch: "Multan", members: 95 },
  ];

  const attendance = buildDummyAttendance(from, to);

  // Filter by date (server-side simulation)
  const monthsInRange = months.filter((m) => {
    const d = new Date(m + "-01");
    return d >= new Date(from) && d <= new Date(to);
  });
  const revFiltered = revenue.filter((r) => monthsInRange.includes(r.month));
  const sigFiltered = signups.filter((s) => monthsInRange.includes(s.month));

  // Filter branches (server-side simulation)
  let bm = branchMembers;
  if (branches.length) {
    bm = branchMembers.filter((b) => branches.includes(b.branch));
  }

  // Build stats
  const totalMembers = planDist.reduce((s, p) => s + p.value, 0);
  const activePlans = Math.round(totalMembers * 0.73);
  const monthlyRevenue = revFiltered.length
    ? revFiltered[revFiltered.length - 1].revenue
    : 0;
  const newSignups = sigFiltered.length
    ? sigFiltered[sigFiltered.length - 1].signups
    : 0;

  return {
    revenue: revFiltered,
    signups: sigFiltered,
    planDist,
    branchMembers: bm,
    stats: { totalMembers, activePlans, monthlyRevenue, newSignups },
    attendance,
  };
}

function buildDummyAttendance(from, to) {
  const start = parseISO(from);
  const end = parseISO(to);
  const diffDays = (end - start) / (1000 * 60 * 60 * 24);
  const result = [];
  for (let i = 0; i <= diffDays; i++) {
    const date = format(addDays(start, i), "yyyy-MM-dd");
    // random count 0-20
    const count = Math.random() > 0.6 ? Math.floor(Math.random() * 20) : 0;
    result.push({ date, count });
  }
  return result;
}

/* ------------------------- Export Helpers ------------------------- */

function exportToCSV(filename, rows) {
  const header = Object.keys(rows[0] || {});
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
  link.setAttribute("download", filename);
  link.click();
}

function exportToXLSX(filename, sheetsObj /* { sheetName: rows[] } */) {
  const wb = XLSX.utils.book_new();
  Object.entries(sheetsObj).forEach(([sheetName, rows]) => {
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });
  XLSX.writeFile(wb, filename);
}

async function exportToPDF(filename, rootRef) {
  if (!rootRef.current) return;
  const canvas = await html2canvas(rootRef.current, {
    scale: 2,
    useCORS: true,
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
}

/* ------------------------------ Component ------------------------------ */

const UserReports = () => {
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-12-31");
  const [branches, setBranches] = useState([]); // multiple
  const [isExporting, setIsExporting] = useState(false);

  // ref for PDF
  const pdfRef = useRef(null);

  // React Query – replace mockFetchReports with your real endpoint call
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["reports", { from, to, branches }],
    queryFn: () => mockFetchReports({ from, to, branches }),
    keepPreviousData: true,
  });

  const loading = isLoading || isFetching;

  const handleBranchesChange = (e) => {
    const opts = Array.from(e.target.selectedOptions).map((o) => o.value);
    setBranches(opts.includes("All") ? [] : opts);
  };

  const handleExportCSV = () => {
    if (!data) return;
    const rows = [
      ...data.revenue.map((r) => ({ type: "revenue", ...r })),
      ...data.signups.map((s) => ({ type: "signups", ...s })),
      ...data.branchMembers.map((b) => ({ type: "branchMembers", ...b })),
    ];
    exportToCSV("reports.csv", rows);
  };

  const handleExportXLSX = () => {
    if (!data) return;
    const sheets = {
      Revenue: data.revenue,
      Signups: data.signups,
      PlanDistribution: data.planDist,
      BranchMembers: data.branchMembers,
      Attendance: data.attendance,
    };
    exportToXLSX("reports.xlsx", sheets);
  };

  const handleExportPDF = async () => {
    if (!data) return;
    try {
      setIsExporting(true);
      await exportToPDF("reports.pdf", pdfRef);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div ref={pdfRef}>
      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-600">
            Visualize revenue, memberships, attendance and more.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white border rounded-lg shadow px-4 py-3 flex flex-wrap gap-3 items-center"
        >
          <FiFilter className="text-gray-500" />
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>

          <select
            multiple
            value={branches.length ? branches : ["All"]}
            onChange={handleBranchesChange}
            className="border rounded px-2 py-1 text-sm min-w-[160px] h-[90px]"
          >
            <option value="All">All</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Multan">Multan</option>
          </select>
        </motion.div>
      </div>

      {/* Export buttons */}
      <div className="flex flex-wrap gap-2 justify-end mb-4">
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          <FiDownload /> CSV
        </button>
        <button
          onClick={handleExportXLSX}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
        >
          <FiDownload /> Excel
        </button>
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
        >
          <FiDownload /> {isExporting ? "Exporting…" : "PDF"}
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-10 text-gray-500">Loading…</div>
      )}

      {!loading && data && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              {
                title: "Total Members",
                value: data.stats.totalMembers.toLocaleString(),
              },
              {
                title: "Active Plans",
                value: data.stats.activePlans.toLocaleString(),
              },
              {
                title: "Monthly Revenue",
                value: `Rs. ${data.stats.monthlyRevenue.toLocaleString()}`,
              },
              {
                title: "New Signups",
                value: data.stats.newSignups.toLocaleString(),
              },
            ].map((c) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="rounded-lg bg-white border p-4 shadow"
              >
                <p className="text-sm text-gray-500">{c.title}</p>
                <p className="text-2xl font-semibold">{c.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
            {/* Revenue Line */}
            <div className="bg-white border rounded-lg shadow p-4 min-h-[320px]">
              <h3 className="font-semibold mb-2">Revenue (Monthly)</h3>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={data.revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(v) => `Rs.${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(v) => `Rs. ${Number(v).toLocaleString()}`}
                    labelFormatter={(l) => `Month: ${l}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Signups Bar */}
            <div className="bg-white border rounded-lg shadow p-4 min-h-[320px]">
              <h3 className="font-semibold mb-2">New Signups (Monthly)</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data.signups}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="signups"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Plan distribution Pie */}
            <div className="bg-white border rounded-lg shadow p-4 min-h-[320px]">
              <h3 className="font-semibold mb-2">Plan Distribution</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={data.planDist}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={95}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {data.planDist.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Branch Members Bar */}
          <div className="bg-white border rounded-lg shadow p-4 min-h-[320px] mt-4">
          <h3 className="font-semibold mb-2">Members by Branch</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.branchMembers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="members" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

          {/* Attendance Heatmap */}
          <div className="bg-white border rounded-lg shadow p-4 min-h-[320px] mt-4">
            <h3 className="font-semibold mb-2">Attendance Heatmap</h3>
            <p className="text-xs text-gray-500 mb-2">
              (Dummy data for demo – integrate your real check-in logs)
            </p>
            <CalendarHeatmap
              startDate={from}
              endDate={to}
              values={data.attendance}
              classForValue={(value) => {
                if (!value || !value.count) {
                  return "color-empty";
                }
                if (value.count > 15) return "color-github-4";
                if (value.count > 10) return "color-github-3";
                if (value.count > 5) return "color-github-2";
                return "color-github-1";
              }}
              tooltipDataAttrs={(value) => {
                if (!value || !value.count) return { "data-tip": "0 check-ins" };
                return {
                  "data-tip": `${value.date}: ${value.count} check-ins`,
                };
              }}
              showWeekdayLabels={true}
            />
            {/* quick legend */}
            <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
              <span>Less</span>
              <span className="w-4 h-4 color-github-1 rounded-sm" />
              <span className="w-4 h-4 color-github-2 rounded-sm" />
              <span className="w-4 h-4 color-github-3 rounded-sm" />
              <span className="w-4 h-4 color-github-4 rounded-sm" />
              <span>More</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserReports;
