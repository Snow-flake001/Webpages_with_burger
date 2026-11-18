// ==========================================
// MATECH INCORPORATED - WEBSITE JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // 1. MOBILE NAVIGATION MENU
    // ======================================

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");

        });

        // Close menu when a link is clicked

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute("aria-label", "Open navigation menu");

            });

        });

        // Close menu when Escape is pressed

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute("aria-label", "Open navigation menu");

            }

        });

    }


    // ======================================
    // 2. ACTIVE NAVIGATION LINK
    // ======================================

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navigationLinks = document.querySelectorAll(".nav-links a");

    navigationLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

            link.setAttribute("aria-current", "page");

        }

    });


    // ======================================
    // 3. SMOOTH SCROLLING
    // ======================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ======================================
    // 4. SCROLL REVEAL ANIMATIONS
    // ======================================

    const animatedElements = document.querySelectorAll(
        "section, .skill-category, .service-category, .project-card"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion && "IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        animatedElements.forEach(function (element) {

            element.classList.add("reveal");

            observer.observe(element);

        });

    }


    // ======================================
    // 5. AUTOMATIC COPYRIGHT YEAR
    // ======================================

    const footerText = document.querySelector(".footer-bottom p");

    if (footerText) {

        footerText.innerHTML =
            `&copy; ${new Date().getFullYear()} MATECH INCORPORATED. All Rights Reserved.`;

    }


    // ======================================
    // 6. CONTACT FORM VALIDATION
    // ======================================

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        // Create a message area for form feedback

        let formMessage = document.getElementById("form-message");

        if (!formMessage) {

            formMessage = document.createElement("p");

            formMessage.id = "form-message";

            formMessage.setAttribute("role", "status");

            formMessage.setAttribute("aria-live", "polite");

            contactForm.appendChild(formMessage);

        }

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const nameField = contactForm.querySelector('[name="name"]');

            const emailField = contactForm.querySelector('[name="email"]');

            const messageField = contactForm.querySelector('[name="message"]');

            if (!nameField || !emailField || !messageField) {

                formMessage.textContent =
                    "Please check that your form contains name, email and message fields.";

                return;

            }

            const name = nameField.value.trim();

            const email = emailField.value.trim();

            const message = messageField.value.trim();

            if (!name || !email || !message) {

                formMessage.textContent =
                    "Please complete all the fields.";

                return;

            }

            if (!emailField.validity.valid) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                return;

            }

            if (message.length < 10) {

                formMessage.textContent =
                    "Please enter a longer message.";

                return;

            }

            formMessage.textContent =
                "Your details are valid! The contact form still needs a backend or email service before it can deliver your message.";

        });

    }


    // ======================================
    // 7. WEBSITE LOADED
    // ======================================

    console.log("MATECH INCORPORATED website loaded successfully!");

});