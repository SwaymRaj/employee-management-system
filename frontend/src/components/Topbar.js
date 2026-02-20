import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

function Topbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="topbar">
      <span>Employee Management System</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Topbar;
