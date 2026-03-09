(function () {
  var openButton = document.getElementById("open-volunteer-form");
  var hideButton = document.getElementById("hide-volunteer-form");
  var section = document.getElementById("volunteer-form");

  if (!openButton || !hideButton || !section) return;

  openButton.addEventListener("click", function () {
    section.hidden = false;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  hideButton.addEventListener("click", function () {
    section.hidden = true;
    openButton.focus();
  });
})();
