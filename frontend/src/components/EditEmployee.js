import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  // 🔥 THIS WAS MISSING
  useEffect(() => {
    axios.get(`http://localhost:5000/employees/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/employees/${id}`, form)
      .then(() => {
        alert("Employee Updated");
        navigate("/employees");
      });
  };

  return (
  <div className="module-page">
    <div className="form-card">
      <h2>Edit Employee</h2>

     <form className="employee-form" onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        /><br />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        /><br />

        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
        /><br />

        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
        /><br />

        <button type="submit">Update</button>
      </form>
    </div>
</div>
  );
}

export default EditEmployee;