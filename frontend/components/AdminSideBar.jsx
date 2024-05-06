import "../styles/adminsidebar.css";
import {
  FaUser,
  FaHome,
  FaDoorOpen,
  FaComment,
  FaUserPlus,
  FaCog,
} from "react-icons/fa";

function AdminSideBar({ setAdminLoggedIn, adminActive, setAdminActive }) {
  return (
    <div className="button-bar">
      <button className="profile">
        <FaUser />
      </button>
      <button
        className={adminActive === "AdminHome" ? "sideBtn-active-home" : "home"}
        onClick={() => setAdminActive("AdminHome")}
      >
        <FaHome />
      </button>
      <button
        className={adminActive === "AdminChat" ? "sideBtn-active" : "chat"}
        onClick={() => setAdminActive("AdminChat")}
      >
        <FaComment />
      </button>
      <button
        className={adminActive === "AdminUser" ? "sideBtn-active" : "addUser"}
        onClick={() => setAdminActive("AdminUser")}
      >
        <FaUserPlus />
      </button>
      <button className="settings">
        <FaCog />
      </button>
      <button className="logout" onClick={() => setAdminLoggedIn(false)}>
        <FaDoorOpen />
      </button>
    </div>
  );
}

export default AdminSideBar;
