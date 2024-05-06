import { useState } from "react";
import "../styles/app.css";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  return (
    <div className="app">
      {!adminLoggedIn && <AdminLogin setAdminLoggedIn={setAdminLoggedIn} />}
      {adminLoggedIn && <AdminDashboard setAdminLoggedIn={setAdminLoggedIn} />}
    </div>
  );
}

export default App;
