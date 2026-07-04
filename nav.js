
var burgerBtn = document.getElementById("burgerBtn");
var mobileDrawer = document.getElementById("mobileDrawer");
var menuOverlay = document.getElementById("menuOverlay");
var desktopNav = document.getElementById("desktopNav");

function initializeMobileMenu() {
  if (!mobileDrawer || !desktopNav) return;
  mobileDrawer.innerHTML = desktopNav.innerHTML;
  var mobileToggle = mobileDrawer.querySelector(".theme-toggle");
  if (mobileToggle) {
    mobileToggle.id = "themeToggleMobile";
    setupThemeToggleListener(mobileToggle);
  }
}

function toggleMenu() {
  var isOpen = mobileDrawer.classList.toggle("is-open");
  burgerBtn.classList.toggle("is-active", isOpen);
  menuOverlay.classList.toggle("is-visible", isOpen);
}

if (burgerBtn && menuOverlay) {
  burgerBtn.addEventListener("click", toggleMenu);
  menuOverlay.addEventListener("click", toggleMenu);
}

function setupThemeToggleListener(buttonElement) {
  if (!buttonElement) return;
  
  buttonElement.addEventListener("click", function () {
    var activeTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = (activeTheme === "light") ? "dark" : "light";
    
    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
    
    var dBtn = document.getElementById("themeToggle");
    var mBtn = document.getElementById("themeToggleMobile");
    var icon = (targetTheme === "dark") ? "☀️" : "🌙";
    
    if (dBtn) dBtn.textContent = icon;
    if (mBtn) mBtn.textContent = icon;
  });
}

var initialTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", initialTheme);
var targetIcon = (initialTheme === "dark") ? "☀️" : "🌙";

var desktopToggleBtn = document.getElementById("themeToggle");
initializeMobileMenu();

var mobileToggleBtn = document.getElementById("themeToggleMobile");

if (desktopToggleBtn) desktopToggleBtn.textContent = targetIcon;
if (mobileToggleBtn) mobileToggleBtn.textContent = targetIcon;

setupThemeToggleListener(desktopToggleBtn);
