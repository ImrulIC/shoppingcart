import products from "./product.js";
import {
  addToCart,
  removeCartItem,
  clearCart,
  getCartItems,
  calculateCartTotal,
} from "./cart.js";

const productList = document.getElementById("product-list");
const cartElement = document.getElementById("cart");
const clearCartButton = document.getElementById("clear-cart");

// Display products
for (const product of products) {
  const productElement = document.createElement("div");
  productElement.classList.add("product");
  productElement.innerHTML = `
    <span>${product.name} - $${product.price}</span>
    <button class="add-to-cart bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" data-product-id="${product.id}">Add to Cart</button>
  `;
  productList.appendChild(productElement);
}

// Add event listeners
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const productId = parseInt(e.target.dataset.productId);
    addToCart(
      products.find((product) => product.id === productId),
      1
    );
    displayCartItems();
  }
});

clearCartButton.addEventListener("click", () => {
  clearCart();
  displayCartItems();
});

// Display cart items
function displayCartItems() {
  cartElement.innerHTML = "";

  const cartItems = getCartItems();
  for (const item of cartItems) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
      <span>${item.product.name} - $${item.product.price} x ${item.quantity}</span>
      <button class="remove-item" data-product-id="${item.product.id}">Remove</button>
    `;
    cartElement.appendChild(itemElement);
  }

  const totalAmountElement = document.createElement("div");
  totalAmountElement.classList.add("total-amount");
  totalAmountElement.textContent = `Total: $${calculateCartTotal()}`;
  cartElement.appendChild(totalAmountElement);
}

// Remove item from cart
cartElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const productId = parseInt(e.target.dataset.productId);
    const product = products.find((product) => product.id === productId);
    removeCartItem(product);
    displayCartItems();
  }
});

// Initial display
displayCartItems();
