const STORAGE_KEY_TASKS = "sambilan_posted_tasks";
const STORAGE_KEY_APPLICATIONS = "sambilan_applications";

const APP_ICONS = {
  booth: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  sosmed: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
  desain: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"></path></svg>`,
  konten: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,
  foto: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
  data: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
  star: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  verified: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
  calendar: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  location: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  bookmark: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`,
  bookmarkFilled: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`,
  whatsapp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`
};

function getApiBaseUrl() {
  if (typeof window !== "undefined" && window.location) {
    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
      if (window.location.port === "3000") return "";
      return "http://localhost:3000";
    }
    return "http://localhost:3000";
  }
  return "";
}

function loadStoredTasks() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY_TASKS);
    if (!rawData) return [...INITIAL_TASKS];
    const parsedData = JSON.parse(rawData);
    return Array.isArray(parsedData) && parsedData.length ? parsedData : [...INITIAL_TASKS];
  } catch {
    return [...INITIAL_TASKS];
  }
}

function loadStoredApplications() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
    return rawData ? JSON.parse(rawData) : [];
  } catch {
    return [];
  }
}

const appState = {
  allTasks: loadStoredTasks(),
  activeSearchQuery: "",
  activeLocationQuery: "",
  activeScheduleOption: "all",
  selectedCategory: "",
  filterNearCampus: false,
  filterWeekendOnly: false,
  filterHighCompensation: false,
  filterFeaturedOnly: false,
  sortBy: "latest",
  maxDistanceKm: 10,
  minStipend: 0,
  savedTaskIds: {},
  submittedApplications: loadStoredApplications()
};

let toastTimeoutId = null;

function saveTasksToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(appState.allTasks));
  } catch (err) {
    console.error("Gagal menyimpan data lowongan ke local storage", err);
  }
}

function saveApplicationsToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(appState.submittedApplications));
  } catch (err) {
    console.error("Gagal menyimpan riwayat aplikasi", err);
  }
}

async function syncDataWithBackend() {
  try {
    const baseUrl = getApiBaseUrl();
    const tasksResponse = await fetch(`${baseUrl}/api/tasks`);
    if (tasksResponse.ok) {
      const serverTasks = await tasksResponse.json();
      if (Array.isArray(serverTasks) && serverTasks.length > 0) {
        appState.allTasks = serverTasks;
      }
    }

    const applicationsResponse = await fetch(`${baseUrl}/api/applications`);
    if (applicationsResponse.ok) {
      const serverApplications = await applicationsResponse.json();
      if (Array.isArray(serverApplications)) {
        appState.submittedApplications = serverApplications;
      }
    }

    renderCurrentPage();
  } catch (err) {
    console.warn("Backend offline atau tidak terjangkau, menggunakan data lokal:", err);
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("sambilan_theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    document.documentElement.dataset.theme = savedTheme;
  }
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme;
  const isCurrentlyDark = current === "dark" || (!current && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const nextTheme = isCurrentlyDark ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("sambilan_theme", nextTheme);
  showToastNotification(`Mode ${nextTheme === "dark" ? "Gelap" : "Terang"} diaktifkan`);
}

function formatRupiah(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}

function formatPhoneNumberForWhatsApp(rawPhone) {
  const digitsOnly = String(rawPhone).replace(/\D/g, "");
  if (digitsOnly.startsWith("0")) {
    return "62" + digitsOnly.slice(1);
  }
  return digitsOnly;
}

function showToastNotification(message) {
  const toastElement = document.getElementById("toast-feedback");
  if (!toastElement) return;

  toastElement.textContent = message;
  toastElement.classList.add("active");

  clearTimeout(toastTimeoutId);
  toastTimeoutId = setTimeout(() => {
    toastElement.classList.remove("active");
  }, 2400);
}

function getTaskPartner(task) {
  if (task.partnerName) {
    return {
      name: task.partnerName,
      rating: task.partnerRating || 4.8,
      initials: (task.partnerName || "UM").slice(0, 2).toUpperCase(),
      brandColor: task.partnerColor || "#0b63d8"
    };
  }
  if (typeof task.partnerIndex === "number" && UMKM_PARTNERS[task.partnerIndex]) {
    return UMKM_PARTNERS[task.partnerIndex];
  }
  return {
    name: task.customPartnerName || "Mitra UMKM",
    rating: 4.8,
    initials: (task.customPartnerName || "UM").slice(0, 2).toUpperCase(),
    brandColor: "#0b63d8"
  };
}

function getFilteredTasks() {
  const query = appState.activeSearchQuery.trim().toLowerCase();
  const locationQuery = appState.activeLocationQuery.trim().toLowerCase();

  let results = appState.allTasks.filter((task) => {
    const partner = getTaskPartner(task);
    const category = JOB_CATEGORIES[task.categoryKey] || { title: "Lainnya", subtitle: "" };
    const searchableContent = [
      task.title,
      partner.name,
      category.title,
      category.subtitle,
      task.location,
      task.description
    ].join(" ").toLowerCase();

    const matchesQuery = !query || searchableContent.includes(query);
    const matchesLocation = !locationQuery || (task.location && task.location.toLowerCase().includes(locationQuery));
    const matchesCategory = !appState.selectedCategory || task.categoryKey === appState.selectedCategory;
    const matchesProximity = !appState.filterNearCampus || task.distanceKm <= (appState.maxDistanceKm <= 3 ? appState.maxDistanceKm : 2.5);
    const matchesDistance = !appState.maxDistanceKm || task.distanceKm <= appState.maxDistanceKm;
    const matchesMinStipend = !appState.minStipend || task.stipend >= appState.minStipend;
    const matchesWeekend = !appState.filterWeekendOnly || (task.availableDays && task.availableDays.some((day) => day === "Sab" || day === "Min"));
    const matchesHighPay = !appState.filterHighCompensation || task.stipend >= 100000;
    const matchesFeatured = !appState.filterFeaturedOnly || task.isFeatured === true;

    return matchesQuery && matchesLocation && matchesCategory && matchesProximity && matchesDistance && matchesMinStipend && matchesWeekend && matchesHighPay && matchesFeatured;
  });

  if (appState.sortBy === "stipend") {
    results.sort((a, b) => b.stipend - a.stipend);
  } else if (appState.sortBy === "distance") {
    results.sort((a, b) => (a.distanceKm || 99) - (b.distanceKm || 99));
  } else {
    results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.id - a.id);
  }

  return results;
}

function createGlintsCardHtml(task) {
  const partner = getTaskPartner(task);
  const isBookmarked = !!appState.savedTaskIds[task.id];
  const isWeekend = task.availableDays && task.availableDays.some((d) => d === "Sab" || d === "Min");

  return `
    <article class="glints-task-card" data-open-task="${task.id}" tabindex="0" role="button" aria-label="Buka detail ${task.title}">
      <div class="card-glints-header">
        <h3 class="card-job-title">${task.title}</h3>
        <div class="card-stipend">${formatRupiah(task.stipend)}</div>
      </div>

      <div class="card-badge-row">
        ${task.isFeatured ? `<span class="glints-pill-tag glints-pill-urgent">${APP_ICONS.star} PRIORITAS</span>` : ""}
        <span class="glints-pill-tag">${APP_ICONS.calendar} ${isWeekend ? "Akhir Pekan" : "Fleksibel"}</span>
        <span class="glints-pill-tag">${APP_ICONS.location} ${task.distanceKm <= 2 ? "Dekat Kampus (" + task.distanceKm + " km)" : task.distanceKm + " km"}</span>
        <span class="glints-pill-tag">${task.duration || "Paruh Waktu"}</span>
      </div>

      <div class="card-company-row">
        <div class="company-avatar-box" style="background-color:${partner.brandColor || '#0b63d8'}">
          ${partner.initials || "UM"}
        </div>
        <div class="company-meta-col">
          <div class="company-name-text">
            <span>${partner.name}</span>
            <span class="company-verified-icon" title="UMKM Terverifikasi">${APP_ICONS.verified}</span>
          </div>
          <div class="company-location-text">
            ${APP_ICONS.location} <span>${task.location}</span>
          </div>
        </div>
        <button
          type="button"
          class="bookmark-btn ${isBookmarked ? "active" : ""}"
          data-bookmark="${task.id}"
          aria-label="Simpan lowongan ini"
          title="Simpan lowongan"
        >
          ${isBookmarked ? APP_ICONS.bookmarkFilled : APP_ICONS.bookmark}
        </button>
      </div>
    </article>
  `;
}

function renderCategorySidebar() {
  const container = document.getElementById("category-sidebar-list");
  if (!container) return;

  container.innerHTML = Object.entries(JOB_CATEGORIES)
    .map(([key, item]) => {
      const isSelected = appState.selectedCategory === key;
      const iconSvg = APP_ICONS[key] || APP_ICONS.booth;
      return `
        <button type="button" data-cat="${key}" class="${isSelected ? "active" : ""}">
          <span class="cat-title-group">
            <span class="cat-svg-icon">${iconSvg}</span>
            ${item.title}
          </span>
          <span class="cat-subtitle-text">${item.subtitle}</span>
          <em>›</em>
        </button>
      `;
    })
    .join("");
}

function renderFilterChips() {
  const container = document.getElementById("filter-chips-container");
  if (!container) return;

  const isAllSelected =
    !appState.activeSearchQuery &&
    !appState.selectedCategory &&
    !appState.filterNearCampus &&
    !appState.filterWeekendOnly &&
    !appState.filterHighCompensation &&
    !appState.filterFeaturedOnly &&
    !appState.activeLocationQuery;

  const filterOptions = [
    { key: "filterFeaturedOnly", label: "Prioritas (Fee)" },
    { key: "filterNearCampus", label: "Dekat (≤ 2 km)" },
    { key: "filterWeekendOnly", label: "Akhir Pekan" },
    { key: "filterHighCompensation", label: "≥ Rp100 rb" }
  ];

  const chipsHtml = [
    `<button type="button" class="filter-chip ${isAllSelected ? "active" : ""}" data-action="reset-filters">Semua</button>`,
    ...filterOptions.map(
      (opt) => `<button type="button" class="filter-chip ${appState[opt.key] ? "active" : ""}" data-filter="${opt.key}">${opt.label}</button>`
    )
  ];

  if (appState.selectedCategory) {
    const activeCategory = JOB_CATEGORIES[appState.selectedCategory];
    if (activeCategory) {
      chipsHtml.push(
        `<button type="button" class="filter-chip active" data-cat="${appState.selectedCategory}">${activeCategory.title} ✕</button>`
      );
    }
  }

  if (appState.activeLocationQuery) {
    chipsHtml.push(
      `<button type="button" class="filter-chip active" data-clear-location>${appState.activeLocationQuery} ✕</button>`
    );
  }

  container.innerHTML = chipsHtml.join("");
}

function renderFeaturedTasksSection() {
  const featuredContainer = document.getElementById("featured-tasks-grid");
  if (!featuredContainer) return;

  const featuredTasks = appState.allTasks.filter((task) => task.isFeatured === true);

  if (featuredTasks.length === 0) {
    featuredContainer.innerHTML = `
      <div class="empty-state">
        <p>Belum ada lowongan berbayar yang dipromosikan ke halaman depan.</p>
      </div>
    `;
    return;
  }

  featuredContainer.innerHTML = featuredTasks.slice(0, 3).map(createGlintsCardHtml).join("");
}

function renderTaskList() {
  const taskCountBadge = document.getElementById("task-results-count");
  const taskGridContainer = document.getElementById("task-grid-container");
  if (!taskGridContainer) return;

  const filteredTasks = getFilteredTasks();
  if (taskCountBadge) {
    taskCountBadge.textContent = `${filteredTasks.length} tugas tersedia`;
  }

  if (filteredTasks.length === 0) {
    taskGridContainer.innerHTML = `
      <div class="empty-state">
        <h3>Belum ada tugas yang cocok</h3>
        <p>Coba sesuaikan filter atau pilih kategori lainnya.</p>
      </div>
    `;
    return;
  }

  taskGridContainer.innerHTML = filteredTasks.map(createGlintsCardHtml).join("");
}

function renderPartnerList() {
  const container = document.getElementById("verified-partners-row");
  if (!container) return;

  container.innerHTML = UMKM_PARTNERS.map((partner, index) => {
    const taskCountForPartner = appState.allTasks.filter((task) => task.partnerIndex === index).length;
    return `
      <div class="surface-box partner-card">
        <div class="partner-avatar" style="background-color:${partner.brandColor}">${partner.initials}</div>
        <b>${partner.name}</b>
        <span class="partner-subtitle" style="display:flex;align-items:center;gap:4px">
          ${APP_ICONS.verified} Terverifikasi · ${APP_ICONS.star} ${partner.rating}
        </span>
        <span class="tag-pill">${taskCountForPartner} lowongan aktif</span>
      </div>
    `;
  }).join("");
}

function renderApplicationDrawer() {
  const drawerContainer = document.getElementById("my-tasks-drawer");
  if (!drawerContainer) return;

  if (appState.submittedApplications.length === 0) {
    drawerContainer.innerHTML = `
      <button type="button" class="close-btn" data-action="close-overlays" aria-label="Tutup">×</button>
      <h2>Tugas Saya & Kontak UMKM</h2>
      <div class="empty-state" style="margin-top:20px">
        <h3>Belum Ada Riwayat Kontak</h3>
        <p>Pilih lowongan di katalog lalu hubungi via WhatsApp untuk memulai alur pendaftaran.</p>
      </div>
    `;
    return;
  }

  const applicationsHtml = appState.submittedApplications
    .map((app) => {
      const task = appState.allTasks.find((item) => item.id === app.taskId);
      if (!task) return "";
      const partner = getTaskPartner(task);
      const currentStage = app.stageIndex ?? 1;
      const isRejected = app.candidateStatus === "rejected";
      const isAccepted = app.candidateStatus === "accepted";

      return `
        <div class="application-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <h3>${task.title}</h3>
            <span class="card-stipend">${formatRupiah(task.stipend)}</span>
          </div>
          <p class="partner-subtitle" style="margin-top:4px">${partner.name} · ${task.location}</p>
          <div class="card-badge-row margin-top-8">
            <span class="glints-pill-tag">${APP_ICONS.whatsapp} WA: +${formatPhoneNumberForWhatsApp(task.whatsAppNumber || "6281234567890")}</span>
          </div>

          <div class="progress-track">
            ${APPLICATION_STAGES.map((_, idx) => `
              <i class="${idx <= currentStage && !isRejected ? "completed" : ""}"></i>
            `).join("")}
          </div>

          <div class="progress-status-row">
            <b>${isRejected ? "Tidak Cocok" : isAccepted ? "Kandidat Diterima" : APPLICATION_STAGES[currentStage]}</b>
            ${
              !isRejected && !isAccepted && currentStage < 2
                ? `<button type="button" class="btn btn-outline-umkm" data-stage-advance="${task.id}" style="padding:4px 10px;font-size:12px">Simulasi WA Diterima</button>`
                : ""
            }
          </div>

          ${
            !isRejected && !isAccepted && currentStage >= 2
              ? `
                <div class="application-actions">
                  <button type="button" class="btn btn-primary" data-candidate-decision="accept" data-task-id="${task.id}">
                    Cocok (Terima)
                  </button>
                  <button type="button" class="btn btn-danger-outline" data-candidate-decision="reject" data-task-id="${task.id}">
                    Tidak Cocok
                  </button>
                </div>
              `
              : ""
          }

          ${
            isRejected
              ? `
                <div class="candidate-rejected-notice">
                  Status: UMKM menyatakan kandidat belum cocok. Mahasiswa diarahkan untuk melihat lowongan lain.
                </div>
              `
              : ""
          }

          ${
            isAccepted
              ? `
                <div class="candidate-accepted-notice">
                  ✔ UMKM menerima kandidat. Konfirmasi jadwal kerja telah disepakati melalui WhatsApp.
                </div>
              `
              : ""
          }
        </div>
      `;
    })
    .join("");

  drawerContainer.innerHTML = `
    <button type="button" class="close-btn" data-action="close-overlays" aria-label="Tutup">×</button>
    <h2>Tugas Saya & Kontak UMKM</h2>
    <div style="margin-top:16px">${applicationsHtml}</div>
  `;
}

function renderTaskDetailModal(taskId) {
  const task = appState.allTasks.find((item) => item.id === taskId);
  if (!task) return;

  const modalContainer = document.getElementById("task-detail-modal");
  const modalBackdrop = document.getElementById("modal-overlay-backdrop");
  const partner = getTaskPartner(task);

  if (!modalContainer || !modalBackdrop) return;

  modalContainer.className = "modal-dialog";

  const cleanPhone = formatPhoneNumberForWhatsApp(task.whatsAppNumber || "6281234567890");
  const whatsappPrefillText = encodeURIComponent(
    `Halo ${partner.name}, saya mahasiswa tertarik dengan lowongan "${task.title}" yang dipublikasikan di Sambilan. Apakah posisi ini masih dibuka?`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappPrefillText}`;

  modalContainer.innerHTML = `
    <button type="button" class="close-btn" data-action="close-overlays" aria-label="Tutup">×</button>
    <div style="display:flex;align-items:center;gap:8px">
      <span class="category-icon-box" style="width:36px;height:36px;border-radius:8px;background:var(--ps);display:grid;place-items:center;color:var(--pri)">
        ${APP_ICONS[task.categoryKey] || APP_ICONS.booth}
      </span>
      ${task.isFeatured ? `<span class="glints-pill-tag glints-pill-urgent">${APP_ICONS.star} PRIORITAS</span>` : ""}
    </div>
    <h3 style="margin-top:10px">${task.title}</h3>
    <p class="partner-subtitle" style="display:flex;align-items:center;gap:5px;margin-top:4px">
      ${partner.name} <span class="company-verified-icon">${APP_ICONS.verified}</span> · ${APP_ICONS.star} ${partner.rating}
    </p>
    <div class="card-stipend" style="font-size:20px;margin-top:10px">${formatRupiah(task.stipend)}</div>

    <div class="task-specs-grid">
      <div>Lokasi Usaha<b>${task.location || "Yogyakarta"}</b></div>
      <div>Tanggal Mulai<b>${task.startDate || task.schedule}</b></div>
      <div>Durasi Kerja<b>${task.duration || "Paruh Waktu"}</b></div>
      <div>Kontak WhatsApp<b>+${cleanPhone}</b></div>
    </div>

    <h4>Deskripsi & Tanggung Jawab</h4>
    <p class="modal-body-text">${task.description}</p>

    <h4>Persyaratan Mahasiswa</h4>
    <ul>
      <li>Mahasiswa aktif jujur dan berkomitmen</li>
      <li>Memiliki WhatsApp aktif untuk konfirmasi dengan pemilik UMKM</li>
      <li>Dapat hadir sesuai jadwal yang disepakati</li>
    </ul>

    <div class="modal-cta-box">
      <a
        href="${whatsappUrl}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-whatsapp"
        data-contact-wa="${task.id}"
      >
        ${APP_ICONS.whatsapp} Hubungi No. WhatsApp (+${cleanPhone})
      </a>
      <p style="font-size:12px;color:var(--mut);text-align:center">
        Membuka WhatsApp secara langsung untuk memulai komunikasi resmi dengan UMKM.
      </p>
    </div>
  `;

  modalBackdrop.classList.add("active");
}

