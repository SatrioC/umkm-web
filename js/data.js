const JOB_CATEGORIES = {
  booth: {
    title: "Jaga booth & event",
    subtitle: "Bazar, pameran",
    icon: "🎪"
  },
  sosmed: {
    title: "Admin media sosial",
    subtitle: "Instagram, TikTok",
    icon: "📱"
  },
  desain: {
    title: "Desain kreatif",
    subtitle: "Logo, poster",
    icon: "🎨"
  },
  konten: {
    title: "Penulisan & konten",
    subtitle: "Caption, artikel",
    icon: "✍️"
  },
  foto: {
    title: "Foto & video",
    subtitle: "Foto produk, reels",
    icon: "📷"
  },
  data: {
    title: "Input data & admin",
    subtitle: "Rekap, stok",
    icon: "🗂️"
  }
};

const UMKM_PARTNERS = [
  { name: "Kopi Senja", rating: 4.9, initials: "KS", brandColor: "#b45309", whatsAppNumber: "081234567891" },
  { name: "Toko Kue Mawar", rating: 4.8, initials: "TM", brandColor: "#be185d", whatsAppNumber: "081234567892" },
  { name: "Bengkel Roda Jaya", rating: 4.7, initials: "RJ", brandColor: "#0f766e", whatsAppNumber: "081234567893" },
  { name: "Batik Nusantara", rating: 4.9, initials: "BN", brandColor: "#6d28d9", whatsAppNumber: "081234567894" },
  { name: "Warung Berkah", rating: 4.6, initials: "WB", brandColor: "#15803d", whatsAppNumber: "081234567895" }
];

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum"];

