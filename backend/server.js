require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "secretkey"; // Store this in .env for production

// **Manually Hash Password Once and Store**
const hashedPassword = bcrypt.hashSync("Vinay007", 8);
const users = [{ id: 1, username: "vinay@gmail.com", password: hashedPassword }];

// **Generate JWT Token**
const generateToken = (user) => jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

// **Middleware to Verify JWT**
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "User not logged in" });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.userId = decoded.id;
    next();
  });
};

// **Login API**
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  console.log("Stored Hashed Password:", user.password);
  console.log("Entered Password:", password);

  const isMatch = bcrypt.compareSync(password, user.password);
  console.log("Password Match:", isMatch);

  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ token: generateToken(user) });
});

// **Dashboard API**
app.get("/api/dashboard", verifyToken, (req, res) => {
  res.json([{ id: 1, name: "Card 1" }, { id: 2, name: "Card 2" }]);
});

// **Map View API**
app.get("/api/map", verifyToken, (req, res) => {
  res.json({ lat: 20.5937, lng: 78.9629, zoom: 4 }); // India's coordinates
});

app.listen(5000, () => console.log("Server running on port 5000"));