let isOpeningPostJobAfterLogin = false;

function renderPartnerLoginModal(resumePostJob = false, authMode = "login") {
  isOpeningPostJobAfterLogin = Boolean(resumePostJob);
  const modalContainer = document.getElementById("task-detail-modal");
  const modalBackdrop = document.getElementById("modal-overlay-backdrop");
  if (!modalContainer || !modalBackdrop) return;

  modalContainer.className = "modal-dialog auth-modal-dialog";

  const userSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
  const lockSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
  const storeSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
  const phoneSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;

  if (authMode === "register") {
    modalContainer.innerHTML = `
      <button type="button" class="close-btn" data-action="close-overlays" aria-label="Tutup">×</button>
      <div class="auth-card-header">
        <h2 class="auth-card-title">Daftar Akun</h2>
        <p class="auth-card-subtitle">Buat akun mitra UMKM untuk pasang lowongan kerja</p>
      </div>

      <form id="partner-register-form">
        <div class="auth-input-group">
          <span class="auth-input-icon">${storeSvg}</span>
          <input
            type="text"
            id="register-name"
            class="auth-field"
            placeholder="Nama UMKM / Usaha"
            required
            autocomplete="organization"
          />
        </div>

        <div class="auth-input-group">
          <span class="auth-input-icon">${phoneSvg}</span>
          <input
            type="tel"
            id="register-whatsapp"
            class="auth-field"
            placeholder="Nomor WhatsApp Usaha (Contoh: 081234567890)"
            required
            autocomplete="tel"
          />
        </div>

        <div class="auth-input-group">
          <span class="auth-input-icon">${lockSvg}</span>
          <input
            type="password"
            id="register-password"
            class="auth-field has-toggle"
            placeholder="Buat kata sandi akun (min. 6 karakter)"
            required
            minlength="6"
            autocomplete="new-password"
          />
          <button type="button" class="auth-toggle-pass-btn" id="btn-toggle-reg-pass" aria-label="Lihat kata sandi">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
        </div>

        <div style="margin-top:4px;margin-bottom:16px;font-size:12px;color:var(--mut);line-height:1.45">
          Nomor WhatsApp akan otomatis digunakan oleh mahasiswa saat mengirim lamaran via WhatsApp.
        </div>

        <button type="submit" class="auth-btn-primary">
          Daftar sebagai Mitra Baru
        </button>
      </form>

      <div class="auth-footer">
        Sudah punya akun? <a href="javascript:void(0)" data-switch-auth="login">Masuk di sini</a>
      </div>
    `;
  } else {
    modalContainer.innerHTML = `
      <button type="button" class="close-btn" data-action="close-overlays" aria-label="Tutup">×</button>
      <div class="auth-card-header">
        <h2 class="auth-card-title">Login</h2>
        <p class="auth-card-subtitle">Sign in to your account</p>
      </div>

      <form id="partner-login-form">
        <div class="auth-input-group">
          <span class="auth-input-icon">${userSvg}</span>
          <input
            type="text"
            id="login-identifier"
            class="auth-field"
            placeholder="Username / No. WhatsApp"
            required
            autocomplete="username"
          />
        </div>

        <div class="auth-input-group">
          <span class="auth-input-icon">${lockSvg}</span>
          <input
            type="password"
            id="login-password"
            class="auth-field has-toggle"
            placeholder="Password"
            required
            autocomplete="current-password"
          />
          <button type="button" class="auth-toggle-pass-btn" id="btn-toggle-pass" aria-label="Lihat kata sandi">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
        </div>

        <div class="auth-actions-row">
          <label>
            <input type="checkbox" id="remember-me" checked>
            <span>Ingat sesi masuk</span>
          </label>
          <a href="javascript:void(0)" class="auth-link" onclick="alert('Untuk demonstrasi tugas: gunakan akun demo di atas dengan sandi: mitra123')">Forgot password?</a>
        </div>

        <button type="submit" class="auth-btn-primary">
          Login
        </button>
      </form>

      <div class="auth-footer">
        Don't have an account? <a href="javascript:void(0)" data-switch-auth="register">Register here</a>
      </div>
    `;
  }

  modalBackdrop.classList.add("active");
}

