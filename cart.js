let cart = [];

export function addToCart(product, quantity) {
  const existingItem = cart.find((item) => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
}

export function removeCartItem(product) {
  cart = cart.filter((item) => item.product.id !== product.id);
}

export function clearCart() {
  cart = [];
}

export function getCartItems() {
  return cart;
}

export function calculateCartTotal() {
  let total = 0;
  for (const item of cart) {
    total += item.product.price * item.quantity;
  }
  return total;
}
