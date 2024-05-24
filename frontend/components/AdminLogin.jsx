import { useState } from "react";
import "../styles/adminlogin.css";
import axios from "axios";

function AdminLogin({ setAdminLoggedIn, username, setUsername }) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const body = { username, password };
      const res = await axios.post("http://localhost:5174/adminlogin", body, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      setAdminLoggedIn(true);
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="login-content">
      <div className="login-board">
        <h1>Admin Login</h1>
        <div className="login-info">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="jsmith"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="************"
          />
          <button onClick={handleLogin}>Log In</button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
