import { useState } from "react";
import "../styles/admindashboard.css";
import AdminSideBar from "./AdminSideBar";
import AdminHome from "./AdminHome";
import AdminChat from "./AdminChat";
import AdminUser from "./AdminUser";

function AdminDashboard({ setAdminLoggedIn }) {
  const [adminActive, setAdminActive] = useState("AdminHome");

  return (
    <div className="dashboard-content">
      <div className="dashboard">
        <AdminSideBar
          setAdminLoggedIn={setAdminLoggedIn}
          adminActive={adminActive}
          setAdminActive={setAdminActive}
        />
        {adminActive === "AdminHome" && <AdminHome />}
        {adminActive === "AdminChat" && <AdminChat />}
        {adminActive === "AdminUser" && <AdminUser />}
      </div>
    </div>
  );
}

export default AdminDashboard;
