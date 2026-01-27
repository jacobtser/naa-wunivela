# 🎨 Customization Guide - Nokware Integration

## How to Customize Your Integrated Features

---

## 1. 🛍️ Adding/Modifying Products

### Location
File: `js/main.js` (Lines 13-46)

### Current Product Structure
```javascript
const products = [
    {
        name: 'Classic Creamery Butter',
        description: 'Pure grass-fed butter with a smooth, rich taste',
        price: '$12.99',
        emoji: '🧈',
        features: ['100% Natural', 'Grass-Fed', 'No Additives']
    },
    // ... more products
];
```

### How to Add a New Product
```javascript
// Add this to the products array:
{
    name: 'Your Product Name',
    description: 'Your product description here',
    price: '$XX.XX',
    emoji: '🧈',  // or any other emoji
    features: ['Feature 1', 'Feature 2', 'Feature 3']
}
```

### How to Edit an Existing Product
```javascript
// Find the product in the array and modify:
{
    name: 'Updated Product Name',
    description: 'Updated description',
    price: '$18.99',  // Change price
    emoji: '✨',      // Change emoji
    features: ['New Feature 1', 'New Feature 2']  // Change features
}
```

### Product Fields Explained
- **name**: Product display name
- **description**: Short product description (1-2 sentences)
- **price**: Display price with currency
- **emoji**: Visual icon for the product
- **features**: Array of 3 benefit tags

### Example Products You Can Add
```javascript
// Plant-based variant
{
    name: 'Vegan Butter Alternative',
    description: 'Premium plant-based butter made from coconut oil',
    price: '$13.99',
    emoji: '🥥',
    features: ['Vegan', 'Plant-Based', 'Dairy-Free']
}

// Seasonal product
{
    name: 'Autumn Spiced Butter',
    description: 'Seasonal blend with cinnamon, nutmeg, and clove',
    price: '$15.99',
    emoji: '🍂',
    features: ['Seasonal', 'Spiced', 'Limited Edition']
}

// Bulk option
{
    name: 'Restaurant Grade - 5kg',
    description: 'Professional quality butter for chefs and restaurants',
    price: '$79.99',
    emoji: '👨‍🍳',
    features: ['Commercial Grade', 'Bulk Size', 'Professional Quality']
}
```

---

## 2. 🌱 Customizing Natural Ingredients Section

### Location
File: `index.html` (Lines 79-100)

### Current Structure
```html
<div class="ingredient-card fade-in-up">
    <div class="ingredient-icon">🌾</div>
    <h3>100% Natural</h3>
    <p>Pure, unprocessed ingredients from trusted sources...</p>
</div>
```

### How to Change an Ingredient Card
```html
<!-- Change the heading and description -->
<div class="ingredient-card fade-in-up">
    <div class="ingredient-icon">🌾</div>
    <h3>Your New Title</h3>
    <p>Your new description about this benefit...</p>
</div>
```

### How to Change the Emoji
```html
<!-- Replace emoji icon -->
<div class="ingredient-icon">🔥</div>  <!-- Was: 🌾 -->
```

### Example Customized Ingredients
```html
<!-- Option 1: Processing Method Focus -->
<div class="ingredient-card fade-in-up">
    <div class="ingredient-icon">⚙️</div>
    <h3>Traditional Churning</h3>
    <p>Handcrafted using time-honored churning methods that preserve nutrients and flavor.</p>
</div>

<!-- Option 2: Health Benefits Focus -->
<div class="ingredient-card fade-in-up">
    <div class="ingredient-icon">❤️</div>
    <h3>Heart Healthy</h3>
    <p>Rich in conjugated linoleic acid (CLA) and fat-soluble vitamins for wellness.</p>
</div>

<!-- Option 3: Local/Regional Focus -->
<div class="ingredient-card fade-in-up">
    <div class="ingredient-icon">🗺️</div>
    <h3>Locally Sourced</h3>
    <p>Supporting farmers within 100 miles of our creamery for freshness and community.</p>
</div>

<!-- Option 4: Heritage/Tradition Focus -->
<div class="ingredient-card fade-in-up">
    <div class="ingredient-icon">📚</div>
    <h3>Heritage Recipe</h3>
    <p>Passed down through generations, our recipe represents generations of expertise.</p>
</div>
```

