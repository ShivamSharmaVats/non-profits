(function () {
  function applyRevealTargets() {
    var targets = document.querySelectorAll(
      "main h1, main h2, main .lead, main .tag, main .card, main .stat, main .feature, main .impact-shot, main .merch-item, main .sponsor, main .event-list li, main .clean-list li, main form, main .button"
    );

    targets.forEach(function (element, index) {
      if (element.classList.contains("reveal")) return;
      element.classList.add("scroll-reveal");

      if (
        element.classList.contains("card") ||
        element.classList.contains("stat") ||
        element.classList.contains("feature") ||
        element.classList.contains("impact-shot") ||
        element.classList.contains("merch-item") ||
        element.classList.contains("sponsor")
      ) {
        element.classList.add("card-rise");
      } else {
        element.classList.add("text-rise");
      }

      element.style.setProperty("--reveal-delay", String((index % 4) * 90) + "ms");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    targets.forEach(function (element) {
      observer.observe(element);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyRevealTargets);
  } else {
    applyRevealTargets();
  }
})();
