import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3 className="logo">EMS</h3>
      <Link to="/">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/attendance">Attendance</Link>
      <Link to="/reports">Reports</Link>
    </div>
  );
}

export default Sidebar;
