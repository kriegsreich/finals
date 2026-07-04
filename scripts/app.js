function getCart() {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
}

function saveCart(cartItems) {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function addToCart(item) {
  const cartItems = getCart();
  const existingItem = cartItems.find(i => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    item.quantity = 1;
    cartItems.push(item);
  }

  saveCart(cartItems);
}

function removeFromCart(itemId) {
  const cartItems = getCart();
  const updatedCart = cartItems.filter(item => item.id !== itemId);
  saveCart(updatedCart);
}

function getCartCount() {
  const cartItems = getCart();
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}
