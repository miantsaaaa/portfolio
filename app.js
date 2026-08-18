/**
 * ============================================================
 * PORTFOLIO APP
 * ============================================================
 *
 * Cette application :
 *
 * 1. Charge les différentes sections HTML.
 * 2. Les assemble dans une seule page.
 * 3. Active les animations.
 * 4. Gère la navigation mobile.
 * 5. Détecte la section actuellement visible.
 * 6. Gère le formulaire de contact côté frontend.
 *
 * ============================================================
 */


const sections = [

  {
    id: "hero-container",
    file: "sections/hero.html"
  },

  {
    id: "about-container",
    file: "sections/about.html"
  },

  {
    id: "skills-container",
    file: "sections/skills.html"
  },

  {
    id: "experience-container",
    file: "sections/experience.html"
  },

  {
    id: "education-container",
    file: "sections/education.html"
  },

  {
    id: "projects-container",
    file: "sections/projects.html"
  },

  {
    id: "services-container",
    file: "sections/services.html"
  },

  {
    id: "testimonials-container",
    file: "sections/testimonials.html"
  },

  {
    id: "github-container",
    file: "sections/github.html"
  },

  {
    id: "cv-container",
    file: "sections/cv.html"
  },

  {
    id: "contact-container",
    file: "sections/contact.html"
  }

];


/* ============================================================
   LOAD HTML SECTIONS
   ============================================================ */


async function loadSection(containerId, file) {

  const container =
    document.getElementById(containerId);


  if (!container) {

    console.warn(
      `Container introuvable : ${containerId}`
    );

    return;

  }


  try {

    const response =
      await fetch(file);


    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status}`
      );

    }


    const html =
      await response.text();


    container.innerHTML =
      html;


  } catch (error) {

    console.error(
      `Impossible de charger ${file}`,
      error
    );


    container.innerHTML = `
      <div class="section-load-error container">
        Impossible de charger cette section.
      </div>
    `;

  }

}


/* ============================================================
   LOAD ALL SECTIONS
   ============================================================ */


async function loadAllSections() {

  await Promise.all(
    sections.map(section =>
      loadSection(
        section.id,
        section.file
      )
    )
  );


  initializeInteractions();

}


/* ============================================================
   INITIALIZE INTERACTIONS
   ============================================================ */


function initializeInteractions() {

  initializeMobileMenu();

  initializeSmoothScroll();

  initializeRevealAnimations();

  initializeActiveNavigation();

  initializeHeader();

  initializeRippleEffect();

  initializeContactForm();

}


/* ============================================================
   MOBILE MENU
   ============================================================ */


function initializeMobileMenu() {

  const navToggle =
    document.getElementById("navToggle");


  const navLinks =
    document.getElementById("navLinks");


  if (!navToggle || !navLinks) {
    return;
  }


  navToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        navLinks.classList.toggle("open");


      navToggle.classList.toggle(
        "open",
        isOpen
      );


      navToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );


  document
    .querySelectorAll(".nav-link")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          navLinks.classList.remove(
            "open"
          );


          navToggle.classList.remove(
            "open"
          );


          navToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


/* ============================================================
   SMOOTH SCROLL
   ============================================================ */


function initializeSmoothScroll() {

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(targetId);


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });

}


/* ============================================================
   SCROLL REVEAL
   ============================================================ */


function initializeRevealAnimations() {

  const elements =
    document.querySelectorAll(
      ".reveal"
    );


  if (!elements.length) {
    return;
  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "is-visible"
            );


            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.10,
        rootMargin:
          "0px 0px -60px 0px"
      }
    );


  elements.forEach(element => {

    observer.observe(
      element
    );

  });

}


/* ============================================================
   ACTIVE NAVIGATION
   ============================================================ */


function initializeActiveNavigation() {

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );


  const links =
    document.querySelectorAll(
      ".nav-link"
    );


  if (
    !sections.length ||
    !links.length
  ) {

    return;

  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            !entry.isIntersecting
          ) {

            return;

          }


          links.forEach(link => {

            link.classList.remove(
              "active"
            );

          });


          const activeLink =
            document.querySelector(
              `.nav-link[href="#${entry.target.id}"]`
            );


          if (activeLink) {

            activeLink.classList.add(
              "active"
            );

          }

        });

      },
      {
        rootMargin:
          "-35% 0px -55% 0px"
      }
    );


  sections.forEach(section => {

    observer.observe(
      section
    );

  });

}


/* ============================================================
   HEADER SCROLL
   ============================================================ */


function initializeHeader() {

  const header =
    document.getElementById(
      "siteHeader"
    );


  if (!header) {
    return;
  }


  function updateHeader() {

    if (
      window.scrollY > 30
    ) {

      header.classList.add(
        "scrolled"
      );

    } else {

      header.classList.remove(
        "scrolled"
      );

    }

  }


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );

}


/* ============================================================
   RIPPLE BUTTON
   ============================================================ */


function initializeRippleEffect() {

  document
    .querySelectorAll(".btn")
    .forEach(button => {

      button.addEventListener(
        "pointerdown",
        event => {

          const ripple =
            document.createElement(
              "span"
            );


          ripple.className =
            "ripple";


          const rect =
            button.getBoundingClientRect();


          ripple.style.left =
            `${event.clientX - rect.left}px`;


          ripple.style.top =
            `${event.clientY - rect.top}px`;


          button.appendChild(
            ripple
          );


          setTimeout(
            () => ripple.remove(),
            700
          );

        }
      );

    });

}


/* ============================================================
   CONTACT FORM
   ============================================================ */


function initializeContactForm() {

  const form =
    document.getElementById(
      "contactForm"
    );


  const status =
    document.getElementById(
      "formStatus"
    );


  if (!form || !status) {
    return;
  }


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      /*
        ========================================================
        PERSONNEL / BACKEND

        Cette partie devra être remplacée lorsque ton backend
        sera prêt.

        Exemple :

        const formData = new FormData(form);

        fetch("/api/contact", {
          method: "POST",
          body: formData
        });

        ========================================================
      */


      status.textContent =
        "Message prêt à être envoyé via le backend.";


      form.reset();

    }
  );

}


/* ============================================================
   START APPLICATION
   ============================================================ */


document.addEventListener(
  "DOMContentLoaded",
  loadAllSections
);