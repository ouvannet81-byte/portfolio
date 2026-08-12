const artworks = [
  { id: 1, title: "SK Banner", img: "img/banner-sk.jpg", ratio: 1200 / 513, cat: "banner" },
  { id: 2, title: "Drink Poster", img: "img/drink-poster-clean.jpg", ratio: 1200 / 1500, cat: "poster" },
  { id: 3, title: "Drink 33", img: "img/drink33.jpg", ratio: 1200 / 1200, cat: "poster" },
  { id: 4, title: "Sabur Mamiro 2", img: "img/file-sabur-mamiro-2.jpg", ratio: 1200 / 2571, cat: "logo" },
  { id: 5, title: "Sabur Mamiros", img: "img/file-sabur-mamiros.jpg", ratio: 1200 / 2571, cat: "logo" },
  { id: 6, title: "Moto Kon Ter", img: "img/moto-kon-ter.jpg", ratio: 1200 / 1200, cat: "logo" },
  { id: 7, title: "Place", img: "img/place.jpg", ratio: 1200 / 675, cat: "banner" },
  { id: 8, title: "SUKPISEY", img: "img/sukpisey.jpg", ratio: 1200 / 1428, cat: "poster" },
  { id: 9, title: "Tow Mamiros", img: "img/tow-mamiros.jpg", ratio: 1200 / 1687, cat: "poster" },
  { id: 10, title: "Cover MV Real", img: "img/cover-mv-real.jpg", ratio: 16 / 9, cat: "poster" },
  { id: 11, title: "Cover MV", img: "img/cover-mv.jpg", ratio: 16 / 9, cat: "poster" },
  { id: 12, title: "Drink 2", img: "img/drink-2.jpg", ratio: 1280 / 1600, cat: "poster" },
  { id: 13, title: "Drink Now3", img: "img/drink-now3.jpg", ratio: 1080 / 1080, cat: "poster" },
  { id: 14, title: "Drink POS", img: "img/drink-pos.jpg", ratio: 1185 / 1600, cat: "poster" },
  { id: 15, title: "Food KH", img: "img/food-kh.jpg", ratio: 800 / 1600, cat: "poster" },
  { id: 16, title: "Food Spack", img: "img/food-spack.jpg", ratio: 1181 / 1594, cat: "poster" },
  { id: 17, title: "Food Verry", img: "img/food-verry.jpg", ratio: 1080 / 1080, cat: "poster" },
  { id: 18, title: "Laptop", img: "img/laptop.jpg", ratio: 1080 / 1080, cat: "poster" },
  { id: 19, title: "Phone", img: "img/phone.jpg", ratio: 1080 / 1080, cat: "poster" },
  { id: 20, title: "Poster Drink", img: "img/poster-drink.jpg", ratio: 1280 / 1600, cat: "poster" },
  { id: 21, title: "Poster Moto Animation", img: "img/poster-moto-animation.jpg", ratio: 16 / 9, cat: "poster" },
  { id: 22, title: "Poster Wonow", img: "img/poster-wonow.jpg", ratio: 1600 / 1600, cat: "poster" },
  { id: 23, title: "Sok", img: "img/sok.jpg", ratio: 1772 / 748, cat: "banner" },
  { id: 24, title: "Manill", img: "img/manill.jpg", ratio: 2953 / 5906, cat: "banner" },
  { id: 25, title: "Banner Design 32", img: "img/banner-design32.jpg", ratio: 4724 / 11811, cat: "banner" },
  { id: 26, title: "Chip Mong Group", img: "img/chip-mong-group.jpg", ratio: 4724 / 11811, cat: "banner" },
];

const grid = document.getElementById("grid");
const lightbox = document.getElementById("lightbox");
const lightboxArt = document.getElementById("lightboxArt");
const lightboxTitle = document.getElementById("lightboxTitle");

let currentIndex = 0;
let activeFilter = "all";

function getVisible() {
  return activeFilter === "all" ? artworks : artworks.filter((a) => a.cat === activeFilter);
}

function renderArtwork(item, index) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.ratio = item.ratio;
  card.style.animationDelay = `${index * 0.06}s`;

  const art = document.createElement("div");
  art.className = "card-art";
  const img = document.createElement("img");
  img.src = item.img;
  img.alt = item.title;
  img.loading = "lazy";
  art.appendChild(img);

  const info = document.createElement("div");
  info.className = "card-info";
  info.innerHTML = `<h3>${item.title}</h3>`;

  card.appendChild(art);
  card.appendChild(info);
  card.addEventListener("click", () => openLightbox(index));
  return card;
}

