const express = require("express");
const router = express.Router();
const db = require("../config/db");

// POST /api/auth/login
router.post("/login", (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ error: "Nomor WhatsApp atau email dan kata sandi wajib diisi" });
    }

    const cleanInput = identifier.trim();
    const cleanDigits = cleanInput.replace(/\D/g, "");
    const altDigits = cleanDigits.startsWith("0") ? "62" + cleanDigits.slice(1) : (cleanDigits.startsWith("62") ? "0" + cleanDigits.slice(2) : cleanDigits);

    const partner = db.prepare(`
      SELECT * FROM partners 
      WHERE whatsapp_number = ? 
         OR whatsapp_number = ? 
         OR whatsapp_number = ?
         OR LOWER(email) = ?
    `).get(cleanInput, cleanDigits, altDigits, cleanInput.toLowerCase());

    if (!partner) {
      return res.status(401).json({ error: "Akun mitra UMKM tidak ditemukan. Pastikan nomor WhatsApp sudah terdaftar." });
    }

    if (partner.password && partner.password !== password.trim()) {
      return res.status(401).json({ error: "Kata sandi salah. Silakan coba lagi." });
    }

    const taskCount = db.prepare("SELECT COUNT(*) as c FROM tasks WHERE partner_id = ?").get(partner.id).c;

    res.json({
      success: true,
      partner: {
        id: partner.id,
        name: partner.name,
        initials: partner.initials,
        brandColor: partner.brand_color,
        whatsAppNumber: partner.whatsapp_number,
        email: partner.email,
        rating: partner.rating,
        taskCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal memproses otentikasi login mitra." });
  }
});

// POST /api/auth/register
router.post("/register", (req, res) => {
  try {
    const { name, whatsappNumber, password } = req.body;
    if (!name || !whatsappNumber || !password) {
      return res.status(400).json({ error: "Nama usaha, nomor WhatsApp, dan kata sandi wajib diisi" });
    }

    const cleanPhone = whatsappNumber.trim().replace(/\D/g, "");
    if (cleanPhone.length < 9) {
      return res.status(400).json({ error: "Nomor WhatsApp tidak valid (minimal 9 digit angka)" });
    }

    const existing = db.prepare(`
      SELECT * FROM partners 
      WHERE whatsapp_number = ? OR whatsapp_number = ?
    `).get(whatsappNumber.trim(), cleanPhone);

    if (existing) {
      return res.status(409).json({ error: "Nomor WhatsApp ini sudah terdaftar. Silakan langsung masuk." });
    }

    const initials = name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "UM";
    const colors = ["#b45309", "#be185d", "#0f766e", "#6d28d9", "#15803d", "#0b63d8", "#c2410c"];
    const brandColor = colors[Math.floor(Math.random() * colors.length)];

    const insertStmt = db.prepare(`
      INSERT INTO partners (name, rating, initials, brand_color, whatsapp_number, password, email)
      VALUES (?, 4.8, ?, ?, ?, ?, ?)
    `);

    const result = insertStmt.run(
      name.trim(),
      initials,
      brandColor,
      cleanPhone,
      password.trim(),
      `${cleanPhone}@sambilan.id`
    );

    const newId = Number(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      partner: {
        id: newId,
        name: name.trim(),
        initials,
        brandColor,
        whatsAppNumber: cleanPhone,
        rating: 4.8,
        taskCount: 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal mendaftarkan akun mitra baru ke database." });
  }
});

module.exports = router;

