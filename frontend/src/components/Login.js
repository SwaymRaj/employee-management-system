import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username);
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "300px", margin: "100px auto" }}>
      <h2>EMS Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br /><br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
