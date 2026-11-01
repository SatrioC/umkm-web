const express = require("express");
const router = express.Router();
const db = require("../config/db");

function formatTask(row) {
  return {
    id: row.id,
    title: row.title,
    categoryKey: row.category_key,
    partnerIndex: row.partner_id ? row.partner_id - 1 : 0,
    partnerName: row.partner_name || row.custom_partner_name || "Mitra UMKM",
    partnerRating: row.partner_rating || 4.8,
    stipend: row.stipend,
    duration: row.duration,
    schedule: row.schedule,
    availableDays: JSON.parse(row.available_days || "[]"),
    distanceKm: row.distance_km,
    location: row.location,
    whatsAppNumber: row.whatsapp_number,
    startDate: row.start_date,
    isFeatured: Boolean(row.is_featured),
    isActive: Boolean(row.is_active),
    description: row.description
  };
}

const taskSelect = `
  SELECT t.*, p.name as partner_name, p.rating as partner_rating, p.brand_color as partner_color
  FROM tasks t
  LEFT JOIN partners p ON t.partner_id = p.id
`;

// GET /api/tasks
router.get("/", (req, res) => {
  try {
    const { q, category, featured, near, weekend, hi } = req.query;
    let sql = `${taskSelect} WHERE t.is_active = 1`;
    const params = [];

    if (category) {
      sql += " AND t.category_key = ?";
      params.push(category);
    }
    if (featured === "1" || featured === "true") {
      sql += " AND t.is_featured = 1";
    }
    if (near === "1" || near === "true") {
      sql += " AND t.distance_km <= 2.0";
    }
    if (hi === "1" || hi === "true") {
      sql += " AND t.stipend >= 100000";
    }

    sql += " ORDER BY t.is_featured DESC, t.id DESC";
    let tasks = db.prepare(sql).all(...params).map(formatTask);

    if (q) {
      const query = q.toLowerCase();
      tasks = tasks.filter((task) =>
        `${task.title} ${task.partnerName} ${task.location} ${task.description}`.toLowerCase().includes(query)
      );
    }
    if (weekend === "1" || weekend === "true") {
      tasks = tasks.filter((task) => task.availableDays.some((day) => day === "Sab" || day === "Min"));
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil daftar tugas" });
  }
});

// GET /api/tasks/partner/:partnerId
router.get("/partner/:partnerId", (req, res) => {
  try {
    const partnerId = Number(req.params.partnerId);
    if (!Number.isInteger(partnerId)) {
      return res.status(400).json({ error: "ID mitra tidak valid" });
    }

    const rows = db.prepare(`${taskSelect} WHERE t.partner_id = ? ORDER BY t.is_active DESC, t.id DESC`).all(partnerId);
    res.json(rows.map(formatTask));
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil lowongan milik mitra" });
  }
});

// GET /api/tasks/:id
router.get("/:id", (req, res) => {
  try {
    const task = db.prepare(`${taskSelect} WHERE t.id = ? AND t.is_active = 1`).get(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Lowongan tidak ditemukan" });
    }
    res.json(formatTask(task));
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil detail tugas" });
  }
});

// POST /api/tasks
router.post("/", (req, res) => {
  try {
    const {
      title, categoryKey, partnerId, customPartnerName, stipend, duration,
      location, whatsAppNumber, startDate, isFeatured, description
    } = req.body;

    if (!title || !categoryKey || !location || !whatsAppNumber || !startDate || !description) {
      return res.status(400).json({ error: "Data wajib tidak lengkap" });
    }

    const result = db.prepare(`
      INSERT INTO tasks (
        title, category_key, partner_id, custom_partner_name, stipend, duration,
        schedule, available_days, distance_km, location, whatsapp_number, start_date,
        is_featured, is_active, description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
    `).run(
      title,
      categoryKey,
      Number.isInteger(Number(partnerId)) ? Number(partnerId) : null,
      customPartnerName || "Mitra UMKM",
      parseInt(stipend, 10) || 50000,
      duration || "Sesuai kesepakatan",
      startDate,
      JSON.stringify(["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]),
      1.0,
      location,
      whatsAppNumber,
      startDate,
      isFeatured ? 1 : 0,
      description
    );

    res.status(201).json({
      success: true,
      taskId: Number(result.lastInsertRowid),
      isFeatured: Boolean(isFeatured)
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal menyimpan lowongan" });
  }
});

// PATCH /api/tasks/:id/status
router.patch("/:id/status", (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const partnerId = Number(req.body.partnerId);
    const isActive = req.body.isActive;
    if (!Number.isInteger(taskId) || !Number.isInteger(partnerId) || typeof isActive !== "boolean") {
      return res.status(400).json({ error: "Data status lowongan tidak valid" });
    }

    const result = db.prepare(
      "UPDATE tasks SET is_active = ? WHERE id = ? AND partner_id = ?"
    ).run(isActive ? 1 : 0, taskId, partnerId);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Lowongan tidak ditemukan atau bukan milik akun ini" });
    }
    res.json({ success: true, isActive });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengubah status lowongan" });
  }
});

// DELETE /api/tasks/:id
router.delete("/:id", (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const partnerId = Number(req.query.partnerId);
    if (!Number.isInteger(taskId) || !Number.isInteger(partnerId)) {
      return res.status(400).json({ error: "Data penghapusan lowongan tidak valid" });
    }

    const result = db.prepare("DELETE FROM tasks WHERE id = ? AND partner_id = ?").run(taskId, partnerId);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Lowongan tidak ditemukan atau bukan milik akun ini" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus lowongan" });
  }
});

module.exports = router;
