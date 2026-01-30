// ==========================================
// NAA-WUNI VELA - ORDER SYSTEM
// ==========================================

"use strict";

// Product data for ordering
const ORDER_PRODUCTS = [
  {
    id: "shea-butter-250g",
    name: "Pure Shea Butter (250g)",
    description:
      "100% natural, unrefined shea butter straight from Ghana. Perfect for skin and hair care.",
    price: 250.0,
    image: "assets/images/shearr.jpg",
    features: ["Unrefined", "Grade A", "No Additives"],
    badge: "Best Seller",
    minQuantity: 1,
    maxQuantity: 99999,
  },
  {
    id: "shea-butter-500g",
    name: "Pure Shea Butter (500g)",
    description:
      "Premium grade shea butter in larger quantity. Excellent for body care and therapeutic use.",
    price: 20.0,
    image: "assets/images/shea.jpg",
    features: ["Unrefined", "Grade A", "No Additives"],
    badge: "Value Pack",
    minQuantity: 1,
    maxQuantity: 999999,
  },
  {
    id: "shea-soap",
    name: "Shea / Neem Soap",
    description:
      "Handmade shea soap with organic herbs and essential oils. Gentle and nourishing.",
    price: 20.0,
    image: "assets/images/soap.png",
    features: ["Organic Herbs", "Natural Fragrance", "Eco-friendly"],
    badge: "New",
    minQuantity: 1,
    maxQuantity: 999999,
  },
];

// Order state
let orderItems = [];
let orderTotal = 0;

// DOM Elements
const orderElements = {
  productsContainer: document.getElementById("orderProducts"),
  orderForm: document.getElementById("orderForm"),
  orderSummary: document.getElementById("orderSummary"),
  summaryItems: document.getElementById("summaryItems"),
  totalAmount: document.getElementById("totalAmount"),
  submitBtn: document.getElementById("submitOrderBtn"),
  successModal: document.getElementById("successModal"),
  orderId: document.getElementById("orderId"),
};

// Initialize order system
function initOrderSystem() {
  console.log("Initializing order system...");

  if (!orderElements.productsContainer) {
    console.error("Order products container not found");
    return;
  }

  loadProducts();
  setupFormValidation();
  updateOrderSummary();

  console.log("Order system initialized");
}

// Load and display products
function loadProducts() {
  orderElements.productsContainer.innerHTML = "";

  ORDER_PRODUCTS.forEach((product, index) => {
    const productCard = createProductCard(product, index);
    orderElements.productsContainer.appendChild(productCard);
  });
}

// Create product card
function createProductCard(product, index) {
  const card = document.createElement("div");
  card.className = "product-card animate-fade-in";
  card.style.animationDelay = `${index * 0.1}s`;

  card.innerHTML = `
    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='assets/images/placeholder.png';">
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-price">GHc ${product.price.toFixed(2)}</div>
      <div class="product-features">
        ${product.features.map((feature) => `<span class="feature-tag">${feature}</span>`).join("")}
      </div>
      <div class="quantity-controls">
        <button type="button" class="quantity-btn" onclick="updateQuantity('${product.id}', -1)">-</button>
        <input type="number" class="quantity-input" id="qty-${product.id}" value="0" min="${product.minQuantity}" max="${product.maxQuantity}" readonly>
        <button type="button" class="quantity-btn" onclick="updateQuantity('${product.id}', 1)">+</button>
      </div>
    </div>
  `;

  return card;
}

// Update product quantity
function updateQuantity(productId, change) {
  const quantityInput = document.getElementById(`qty-${productId}`);
  if (!quantityInput) return;

  const product = ORDER_PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  let currentQty = parseInt(quantityInput.value) || 0;
  let newQty = currentQty + change;

  // Enforce min/max limits
  newQty = Math.max(
    product.minQuantity - 1,
    Math.min(product.maxQuantity, newQty),
  );

  quantityInput.value = newQty;

  // Update order items
  updateOrderItem(productId, newQty);
  updateOrderSummary();
}

// Update order item
function updateOrderItem(productId, quantity) {
  const product = ORDER_PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  // Remove item if quantity is 0
  if (quantity <= 0) {
    orderItems = orderItems.filter((item) => item.product.id !== productId);
    return;
  }

  // Update or add item
  const existingItem = orderItems.find((item) => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity = quantity;
    existingItem.subtotal = quantity * product.price;
  } else {
    orderItems.push({
      product: product,
      quantity: quantity,
      subtotal: quantity * product.price,
    });
  }
}

// Update order summary display
function updateOrderSummary() {
  orderElements.summaryItems.innerHTML = "";

  if (orderItems.length === 0) {
    orderElements.summaryItems.innerHTML =
      '<p class="empty-cart">No items selected</p>';
    orderElements.totalAmount.textContent = "GHc 0.00";
    orderElements.submitBtn.disabled = true;
    return;
  }

  orderTotal = 0;

  orderItems.forEach((item) => {
    const summaryItem = document.createElement("div");
    summaryItem.className = "summary-item";
    summaryItem.innerHTML = `
      <span>${item.product.name} (x${item.quantity})</span>
      <span>GHc ${item.subtotal.toFixed(2)}</span>
    `;
    orderElements.summaryItems.appendChild(summaryItem);
    orderTotal += item.subtotal;
  });

  orderElements.totalAmount.textContent = `GHc ${orderTotal.toFixed(2)}`;
  orderElements.submitBtn.disabled = false;
}

