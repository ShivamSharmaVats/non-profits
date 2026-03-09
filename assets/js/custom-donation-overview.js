(function () {
  var openButton = document.querySelector(".custom-donation-open");
  var overlay = document.getElementById("custom-donation-overlay");
  var closeButton = document.getElementById("custom-donation-close");
  var presetButtons = document.querySelectorAll(".donation-preset");
  var form = document.getElementById("custom-donation-form");
  var amountInput = document.getElementById("overview-custom-amount");
  var selectedAmount = document.getElementById("overview-selected-amount");

  if (!openButton || !overlay || !closeButton || !form || !amountInput || !selectedAmount) return;

  var billingOverlay = document.getElementById("checkout-overlay");
  var billingProduct = document.getElementById("checkout-product");
  var billingPrice = document.getElementById("checkout-price");

  function setAmount(value) {
    var safeValue = Number(value);
    if (!safeValue || safeValue < 1) return;
    amountInput.value = String(safeValue);
    selectedAmount.textContent = "$" + String(safeValue);
  }

  function openOverview() {
    setAmount(amountInput.value || 100);
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeOverview() {
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  openButton.addEventListener("click", openOverview);
  closeButton.addEventListener("click", closeOverview);

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) closeOverview();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !overlay.hidden) closeOverview();
  });

  presetButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setAmount(button.dataset.amount);
    });
  });

  amountInput.addEventListener("input", function () {
    setAmount(amountInput.value);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var value = Number(amountInput.value);
    if (!value || value < 1) return;
    if (billingOverlay && billingProduct && billingPrice) {
      billingProduct.textContent = "Custom Donation";
      billingPrice.textContent = "$" + String(value);
      closeOverview();
      billingOverlay.hidden = false;
      document.body.style.overflow = "hidden";
    }
  });
})();
