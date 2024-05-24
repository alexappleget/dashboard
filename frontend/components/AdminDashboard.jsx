import { useState, useEffect } from "react";
import "../styles/admindashboard.css";
import AdminSideBar from "./AdminSideBar";
import AdminHome from "./AdminHome";
import AdminChat from "./AdminChat";
import AdminUser from "./AdminUser";
import AdminTasks from "./AdminTasks";

function AdminDashboard({ setAdminLoggedIn, username, setUsername }) {
  const [adminActive, setAdminActive] = useState("AdminHome");
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setTaskCount(tasks.length);
  }, [tasks]);

  return (
    <div className="dashboard-content">
      <div className="dashboard">
        <AdminSideBar
          setAdminLoggedIn={setAdminLoggedIn}
          adminActive={adminActive}
          setAdminActive={setAdminActive}
        />
        {adminActive === "AdminHome" && <AdminHome taskCount={taskCount} />}
        {adminActive === "AdminTasks" && (
          <AdminTasks tasks={tasks} setTasks={setTasks} />
        )}
        {adminActive === "AdminChat" && (
          <AdminChat username={username} setUsername={setUsername} />
        )}
        {adminActive === "AdminUser" && <AdminUser />}
      </div>
    </div>
  );
}

export default AdminDashboard;
