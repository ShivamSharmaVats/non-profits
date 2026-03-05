(function () {
  var overlay = document.getElementById("donation-checkout-overlay");
  var closeButton = document.getElementById("donation-checkout-close");
  var productEl = document.getElementById("donation-checkout-product");
  var priceEl = document.getElementById("donation-checkout-price");
  var form = document.getElementById("donation-checkout-form");
  var cardInput = document.getElementById("donation-card");
  var expInput = document.getElementById("donation-exp");
  var cvcInput = document.getElementById("donation-cvc");
  var zipInput = document.getElementById("donation-zip");
  var payButtons = document.querySelectorAll(".donation-pay");
  var customForm = document.getElementById("donation-custom-form");
  var customAmount = document.getElementById("custom-amount");

  if (!overlay || !form) return;

  function keepDigits(text) {
    return text.replace(/\D/g, "");
  }

  function openCheckout(product, price) {
    productEl.textContent = product;
    priceEl.textContent = price;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeCheckout() {
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  payButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openCheckout(button.dataset.product || "Donation", button.dataset.price || "$0");
    });
  });

  if (customForm && customAmount) {
    customForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var amount = Number(customAmount.value);
      if (!amount || amount < 1) return;
      openCheckout("Custom Donation", "$" + String(amount));
    });
  }

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
    alert("Donation captured in demo mode. Connect a payment processor to accept live card payments.");
    form.reset();
    closeCheckout();
  });
})();
