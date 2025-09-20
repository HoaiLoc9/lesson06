// routes/auth.js
const express = require("express");
const router = express.Router();
const users = require("../models/User");

// Login -> tạo session + cookie
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // lưu vào session
  req.session.user = { id: user.id, username: user.username };

  res.cookie("username", user.username, { httpOnly: true }); // gửi cookie xuống client
  res.json({ message: "Login successful", user: req.session.user });
});

// Check session
router.get("/me", (req, res) => {
  if (req.session.user) {
    return res.json({ loggedIn: true, user: req.session.user });
  }
  res.status(401).json({ loggedIn: false, message: "Not logged in" });
});

// Logout -> xoá session và cookie
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("username");
    res.json({ message: "Logged out" });
  });
});

module.exports = router;
