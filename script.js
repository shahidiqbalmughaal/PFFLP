const loader = document.getElementById("loader");
const navLinks = document.getElementById("nav-links");
const menuBtn = document.getElementById("menu-btn");
const themeToggle = document.getElementById("theme-toggle");
const scrollTopBtn = document.getElementById("scrollTop");
const progressBar = document.getElementById("progressBar");
const typingTarget = document.getElementById("typing");
const contactForm = document.getElementById("contact-form");

const roles = [
    "Administration Professional",
    "Executive Assistant",
    "Data Analyst",
    "AI Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

window.addEventListener("load", () => {
    loader?.classList.add("hidden");
});

menuBtn?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

navLinks?.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
        navLinks.classList.remove("show");
        menuBtn?.setAttribute("aria-expanded", "false");
        if (menuBtn) {
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    }
});

themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
});

if (localStorage.getItem("portfolio-theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

function updateScrollUi() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    scrollTopBtn?.classList.toggle("show", scrollTop > 350);
}

window.addEventListener("scroll", updateScrollUi, { passive: true });
updateScrollUi();

scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

function typeRole() {
    if (!typingTarget) {
        return;
    }

    const currentRole = roles[roleIndex];
    typingTarget.textContent = currentRole.slice(0, charIndex);

    if (!deleting && charIndex < currentRole.length) {
        charIndex += 1;
        setTimeout(typeRole, 75);
        return;
    }

    if (!deleting && charIndex === currentRole.length) {
        deleting = true;
        setTimeout(typeRole, 1400);
        return;
    }

    if (deleting && charIndex > 0) {
        charIndex -= 1;
        setTimeout(typeRole, 35);
        return;
    }

    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 250);
}

typeRole();

contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const subject = formData.get("subject") || "Portfolio inquiry";
    const message = formData.get("message") || "";

    const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message
    ].join("\n");

    window.location.href = `mailto:Shaiqbalmughal@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