async function handlePartnerLoginSubmit(formElement) {
  const identifier = document.getElementById("login-identifier")?.value.trim();
  const password = document.getElementById("login-password")?.value.trim();
  const submitBtn = formElement.querySelector("button[type='submit']");

  if (!identifier || !password) {
    showToastNotification("Mohon isi nomor WhatsApp dan kata sandi.");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Memverifikasi...";
  }

  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.setItem("sambilan_partner_auth", JSON.stringify({
        id: data.partner.id,
        name: data.partner.name,
        phone: data.partner.whatsAppNumber || identifier,
        initials: data.partner.initials,
        brandColor: data.partner.brandColor,
        loggedInAt: new Date().toISOString()
      }));

      closeOverlays();
      showToastNotification(`Berhasil masuk sebagai ${data.partner.name}`);
      renderCurrentPage();

      if (isOpeningPostJobAfterLogin) {
        isOpeningPostJobAfterLogin = false;
        setTimeout(() => {
          renderPostJobModal();
        }, 250);
      }
      return;
    } else {
      showToastNotification(data.error || "Gagal masuk. Periksa nomor WhatsApp dan kata sandi.");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Login";
      }
      return;
    }
  } catch (err) {
    // Mode fallback jika server offline
    const partnerName = identifier.includes("081234567891") ? "Kopi Senja" : (identifier.includes("081234567892") ? "Toko Kue Mawar" : "Mitra UMKM");
    localStorage.setItem("sambilan_partner_auth", JSON.stringify({
      name: partnerName,
      phone: identifier,
      initials: partnerName.slice(0, 2).toUpperCase(),
      loggedInAt: new Date().toISOString()
    }));

    closeOverlays();
    showToastNotification(`Masuk offline sebagai ${partnerName}`);
    renderCurrentPage();

    if (isOpeningPostJobAfterLogin) {
      isOpeningPostJobAfterLogin = false;
      setTimeout(() => {
        renderPostJobModal();
      }, 250);
    }
  }
}

