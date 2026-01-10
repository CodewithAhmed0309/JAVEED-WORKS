/* ===============================
   GLOBAL ELEMENTS
================================ */

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const sectionsWithId = document.querySelectorAll('section[id]');
const contactForm = document.getElementById('contactForm');

/* ===============================
   MOBILE NAVIGATION
================================ */

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ===============================
   SCROLL HANDLER (OPTIMIZED)
================================ */

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

function handleScroll() {
    const scrollY = window.pageYOffset;

    // Navbar effect
    if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > 100);
    }

    // Active nav link
    const offset = navbar ? navbar.offsetHeight + 100 : 100;

    sectionsWithId.forEach(section => {
        const top = section.offsetTop - offset;
        const bottom = top + section.offsetHeight;
        const id = section.id;

        if (scrollY >= top && scrollY < bottom) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${id}`
                );
            });
        }
    });
}

/* ===============================
   SMOOTH SCROLL
================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const id = anchor.getAttribute('href');
        if (id === '#') return;

        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();

        const offset = navbar ? navbar.offsetHeight : 0;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
    });
});

/* ===============================
   INTERSECTION OBSERVER (ANIMATIONS)
================================ */

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(
    'section, .service-card, .feature-card, .gallery-item, .about-text'
).forEach(el => animationObserver.observe(el));

/* ===============================
   CONTACT FORM
================================ */

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !phone || !message) {
            alert('Please fill all fields.');
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert('Enter a valid 10-digit phone number.');
            return;
        }

        const subject = encodeURIComponent(`Contact Inquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nPhone: ${phone}\n\nMessage:\n${message}`
        );

        window.location.href =
            `mailto:shaikjahashahmed9@gmail.com?subject=${subject}&body=${body}`;

        alert('Thank you! Your email app will open now.');
        contactForm.reset();
    });
}

/* ===============================
   LAZY LOADING IMAGES
================================ */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
} else {
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
    });
}

/* ===============================
   PAGE LOAD FIX
================================ */

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