function renderGrid() {
  grid.innerHTML = "";
  getVisible().forEach((item, index) => {
    grid.appendChild(renderArtwork(item, index));
  });
  layoutMasonry();
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderGrid();
  });
});

const ROW_HEIGHT = 1;
const GAP = 8;

function getColumns() {
  const w = window.innerWidth;
  if (w < 560) return 1;
  if (w < 860) return 2;
  return 3;
}

function layoutMasonry() {
  const cols = getColumns();
  const cards = grid.querySelectorAll(".card");
  const gridWidth = grid.clientWidth;
  const colWidth = (gridWidth - GAP * (cols - 1)) / cols;

  cards.forEach((card) => {
    const ratio = parseFloat(card.dataset.ratio);
    const span = ratio > 0
      ? Math.ceil((colWidth / ratio + GAP) / (ROW_HEIGHT + GAP))
      : 12;
    card.style.gridRowEnd = `span ${span}`;
  });
}

window.addEventListener("resize", () => {
  clearTimeout(layoutMasonry._t);
  layoutMasonry._t = setTimeout(layoutMasonry, 200);
});

function openLightbox(index) {
  currentIndex = index;
  showLightboxItem();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function showLightboxItem() {
  const visible = getVisible();
  const item = visible[currentIndex];
  lightboxArt.innerHTML = "";
  const img = document.createElement("img");
  img.src = item.img;
  img.alt = item.title;
  lightboxArt.appendChild(img);
  lightboxTitle.textContent = item.title;
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function stepLightbox(dir) {
  const visible = getVisible();
  currentIndex = (currentIndex + dir + visible.length) % visible.length;
  showLightboxItem();
}

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click", () => stepLightbox(-1));
document.getElementById("lightboxNext").addEventListener("click", () => stepLightbox(1));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  }
});

document.getElementById("themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
});

