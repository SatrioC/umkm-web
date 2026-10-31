const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");

const dbPath = path.resolve(__dirname, "../../database.sqlite");
const db = new DatabaseSync(dbPath);

// Konfigurasi schema database
db.exec(`
  CREATE TABLE IF NOT EXISTS partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    rating REAL DEFAULT 4.8,
    initials TEXT,
    brand_color TEXT,
    whatsapp_number TEXT UNIQUE,
    password TEXT DEFAULT 'mitra123',
    email TEXT
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category_key TEXT NOT NULL,
    partner_id INTEGER,
    custom_partner_name TEXT,
    stipend INTEGER NOT NULL,
    duration TEXT,
    schedule TEXT,
    available_days TEXT,
    distance_km REAL DEFAULT 1.0,
    location TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    start_date TEXT NOT NULL,
    is_featured INTEGER DEFAULT 0,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    stage_index INTEGER DEFAULT 0,
    candidate_status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migrasi kolom jika tabel partners sudah ada sebelumnya
try { db.exec("ALTER TABLE partners ADD COLUMN whatsapp_number TEXT;"); } catch {}
try { db.exec("ALTER TABLE partners ADD COLUMN password TEXT DEFAULT 'mitra123';"); } catch {}
try { db.exec("ALTER TABLE partners ADD COLUMN email TEXT;"); } catch {}

// Seed data awal jika tabel partners masih kosong
const partnerCountRow = db.prepare("SELECT COUNT(*) AS count FROM partners").get();
if (partnerCountRow.count === 0) {
  const insertPartnerStmt = db.prepare(
    "INSERT INTO partners (name, rating, initials, brand_color, whatsapp_number, password, email) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  insertPartnerStmt.run("Kopi Senja", 4.9, "KS", "#b45309", "081234567891", "mitra123", "kopisenja@sambilan.id");
  insertPartnerStmt.run("Toko Kue Mawar", 4.8, "TM", "#be185d", "081234567892", "mitra123", "kuemawar@sambilan.id");
  insertPartnerStmt.run("Bengkel Roda Jaya", 4.7, "RJ", "#0f766e", "081234567893", "mitra123", "rodajaya@sambilan.id");
  insertPartnerStmt.run("Batik Nusantara", 4.9, "BN", "#6d28d9", "081234567894", "mitra123", "batik@sambilan.id");
  insertPartnerStmt.run("Warung Berkah", 4.6, "WB", "#15803d", "081234567895", "mitra123", "berkah@sambilan.id");
} else {
  db.prepare("UPDATE partners SET whatsapp_number = '081234567891', password = 'mitra123', email = 'kopisenja@sambilan.id' WHERE id = 1 AND whatsapp_number IS NULL").run();
  db.prepare("UPDATE partners SET whatsapp_number = '081234567892', password = 'mitra123', email = 'kuemawar@sambilan.id' WHERE id = 2 AND whatsapp_number IS NULL").run();
  db.prepare("UPDATE partners SET whatsapp_number = '081234567893', password = 'mitra123', email = 'rodajaya@sambilan.id' WHERE id = 3 AND whatsapp_number IS NULL").run();
  db.prepare("UPDATE partners SET whatsapp_number = '081234567894', password = 'mitra123', email = 'batik@sambilan.id' WHERE id = 4 AND whatsapp_number IS NULL").run();
  db.prepare("UPDATE partners SET whatsapp_number = '081234567895', password = 'mitra123', email = 'berkah@sambilan.id' WHERE id = 5 AND whatsapp_number IS NULL").run();
}

// Seed data awal tugas jika tabel tasks masih kosong
const taskCountRow = db.prepare("SELECT COUNT(*) AS count FROM tasks").get();
if (taskCountRow.count === 0) {
  const insertTaskStmt = db.prepare(`
    INSERT INTO tasks (
      title, category_key, partner_id, custom_partner_name, stipend, duration,
      schedule, available_days, distance_km, location, whatsapp_number, start_date, is_featured, description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialSeedTasks = [
    [
      "Jaga booth bazar kampus", "booth", 1, null, 150000, "4 jam",
      "Sabtu, 09.00", JSON.stringify(["Sab"]), 1.2, "Kantin Pusat Kampus, Sleman",
      "6281234567891", "2026-11-07", 1,
      "Jaga booth kopi di bazar kampus: melayani pembeli, merapikan stan, dan mencatat penjualan."
    ],
    [
      "Admin Instagram harian", "sosmed", 2, null, 80000, "1 jam/hari",
      "Fleksibel", JSON.stringify(["Sen", "Sel", "Rab", "Kam", "Jum"]), 1.5, "Jl. Kaliurang Km 5 (Remote)",
      "6281234567892", "2026-11-03", 1,
      "Unggah konten, balas komentar dan DM, lalu laporkan insight singkat setiap hari."
    ],
    [
      "Desain logo kilat", "desain", 3, null, 200000, "1 hari",
      "Tenggat Jumat", JSON.stringify(["Sen", "Sel", "Rab", "Kam", "Jum"]), 3.4, "Jl. Magelang Km 4, Sinduadi",
      "6281234567893", "2026-11-06", 0,
      "Buat logo bengkel dalam 2 opsi konsep dengan 1 kali revisi. File akhir PNG dan SVG."
    ],
    [
      "Foto produk katalog", "foto", 4, null, 175000, "3 jam",
      "Minggu, 10.00", JSON.stringify(["Min"]), 2.1, "Jl. Malioboro No. 42, Danurejan",
      "6281234567894", "2026-11-08", 1,
      "Foto 20 produk batik untuk katalog online. Kamera ponsel boleh, pencahayaan disediakan."
    ],
    [
      "Input data stok gudang", "data", 5, null, 120000, "5 jam",
      "Sabtu, 08.00", JSON.stringify(["Sab"]), 0.8, "Jl. Gejayan No. 18, Depok",
      "6281234567895", "2026-11-07", 0,
      "Pindahkan catatan stok kertas ke spreadsheet dan cek ulang jumlahnya."
    ],
    [
      "Tulis caption promo", "konten", 2, null, 60000, "2 jam",
      "Fleksibel", JSON.stringify(["Sen", "Rab", "Jum"]), 1.5, "Jl. Kaliurang Km 5, Sleman",
      "6281234567892", "2026-11-04", 0,
      "Tulis 15 caption promo untuk kue ulang tahun dengan gaya santai."
    ],
    [
      "Jaga stan pameran UMKM", "booth", 4, null, 200000, "6 jam",
      "Minggu, 09.00", JSON.stringify(["Min"]), 4.8, "Jogja Expo Center (JEC)",
      "6281234567894", "2026-11-15", 1,
      "Menyambut pengunjung dan menjelaskan produk batik di pameran UMKM."
    ],
    [
      "Edit video reels", "foto", 1, null, 140000, "3 jam",
      "Fleksibel", JSON.stringify(["Sel", "Kam"]), 1.2, "Kantin Pusat Kampus, Sleman",
      "6281234567891", "2026-11-10", 0,
      "Potong dan susun 3 video pendek dari bahan mentah yang sudah ada."
    ],
    [
      "Poster promo mingguan", "desain", 5, null, 90000, "2 jam",
      "Rabu, 16.00", JSON.stringify(["Rab"]), 0.8, "Jl. Gejayan No. 18, Depok",
      "6281234567895", "2026-11-11", 0,
      "Rancang poster promo ukuran A4 dan versi story Instagram."
    ],
    [
      "Rekap penjualan mingguan", "data", 3, null, 75000, "2 jam",
      "Jumat, 15.00", JSON.stringify(["Jum"]), 3.4, "Jl. Magelang Km 4, Sinduadi",
      "6281234567893", "2026-11-13", 0,
      "Rekap nota penjualan satu minggu ke dalam tabel yang rapi."
    ]
  ];

  for (const task of initialSeedTasks) {
    insertTaskStmt.run(...task);
  }
}

module.exports = db;

