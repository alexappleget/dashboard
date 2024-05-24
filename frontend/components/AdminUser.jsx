import { useEffect, useState } from "react";
import "../styles/adminuser.css";
import axios from "axios";

function AdminUser() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  //For creating a new user on the team
  const handleAddUser = async () => {
    try {
      const body = { name, username, password };
      const res = await axios.post("http://localhost:5174/adduser", body, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  //To display the current team members
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5174/users");
        setUsers(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user-content">
      <h3 className="user-content-h3">
        Here is where you can create a user for your team.
      </h3>
      <h4 className="user-content-h4">
        Create a username and password for them.
      </h4>
      <p className="user-content-p">
        Once created, just give your team member the login information.
      </p>
      <div className="createUser">
        <label htmlFor="name">Team Member's Full Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAddUser}>Create User</button>
      </div>
      <div className="existingUsers">
        <h3>Existing Team Members:</h3>
        <ul className="teamMembers">
          {users?.map((user) => (
            <User user={user} setUsers={setUsers} key={user.user_id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminUser;

function User({ user }) {
  return (
    <>
      <li className="user">
        <h4>Name:</h4>
        <p>{user.name}</p>
        <h4>Username:</h4>
        <p>{user.username}</p>
        <h4>Password:</h4>
        <p>{user.password}</p>
      </li>
    </>
  );
}