async function handlePartnerRegisterSubmit(formElement) {
  const name = document.getElementById("register-name")?.value.trim();
  const whatsappNumber = document.getElementById("register-whatsapp")?.value.trim();
  const password = document.getElementById("register-password")?.value.trim();
  const submitBtn = formElement.querySelector("button[type='submit']");

  if (!name || !whatsappNumber || !password) {
    showToastNotification("Mohon lengkapi semua kolom pendaftaran.");
    return;
  }

  if (password.length < 6) {
    showToastNotification("Kata sandi minimal 6 karakter.");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Mendaftarkan...";
  }

  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, whatsappNumber, password })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.setItem("sambilan_partner_auth", JSON.stringify({
        id: data.partner.id,
        name: data.partner.name,
        phone: data.partner.whatsAppNumber || whatsappNumber,
        initials: data.partner.initials,
        brandColor: data.partner.brandColor,
        loggedInAt: new Date().toISOString()
      }));

      closeOverlays();
      showToastNotification(`Selamat bergabung, ${data.partner.name}!`);
      renderCurrentPage();

      if (isOpeningPostJobAfterLogin) {
        isOpeningPostJobAfterLogin = false;
        setTimeout(() => {
          renderPostJobModal();
        }, 250);
      }
      return;
    } else {
      showToastNotification(data.error || "Gagal mendaftarkan akun mitra.");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Daftar sebagai Mitra Baru";
      }
      return;
    }
  } catch (err) {
    // Mode fallback offline
    const initials = name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "UM";
    localStorage.setItem("sambilan_partner_auth", JSON.stringify({
      name,
      phone: whatsappNumber,
      initials,
      brandColor: "#0b63d8",
      loggedInAt: new Date().toISOString()
    }));

    closeOverlays();
    showToastNotification(`Pendaftaran offline berhasil: ${name}`);
    renderCurrentPage();

    if (isOpeningPostJobAfterLogin) {
      isOpeningPostJobAfterLogin = false;
      setTimeout(() => {
        renderPostJobModal();
      }, 250);
    }
  }
}

