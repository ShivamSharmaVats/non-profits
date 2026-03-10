(function () {
  var source = document.getElementById("source-text");
  var output = document.getElementById("summary-output");
  var summarizeBtn = document.getElementById("summarize-btn");
  var clearBtn = document.getElementById("clear-btn");

  if (!source || !output || !summarizeBtn || !clearBtn) return;

  function summarize(text) {
    var cleaned = text.replace(/\s+/g, " ").trim();
    if (!cleaned) return "Please paste text first.";

    var sentences = cleaned.match(/[^.!?]+[.!?]*/g) || [cleaned];
    var summary = sentences.slice(0, 3).join(" ").trim();

    if (summary.length > 500) {
      summary = summary.slice(0, 497) + "...";
    }

    return summary;
  }

  summarizeBtn.addEventListener("click", function () {
    output.textContent = summarize(source.value);
  });

  clearBtn.addEventListener("click", function () {
    source.value = "";
    output.textContent = "Your summary will appear here.";
    source.focus();
  });
})();
