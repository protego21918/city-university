/*
  City University, Adversary City. Fictional site built for the Adversary Wars simulation.
  No network requests are made from this file. Nothing is transmitted or stored.
*/

(function () {
  "use strict";

  var navToggle = document.getElementById("nav-toggle");
  var primaryNav = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Course Catalog: guide-tab filter over the index cards
  var guideTabs = document.querySelectorAll(".guide-tab");
  var indexCards = document.querySelectorAll(".index-card");

  if (guideTabs.length && indexCards.length) {
    guideTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var dept = tab.getAttribute("data-dept");

        guideTabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");

        indexCards.forEach(function (card) {
          card.classList.toggle("is-shown", card.getAttribute("data-dept") === dept);
        });
      });
    });
  }

  // Academics: accordion of colleges/schools
  var accordionTriggers = document.querySelectorAll(".accordion-trigger");

  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var item = trigger.closest(".accordion-item");
      if (!item) {
        return;
      }
      var isOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // Catalog search: matches typed keywords to a department and jumps to its cards
  var catalogSearchBtn = document.getElementById("catalog-search-btn");
  var catalogSearchInput = document.getElementById("catalog-search");
  var catalogSearchNote = document.getElementById("catalog-search-note");

  if (catalogSearchBtn && catalogSearchInput && catalogSearchNote) {
    var deptKeywords = {
      CS: ["cs", "computer science", "programming", "robotics", "data structures"],
      BUS: ["bus", "business", "management", "marketing", "entrepreneur"],
      BIO: ["bio", "biology", "anatomy", "ecology"],
      HIST: ["hist", "history"],
      ENG: ["eng", "english", "writing", "literature"],
      PSY: ["psy", "psychology"]
    };

    var runCatalogSearch = function () {
      var query = catalogSearchInput.value.trim().toLowerCase();
      if (!query) {
        return;
      }

      var matchedDept = null;
      Object.keys(deptKeywords).forEach(function (dept) {
        if (matchedDept) {
          return;
        }
        var keywords = deptKeywords[dept];
        for (var i = 0; i < keywords.length; i++) {
          if (query.indexOf(keywords[i]) !== -1) {
            matchedDept = dept;
            break;
          }
        }
      });

      var targetTab = matchedDept
        ? document.querySelector('.guide-tab[data-dept="' + matchedDept + '"]')
        : null;

      if (targetTab) {
        targetTab.click();
        catalogSearchNote.textContent =
          "Showing " + matchedDept + " courses matching \"" + catalogSearchInput.value.trim() + "\".";
      } else {
        catalogSearchNote.textContent =
          "No exact match in this sample catalog. Browse departments below.";
      }
      catalogSearchNote.classList.add("is-visible");

      var drawer = document.querySelector(".catalog-drawer");
      if (drawer) {
        drawer.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start"
        });
      }
    };

    catalogSearchBtn.addEventListener("click", runCatalogSearch);
    catalogSearchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        runCatalogSearch();
      }
    });
  }

  var contactForm = document.getElementById("contact-form");
  var confirmPanel = document.getElementById("confirm-panel");

  if (contactForm && confirmPanel) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      var programInput = contactForm.querySelector('select[name="program"]');
      var program = programInput ? programInput.value : "General Inquiry";

      confirmPanel.textContent =
        "Request received for " + program +
        ". This is a demonstration form: no data was sent or saved.";
      confirmPanel.classList.add("is-visible");

      contactForm.reset();
    });
  }
})();
