console.log("Dashboard loaded");
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [employees, setEmployees] = useState([]);
const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);
  const totalEmployees = employees.length;
const hour = new Date().getHours();
const greeting =
  hour < 12
    ? "Good morning"
    : hour < 18
    ? "Good afternoon"
    : "Good evening";
const formattedTime = currentTime.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
  
// 1️⃣ Build department counts
const departmentsMap = {};
employees.forEach((e) => {
  departmentsMap[e.department] =
    (departmentsMap[e.department] || 0) + 1;
});

// 2️⃣ Find top department
let topDepartment = null;
let maxCount = 0;

Object.entries(departmentsMap).forEach(([dept, count]) => {
  if (count > maxCount) {
    maxCount = count;
    topDepartment = dept;
  }
});

// 3️⃣ Generate insight message
const insightMessage =
  employees.length === 0
    ? "Loading employee analytics..."
    : topDepartment
    ? `${topDepartment} department has the highest employee count (${maxCount}).`
    : "Employee distribution data is currently unavailable.";
  const departmentChartData = {
    labels: Object.keys(departmentsMap),
    datasets: [
      {
        label: "Employees",
        data: Object.values(departmentsMap),
        backgroundColor: "#4f46e5",
      },
    ],
  };

  const attendanceChartData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [totalEmployees * 0.75, totalEmployees * 0.25],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  return (
    <div style={page}>
      {/* ===== Header Section ===== */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  }}
>
  <div>
    <h1 style={title}>Employee Management System</h1>

    <p style={{ color: "#6b7280", marginTop: "6px" }}>
      Administrative Dashboard · Final Year Project
    </p>

    <p style={{ marginTop: "12px", fontSize: "16px" }}>
      {greeting}, Administrator 👋
    </p>
  </div>

  <div
    style={{
      padding: "10px 16px",
      borderRadius: "10px",
      background: "#ecfdf5",
      color: "#065f46",
      fontWeight: "600",
      fontSize: "14px",
    }}
  >
    ● System Online
  </div>
</div>

{/* STEP 5 — PASTE HERE */}
<div
  style={{
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  }}
>
  <span
    style={{
      padding: "4px 10px",
      borderRadius: "999px",
      backgroundColor: "#dcfce7",
      color: "#166534",
      fontSize: "13px",
      fontWeight: "600",
    }}
  >
    ● System running normally
  </span>

  <span style={{ fontSize: "14px", color: "#374151" }}>
    ⏰ {formattedTime}
  </span>
</div>


      <p style={subtitle}>Employee Management Overview</p>

      {/* KPI Cards */}
      <div style={kpiGrid}>
        <div style={card}>
          <h3>Total Employees</h3>
          <p style={kpiNumber}>{totalEmployees}</p>
        </div>
{/* Smart System Insight */}
<p
  style={{
    marginTop: "18px",
    fontSize: "15px",
    color: "#374151",
    background: "#f1f5f9",
    padding: "12px 16px",
    borderRadius: "8px",
    maxWidth: "720px",
  }}
>
  💡 <strong>System Insight:</strong> {insightMessage}
</p>
        <div style={card}>
          <h3>Departments</h3>
          <p style={kpiNumber}>{Object.keys(departmentsMap).length}</p>
        </div>

        <div style={card}>
          <h3>System Status</h3>
          <p style={{ color: "#22c55e", fontWeight: "bold" }}>Active</p>
        </div>
      </div>
<h2
  style={{
    marginTop: "40px",
    marginBottom: "12px",
    fontSize: "20px",
    fontWeight: "600",
  }}
>
  Analytics Overview
</h2>
      {/* Charts */}
      <div style={chartGrid}>
        <div style={card}>
          <h3>Employees by Department</h3>
          <Bar data={departmentChartData} />
        </div>

        <div style={card}>
          <h3>Attendance Snapshot</h3>
          <Doughnut data={attendanceChartData} />
        </div>
      </div>

      {/* Quick Actions */}
      <div
  style={{
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    marginTop: "16px",
  }}
>
        <h3>Quick Actions</h3>

        <Link to="/employees">
          <button style={btn}>Manage Employees</button>
        </Link>

        <Link to="/attendance">
          <button style={btn}>Attendance</button>
        </Link>

        <Link to="/profile">
          <button style={btn}>Admin Panel</button>
        </Link>
      </div>
    </div>
  );
}

/* ================== STYLES ================== */

const page = {
  padding: "30px",
  background: "#f8fafc",
  minHeight: "100vh",
};

const title = {
  fontSize: "28px",
  fontWeight: "bold",
};

const subtitle = {
  color: "#64748b",
  marginBottom: "30px",
};

const kpiGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const chartGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
  gap: "24px",
  marginTop: "40px",
};

const card = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
};

const kpiNumber = {
  fontSize: "32px",
  fontWeight: "bold",
  marginTop: "10px",
};

const btn = {
  marginRight: "12px",
  marginTop: "12px",
  padding: "10px 16px",
  border: "none",
  borderRadius: "6px",
  background: "#4f46e5",
  color: "#fff",
  cursor: "pointer",
};

export default Dashboard;