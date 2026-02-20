import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">EMS</Link>
      <div>
        <Link className="btn btn-outline-light me-2" to="/">Dashboard</Link>
        <Link className="btn btn-outline-light" to="/employees">Employees</Link>
      </div>
    </nav>
  );
}
export default Navbar;
