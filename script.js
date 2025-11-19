
// SHOPPING CART FUNCTIONALITY
let cart = [];
let total = 0;

function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  total += price;
  updateCart();
}

function removeFromCart(index) {
  if (!cart[index]) return;
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  total = 0;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-list");
  if (!cartList) return;
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - R${item.price}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.onclick = () => removeFromCart(index);
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });

  const cartTotalEl = document.getElementById("cart-total");
  const checkoutTotalEl = document.getElementById("checkout-total");
  if (cartTotalEl) cartTotalEl.textContent = total;
  if (checkoutTotalEl) checkoutTotalEl.textContent = total;
}


// CHECKOUT FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
      } else {
        const checkoutSection = document.querySelector(".checkout");
        if (checkoutSection) checkoutSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const address = document.getElementById("address").value.trim();
      const payment = document.getElementById("payment").value;

      if (!payment) {
        alert("Please select a payment method!");
        return;
      }

      alert(`Thank you, ${name}!\nYour order of R${total} has been placed.\nPayment: ${payment}\nShipping to: ${address}\nConfirmation sent to: ${email}`);
      clearCart();
      this.reset();
    });
  }

  // Initialize lightbox images after DOM ready
  initLightbox();
});


// LIGHTBOX SLIDESHOW

let lightboxImages = []; // store image elements
let currentIndex = 0;

function initLightbox() {
  lightboxImages = Array.from(document.querySelectorAll(".product img"));
  lightboxImages.forEach((img, i) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(i));
  });

  // close on background click
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      // only close when clicking outside the image (on the overlay)
      const imgEl = document.getElementById("lightbox-img");
      if (e.target === lightbox || e.target === imgEl) {
        // clicking the image itself won't close; clicking the bg will
        if (e.target === lightbox) closeLightbox();
      }
    });
  }

  // keyboard support
  document.addEventListener("keydown", function (e) {
    if (document.getElementById("lightbox") && document.getElementById("lightbox").style.display === "block") {
      if (e.key === "ArrowRight") changeImage(1);
      if (e.key === "ArrowLeft") changeImage(-1);
      if (e.key === "Escape") closeLightbox();
    }
  });
}

function openLightbox(index) {
  if (!lightboxImages.length) return;
  currentIndex = index;
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  if (lb && lbImg) {
    lbImg.src = lightboxImages[currentIndex].src;
    lb.style.display = "block";
    lb.setAttribute("aria-hidden", "false");
  }
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  if (lb) {
    lb.style.display = "none";
    lb.setAttribute("aria-hidden", "true");
  }
}

function changeImage(direction) {
  if (!lightboxImages.length) return;
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = lightboxImages.length - 1;
  if (currentIndex >= lightboxImages.length) currentIndex = 0;
  const lbImg = document.getElementById("lightbox-img");
  if (lbImg) lbImg.src = lightboxImages[currentIndex].src;
}
