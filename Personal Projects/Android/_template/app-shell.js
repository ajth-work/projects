/*
  UNIVERSAL APP SHELL
  Handles State, Navigation, and Profile management
*/

const APP_KEY = "myapp.profile.v1";

let profile = {
  name: "User",
  navStyle: "fab", // 'fab' or 'navbar'
  showPlusButton: true,
  menuBlur: 2,
  settings: {}
};

function loadProfile() {
  const stored = localStorage.getItem(APP_KEY);
  if (stored) {
    profile = { ...profile, ...JSON.parse(stored) };
  }
  applyTheme();
}

function saveProfile() {
  localStorage.setItem(APP_KEY, JSON.stringify(profile));
}

function applyTheme() {
  document.body.classList.toggle("nav-style-navbar", profile.navStyle === "navbar");
  document.body.classList.toggle("hide-nav-plus", !profile.showPlusButton);

  const overlay = document.querySelector("#radialOverlay");
  if (overlay) overlay.style.backdropFilter = `blur(${profile.menuBlur}px)`;
}

function setupNavigation() {
  const menuToggle = document.querySelector("#menuToggle");
  const radialMenu = document.querySelector("#radialMenu");
  const radialOverlay = document.querySelector("#radialOverlay");

  menuToggle?.addEventListener("click", () => {
    radialMenu?.classList.toggle("open");
  });

  radialOverlay?.addEventListener("click", () => {
    radialMenu?.classList.remove("open");
  });

  // Handle center plus button in navbar
  document.querySelector("#navPlusAction")?.addEventListener("click", () => {
    document.querySelector("#actionOverlay")?.classList.add("active");
  });

  document.querySelector("#closeActions")?.addEventListener("click", () => {
    document.querySelector("#actionOverlay")?.classList.remove("active");
  });
}

// Initialize on Load
document.addEventListener("DOMContentLoaded", () => {
  loadProfile();
  setupNavigation();
});
