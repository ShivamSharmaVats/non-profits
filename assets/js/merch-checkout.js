(function () {
  var overlay = document.getElementById("checkout-overlay");
  var closeButton = document.getElementById("checkout-close");
  var productEl = document.getElementById("checkout-product");
  var priceEl = document.getElementById("checkout-price");
  var form = document.getElementById("checkout-form");
  var cardInput = document.getElementById("checkout-card");
  var expInput = document.getElementById("checkout-exp");
  var cvcInput = document.getElementById("checkout-cvc");
  var zipInput = document.getElementById("checkout-zip");
  var buyButtons = document.querySelectorAll(".merch-buy");

  if (!overlay || !form || buyButtons.length === 0) return;

  function openCheckout(product, price) {
    productEl.textContent = product || "HDDF Merch";
    priceEl.textContent = price || "";
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeCheckout() {
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  function keepDigits(text) {
    return text.replace(/\D/g, "");
  }

  buyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openCheckout(button.dataset.product, button.dataset.price);
    });
  });

  closeButton.addEventListener("click", closeCheckout);

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) closeCheckout();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !overlay.hidden) closeCheckout();
  });

  cardInput.addEventListener("input", function () {
    var digits = keepDigits(cardInput.value).slice(0, 16);
    cardInput.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  });

  expInput.addEventListener("input", function () {
    var digits = keepDigits(expInput.value).slice(0, 4);
    expInput.value = digits.length > 2 ? digits.slice(0, 2) + "/" + digits.slice(2) : digits;
  });

  cvcInput.addEventListener("input", function () {
    cvcInput.value = keepDigits(cvcInput.value).slice(0, 4);
  });

  zipInput.addEventListener("input", function () {
    zipInput.value = keepDigits(zipInput.value).slice(0, 10);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Payment captured in demo mode. Connect a payment provider to process real transactions.");
    form.reset();
    closeCheckout();
  });
})();
