// Mobile Navigation ein-/ausklappen
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Navigation schließen" : "Navigation öffnen");
});

// Menü schließen, wenn ein Link angeklickt wird
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Sections beim Scrollen dezent einblenden
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}

// Aktiven Navigationspunkt je nach sichtbarem Abschnitt markieren
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-link");
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === "#" + id)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

// Dezenter Maus-Glow (nur auf Geräten mit Maus)
const cursorGlow = document.getElementById("cursorGlow");
const fine = window.matchMedia("(pointer: fine)").matches;
if (fine && cursorGlow) {
  window.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
    cursorGlow.style.opacity = "1";
  });
  window.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0";
  });
}