const INITIAL_TASKS = [
  {
    id: 1,
    title: "Jaga booth bazar kampus",
    categoryKey: "booth",
    partnerIndex: 0,
    stipend: 150000,
    duration: "4 jam",
    schedule: "Sabtu, 09.00",
    availableDays: ["Sab"],
    distanceKm: 1.2,
    location: "Kantin Pusat Kampus, Sleman",
    whatsAppNumber: "6281234567891",
    startDate: "2026-11-07",
    isFeatured: true,
    description: "Jaga booth kopi di bazar kampus: melayani pembeli, merapikan stan, dan mencatat penjualan."
  },
  {
    id: 2,
    title: "Admin Instagram harian",
    categoryKey: "sosmed",
    partnerIndex: 1,
    stipend: 80000,
    duration: "1 jam/hari",
    schedule: "Fleksibel",
    availableDays: WEEKDAYS,
    distanceKm: 1.5,
    location: "Jl. Kaliurang Km 5 (Remote/Online)",
    whatsAppNumber: "6281234567892",
    startDate: "2026-11-03",
    isFeatured: true,
    description: "Unggah konten, balas komentar dan DM, lalu laporkan insight singkat setiap hari."
  },
  {
    id: 3,
    title: "Desain logo kilat",
    categoryKey: "desain",
    partnerIndex: 2,
    stipend: 200000,
    duration: "1 hari",
    schedule: "Tenggat Jumat",
    availableDays: WEEKDAYS,
    distanceKm: 3.4,
    location: "Jl. Magelang Km 4, Sinduadi",
    whatsAppNumber: "6281234567893",
    startDate: "2026-11-06",
    isFeatured: false,
    description: "Buat logo bengkel dalam 2 opsi konsep dengan 1 kali revisi. File akhir PNG dan SVG."
  },
  {
    id: 4,
    title: "Foto produk katalog",
    categoryKey: "foto",
    partnerIndex: 3,
    stipend: 175000,
    duration: "3 jam",
    schedule: "Minggu, 10.00",
    availableDays: ["Min"],
    distanceKm: 2.1,
    location: "Jl. Malioboro No. 42, Danurejan",
    whatsAppNumber: "6281234567894",
    startDate: "2026-11-08",
    isFeatured: true,
    description: "Foto 20 produk batik untuk katalog online. Kamera ponsel boleh, pencahayaan disediakan."
  },
  {
    id: 5,
    title: "Input data stok gudang",
    categoryKey: "data",
    partnerIndex: 4,
    stipend: 120000,
    duration: "5 jam",
    schedule: "Sabtu, 08.00",
    availableDays: ["Sab"],
    distanceKm: 0.8,
    location: "Jl. Gejayan No. 18, Depok",
    whatsAppNumber: "6281234567895",
    startDate: "2026-11-07",
    isFeatured: false,
    description: "Pindahkan catatan stok kertas ke spreadsheet dan cek ulang jumlahnya."
  },
  {
    id: 6,
    title: "Tulis caption promo",
    categoryKey: "konten",
    partnerIndex: 1,
    stipend: 60000,
    duration: "2 jam",
    schedule: "Fleksibel",
    availableDays: ["Sen", "Rab", "Jum"],
    distanceKm: 1.5,
    location: "Jl. Kaliurang Km 5, Sleman",
    whatsAppNumber: "6281234567892",
    startDate: "2026-11-04",
    isFeatured: false,
    description: "Tulis 15 caption promo untuk kue ulang tahun dengan gaya santai."
  },
  {
    id: 7,
    title: "Jaga stan pameran UMKM",
    categoryKey: "booth",
    partnerIndex: 3,
    stipend: 200000,
    duration: "6 jam",
    schedule: "Minggu, 09.00",
    availableDays: ["Min"],
    distanceKm: 4.8,
    location: "Jogja Expo Center (JEC)",
    whatsAppNumber: "6281234567894",
    startDate: "2026-11-15",
    isFeatured: true,
    description: "Menyambut pengunjung dan menjelaskan produk batik di pameran UMKM."
  },
  {
    id: 8,
    title: "Edit video reels",
    categoryKey: "foto",
    partnerIndex: 0,
    stipend: 140000,
    duration: "3 jam",
    schedule: "Fleksibel",
    availableDays: ["Sel", "Kam"],
    distanceKm: 1.2,
    location: "Kantin Pusat Kampus, Sleman",
    whatsAppNumber: "6281234567891",
    startDate: "2026-11-10",
    isFeatured: false,
    description: "Potong dan susun 3 video pendek dari bahan mentah yang sudah ada."
  },
  {
    id: 9,
    title: "Poster promo mingguan",
    categoryKey: "desain",
    partnerIndex: 4,
    stipend: 90000,
    duration: "2 jam",
    schedule: "Rabu, 16.00",
    availableDays: ["Rab"],
    distanceKm: 0.8,
    location: "Jl. Gejayan No. 18, Depok",
    whatsAppNumber: "6281234567895",
    startDate: "2026-11-11",
    isFeatured: false,
    description: "Rancang poster promo ukuran A4 dan versi story Instagram."
  },
  {
    id: 10,
    title: "Rekap penjualan mingguan",
    categoryKey: "data",
    partnerIndex: 2,
    stipend: 75000,
    duration: "2 jam",
    schedule: "Jumat, 15.00",
    availableDays: ["Jum"],
    distanceKm: 3.4,
    location: "Jl. Magelang Km 4, Sinduadi",
    whatsAppNumber: "6281234567893",
    startDate: "2026-11-13",
    isFeatured: false,
    description: "Rekap nota penjualan satu minggu ke dalam tabel yang rapi."
  }
];

const APPLICATION_STAGES = [
  "Hubungi via WA",
  "UMKM Menerima WA",
  "Review Kesesuaian",
  "Kandidat Diterima",
  "Selesai"
];

if (typeof globalThis !== "undefined") {
  globalThis.JOB_CATEGORIES = JOB_CATEGORIES;
  globalThis.UMKM_PARTNERS = UMKM_PARTNERS;
  globalThis.INITIAL_TASKS = INITIAL_TASKS;
  globalThis.APPLICATION_STAGES = APPLICATION_STAGES;
}