function getLoggedInPartner() {
  try {
    const raw = localStorage.getItem("sambilan_partner_auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function renderPostJobModal() {
  const modalContainer = document.getElementById("task-detail-modal");
  const modalBackdrop = document.getElementById("modal-overlay-backdrop");
  if (!modalContainer || !modalBackdrop) return;

  const currentPartner = getLoggedInPartner();
  if (!currentPartner) {
    renderPartnerLoginModal(true, "login");
    return;
  }

  modalContainer.className = "modal-dialog";

  const categoryOptions = Object.entries(JOB_CATEGORIES)
    .map(([key, val]) => `<option value="${key}">${val.title}</option>`)
    .join("");

  modalContainer.innerHTML = `
    <button type="button" class="close-btn" data-action="close-overlays" aria-label="Tutup">×</button>
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
      <span class="company-verified-icon">${APP_ICONS.verified}</span>
      <span style="font-size:12.5px;font-weight:700;color:var(--ok)">Mitra Terverifikasi: ${currentPartner.name}</span>
    </div>
    <h3>Pasang Lowongan Baru</h3>
    <p class="partner-subtitle" style="margin-top:2px">Publikasikan kebutuhan tugas Anda kepada mahasiswa sekitar kampus.</p>

    <form id="post-job-form" style="margin-top:16px">
      <div class="form-group">
        <label class="form-label" for="job-umkm-name">Nama UMKM / Usaha</label>
        <input class="form-input" id="job-umkm-name" required value="${currentPartner.name}" readonly style="background:var(--subtle);font-weight:700" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="job-title">Judul Posisi / Tugas</label>
          <input class="form-input" id="job-title" required placeholder="Contoh: Barista Akhir Pekan" />
        </div>
        <div class="form-group">
          <label class="form-label" for="job-category">Kategori</label>
          <select class="form-select" id="job-category" required>
            ${categoryOptions}
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="job-desc">Jobdesk & Informasi Lengkap</label>
        <textarea class="form-textarea" id="job-desc" rows="3" required placeholder="Jelaskan rincian tanggung jawab dan jadwal kerja..."></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="job-location">Lokasi Kerja</label>
          <input class="form-input" id="job-location" required placeholder="Contoh: Tembalang, Semarang (Dekat UNDIP)" />
        </div>
        <div class="form-group">
          <label class="form-label" for="job-wa">No. WhatsApp (WA)</label>
          <input class="form-input" id="job-wa" type="tel" required value="${currentPartner.phone || '081234567891'}" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="job-start-date">Tanggal Mulai</label>
          <input class="form-input" id="job-start-date" type="date" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="job-stipend">Honorarium (Rp)</label>
          <input class="form-input" id="job-stipend" type="number" step="5000" min="20000" required placeholder="120000" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Opsi Publikasi Sesuai Flowchart</label>
        <div class="form-fee-box">
          <label>
            <input type="radio" name="publish_tier" value="featured" checked />
            <div>
              <b>Membayar Fee Prioritas (Rp 25.000)</b>
              <p style="font-size:12.5px;color:var(--mut);margin-top:2px">Postingan berada di <b>Halaman Depan</b> dan mendapatkan sorotan utama mahasiswa.</p>
            </div>
          </label>
          <label>
            <input type="radio" name="publish_tier" value="regular" />
            <div>
              <b>Tanpa Fee (Reguler)</b>
              <p style="font-size:12.5px;color:var(--mut);margin-top:2px">Postingan <b>tidak berada di halaman depan</b> (hanya tampil di katalog pencarian umum).</p>
            </div>
          </label>
        </div>
      </div>

      <button type="submit" class="btn btn-primary" style="width:100%;padding:12px;margin-top:10px">
        Publikasikan Lowongan
      </button>
    </form>
  `;

  modalBackdrop.classList.add("active");
}

async function handleJobFormSubmit(event) {
  event.preventDefault();

  const umkmName = document.getElementById("job-umkm-name")?.value.trim() || "Mitra UMKM";
  const currentPartner = getLoggedInPartner();
  const title = document.getElementById("job-title")?.value.trim();
  const categoryKey = document.getElementById("job-category")?.value;
  const description = document.getElementById("job-desc")?.value.trim();
  const location = document.getElementById("job-location")?.value.trim();
  const whatsAppNumber = document.getElementById("job-wa")?.value.trim();
  const startDate = document.getElementById("job-start-date")?.value;
  const stipend = parseInt(document.getElementById("job-stipend")?.value, 10) || 50000;
  const isFeatured = document.querySelector('input[name="publish_tier"]:checked')?.value === "featured";

  if (!title || !description || !location || !whatsAppNumber || !startDate) {
    showToastNotification("Mohon lengkapi seluruh formulir.");
    return;
  }

  const newTask = {
    id: Date.now(),
    title,
    categoryKey,
    partnerId: currentPartner?.id || null,
    partnerIndex: 0,
    customPartnerName: umkmName,
    stipend,
    duration: "Sesuai kesepakatan",
    schedule: startDate,
    availableDays: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    distanceKm: 1.0,
    location,
    whatsAppNumber,
    startDate,
    isFeatured,
    description
  };

  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    });
    if (response.ok) {
      const result = await response.json();
      newTask.id = result.taskId;
    }
  } catch {
    // Mode fallback client-side
  }

  appState.allTasks.unshift(newTask);
  saveTasksToStorage();

  closeOverlays();
  renderCurrentPage();

  if (isFeatured) {
    showToastNotification("Lowongan dipublikasikan di Halaman Depan!");
    const featuredSec = document.getElementById("halaman-depan-section");
    if (featuredSec) featuredSec.scrollIntoView({ behavior: "smooth" });
  } else {
    showToastNotification("Lowongan dipublikasikan di katalog pencarian.");
    scrollToTasksSection();
  }
}

