
var checkoutForm = document.getElementById("checkoutForm");
var checkoutToast = document.getElementById("cartToast"); 
var toastMessage = document.getElementById("toastMessage");
var cardInput = document.getElementById("cardNumber");
function hideToast() {
  if (checkoutToast) {
    checkoutToast.classList.remove("show");
  }
}
if (cardInput) {
  cardInput.addEventListener("input", function(e) {
    var value = e.target.value.replace(/\D/g, "");
    var formattedValue = value.match(/.{1,4}/g)?.join(" ") || "";
    e.target.value = formattedValue;
  });
}
if (checkoutForm) {
  checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();

    var nameError = document.getElementById("nameError");
    var emailError = document.getElementById("emailError");
    var addressError = document.getElementById("addressError");
    var cardError = document.getElementById("cardError");

    var userName = document.getElementById("fullName")?.value.trim() || "";
    var userEmail = document.getElementById("email")?.value.trim() || "";
    var userAddress = document.getElementById("address")?.value.trim() || "";
    var userCard = cardInput ? cardInput.value.trim() : "";
    if (nameError) { 
      nameError.textContent = ""; nameError.classList.remove("visible"); 
    }
    if (emailError) 
    { emailError.textContent = ""; emailError.classList.remove("visible"); 
    }
    if (addressError) 
    { addressError.textContent = ""; addressError.classList.remove("visible"); 
    }
    if (cardError) 
    { cardError.textContent = ""; cardError.classList.remove("visible");
    }
    var cleanCard = userCard.replace(/[ -]/g, "");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (userName === "") {
      if (nameError) {
        nameError.textContent = "Please enter your full name";
        nameError.classList.add("visible");
      }
      return;
    } 
    else if (userEmail === "") {
      if (emailError) {
        emailError.textContent = "Please enter your Emal";
        emailError.classList.add("visible");
      }
      return;
    } 
    else if (!emailRegex.test(userEmail)) {
      if (emailError) {
        emailError.textContent = "incoorect email";
        emailError.classList.add("visible");
      }
      return;
    } 
    else if (userAddress === "") {
      if (addressError) {
        addressError.textContent = "proovide address";
        addressError.classList.add("visible");
      }
      return;
    } 
    else if (cleanCard === "") {
      if (cardError) {
        cardError.textContent = "card info is missiing";
        cardError.classList.add("visible");
      }
      return;
    } 
    else if (cleanCard.length !== 16 || isNaN(cleanCard)) {
      if (cardError) {
        cardError.textContent = "lenght should be 16";
        cardError.classList.add("visible");
      }
      return;
    }

    if (toastMessage && checkoutToast) {
      toastMessage.textContent = "Order confirmed thank you, " + userName;
      checkoutToast.classList.add("show");
    }
    setTimeout(function() {
      hideToast();
      localStorage.removeItem("cart");
      window.location.href = "index.html"; 
    }, 3500);
  });
}
