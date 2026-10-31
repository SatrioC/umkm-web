const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/tasks
router.get("/", (req, res) => {
  try {
    const { q, category, featured, near, weekend, hi } = req.query;

    let sql = `
      SELECT t.*, p.name as partner_name, p.rating as partner_rating, p.brand_color as partner_color
      FROM tasks t
      LEFT JOIN partners p ON t.partner_id = p.id
      WHERE 1=1
    `;
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

    const rows = db.prepare(sql).all(...params);

    const formatted = rows
      .map((row) => ({
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
        description: row.description
      }))
      .filter((task) => {
        if (!q) return true;
        const query = q.toLowerCase();
        const searchable = `${task.title} ${task.partnerName} ${task.location} ${task.description}`.toLowerCase();
        return searchable.includes(query);
      })
      .filter((task) => {
        if (weekend === "1" || weekend === "true") {
          return task.availableDays.some((d) => d === "Sab" || d === "Min");
        }
        return true;
      });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil daftar tugas" });
  }
});

// GET /api/tasks/:id
router.get("/:id", (req, res) => {
  try {
    const task = db.prepare(`
      SELECT t.*, p.name as partner_name, p.rating as partner_rating, p.brand_color as partner_color
      FROM tasks t
      LEFT JOIN partners p ON t.partner_id = p.id
      WHERE t.id = ?
    `).get(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Lowongan tidak ditemukan" });
    }

    res.json({
      id: task.id,
      title: task.title,
      categoryKey: task.category_key,
      partnerIndex: task.partner_id ? task.partner_id - 1 : 0,
      partnerName: task.partner_name || task.custom_partner_name || "Mitra UMKM",
      partnerRating: task.partner_rating || 4.8,
      stipend: task.stipend,
      duration: task.duration,
      schedule: task.schedule,
      availableDays: JSON.parse(task.available_days || "[]"),
      distanceKm: task.distance_km,
      location: task.location,
      whatsAppNumber: task.whatsapp_number,
      startDate: task.start_date,
      isFeatured: Boolean(task.is_featured),
      description: task.description
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil detail tugas" });
  }
});

// POST /api/tasks
router.post("/", (req, res) => {
  try {
    const {
      title,
      categoryKey,
      customPartnerName,
      stipend,
      duration,
      location,
      whatsAppNumber,
      startDate,
      isFeatured,
      description
    } = req.body;

    if (!title || !categoryKey || !location || !whatsAppNumber || !startDate || !description) {
      return res.status(400).json({ error: "Data wajib tidak lengkap" });
    }

    const insertStmt = db.prepare(`
      INSERT INTO tasks (
        title, category_key, partner_id, custom_partner_name, stipend, duration,
        schedule, available_days, distance_km, location, whatsapp_number, start_date, is_featured, description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertStmt.run(
      title,
      categoryKey,
      null,
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

module.exports = router;

