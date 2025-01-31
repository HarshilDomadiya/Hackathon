function displayWishlist() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
  const wishlistContainer = document.getElementById("wishlistItems")

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = '<tr><td colspan="6">Your wishlist is empty.</td></tr>'
    return
  }

  wishlistContainer.innerHTML = wishlist
    .map(
      (product, index) => `
    <tr data-product-id="${product.id}">
      <td>
        <img src="${product.image}" alt="${product.name}" class="table__img" />
      </td>
      <td>
        <h3 class="table__title">${product.name}</h3>
        <p class="table__description">${product.description}</p>
      </td>
      <td>
        <span class="table__price">${product.price}</span>
      </td>
      <td><span class="table__stock">In Stock</span></td>
      <td><a href="#" class="btn btn--sm add-to-cart" onclick="addToCart(${product.id})">Add to Cart</a></td>
      <td><i class="fi fi-rs-trash table__trash" onclick="removeFromWishlist(${index})"></i></td>
    </tr>
  `,
    )
    .join("")
}

function addToCart(productId) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
  const product = wishlist.find((p) => p.id === productId)
  if (!product) return

  const cart = JSON.parse(localStorage.getItem("cart")) || []
  cart.push(product)
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  alert("Product added to cart!")
}

function removeFromWishlist(index) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
  wishlist.splice(index, 1)
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
  displayWishlist()
  updateWishlistCount()
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const cartCount = document.querySelector('.header__action-btn[title="Cart"] .count')
  cartCount.textContent = cart.length
}

function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
  const wishlistCount = document.querySelector('.header__action-btn[title="Wishlist"] .count')
  wishlistCount.textContent = wishlist.length
}

document.addEventListener("DOMContentLoaded", () => {
  displayWishlist()
  updateCartCount()
  updateWishlistCount()
})

