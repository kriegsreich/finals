
var cardGrid = document.getElementById("cardGrid");
var searchInput = document.getElementById("searchInput");
var cartToast = document.getElementById("cartToast");
var toastMessage = document.getElementById("toastMessage");
var toastTimeout;

var allProducts = [];

function showToast(message) {
  if (!toastMessage || !cartToast) return;
  toastMessage.textContent = message;
  cartToast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(function() {
    cartToast.classList.remove("show");
  }, 3000);
}
function displayItems(filteredItems) {
  if (!cardGrid) return;
  cardGrid.innerHTML = "";

  if (filteredItems.length === 0) {
    cardGrid.innerHTML = "<div class='no-results'>No products match your search.</div>";
    return;
  }

  for (var i = 0; i < filteredItems.length; i++) {
    var item = filteredItems[i];
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      "<img src='" + item.image + "' alt='" + item.name + "'>" +
      "<h3>" + item.name + "</h3>" +
      "<p>" + item.description + "</p>" +
      "<div class='price'>$" + item.price.toFixed(2) + "</div>" +
      "<button data-id='" + item.id + "'>Add to Cart</button>";
    cardGrid.appendChild(card);
  }

  var buttons = cardGrid.querySelectorAll(".card button");
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].addEventListener("click", function (event) {
      var clickedId = parseInt(event.target.getAttribute("data-id"));
      var selectedItem = null;
      
      for (var k = 0; k < allProducts.length; k++) {
        if (allProducts[k].id === clickedId) {
          selectedItem = allProducts[k];
          break;
        }
      }
      
      if (selectedItem !== null) {
        if (typeof addToCart === "function") {
          addToCart({
            id: selectedItem.id,
            name: selectedItem.name,
            description: selectedItem.description,
            price: selectedItem.price,
            image: selectedItem.image
          });
        }
        showToast(selectedItem.name + " added to cart!");
      }
    });
  }
}
if (cardGrid) {
  fetch("data.json")
    .then(function (response) { return response.json(); })
    .then(function (items) {
      allProducts = items;
      displayItems(allProducts);
    })
    .catch(function (error) {
      cardGrid.innerHTML = "<p>Could not load products.</p>";
      console.log(error);
    });
}

if (searchInput) {
  searchInput.addEventListener("input", function (event) {
    var searchTerm = event.target.value.toLowerCase().trim();
    
    var filtered = allProducts.filter(function (product) {
      var matchName = product.name.toLowerCase().includes(searchTerm);
      var matchDesc = product.description.toLowerCase().includes(searchTerm);
      return matchName || matchDesc;
    });

    displayItems(filtered);
  });
}
