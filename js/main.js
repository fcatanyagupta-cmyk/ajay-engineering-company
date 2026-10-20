/* ==========================================================
   Ajay Engineering Company — site behaviour
   Edit CONFIG and PRODUCTS below to update contact info / catalogue.
   ========================================================== */

const CONFIG = {
  // Numbers as shown on the Aishbagh Road store signboard — confirm before going live.
  phones: ["9415465149", "7572021200", "8604493439"],
  whatsapp: "9415465149",           // number that receives WhatsApp enquiries
  business: "Ajay Engineering Company",
};

const PRODUCTS = [
  // ---- Scaffolding ----
  { id: "cuplock", cat: "scaffolding", img: "shuttering-soldiers.jpg",
    name: "Cuplock Scaffolding System", hi: "कपलॉक स्कैफोल्डिंग सिस्टम",
    desc: "Cuplock verticals, ledgers and MS shuttering soldiers for fast, rigid towers and wall formwork.",
    specs: ["Verticals", "Ledgers", "Soldiers"] },
  { id: "swivel", cat: "scaffolding", img: "swivel-coupler.jpg",
    name: "Swivel Coupler", hi: "स्विवल कपलर",
    desc: "Drop-forged MS couplers to join scaffold tubes at any angle. Zinc / yellow passivated.",
    specs: ["48.3 mm tube", "Swivel & fixed"] },
  { id: "uhead", cat: "scaffolding", img: "u-head-jack.jpg",
    name: "U-Head Jack", hi: "यू-हेड जैक",
    desc: "Adjustable top jack to seat beams and runners on props and cuplock verticals.",
    specs: ["Solid / hollow screw", "Custom lengths"] },
  { id: "propjack", cat: "scaffolding", img: "prop-jack.jpg",
    name: "Adjustable Prop Jack", hi: "एडजस्टेबल प्रॉप जैक",
    desc: "Telescopic steel props with pin and nut adjustment for slab and beam shoring.",
    specs: ["Telescopic", "Base plate"] },
  { id: "steelprop", cat: "scaffolding", img: "steel-prop.jpg",
    name: "Scaffolding Props", hi: "स्कैफोल्डिंग प्रॉप्स",
    desc: "Heavy-duty MS props for temporary support during casting and repairs.",
    specs: ["MS", "Painted"] },
  { id: "ledger", cat: "scaffolding", img: "ledger.jpg",
    name: "Scaffolding Ledger", hi: "स्कैफोल्डिंग लेजर",
    desc: "Horizontal MS ledgers with blade ends that lock into cuplock verticals.",
    specs: ["Multiple lengths"] },
  { id: "span", cat: "scaffolding", img: "box-span.jpg",
    name: "MS Box Span (Telescopic)", hi: "एमएस बॉक्स स्पैन",
    desc: "Adjustable telescopic spans that replace timber runners under slab shuttering.",
    specs: ["Adjustable", "Reusable"] },

  // ---- Shuttering ----
  { id: "msplate", cat: "shuttering", img: "ms-shuttering-plate.jpg",
    name: "MS Shuttering Plate", hi: "एमएस शटरिंग प्लेट",
    desc: "Rectangular slab & wall plates with stiffened frames for clean, repeatable pours.",
    specs: ["Slab & wall", "Custom sizes", "Red oxide"] },
  { id: "bridge", cat: "shuttering", img: "bridge-plate.jpg",
    name: "Bridge Shuttering Plate", hi: "ब्रिज शटरिंग प्लेट",
    desc: "Heavy-gauge ribbed plates for bridge decks, culverts and infrastructure work.",
    specs: ["Heavy gauge", "Ribbed"] },
  { id: "haunch", cat: "shuttering", img: "haunch-plate.jpg",
    name: "Haunch Shuttering Plate", hi: "हॉन्च शटरिंग प्लेट",
    desc: "Angled plates for beam-column haunches and box culvert corners.",
    specs: ["Angled", "Made to drawing"] },
  { id: "column", cat: "shuttering", img: "shuttering-ms-plates.jpg",
    name: "Column Shuttering Plate", hi: "कॉलम शटरिंग प्लेट",
    desc: "Framed MS plates for columns and walls with true edges for a neat finish.",
    specs: ["Framed", "Custom sizes"] },

  // ---- Pipes (A.C. Suppliers) ----
  { id: "erw", cat: "pipes", img: "erw-pipe.jpg",
    name: "Round ERW / MS Pipe", hi: "राउंड ईआरडब्ल्यू / एमएस पाइप",
    desc: "Prakash Surya, Jindal and other mill pipes — black, paint-coated and galvanised.",
    specs: ["Prakash Surya", "Jindal", "Paint coated"] },
  { id: "conduit", cat: "pipes", img: "erw-pipe.jpg", crop: true,
    name: "MS Conduit & Square Pipes", hi: "एमएस कंड्यूट व स्क्वायर पाइप",
    desc: "Conduit pipes, square & rectangular hollow sections and cold-storage pipes.",
    specs: ["Conduit", "Square / rect", "Cold storage"] },
];

