# Carousel Quick Reference Guide

## What You Now Have

Your website includes a **beautiful sliding picture carousel** (just like Nokware's) that automatically shows different butter products every 7 seconds. Customers can also manually control it with arrow buttons or click dots to jump to a specific product.

---

## How It Works

### Automatic Rotation
```
Load Page → Product 1 (7 sec) → Product 2 (7 sec) → Product 3 (7 sec) → ... → Back to Product 1
```

### User Interaction
```
User clicks ARROW or DOT → Autoplay Timer Resets → Continues 7-second rotation
```

---

## Carousel Components

### 1. Carousel Container
- **Location**: Between navigation and ingredients section
- **Size**: Full width with padding
- **Background**: Cream gradient for premium feel

### 2. Carousel Slides
Each slide shows:
- 🧈 Product Emoji/Image (large, left side on desktop)
- **Product Name** (Playfair Display font)
- **Product Description** (Story-driven text)
- **Price** (Gold color, prominent)
- **Features** (Tag-style tags)
- **Learn More Button** (Gold background)

### 3. Navigation Controls
- **Previous Button (❮)**: Left side, circular, white with gold border
- **Next Button (❯)**: Right side, circular, white with gold border
- **Hover Effect**: Turns gold background on hover

### 4. Pagination Dots
- **Location**: Below carousel
- **Inactive**: Gray circle
- **Active**: Gold elongated bar
- **Click**: Jump to that product

---

## Current Products in Carousel

| # | Product | Price | Features |
|---|---------|-------|----------|
| 1 | Classic Creamery Butter | $12.99 | 100% Natural, Grass-Fed, No Additives |
| 2 | Herb Infused Butter | $14.99 | Organic Herbs, Premium Grade, Artisan Made |
| 3 | Luxury Gold Butter | $16.99 | Luxury Grade, Hand-Crafted, Small Batch |
| 4 | Salted Sea Butter | $13.99 | Sea Salt, Gourmet, Craft Made |
| 5 | Cultured Artisan Butter | $15.99 | Cultured, Artisan, Traditional Method |
| 6 | Organic Superfood Butter | $17.99 | Organic, Superfood, Limited Edition |

---

## How to Customize

### 1. Change Product Information

**File**: `js/main.js` (around line 8)

```javascript
const products = [
    {
        name: 'Your Product Name',
        description: 'Your product description with storytelling',
        price: '$XX.XX',
        emoji: '🧈', // or any emoji
        features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    // ... more products
];
```

### 2. Change Autoplay Speed

**File**: `js/main.js` (find `startCarouselAutoplay()`)

Change `7000` to desired milliseconds:
```javascript
}, 5000); // 5 seconds
}, 7000); // 7 seconds
}, 10000); // 10 seconds
```

### 3. Replace Emoji with Images

**File**: `js/main.js` - Modify products to include images:

```javascript
const products = [
    {
        name: 'Product Name',
        description: 'Description',
        price: '$12.99',
        image: 'images/product1.jpg', // Add this
        emoji: '🧈' // or remove this
        features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    // ...
];
```

Then update the carousel template in `initializeProductsCarousel()` function:

**Change this:**
```html
<div class="carousel-slide-image">${product.emoji}</div>
```

**To this:**
```html
<div class="carousel-slide-image">
    <img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;">
</div>
```

### 4. Change Colors

**File**: `css/styles.css` (top section)

```css
:root {
    --primary-color: #D4AF37;        /* Gold - Change to your color */
    --secondary-color: #2C1810;      /* Brown - Change to your color */
    --accent-color: #F4E4C1;         /* Cream - Change to your color */
}
```

### 5. Adjust Carousel Height

**File**: `css/styles.css`

Find `.products-carousel` and change height:
```css
.products-carousel {
    height: 500px; /* Change to desired height */
}
```

### 6. Modify Text Sizes

**File**: `css/styles.css`

```css
.carousel-slide-info h2 {
    font-size: 2.5rem; /* Product name size */
}

.carousel-slide-info p.description {
    font-size: 1.1rem; /* Description size */
}
```

### 7. Add or Remove Products

**File**: `js/main.js`

Simply add or remove items from the `products` array. The carousel will automatically adjust to any number of products.

**Add new product:**
```javascript
{
    name: 'New Product',
    description: 'Product description',
    price: '$XX.XX',
    emoji: '🆕',
    features: ['Feature 1', 'Feature 2', 'Feature 3']
}
```

**Result**: 
- New slide automatically added
- New pagination dot automatically created
- Autoplay includes all products

---

## Responsive Behavior

### Desktop (1024px+)
- Carousel height: 500px
- Image on left (40%), info on right (60%)
- Side-by-side layout

### Tablet (768px - 1024px)
- Carousel height: 450px
- Stacked layout (image top, info bottom)
- Adjusted spacing

### Mobile (480px - 768px)
- Carousel height: 400px
- Full width, smaller fonts
- Touch-friendly controls (45px)

### Small Mobile (320px - 480px)
- Carousel height: 300px
- Minimal padding
- Optimized for small screens
- Stacked content

---

## Troubleshooting

### Carousel Not Showing
- Check browser console for errors (F12)
- Verify `id="productsCarousel"` exists in HTML
- Ensure `initializeProductsCarousel()` is called on page load

### Autoplay Not Working
- Check if JavaScript is enabled in browser
- Verify `setInterval` is working (check console)
- Make sure no console errors are present

### Images Not Displaying
- Verify image paths are correct and relative to HTML
- Check image file exists and is readable
- Ensure image format is supported (jpg, png, webp)

### Mobile Layout Broken
- Check responsive CSS media queries in `responsive.css`
- Verify viewport meta tag is in HTML head
- Test on actual mobile device

### Button Controls Not Responding
- Check click event listeners in `main.js`
- Verify button IDs match: `carouselPrev`, `carouselNext`
- Look for JavaScript errors in console

---

## Performance Tips

1. **Use Optimized Images**
   - Compress product images
   - Use WebP format for faster loading
   - Keep image files under 200KB each

2. **Enable Browser Caching**
   - Set proper cache headers on server
   - Reduces repeat visits loading time

3. **Lazy Load Images**
   - Don't load all product images at once
   - Load on-demand as carousel rotates

4. **Minimize CSS/JS**
   - Minify `styles.css` and `main.js` in production
   - Reduces file size and load time

---

## Advanced Customization

### Add Keyboard Navigation
```javascript
// Add to initializeProductsCarousel()
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        currentCarouselSlide = (currentCarouselSlide - 1 + products.length) % products.length;
        updateCarousel();
    }
    if (e.key === 'ArrowRight') {
        currentCarouselSlide = (currentCarouselSlide + 1) % products.length;
        updateCarousel();
    }
});
```

### Add Touch Swipe Support
```javascript
// Add touch event listeners
let touchStartX = 0;
const carousel = document.getElementById('productsCarousel');

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX > touchEndX + 50) {
        // Swiped left - next product
        currentCarouselSlide = (currentCarouselSlide + 1) % products.length;
    } else if (touchStartX < touchEndX - 50) {
        // Swiped right - previous product
        currentCarouselSlide = (currentCarouselSlide - 1 + products.length) % products.length;
    }
    updateCarousel();
    resetCarouselAutoplay();
});
```

### Change Transition Effect
Instead of fade, try slide:

**In CSS**: Change `.carousel-slide` transition:
```css
/* Fade (current) */
transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);

/* Slide from right */
transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
```

Then adjust position in `updateCarousel()` JS function.

---

## Testing Your Carousel

### Manual Testing
- [ ] Page loads without errors
- [ ] Carousel appears between nav and ingredients
- [ ] All 6 products visible
- [ ] Auto-play rotates every 7 seconds
- [ ] Previous button works
- [ ] Next button works
- [ ] Pagination dots work
- [ ] Clicking dots jumps to product
- [ ] Mobile layout looks good
- [ ] Tablet layout looks good
- [ ] Desktop layout looks good

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## File Reference

| File | Changes | Lines |
|------|---------|-------|
| `index.html` | Added carousel HTML structure | 15 |
| `css/styles.css` | Added carousel styles | 200+ |
| `css/responsive.css` | Added responsive styles | 150+ |
| `js/main.js` | Added carousel JavaScript | 100+ |

---

## Support & Documentation

- **CAROUSEL_IMPLEMENTATION.md** - Full technical documentation
- **Nokware website** - Reference design inspiration
- **Browser DevTools** (F12) - Debug issues

---

**Your carousel is production-ready!** 🎉

For questions or advanced customization, refer to the code comments in the modified files.
