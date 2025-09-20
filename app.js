// app.js
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 1 phút
  })
);

// routes
app.use("/auth", authRoutes);

// server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
