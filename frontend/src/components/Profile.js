import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./AdminPanel.css";

function Profile() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  }, []);

  const totalEmployees = employees.length;

  const departments = {};
  employees.forEach((e) => {
    departments[e.department] = (departments[e.department] || 0) + 1;
  });

  const totalSalary = employees.reduce(
    (sum, e) => sum + Number(e.salary),
    0
  );

  const avgSalary =
    totalEmployees === 0 ? 0 : Math.round(totalSalary / totalEmployees);

  return (
    <div className="admin-container">
      <h2>Admin Control Panel</h2>
<span style={{
  background: "#e0f2fe",
  color: "#0369a1",
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px"
}}>
  ADMIN ACCESS
</span>

      {/* Admin Info */}
      <div className="card-grid">
        <div className="card">
          <h3>Admin Info</h3>
          <p>Name: Admin</p>
          <p>Email: admin@ems.com</p>
          <p>Role: Administrator</p>
        </div>

        <div className="card">
          <h3>Employees</h3>
          <p>Total Employees: {totalEmployees}</p>
          <p>Departments: {Object.keys(departments).length}</p>
          <p>Avg Salary: ₹{avgSalary}</p>
        </div>

        <div className="card">
          <h3>System Status</h3>
          <p>Attendance: Active</p>
          <p>Reports: Enabled</p>
          <p style={{ color: "green" }}>API: Running</p>
        </div>
      </div>

      {/* Salary Chart */}
      <div className="chart-box">
        <h3>Salary Distribution</h3>
        <Bar
          data={{
            labels: employees.map((e) => e.name),
            datasets: [
              {
                label: "Salary",
                data: employees.map((e) => e.salary),
              },
            ],
          }}
        />
      </div>

      {/* Department Chart */}
      <div className="chart-box">
        <h3>Department Distribution</h3>
        <Pie
          data={{
            labels: Object.keys(departments),
            datasets: [
              {
                data: Object.values(departments),
              },
            ],
          }}
        />
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3>Quick Actions</h3>
        <Link to="/employees">
          <button style={{ marginRight: "10px" }}>View Employees</button>
        </Link>
        <Link to="/add">
          <button>Add Employee</button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;