const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/applications
router.get("/", (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT a.*, t.title as task_title, t.stipend as task_stipend, t.location as task_location,
             t.whatsapp_number as task_whatsapp, p.name as partner_name, t.custom_partner_name
      FROM applications a
      JOIN tasks t ON a.task_id = t.id
      LEFT JOIN partners p ON t.partner_id = p.id
      ORDER BY a.id DESC
    `).all();

    const formatted = rows.map((r) => ({
      id: r.id,
      taskId: r.task_id,
      taskTitle: r.task_title,
      stipend: r.task_stipend,
      location: r.task_location,
      whatsAppNumber: r.task_whatsapp,
      partnerName: r.partner_name || r.custom_partner_name || "Mitra UMKM",
      stageIndex: r.stage_index,
      candidateStatus: r.candidate_status
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data aplikasi" });
  }
});

// POST /api/applications
router.post("/", (req, res) => {
  try {
    const { taskId } = req.body;
    if (!taskId) {
      return res.status(400).json({ error: "taskId wajib disertakan" });
    }

    const existing = db.prepare("SELECT * FROM applications WHERE task_id = ?").get(taskId);
    if (existing) {
      return res.json({ id: existing.id, taskId, stageIndex: existing.stage_index });
    }

    const insertStmt = db.prepare(`
      INSERT INTO applications (task_id, stage_index, candidate_status)
      VALUES (?, 1, 'pending')
    `);

    const result = insertStmt.run(taskId);
    res.status(201).json({
      success: true,
      id: Number(result.lastInsertRowid),
      taskId,
      stageIndex: 1,
      candidateStatus: "pending"
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal mencatat kontak" });
  }
});

// PATCH /api/applications/:id
router.patch("/:id", (req, res) => {
  try {
    const { stageIndex, candidateStatus } = req.body;
    const appId = req.params.id;

    if (candidateStatus) {
      db.prepare("UPDATE applications SET candidate_status = ?, stage_index = ? WHERE id = ?").run(
        candidateStatus,
        candidateStatus === "accepted" ? 4 : 2,
        appId
      );
    } else if (typeof stageIndex === "number") {
      db.prepare("UPDATE applications SET stage_index = ? WHERE id = ?").run(stageIndex, appId);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Gagal memperbarui status aplikasi" });
  }
});

module.exports = router;