const CAT_LABEL = { scaffolding: ["Scaffolding", "स्कैफोल्डिंग"], shuttering: ["Shuttering", "शटरिंग"], pipes: ["Pipes", "पाइप"] };

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const fmtPhone = (n) => `+91 ${n.slice(0, 5)} ${n.slice(5)}`;
const waLink = (text) => `https://wa.me/91${CONFIG.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
let lang = store.get("aec-lang", "en");
const t = (en, hi) => (lang === "hi" && hi ? hi : en);

/* ---------- contact wiring ---------- */
function wireContacts() {
  $$(".js-call").forEach((a) => (a.href = `tel:+91${CONFIG.phones[0]}`));
  $$(".js-phone-text").forEach((el) => (el.textContent = fmtPhone(CONFIG.phones[0])));
  $$(".js-phone-list").forEach((el) => {
    el.innerHTML = CONFIG.phones.map((p) => `<a href="tel:+91${p}">${fmtPhone(p)}</a>`).join("<br/>");
  });
  const hello = `Namaste! I'd like a quotation from ${CONFIG.business}.`;
  $$(".js-whatsapp").forEach((a) => (a.href = waLink(hello)));
}

/* ---------- enquiry cart ---------- */
let cart = store.get("aec-cart", []); // [{id, qty}]
const inCart = (id) => cart.some((c) => c.id === id);
const byId = (id) => PRODUCTS.find((p) => p.id === id);

function saveCart() { store.set("aec-cart", cart); renderCartUI(); }
function toggleCart(id) {
  if (inCart(id)) { cart = cart.filter((c) => c.id !== id); toast(t("Removed from enquiry", "एन्क्वायरी से हटाया गया")); }
  else { cart.push({ id, qty: "" }); toast(t("Added to enquiry ✓", "एन्क्वायरी में जोड़ा गया ✓")); }
  saveCart();
  renderProducts(currentFilter);
}

function renderCartUI() {
  const n = cart.length;
  $$(".js-count").forEach((el) => { el.textContent = n; el.hidden = n === 0; });

  // pills in form
  const picked = $("#picked");
  picked.innerHTML = n
    ? cart.map((c) => {
        const p = byId(c.id);
        return `<span class="pill">${t(p.name, p.hi)}${c.qty ? ` · ${escapeHTML(c.qty)}` : ""}<button type="button" aria-label="Remove" data-rm="${c.id}">✕</button></span>`;
      }).join("")
    : `<span class="picked__empty">${t("Add products from the catalogue above, or describe below.", "ऊपर से उत्पाद जोड़ें, या नीचे लिखें।")}</span>`;

  // drawer list
  const list = $("#drawerList");
  list.innerHTML = n
    ? cart.map((c) => {
        const p = byId(c.id);
        return `<div class="line">
          <img src="assets/img/${p.img}" alt="" />
          <div><b>${t(p.name, p.hi)}</b>
            <input data-qty="${c.id}" value="${escapeHTML(c.qty)}" placeholder="${t("Qty / size (e.g. 100 nos, 2'×3')", "मात्रा / साइज़")}" /></div>
          <button class="line__rm" data-rm="${c.id}" aria-label="Remove">✕</button>
        </div>`;
      }).join("")
    : `<p class="drawer__empty">${t("Your enquiry is empty.<br/>Tap “Add to enquiry” on any product.", "आपकी एन्क्वायरी खाली है।<br/>किसी भी उत्पाद पर “जोड़ें” दबाएँ।")}</p>`;

  $("#drawerWa").href = waLink(buildMessage());
}

function escapeHTML(s = "") { return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

function buildMessage(form) {
  const lines = [`Namaste ${CONFIG.business},`, "I'd like a quotation for:"];
  if (cart.length) cart.forEach((c, i) => lines.push(`${i + 1}. ${byId(c.id).name}${c.qty ? ` — ${c.qty}` : ""}`));
  if (form) {
    if (form.message) lines.push("", `Requirement: ${form.message}`);
    lines.push("", `Name: ${form.name}`, `Mobile: +91 ${form.mobile}`);
    if (form.city) lines.push(`Site / city: ${form.city}`);
    lines.push(`Buyer type: ${form.type}`);
  }
  return lines.join("\n");
}

/* ---------- products ---------- */
let currentFilter = "all";
function renderProducts(filter = "all") {
  currentFilter = filter;
  const grid = $("#productGrid");
  const items = PRODUCTS.filter((p) => filter === "all" || p.cat === filter);
  grid.innerHTML = items.map((p, i) => {
    const added = inCart(p.id);
    return `<article class="card" style="animation-delay:${i * 40}ms">
      <div class="card__media">
        <span class="card__tag">${t(...CAT_LABEL[p.cat])}</span>
        <img src="assets/img/${p.img}" alt="${p.name}" loading="lazy"${p.crop ? ' class="is-crop"' : ""} />
      </div>
      <div class="card__body">
        <h3 class="card__title">${t(p.name, p.hi)}</h3>
        <p class="card__desc">${p.desc}</p>
        <ul class="card__specs">${p.specs.map((s) => `<li>${s}</li>`).join("")}</ul>
        <div class="card__actions">
          <button class="btn btn--ghost-dark btn--sm add ${added ? "is-added" : ""}" data-add="${p.id}">
            ${added ? t("✓ Added", "✓ जोड़ा गया") : t("+ Add to enquiry", "+ जोड़ें")}
          </button>
          <a class="btn btn--dark btn--sm" href="${waLink(`Namaste! Please share the best price for: ${p.name}`)}" target="_blank" rel="noopener">${t("Best price", "रेट पूछें")}</a>
        </div>
      </div>
    </article>`;
  }).join("");
}

/* ---------- drawer ---------- */
const drawer = $("#drawer");
function openDrawer() { renderCartUI(); drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
function closeDrawer() { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }

/* ---------- toast ---------- */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg; el.classList.add("is-on");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("is-on"), 1800);
}

