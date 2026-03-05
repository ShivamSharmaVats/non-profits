(function () {
  var tabs = document.querySelectorAll(".donation-tab");
  var panels = document.querySelectorAll(".donation-panel");

  if (!tabs.length || !panels.length) return;

  function setActiveTab(tabName) {
    tabs.forEach(function (tab) {
      var active = tab.dataset.tab === tabName;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    panels.forEach(function (panel) {
      var active = panel.dataset.panel === tabName;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      setActiveTab(tab.dataset.tab);
    });
  });

  setActiveTab("lesson");
})();