function closeOverlays() {
  const modalBackdrop = document.getElementById("modal-overlay-backdrop");
  const drawerContainer = document.getElementById("my-tasks-drawer");

  if (modalBackdrop) modalBackdrop.classList.remove("active");
  if (drawerContainer) drawerContainer.classList.remove("active");
}

function scrollToTasksSection() {
  const section = document.getElementById("tugas");
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

function updateNavAuthSlot() {
  const slot = document.getElementById("nav-auth-slot");
  if (!slot) return;

  const authDataRaw = localStorage.getItem("sambilan_partner_auth");
  if (authDataRaw) {
    try {
      const auth = JSON.parse(authDataRaw);
      slot.innerHTML = `
        <span style="font-size:12.5px;font-weight:700;color:var(--tx);white-space:nowrap;display:inline-flex;align-items:center;gap:6px">
          <span style="width:24px;height:24px;border-radius:6px;background:var(--pri);color:#fff;display:inline-grid;place-items:center;font-size:11px">${auth.initials || "UM"}</span>
          <a href="profil-mitra.html" data-open-profile style="color:inherit;text-decoration:none">${auth.name}</a>
        </span>
        <button type="button" class="btn btn-outline" style="padding:4px 8px;font-size:11.5px" data-partner-logout title="Keluar dari akun mitra">
          Keluar
        </button>
      `;
      return;
    } catch {}
  }

  slot.innerHTML = `
    <button type="button" class="btn btn-outline" style="padding:7px 12px;font-size:13px" data-open-login>
      Masuk Mitra
    </button>
  `;
}

function renderCurrentPage() {
  updateNavAuthSlot();
  const pageType = document.body.dataset.page;
  if (pageType === "profile") {
    renderPartnerProfilePage();
  } else if (pageType === "weekend") {
    renderExploreWeekendPage();
  } else if (pageType === "near") {
    renderExploreNearCampusPage();
  } else {
    renderHomePage();
  }
}

async function renderPartnerProfilePage() {
    const container = document.getElementById("partner-profile-content");
    const partner = getLoggedInPartner();
    if (!container || !partner?.id) return;

    container.innerHTML = `<div class="empty-state"><p>Memuat iklan milik akun ini...</p></div>`;
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/tasks/partner/${partner.id}`);
      if (!response.ok) throw new Error("Gagal memuat iklan");
      const tasks = await response.json();
      container.innerHTML = tasks.length
        ? tasks.map(createPartnerTaskManagementCard).join("")
        : `<div class="empty-state"><h3>Belum ada iklan</h3><p>Pasang lowongan pertama untuk mulai mencari pengisi.</p></div>`;
    } catch (error) {
      container.innerHTML = `<div class="empty-state"><h3>Gagal memuat iklan</h3><p>Silakan muat ulang halaman dan coba lagi.</p></div>`;
    }
  }

function createPartnerTaskManagementCard(task) {
    return `
      <article class="surface-box partner-task-management-card ${task.isActive ? "" : "is-disabled"}">
        <div>
          <div class="card-badge-row">
            <span class="glints-pill-tag">${task.isActive ? "Aktif" : "Nonaktif"}</span>
            ${task.isFeatured ? `<span class="glints-pill-tag glints-pill-urgent">PRIORITAS</span>` : ""}
          </div>
          <h3>${task.title}</h3>
          <p>${task.location} · Rp ${Number(task.stipend).toLocaleString("id-ID")}</p>
          <small>${task.isActive ? "Tampil di katalog mahasiswa" : "Disembunyikan sementara dari katalog"}</small>
        </div>
        <div class="partner-task-actions">
          <button type="button" class="btn btn-outline" data-toggle-task-status="${task.id}" data-next-status="${!task.isActive}">
            ${task.isActive ? "Nonaktifkan iklan" : "Aktifkan kembali"}
          </button>
          <button type="button" class="btn btn-danger-outline" data-delete-task="${task.id}">Hapus permanen</button>
        </div>
      </article>
    `;
  }

async function updatePartnerTaskStatus(taskId, isActive) {
    const partner = getLoggedInPartner();
    if (!partner?.id) return;
    const response = await fetch(`${getApiBaseUrl()}/api/tasks/${taskId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partnerId: partner.id, isActive })
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Status iklan gagal diubah");
    }
    await renderPartnerProfilePage();
  }

