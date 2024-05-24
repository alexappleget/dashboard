import { useState } from "react";
import "../styles/app.css";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div className="app">
      {!adminLoggedIn && (
        <AdminLogin
          setAdminLoggedIn={setAdminLoggedIn}
          username={username}
          setUsername={setUsername}
        />
      )}
      {adminLoggedIn && (
        <AdminDashboard
          setAdminLoggedIn={setAdminLoggedIn}
          username={username}
          setUsername={setUsername}
        />
      )}
    </div>
  );
}

export default App;
