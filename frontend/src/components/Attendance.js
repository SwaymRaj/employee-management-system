import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
  new Date().toISOString().slice(0, 10)
);
  useEffect(() => {
  fetchEmployees();
}, []);

useEffect(() => {
  fetchAttendance();
}, [selectedDate]);

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:5000/employees");
    setEmployees(res.data);
  };

 const fetchAttendance = async () => {
  const res = await axios.get(
    `http://localhost:5000/attendance?date=${selectedDate}`
  );
  setAttendance(res.data);
};

 const markAttendance = async (emp_id, status) => {
  try {
    const today = selectedDate;

    await axios.post("http://localhost:5000/attendance", {
      emp_id: emp_id,
      date: selectedDate,
      status: status,
    });

    alert(`Marked ${status}`);
    fectchAttendance();
  } catch (err) {
    console.error(err);
    
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance</h2>
<p style={{ marginBottom: "12px", color: "#374151" }}>
  Showing attendance for: <b>{selectedDate}</b>
</p>
<div style={{ marginBottom: "15px" }}>
  <label><b>Select Date: </b></label>
  <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
  />
</div>
      {/* Mark Attendance */}
      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Employee</th>
             <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.emp_id}>
              <td>{e.name}</td>
              <td>
                <button onClick={() => markAttendance(e.emp_id, "Present")}>
                  Present
                </button>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => markAttendance(e.emp_id, "Absent")}
                >
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "30px" }}>Attendance Records</h3>

      {/* Attendance List */}
      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.date ? new Date(a.date).toLocaleDateString() : "-"}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;