async function deletePartnerTask(taskId) {
    const partner = getLoggedInPartner();
    if (!partner?.id) return;
    const response = await fetch(`${getApiBaseUrl()}/api/tasks/${taskId}?partnerId=${partner.id}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Iklan gagal dihapus");
    }
    await renderPartnerProfilePage();
}

function renderHomePage() {
  renderCategorySidebar();
  renderFilterChips();
  renderFeaturedTasksSection();
  renderTaskList();
  renderPartnerList();
}

function renderExploreWeekendPage() {
  const countEl = document.getElementById("weekend-results-count");
  const gridEl = document.getElementById("weekend-tasks-grid");
  if (!gridEl) return;

  const filteredTasks = getFilteredTasks();
  if (countEl) {
    countEl.textContent = `Menemukan ${filteredTasks.length} lowongan akhir pekan`;
  }

  if (filteredTasks.length === 0) {
    gridEl.innerHTML = `
      <div class="empty-state">
        <h3>Belum ada lowongan akhir pekan yang cocok</h3>
        <p>Coba kurangi batasan filter atau ganti kata kunci pencarian.</p>
      </div>
    `;
    return;
  }

  gridEl.innerHTML = filteredTasks.map(createGlintsCardHtml).join("");
}

function renderExploreNearCampusPage() {
  const countEl = document.getElementById("near-results-count");
  const gridEl = document.getElementById("near-tasks-grid");
  if (!gridEl) return;

  const filteredTasks = getFilteredTasks();
  if (countEl) {
    countEl.textContent = `Menemukan ${filteredTasks.length} lowongan di dekat kampus`;
  }

  if (filteredTasks.length === 0) {
    gridEl.innerHTML = `
      <div class="empty-state">
        <h3>Belum ada lowongan terdekat yang cocok</h3>
        <p>Perluas radius jarak atau pilih universitas rekanan lainnya.</p>
      </div>
    `;
    return;
  }

  gridEl.innerHTML = filteredTasks.map(createGlintsCardHtml).join("");
}

document.addEventListener("click", async (event) => {
  const target = event.target;

  const bookmarkTrigger = target.closest("[data-bookmark]");
  if (bookmarkTrigger) {
    event.stopPropagation();
    const taskId = bookmarkTrigger.dataset.bookmark;
    appState.savedTaskIds[taskId] = !appState.savedTaskIds[taskId];
    renderCurrentPage();
    return;
  }

  if (target.closest("[data-partner-logout]")) {
    localStorage.removeItem("sambilan_partner_auth");
    showToastNotification("Berhasil keluar dari akun mitra UMKM");
    renderCurrentPage();
    return;
  }

  const openLoginTrigger = target.closest("[data-open-login]");
  if (openLoginTrigger) {
    const shouldResumePost = openLoginTrigger.dataset.resumePost === "1";
    renderPartnerLoginModal(shouldResumePost, "login");
    return;
  }

  const switchAuthTrigger = target.closest("[data-switch-auth]");
  if (switchAuthTrigger) {
    const nextMode = switchAuthTrigger.dataset.switchAuth;
    renderPartnerLoginModal(isOpeningPostJobAfterLogin, nextMode);
    return;
  }

  if (target.closest("#btn-toggle-pass")) {
    const passInput = document.getElementById("login-password");
    if (passInput) {
      passInput.type = passInput.type === "password" ? "text" : "password";
    }
    return;
  }

  if (target.closest("#btn-toggle-reg-pass")) {
    const regPassInput = document.getElementById("register-password");
    if (regPassInput) {
      regPassInput.type = regPassInput.type === "password" ? "text" : "password";
    }
    return;
  }

  const contactWaTrigger = target.closest("[data-contact-wa]");
  if (contactWaTrigger) {
    const taskId = parseInt(contactWaTrigger.dataset.contactWa, 10);
    const existing = appState.submittedApplications.find((item) => item.taskId === taskId);
    if (!existing) {
      const newApp = {
        taskId,
        stageIndex: 1,
        candidateStatus: "pending"
      };
      appState.submittedApplications.push(newApp);
      saveApplicationsToStorage();

      const baseUrl = getApiBaseUrl();
      fetch(`${baseUrl}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId })
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.id) newApp.id = data.id;
        })
        .catch(() => {});

      renderCurrentPage();
      showToastNotification("Menghubungi UMKM via WhatsApp. Cek status di Tugas Saya.");
    }
    return;
  }

  const candidateDecisionTrigger = target.closest("[data-candidate-decision]");
  if (candidateDecisionTrigger) {
    const decision = candidateDecisionTrigger.dataset.candidateDecision;
    const taskId = parseInt(candidateDecisionTrigger.dataset.taskId, 10);
    const app = appState.submittedApplications.find((item) => item.taskId === taskId);

    if (app) {
      if (decision === "accept") {
        app.candidateStatus = "accepted";
        app.stageIndex = 4;
        showToastNotification("UMKM menerima kandidat. Kesepakatan tuntas.");
      } else {
        app.candidateStatus = "rejected";
        showToastNotification("Status: Tidak cocok. Kandidat dapat melamar opsi lain.");
      }
      saveApplicationsToStorage();

      if (app.id) {
        const baseUrl = getApiBaseUrl();
        fetch(`${baseUrl}/api/applications/${app.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ candidateStatus: app.candidateStatus })
        }).catch(() => {});
      }

      renderApplicationDrawer();
    }
    return;
  }

  const stageAdvanceTrigger = target.closest("[data-stage-advance]");
  if (stageAdvanceTrigger) {
    const taskId = parseInt(stageAdvanceTrigger.dataset.stageAdvance, 10);
    const app = appState.submittedApplications.find((item) => item.taskId === taskId);
    if (app && app.stageIndex < 2) {
      app.stageIndex = 2;
      saveApplicationsToStorage();

      if (app.id) {
        const baseUrl = getApiBaseUrl();
        fetch(`${baseUrl}/api/applications/${app.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stageIndex: 2 })
        }).catch(() => {});
      }

      renderApplicationDrawer();
    }
    return;
  }

  const openPostJobTrigger = target.closest("[data-open-post-job]");
  if (openPostJobTrigger) {
    renderPostJobModal();
    return;
  }

  const toggleTaskStatusTrigger = target.closest("[data-toggle-task-status]");
  if (toggleTaskStatusTrigger) {
    try {
      await updatePartnerTaskStatus(
        parseInt(toggleTaskStatusTrigger.dataset.toggleTaskStatus, 10),
        toggleTaskStatusTrigger.dataset.nextStatus === "true"
      );
      showToastNotification("Status iklan berhasil diperbarui.");
    } catch (error) {
      showToastNotification(error.message);
    }
    return;
  }

  const deleteTaskTrigger = target.closest("[data-delete-task]");
  if (deleteTaskTrigger) {
    if (!window.confirm("Hapus permanen iklan ini? Nonaktifkan saja jika masih mungkin dibutuhkan lagi.")) return;
    try {
      await deletePartnerTask(parseInt(deleteTaskTrigger.dataset.deleteTask, 10));
      showToastNotification("Iklan dihapus permanen.");
    } catch (error) {
      showToastNotification(error.message);
    }
    return;
  }

  if (target.closest("[data-toggle-theme]")) {
    toggleTheme();
    return;
  }

  const openTaskTrigger = target.closest("[data-open-task]");
  if (openTaskTrigger) {
    const taskId = parseInt(openTaskTrigger.dataset.openTask, 10);
    renderTaskDetailModal(taskId);
    return;
  }

  const tabCatTrigger = target.closest("[data-tab-cat]");
  if (tabCatTrigger) {
    const cat = tabCatTrigger.dataset.tabCat;
    appState.selectedCategory = cat;
    document.querySelectorAll("[data-tab-cat]").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.tabCat === cat);
    });
    renderTaskList();
    renderFilterChips();
    return;
  }

  const actionTrigger = target.closest("[data-action]");
  if (actionTrigger) {
    const action = actionTrigger.dataset.action;
    if (action === "close-overlays") {
      closeOverlays();
      return;
    }
    if (action === "reset-filters") {
      const pageType = document.body.dataset.page;
      appState.activeSearchQuery = "";
      appState.activeLocationQuery = "";
      appState.selectedCategory = "";
      appState.filterNearCampus = pageType === "near";
      appState.filterWeekendOnly = pageType === "weekend";
      appState.filterHighCompensation = false;
      appState.filterFeaturedOnly = false;
      appState.maxDistanceKm = pageType === "near" ? 2.5 : 10;
      appState.minStipend = 0;
      appState.sortBy = "latest";

      const heroSearch = document.getElementById("hero-search-input");
      const heroLoc = document.getElementById("hero-location-select");
      const exploreSearch = document.getElementById("explore-search-input");
      if (heroSearch) heroSearch.value = "";
      if (heroLoc) heroLoc.value = "";
      if (exploreSearch) exploreSearch.value = "";

      document.querySelectorAll("input[type='radio'][name='filter_category']").forEach((r) => {
        r.checked = r.value === "";
      });
      document.querySelectorAll("input[type='radio'][name='filter_distance']").forEach((r) => {
        r.checked = r.value === "10" || (pageType === "near" && r.value === "3.0");
      });
      document.querySelectorAll("input[type='radio'][name='filter_stipend']").forEach((r) => {
        r.checked = r.value === "0";
      });
      document.querySelectorAll("input[type='radio'][name='filter_sort']").forEach((r) => {
        r.checked = r.value === "latest";
      });

      renderCurrentPage();
      return;
    }
  }

  if (target.closest("[data-clear-location]")) {
    appState.activeLocationQuery = "";
    const heroLoc = document.getElementById("hero-location-select");
    if (heroLoc) heroLoc.value = "";
    renderCurrentPage();
    return;
  }

  if (target.id === "modal-overlay-backdrop") {
    closeOverlays();
    return;
  }

  const openDrawerTrigger = target.closest("[data-open-drawer]");
  if (openDrawerTrigger) {
    renderApplicationDrawer();
    const drawer = document.getElementById("my-tasks-drawer");
    if (drawer) drawer.classList.add("active");
    return;
  }

  const categoryTrigger = target.closest("[data-cat]");
  if (categoryTrigger) {
    const categoryKey = categoryTrigger.dataset.cat;
    appState.selectedCategory = appState.selectedCategory === categoryKey ? "" : categoryKey;
    renderCurrentPage();
    scrollToTasksSection();
    return;
  }

  const filterTrigger = target.closest("[data-filter]");
  if (filterTrigger) {
    const filterKey = filterTrigger.dataset.filter;
    appState[filterKey] = !appState[filterKey];
    renderCurrentPage();
    return;
  }

  const popularQueryTrigger = target.closest("[data-popular-query]");
  if (popularQueryTrigger) {
    const query = popularQueryTrigger.dataset.popularQuery;
    appState.activeSearchQuery = appState.activeSearchQuery.toLowerCase() === query.toLowerCase() ? "" : query;
    const heroSearch = document.getElementById("hero-search-input");
    if (heroSearch) heroSearch.value = appState.activeSearchQuery;
    renderCurrentPage();
    scrollToTasksSection();
    return;
  }

  const campusPillTrigger = target.closest("[data-campus-filter]");
  if (campusPillTrigger) {
    const campusLoc = campusPillTrigger.dataset.campusFilter;
    appState.activeLocationQuery = campusLoc;
    document.querySelectorAll("[data-campus-filter]").forEach((pill) => {
      pill.classList.toggle("active", pill.dataset.campusFilter === campusLoc);
    });
    renderCurrentPage();
    return;
  }

  if (target.id === "hero-search-submit") {
    const heroSearch = document.getElementById("hero-search-input");
    const heroLoc = document.getElementById("hero-location-select");
    if (heroSearch) appState.activeSearchQuery = heroSearch.value.trim();
    if (heroLoc) appState.activeLocationQuery = heroLoc.value.trim();
    renderCurrentPage();
    scrollToTasksSection();
    return;
  }

  if (target.closest("[data-scroll-tasks]")) {
    scrollToTasksSection();
    return;
  }

  if (target.closest("[data-scroll-top]")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;

  if (target.id === "hero-location-select") {
    appState.activeLocationQuery = target.value;
    renderCurrentPage();
    return;
  }

  if (target.name === "filter_category") {
    appState.selectedCategory = target.value;
    renderCurrentPage();
    return;
  }

  if (target.name === "filter_distance") {
    appState.maxDistanceKm = parseFloat(target.value) || 10;
    renderCurrentPage();
    return;
  }

  if (target.name === "filter_stipend") {
    appState.minStipend = parseInt(target.value, 10) || 0;
    renderCurrentPage();
    return;
  }

  if (target.name === "filter_sort") {
    appState.sortBy = target.value;
    renderCurrentPage();
    return;
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "explore-search-input") {
    appState.activeSearchQuery = event.target.value;
    renderCurrentPage();
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "post-job-form") {
    handleJobFormSubmit(event);
  }
  if (event.target.id === "partner-login-form") {
    event.preventDefault();
    handlePartnerLoginSubmit(event.target);
  }
  if (event.target.id === "partner-register-form") {
    event.preventDefault();
    handlePartnerRegisterSubmit(event.target);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeOverlays();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  const pageType = document.body.dataset.page;
  if (pageType === "weekend") {
    appState.filterWeekendOnly = true;
  } else if (pageType === "near") {
    appState.filterNearCampus = true;
    appState.maxDistanceKm = 2.5;
  }
  renderCurrentPage();
  syncDataWithBackend();
});
