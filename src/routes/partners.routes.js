const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/partners
router.get("/", (req, res) => {
  try {
    const partners = db.prepare("SELECT * FROM partners ORDER BY id ASC").all();
    const formatted = partners.map((p) => {
      const taskCount = db.prepare("SELECT COUNT(*) as c FROM tasks WHERE partner_id = ?").get(p.id).c;
      return {
        id: p.id,
        name: p.name,
        rating: p.rating,
        initials: p.initials,
        brandColor: p.brand_color,
        taskCount
      };
    });
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil daftar mitra" });
  }
});

module.exports = router;

