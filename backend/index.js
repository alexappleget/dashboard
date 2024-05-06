const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// To connect the database to the backend server
const { SQL_USER, SQL_PASS, SQL_HOST, SQL_PORT, SQL_DATABASE } = process.env;
if (!SQL_USER || !SQL_PASS || !SQL_HOST || !SQL_PORT || !SQL_DATABASE) {
  throw new Error("Incomplete database configuration.");
}
const pool = new Pool({
  user: SQL_USER,
  password: SQL_PASS,
  host: SQL_HOST,
  port: SQL_PORT,
  database: SQL_DATABASE,
  ssl: {
    require: true,
  },
});

//To test the database connection to the server
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Successfully connected to the database:", res.rows[0]);
  }
});

//To be able to check the database Admin table to see if login/password matches up to what's in the database admin table
app.post("/adminlogin", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("Received login request for username:", username);

    const result = await pool.query(
      "Select * FROM adminusers WHERE username = $1",
      [username]
    );
    console.log("Resule from database query:", result.rows);

    if (result.rows.length === 0) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];

    if (password !== user.password) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    console.log("Login successful for user:", username);
    return res.status(200).json({ message: "Login Successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//To be able to check the database User table to see if login/password matches up to what's in the database user table
app.post("/userlogin", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("Received login request for username:", username);

    const result = await pool.query(
      "Select * FROM userusers WHERE username = $1",
      [username]
    );
    console.log("Resule from database query:", result.rows);

    if (result.rows.length === 0) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];

    if (password !== user.password) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    console.log("Login successful for user:", username);
    return res.status(200).json({ message: "Login Successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(5174, () => {
  console.log("Server is running on port 5174");
});
