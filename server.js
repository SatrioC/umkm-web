const express = require("express");
const cors = require("cors");
const path = require("node:path");

// Import modul routing backend
const authRoutes = require("./src/routes/auth.routes");
const taskRoutes = require("./src/routes/tasks.routes");
const partnerRoutes = require("./src/routes/partners.routes");
const applicationRoutes = require("./src/routes/applications.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Routing halaman statis
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/tugas-akhir-pekan", (req, res) => {
  res.sendFile(path.join(__dirname, "tugas-akhir-pekan.html"));
});

app.get("/tugas-dekat-kampus", (req, res) => {
  res.sendFile(path.join(__dirname, "tugas-dekat-kampus.html"));
});

// Registrasi endpoint REST API
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/applications", applicationRoutes);

app.listen(PORT, () => {
  console.log(`Server Sambilan berjalan di http://localhost:${PORT}`);
});
