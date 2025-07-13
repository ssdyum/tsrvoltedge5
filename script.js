// Initialize Feather Icons and Features document.addEventListener("DOMContentLoaded", function () { feather.replace();

initMobileMenu(); initSmoothScrolling(); initServicePrefill(); initMessagePopup(); });

function initMobileMenu() { const toggle = document.querySelector(".mobile-menu-toggle"); const nav = document.querySelector(".nav-links"); toggle?.addEventListener("click", () => { nav.classList.toggle("active"); const icon = toggle.querySelector("i"); icon.setAttribute("data-feather", nav.classList.contains("active") ? "x" : "menu"); feather.replace(); }); }

function initSmoothScrolling() { document.querySelectorAll('a[href^="#"]').forEach(link => { link.addEventListener("click", function (e) { e.preventDefault(); const target = document.querySelector(this.getAttribute("href")); if (target) { window.scrollTo({ top: target.offsetTop - 60, behavior: "smooth" }); } }); }); }

function initServicePrefill() { // On click set value document.querySelectorAll(".service-link").forEach(card => { card.addEventListener("click", () => { const service = card.getAttribute("data-service"); localStorage.setItem("prefillService", service); location.href = "#contact"; }); });

// On load fill form const select = document.getElementById("service"); const stored = localStorage.getItem("prefillService"); if (select && stored) { select.value = stored; localStorage.removeItem("prefillService"); } }

function initMessagePopup() { const popup = document.getElementById("message-popup"); const close = document.querySelector(".message-close"); if (popup && close) { close.addEventListener("click", () => popup.classList.remove("show")); } }
