(() => {
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const toggle = document.getElementById("menuToggle");

  function openDrawer() {
    drawer.classList.add("open");
    overlay.classList.add("show");
    drawer.setAttribute("aria-hidden", "false");
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
    drawer.setAttribute("aria-hidden", "true");
  }

  toggle.addEventListener("click", () => {
    drawer.classList.contains("open") ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener("click", closeDrawer);

  // Safety: ESC key always closes drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
})();
