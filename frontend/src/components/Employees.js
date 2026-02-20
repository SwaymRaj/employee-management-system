import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:5000/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  };

  const deleteEmployee = (emp_id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://localhost:5000/employees/${emp_id}`)
        .then(() => fetchEmployees());
    }
  };

  return (
    <div>
      <h2>Employees</h2>

      <Link to="/add">
        <button style={{ marginBottom: "15px" }}>
          Add Employee
        </button>
      </Link>

      <table border="1" cellPadding="10" width="100%">
        {employees.length === 0 && (
  <p style={{ color: "#6b7280", marginBottom: "15px" }}>
    No employees added yet. Use the form above to add employees.
  </p>
)}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5" align="center">
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((e) => (
              <tr key={e.emp_id}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>{e.salary}</td>
               <td>
  <Link
    to={`/edit/${e.emp_id}`}
    style={{
      marginRight: "10px",
      padding: "5px 10px",
      backgroundColor: "#f0ad4e",
      color: "black",
      textDecoration: "none",
      borderRadius: "4px"
    }}
  >
    Edit
  </Link>

  <button
    onClick={() => deleteEmployee(e.emp_id)}
    style={{
      padding: "5px 10px",
      backgroundColor: "red",
      color: "white",
      border: "none",
      borderRadius: "4px"
    }}
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
  );
}

export default Employees;