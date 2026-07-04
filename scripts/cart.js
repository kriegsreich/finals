function renderCart() {
  var cartContainer = document.getElementById("cartContainer");
  var cartTotalDiv = document.getElementById("cartTotal");

  if (!cartContainer || !cartTotalDiv) return;

  var cartItems = typeof getCart === "function" ? getCart() : [];

  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p class='empty-message'>Your cart is empty.</p>";
    cartTotalDiv.innerHTML = "";
    return;
  }

  var total = 0;

  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var lineTotal = item.price * item.quantity;
    total = total + lineTotal;

    var itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    itemDiv.innerHTML =
      "<img src='" + item.image + "' alt='" + item.name + "'>" +
      "<div class='cart-item-details'>" +
      "<h3>" + item.name + "</h3>" +
      "<p>" + item.description + "</p>" +
      "<p>Price: $" + item.price.toFixed(2) + " x " + item.quantity + "</p>" +
      "</div>" +
      "<button data-id='" + item.id + "'>Remove</button>";

    cartContainer.appendChild(itemDiv);
  }
  
  cartTotalDiv.innerHTML = 
    "<div>Total: $" + total.toFixed(2) + "</div>" +
    "<button id='checkoutBtn' class='checkout-button'>Proceed to Checkout</button>";

  var removeButtons = document.querySelectorAll(".cart-item button");
  for (var j = 0; j < removeButtons.length; j++) {
    removeButtons[j].addEventListener("click", function (event) {
      var idToRemove = parseInt(event.target.getAttribute("data-id"));
      if (typeof removeFromCart === "function") {
        removeFromCart(idToRemove);
      }
      renderCart();
    });
  }
  
  var checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      window.location.href = "checkout.html";
    });
  }
}

renderCart();
