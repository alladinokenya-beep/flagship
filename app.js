const phones = {
  iphone: {
    maker: "APPLE · IPHONE 18 PRO MAX",
    title: "iPhone 18 Pro Max",
    intro: "A creator-first camera system, sustained performance and Apple's longest iPhone battery life to date.",
    source: "https://www.apple.com/iphone-18-pro/",
    specs: [
      ["Display", "6.9-inch Super Retina XDR with ProMotion up to 120Hz."],
      ["Camera", "48MP Fusion Main with variable aperture, 48MP Fusion Ultra Wide and 48MP Fusion Telephoto; up to 8× optical-quality zoom."],
      ["Performance", "A20 Pro with next-generation vapor chamber cooling."],
      ["Battery", "Up to 45 hours video playback, according to Apple."],
      ["Storage & colors", "256GB, 512GB, 1TB or 2TB. Black, silver, glacier and burgundy."]
    ]
  },
  galaxy: {
    maker: "SAMSUNG · GALAXY S26 ULTRA",
    title: "Galaxy S26 Ultra",
    intro: "A large, vivid canvas with on-demand screen privacy, a versatile zoom system and S Pen support.",
    source: "https://www.samsung.com/us/smartphones/galaxy-s26-ultra/",
    specs: [
      ["Display", "6.9-inch QHD+ Dynamic AMOLED 2X with built-in Privacy Display."],
      ["Camera", "200MP wide, 50MP ultra-wide, 50MP telephoto and 10MP telephoto."],
      ["Performance", "Customized flagship processor; exact chipset varies by market."],
      ["Battery", "5,000mAh; up to 31 hours video playback per Samsung."],
      ["Build", "7.9mm, 214g, integrated S Pen and IP68 water resistance."]
    ]
  },
  pixel: {
    maker: "GOOGLE · PIXEL 11 PRO XL",
    title: "Pixel 11 Pro XL",
    intro: "Google's largest Pro phone pairs its Tensor platform with a versatile triple camera and long-range computational zoom.",
    source: "https://store.google.com/product/pixel_11_pro_specs?hl=en-US",
    specs: [
      ["Display", "6.8-inch Super Actua LTPO OLED, 1–120Hz, up to 3,600 nits peak brightness."],
      ["Camera", "50MP wide, 48MP ultra-wide with macro focus, and 48MP 5× telephoto."],
      ["Performance", "Google Tensor G6 with Titan M3 security coprocessor."],
      ["Battery", "5,115mAh typical; 30+ hour battery life per Google."],
      ["Memory & storage", "12GB RAM with 256GB, or 16GB RAM with 512GB / 1TB options."]
    ]
  }
};

const cards = [...document.querySelectorAll(".product-card")];
const filterButtons = [...document.querySelectorAll(".filter-pill")];
const searchInput = document.querySelector("#phoneSearch");
const emptyState = document.querySelector("#emptyState");
let activeFilter = "all";

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  for (const card of cards) {
    const matchesFilter = activeFilter === "all" || card.dataset.tags.split(" ").includes(activeFilter);
    const matchesQuery = !query || card.innerText.toLowerCase().includes(query);
    card.hidden = !(matchesFilter && matchesQuery);
    if (!card.hidden) visible++;
  }
  emptyState.hidden = visible !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    applyFilters();
  });
});
searchInput.addEventListener("input", applyFilters);

const dialog = document.querySelector("#detailDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogMaker = document.querySelector("#dialogMaker");
const dialogIntro = document.querySelector("#dialogIntro");
const dialogSpecs = document.querySelector("#dialogSpecs");
const dialogSource = document.querySelector("#dialogSource");

document.querySelectorAll("[data-details]").forEach((button) => {
  button.addEventListener("click", () => {
    const phone = phones[button.dataset.details];
    dialogTitle.textContent = phone.title;
    dialogMaker.textContent = phone.maker;
    dialogIntro.textContent = phone.intro;
    dialogSource.href = phone.source;
    dialogSpecs.replaceChildren(...phone.specs.map(([label, value]) => {
      const item = document.createElement("div");
      item.className = "dialog-spec";
      const heading = document.createElement("strong");
      heading.textContent = label;
      const detail = document.createElement("span");
      detail.textContent = value;
      item.append(heading, detail);
      return item;
    }));
    dialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  mainNav.classList.toggle("is-open", !isOpen);
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mainNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}));
