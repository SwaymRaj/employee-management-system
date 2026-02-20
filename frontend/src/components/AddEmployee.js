import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/employees", {
      name,
      email,
      department,
      salary
    }).then(() => {
      navigate("/employees");
    });
  };

 return (
  <div className="module-page">
    <div className="form-card">
      <h2>Add Employee</h2>

      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Salary</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-success">Save Employee</button>
      </form>
    </div>
</div>
  );
}

export default AddEmployee;