// Setup form validation and submission
function setupFormValidation() {
  if (!orderElements.orderForm) return;

  orderElements.orderForm.addEventListener("submit", handleOrderSubmission);

  // Real-time validation
  const inputs = orderElements.orderForm.querySelectorAll(
    "input, textarea, select",
  );
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearFieldError(input));
  });
}

// Validate individual field
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  switch (field.name) {
    case "customerName":
      if (!value) {
        errorMessage = "Full name is required";
        isValid = false;
      } else if (value.length < 2) {
        errorMessage = "Name must be at least 2 characters";
        isValid = false;
      }
      break;

    case "customerEmail":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        errorMessage = "Email address is required";
        isValid = false;
      } else if (!emailRegex.test(value)) {
        errorMessage = "Please enter a valid email address";
        isValid = false;
      }
      break;

    case "customerPhone":
      // Remove spaces, dashes, and parentheses for validation
      const cleanPhone = value.replace(/[\s\-()]/g, "");
      // Accept various formats: +233..., 0..., or even 233...
      const phoneRegex = /^(\+?233|\+?1|0)[0-9]{7,15}$/;
      if (!value) {
        errorMessage = "Phone number is required";
        isValid = false;
      } else if (cleanPhone.length < 9) {
        errorMessage = "Phone number must be at least 9 digits";
        isValid = false;
      } else if (!phoneRegex.test(cleanPhone)) {
        errorMessage =
          "Please enter a valid phone number (e.g., +233XXXXXXXXX or 0XXXXXXXXX)";
        isValid = false;
      }
      break;

    case "customerLocation":
      if (!value) {
        errorMessage = "Delivery address is required";
        isValid = false;
      } else if (value.length < 10) {
        errorMessage = "Please provide a detailed delivery address";
        isValid = false;
      }
      break;
  }

  if (!isValid) {
    showFieldError(field, errorMessage);
  } else {
    clearFieldError(field);
  }

  return isValid;
}

// Show field error
function showFieldError(field, message) {
  clearFieldError(field);

  field.classList.add("error");
  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
  field.classList.remove("error");
  const existingError = field.parentNode.querySelector(".field-error");
  if (existingError) {
    existingError.remove();
  }
}

// Handle order submission
async function handleOrderSubmission(e) {
  e.preventDefault();

  // Validate all fields
  const inputs = orderElements.orderForm.querySelectorAll(
    "input[required], textarea[required]",
  );
  let isFormValid = true;

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  // Check if items are selected
  if (orderItems.length === 0) {
    alert("Please select at least one product to order.");
    return;
  }

  if (!isFormValid) {
    alert("Please correct the errors in the form before submitting.");
    return;
  }

  // Disable submit button
  orderElements.submitBtn.disabled = true;
  orderElements.submitBtn.textContent = "Processing...";

  try {
    // Prepare order data
    const orderData = {
      customerName: document.getElementById("customerName").value.trim(),
      customerEmail: document.getElementById("customerEmail").value.trim(),
      customerPhone: document.getElementById("customerPhone").value.trim(),
      customerLocation: document
        .getElementById("customerLocation")
        .value.trim(),
      specialInstructions: document
        .getElementById("specialInstructions")
        .value.trim(),
      items: orderItems,
      total: orderTotal,
    };

    // Send order to backend (serverless endpoint)
    // API_BASE is set by hosting environment (Netlify, Vercel, or .env)
    const apiBase = window.API_BASE || "/.netlify/functions";
    const response = await fetch(`${apiBase}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (result.success) {
      // Show success modal
      orderElements.orderId.textContent = result.orderId;
      orderElements.successModal.style.display = "flex";

      // Reset form
      orderElements.orderForm.reset();
      orderItems = [];
      updateOrderSummary();

      // Reset quantities
      ORDER_PRODUCTS.forEach((product) => {
        const qtyInput = document.getElementById(`qty-${product.id}`);
        if (qtyInput) qtyInput.value = "0";
      });
    } else {
      throw new Error(result.message || "Failed to place order");
    }
  } catch (error) {
    console.error("Order submission error:", error);
    alert("Failed to place order. Please try again or contact us directly.");
  } finally {
    // Re-enable submit button
    orderElements.submitBtn.disabled = false;
    orderElements.submitBtn.textContent = "Place Order";
  }
}

// Close success modal
function closeModal() {
  orderElements.successModal.style.display = "none";
  // Redirect to home page after a short delay
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
}

// Global exports
window.updateQuantity = updateQuantity;
window.closeModal = closeModal;

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initOrderSystem);
} else {
  initOrderSystem();
}

// Add some CSS for error states
const style = document.createElement("style");
style.textContent = `
  .field-error {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }

  .error {
    border-color: #e74c3c !important;
  }

  .empty-cart {
    text-align: center;
    color: #666;
    font-style: italic;
    padding: 1rem;
  }

  .product-card {
    transition: transform 0.3s ease;
  }

  .product-card:hover {
    transform: translateY(-2px);
  }
`;
document.head.appendChild(style);