---

## 3. 💎 Customizing Brand Values Section

### Location
File: `index.html` (Lines 114-155)

### Current Structure
```html
<div class="value-card fade-in-up">
    <a href="#" class="value-link">
        <div class="value-content">
            <div class="value-icon">🧈</div>
            <h3>Premium Quality</h3>
            <p>The finest butter crafted from the best natural sources</p>
        </div>
    </a>
</div>
```

### How to Add a Link to Values
```html
<!-- Change # to actual link -->
<a href="https://your-website.com/about-quality" class="value-link">
```

### How to Change a Value Card
```html
<div class="value-card fade-in-up">
    <a href="#" class="value-link">
        <div class="value-content">
            <div class="value-icon">🌍</div>      <!-- Change emoji -->
            <h3>Your Value Name</h3>              <!-- Change title -->
            <p>Your value description goes here</p> <!-- Change description -->
        </div>
    </a>
</div>
```

### Example Value Cards You Can Add
```html
<!-- Innovation Focus -->
<div class="value-card fade-in-up">
    <a href="#" class="value-link">
        <div class="value-content">
            <div class="value-icon">💡</div>
            <h3>Innovation</h3>
            <p>Continuously improving recipes and processes for better products</p>
        </div>
    </a>
</div>

<!-- Transparency Focus -->
<div class="value-card fade-in-up">
    <a href="#" class="value-link">
        <div class="value-content">
            <div class="value-icon">👁️</div>
            <h3>Transparency</h3>
            <p>Open about our sourcing, methods, and ingredient origins</p>
        </div>
    </a>
</div>

<!-- Customer Care Focus -->
<div class="value-card fade-in-up">
    <a href="#" class="value-link">
        <div class="value-content">
            <div class="value-icon">💝</div>
            <h3>Customer Care</h3>
            <p>Your satisfaction and experience is our highest priority</p>
        </div>
    </a>
</div>
```

---

## 4. 🎨 Customizing Colors

### Location
File: `css/styles.css` (Lines 1-12)

### Current Color Variables
```css
:root {
    --primary-color: #D4AF37;      /* Gold - Used for accents */
    --secondary-color: #2C1810;    /* Brown - Used for text */
    --accent-color: #F4E4C1;       /* Cream - Used for backgrounds */
    --text-dark: #1a1a1a;          /* Dark gray for text */
    --text-light: #f5f5f5;         /* Light gray for backgrounds */
    --border-color: #e0e0e0;       /* Light border color */
}
```

### How to Change Colors
```css
:root {
    --primary-color: #FFD700;      /* Change to bright gold */
    --secondary-color: #8B4513;    /* Change to saddle brown */
    --accent-color: #FFF8DC;       /* Change to cornsilk */
    /* ... rest of colors */
}
```

### Color Scheme Options

#### Option 1: Warmer Autumn Vibes
```css
--primary-color: #CD853F;     /* Peru */
--secondary-color: #654321;   /* Dark brown */
--accent-color: #FFE4B5;      /* Moccasin */
```

#### Option 2: Cool Modern Vibes
```css
--primary-color: #4A90E2;     /* Blue */
--secondary-color: #2C3E50;   /* Dark slate */
--accent-color: #ECF0F1;      /* Light gray */
```

#### Option 3: Green Eco-Friendly
```css
--primary-color: #27AE60;     /* Green */
--secondary-color: #1E5631;   /* Dark green */
--accent-color: #E8F8F5;      /* Mint */
```

#### Option 4: Purple Luxury
```css
--primary-color: #9B59B6;     /* Purple */
--secondary-color: #4A235A;   /* Dark purple */
--accent-color: #F4ECF7;      /* Light purple */
```

---

## 5. ✏️ Changing Product Button Behavior

### Location
File: `js/main.js` (Lines 152-154)

### Current Function
```javascript
function addToCart(productName) {
    alert(`Added "${productName}" to your cart! Coming soon: Full e-commerce functionality.`);
}
```