const translations = {
  km: {
    title: "វ៉ាន់ណែត — អ្នករចនាក្រាហ្វិក",
    "nav-about": "អំពីខ្ញុំ",
    "nav-services": "សេវាកម្ម",
    "nav-work": "ស្នាដៃ",
    "nav-contact": "ទំនាក់ទំនង",
    "hero-greet": "ជំរាបសួរ! ខ្ញុំឈ្មោះ វ៉ាន់ណែត",
    "hero-title": "ខ្ញុំជាអ្នករចនាក្រាហ្វិក",
    "hero-sub": "ខ្ញុំទទួលរចនាផ្ទាំងផ្សាយពាណិជ្ជកម្ម និងការងារឌីហ្សាញផ្សេងៗ ដើម្បីជួយឱ្យអាជីវកម្មរបស់អ្នកកាន់តែលេចធ្លោ និងទាក់ទាញខ្លាំងឡើង។",
    "hero-cta1": "មើលស្នាដៃរបស់ខ្ញុំ",
    "hero-cta2": "ទាក់ទងមកខ្ញុំ",
    "services-label": "សេវាកម្មរបស់ខ្ញុំ",
    "services-title": "អ្វីដែលខ្ញុំអាចជួយអ្នកបាន",
    "s1-title": "ផ្ទាំងផ្សាយពាណិជ្ជកម្ម",
    "s1-desc": "Poster, banner, flyer សម្រាប់ផ្សព្វផ្សាយអាជីវកម្មរបស់អ្នក។",
    "s2-title": "ការរចនាអត្តសញ្ញាណម៉ាក",
    "s2-desc": "Logo និងពណ៌ ដើម្បីឱ្យម៉ាករបស់អ្នកមានអត្តសញ្ញាណច្បាស់លាស់។",
    "s3-title": "រូបគំនូរ និងការរចនាផ្សេងៗ",
    "s3-desc": "រូបគំនូរតាមតម្រូវការ សម្រាប់គម្រោងពិសេសរបស់អ្នក។",
    "skills-label": "ជំនាញរបស់ខ្ញុំ",
    "skills-title": "កម្មវិធីដែលខ្ញុំប្រើ",
    "work-label": "ស្នាដៃរបស់ខ្ញុំ",
    "work-title": "ស្នាដៃមួយចំនួនដែលខ្ញុំបានរចនា",
    "work-note": "ចុចលើរូបភាព ដើម្បីមើលទំហំធំ។",
    "f-all": "ទាំងអស់",
    "f-poster": "ផ្ទាំងផ្សាយ",
    "f-banner": "បដា",
    "f-logo": "ស្លាកសញ្ញា",
    "contact-label": "ទំនាក់ទំនងមកខ្ញុំ",
    "contact-title": "ចាប់អារម្មណ៍លើការរចនាមែនទេ?",
    "contact-desc": "សូមទាក់ទងមកខ្ញុំតាមអ៊ីមែល ឬ Telegram ខ្ញុំឆ្លើយតបលឿនបំផុត។",
    "footer-note": "រក្សាសិទ្ធិ © {year} វ៉ាន់ណែត",
  },
  en: {
    title: "Vannet — Graphic Designer",
    "nav-about": "About Me",
    "nav-services": "Services",
    "nav-work": "My Work",
    "nav-contact": "Contact",
    "hero-greet": "Hello! My name is Vannet",
    "hero-title": "I'm a Graphic Designer",
    "hero-sub": "I design advertising posters and other design work to help your business stand out and attract more attention.",
    "hero-cta1": "View My Work",
    "hero-cta2": "Contact Me",
    "services-label": "My Services",
    "services-title": "What I Can Help You With",
    "s1-title": "Advertising Design",
    "s1-desc": "Posters, banners and flyers to promote your business.",
    "s2-title": "Brand Identity Design",
    "s2-desc": "Logos and colors to give your brand a clear identity.",
    "s3-title": "Illustration & Other Design",
    "s3-desc": "Custom illustrations for your special projects.",
    "skills-label": "My Skills",
    "skills-title": "Software I Use",
    "work-label": "My Work",
    "work-title": "Some Works I've Designed",
    "work-note": "Click on an image to view it larger.",
    "f-all": "All",
    "f-poster": "Poster",
    "f-banner": "Banner",
    "f-logo": "Logo",
    "contact-label": "Contact Me",
    "contact-title": "Interested in Design?",
    "contact-desc": "Contact me by email or Telegram — I reply very fast.",
    "footer-note": "© {year} Vannet. All rights reserved.",
  },
};

const langToggle = document.getElementById("langToggle");

function applyLang(lang) {
  const dict = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!dict[key]) return;
    if (el.tagName === "H1") return;
    const text = dict[key].replace("{year}", new Date().getFullYear());
    if (el.tagName === "TITLE") {
      el.textContent = text;
    } else if (el.querySelector("svg")) {
      const svg = el.querySelector("svg");
      el.innerHTML = "";
      el.appendChild(svg);
      el.appendChild(document.createTextNode(text));
    } else {
      el.innerHTML = text;
    }
  });
  document.documentElement.lang = lang;
  langToggle.textContent = lang === "km" ? "EN" : "ខ្មែរ";
  typeHeroTitle();
}

const titleWords = {
  km: ["ខ្ញុំជា", "អ្នករចនា", "ក្រាហ្វិក"],
  en: ["I'm", "a", "Graphic", "Designer"],
};

let heroTimer = null;
let heroTimeout = null;
function typeHeroTitle() {
  clearInterval(heroTimer);
  clearTimeout(heroTimeout);
  const el = document.querySelector("h1[data-i18n='hero-title']");
  if (!el) return;
  const lang = document.documentElement.lang === "en" ? "en" : "km";
  const words = titleWords[lang];
  el.textContent = "";
  el.classList.add("cursor");
  let i = 1;
  heroTimer = setInterval(() => {
    el.textContent = words.slice(0, i).join(" ");
    i++;
    if (i > words.length) {
      clearInterval(heroTimer);
      heroTimeout = setTimeout(typeHeroTitle, 1600);
    }
  }, 450);
}

langToggle.addEventListener("click", () => {
  const next = document.documentElement.lang === "km" ? "en" : "km";
  applyLang(next);
  localStorage.setItem("lang", next);
});

applyLang(localStorage.getItem("lang") === "en" ? "en" : "km");

renderGrid();

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        skillsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll(".skill").forEach((el) => skillsObserver.observe(el));