/* ---------- i18n ---------- */
function applyLang() {
  document.documentElement.lang = lang;
  $$("[data-hi], [data-hi-html]").forEach((el) => {
    if (!("en" in el.dataset)) el.dataset.en = el.innerHTML;
    if (lang === "hi") {
      if (el.dataset.hiHtml) el.innerHTML = el.dataset.hiHtml;
      else if (el.dataset.hi) el.textContent = el.dataset.hi;
    } else {
      el.innerHTML = el.dataset.en;
    }
  });
  $$(".lang__opt").forEach((o) => o.classList.toggle("is-on", o.dataset.lang === lang));
  renderProducts(currentFilter);
  renderCartUI();
  wireContacts();
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  $("#yr").textContent = new Date().getFullYear();
  wireContacts();
  renderProducts();
  renderCartUI();
  if (lang === "hi") applyLang();

  // filters
  $$(".chip").forEach((chip) => chip.addEventListener("click", () => {
    $$(".chip").forEach((c) => { c.classList.remove("is-active"); c.setAttribute("aria-selected", "false"); });
    chip.classList.add("is-active"); chip.setAttribute("aria-selected", "true");
    renderProducts(chip.dataset.filter);
  }));

  // delegated clicks
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) return toggleCart(add.dataset.add);
    const rm = e.target.closest("[data-rm]");
    if (rm) { cart = cart.filter((c) => c.id !== rm.dataset.rm); saveCart(); renderProducts(currentFilter); return; }
    if (e.target.closest(".js-open-enquiry")) return openDrawer();
    if (e.target.closest("[data-close]")) closeDrawer();
  });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeDrawer());

  // qty inputs in drawer
  $("#drawerList").addEventListener("input", (e) => {
    const id = e.target.dataset.qty; if (!id) return;
    const item = cart.find((c) => c.id === id); item.qty = e.target.value;
    store.set("aec-cart", cart);
    $("#drawerWa").href = waLink(buildMessage());
  });
  $("#drawerList").addEventListener("change", renderCartUI);

  // language
  $("#langToggle").addEventListener("click", () => {
    lang = lang === "en" ? "hi" : "en"; store.set("aec-lang", lang); applyLang();
  });

  // mobile menu
  const burger = $("#burger"), links = $(".nav__links");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") { links.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); } });

  // nav shadow
  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  // form → WhatsApp
  $("#quoteForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target, err = $("#formErr");
    const data = Object.fromEntries(new FormData(f));
    data.name = data.name.trim(); data.mobile = data.mobile.replace(/\D/g, "");
    $$(".is-invalid", f).forEach((x) => x.classList.remove("is-invalid"));
    const bad = [];
    if (!data.name) bad.push(f.name);
    if (!/^[6-9]\d{9}$/.test(data.mobile)) bad.push(f.mobile);
    if (!cart.length && !data.message.trim()) bad.push(f.message);
    if (bad.length) {
      bad.forEach((x) => x.classList.add("is-invalid")); bad[0].focus();
      err.textContent = t("Please enter your name, a valid 10-digit mobile number, and what you need.", "कृपया नाम, सही 10 अंकों का मोबाइल नंबर और ज़रूरत लिखें।");
      return;
    }
    err.textContent = "";
    window.open(waLink(buildMessage(data)), "_blank", "noopener");
    toast(t("Opening WhatsApp…", "व्हाट्सऐप खुल रहा है…"));
  });

  // reveal on scroll
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  }), { threshold: .15 });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`; io.observe(el); });

  // count-up stats
  const yrs = $("[data-count='48']");
  if (yrs) yrs.dataset.count = new Date().getFullYear() - 1977;
  $$("[data-count]").forEach((el) => {
    const end = +el.dataset.count, t0 = performance.now(), dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    setTimeout(() => requestAnimationFrame(tick), 400);
  });
});