### Change Alert to Different Actions
```javascript
// Option 1: Redirect to checkout
function addToCart(productName) {
    window.location.href = 'https://your-shop.com/checkout?product=' + productName;
}

// Option 2: Open product details modal
function addToCart(productName) {
    alert(`View full details for ${productName} here!`);
    // Implement modal popup
}

// Option 3: Add quantity selector
function addToCart(productName) {
    const quantity = prompt(`How many units of "${productName}" would you like?`, '1');
    if (quantity) {
        console.log(`Added ${quantity}x ${productName} to cart`);
    }
}

// Option 4: Google Sheets integration
function addToCart(productName) {
    // Post to a form that saves to Google Sheets
    console.log(`${productName} logged for follow-up`);
}
```

---

## 6. 📱 Responsive Design Customization

### Location
File: `css/responsive.css`

### Mobile Product Grid
```css
/* Currently: Single column on mobile */
.products-grid {
    grid-template-columns: 1fr;
    gap: 20px;
}

/* To change to 2 columns on mobile: */
.products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}
```

### Mobile Spacing
```css
/* Current ingredient padding */
.ingredient-card {
    padding: 40px 30px;
}

/* For tighter mobile spacing: */
@media (max-width: 768px) {
    .ingredient-card {
        padding: 20px 15px;
    }
}
```

---

## 7. 🎬 Animation Customization

### Location
File: `css/animations.css`

### Slow Down Product Card Animation
```css
.product-card {
    animation: fadeInUp 0.8s ease-out;  /* Changed from 0.6s */
}
```

### Increase Hover Effect Distance
```css
.product-card:hover {
    transform: translateY(-12px);  /* Changed from -8px */
}
```

### Disable Animations for Performance
```css
.product-card,
.ingredient-card,
.value-card {
    animation: none;  /* Disable animations */
}
```

---

## 8. 🔤 Typography Customization

### Location
File: `css/styles.css`

### Change Product Title Size
```css
.product-info h3 {
    font-size: 1.6rem;  /* Changed from 1.4rem */
}
```

### Change Font Family
```css
/* Use different serif font */
.section-title h2 {
    font-family: 'Georgia', serif;  /* Changed from Playfair Display */
}
```

---

## 9. 📏 Sizing Customization

### Product Card Heights
```css
/* Make taller product cards */
.product-image {
    height: 220px;  /* Changed from 180px */
}
```

### Ingredient Card Padding
```css
/* Reduce padding for compact look */
.ingredient-card {
    padding: 30px 20px;  /* Changed from 40px 30px */
}
```

---

## 10. 🔗 Adding Links to Sections

### Update Navigation Links
```html
<!-- In navbar, change # to page anchors -->
<a href="#products" class="nav-link">Products</a>  <!-- Already done -->
```

### Make Value Cards Clickable
```html
<!-- Change href in value cards -->
<a href="/about-quality" class="value-link">
    <!-- This now links to your about page -->
</a>
```

---

## 💡 Pro Tips

1. **Test Changes Locally First**
   - Open `index.html` in browser
   - Right-click → Inspect to check CSS changes
   - Use browser DevTools to test responsive design

2. **Use CSS Grid Inspector**
   - In Chrome: DevTools → Elements → Grid overlay
   - Helps visualize card layouts

3. **Performance Tips**
   - Keep emoji icons (they're lighter than images)
   - Or optimize images with TinyPNG
   - Minify CSS/JS for production

4. **Backup Your Work**
   - Save original files before major changes
   - Use version control (Git)

5. **Test on Real Devices**
   - Test on actual phones/tablets
   - Check performance on slower connections

---

## Common Customization Scenarios

### Scenario 1: Add E-Commerce
```javascript
// Replace addToCart function with:
function addToCart(productName) {
    // Save to localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart!`);
}
```

### Scenario 2: Change Section Order
In `index.html`, move sections around:
```html
<!-- Move ingredients before products -->
<section id="ingredients"> ... </section>
<section id="products"> ... </section>
```

### Scenario 3: Hide a Section
In `css/styles.css`:
```css
.products {
    display: none;  /* Hide products section */
}
```

### Scenario 4: Add More Products
In `js/main.js`, add more items to products array:
```javascript
const products = [
    // ... existing products
    {
        name: 'New Product',
        // ... rest of fields
    }
];
```

---

## Need Help?

- Refer to `NOKWARE_INTEGRATION.md` for feature overview
- Check `WEBSITE_STRUCTURE.md` for navigation flow
- See `README.md` for general website info
- Review `INSTALLATION_GUIDE.md` for setup help

---

**Happy customizing! 🎨**

