/* =========================
   NAVBAR SCROLL
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

/* =========================
   MOBILE MENU
========================= */

const hamburger = document.querySelector(".hamburger");

const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});

/* =========================
   SCROLL ANIMATION
========================= */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {
    threshold: 0.1
});

document.querySelectorAll(
    "section, .service-card, .feature-card"
).forEach(el => {

    observer.observe(el);

});

/* =========================
   CONTACT FORM
========================= */

const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const name =
        document.getElementById("name").value;

    const phone =
        document.getElementById("phone").value;

    const message =
        document.getElementById("message").value;

    const text =
`Name: ${name}
Phone: ${phone}
Message: ${message}`;

    window.open(
`https://wa.me/917396648848?text=${encodeURIComponent(text)}`,
"_blank"
);

});
