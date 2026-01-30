# Ordering System - Quick Start

## 🚀 Get Started in 60 Seconds

### 1. Access the Order Page

- **URL**: `order.html`
- Displays 3 sample products (Shea Butter 250g, 500g, Soap)
- Each with price, description, and features

### 2. Place an Order

1. Click the **+** button to add quantity to a product
2. View the **Order Summary** on the right side (updates automatically)
3. Fill in your details:
   - Full Name (required)
   - Email (required, valid format)
   - Phone (required, any format with 7-15 digits)
   - Delivery Address (required, at least 10 characters)
   - Special Instructions (optional)
4. Click **"Place Order"** button
5. See **Success Modal** with your Order ID

### 3. Admin View

- **URL**: `admin/orders.html`
- **Username/Password**: Built-in (just click admin button)
- **Default Password**: admin2026
- View all orders in a table
- Click buttons to:
  - **View**: See full order details
  - **Process**: Change status to processing
  - **Delete**: Remove order

---

## 📦 Where Orders Are Stored

### Option 1: File Storage (Default - No Setup Required)

- **Location**: `backup_orders/` folder
- **Format**: JSON files named like `NV-20260130-A1B2C3.json`
- **Auto-created**: System creates this automatically
- **Perfect for**: Testing, small businesses, no database

### Option 2: Database Storage (MySQL)

- **Setup**: Update `backend/config.php` with your DB credentials
- **Database**: `shear_butter`
- **Table**: `orders` (auto-created)
- **Perfect for**: Production, large scale, complex queries

---

## ✨ Key Features

✅ **Real-time Order Summary** - See total & items as you add products

✅ **Form Validation** - Helpful error messages for invalid entries

✅ **Flexible Phone Input** - Accepts multiple formats (233..., 0..., +233...)

✅ **Automatic Storage** - Works with or without database

✅ **Admin Dashboard** - View, filter, and manage all orders

✅ **Order Confirmation** - Instant feedback with Order ID

✅ **Mobile Responsive** - Works on phones, tablets, desktops

---

## 🧪 Test Scenarios

### Test 1: Quick Order

1. Add 1x Shea Butter (250g)
2. Fill form with any valid data
3. Submit
4. Should see success with Order ID

### Test 2: Multiple Products

1. Add 2x Shea Butter (250g)
2. Add 1x Shea Butter (500g)
3. Add 3x Soap
4. Check summary shows: 3 items total
5. Submit order

### Test 3: Form Validation

- **Try with empty name**: Should show "Full name is required"
- **Try with invalid email**: Should show email error
- **Try with short address**: Should show "at least 10 characters" error
- **Try with no phone**: Should show phone required

### Test 4: Admin Panel

1. Go to admin/orders.html
2. Enter password: admin2026
3. Should see all orders in table
4. Click "View" on any order
5. Click "Process" to change status
6. Click "Delete" to remove

---

## 🔧 Common Issues & Fixes

| Issue                            | Fix                                         |
| -------------------------------- | ------------------------------------------- |
| Orders not showing in admin      | Clear browser cache, refresh page           |
| Phone validation failing         | Use format like 0541234567 or +233541234567 |
| Form fields not focused properly | Make sure order.js is loaded                |
| Admin password not working       | Default is `admin2026`                      |
| No success message               | Check browser console (F12) for errors      |

---

## 📱 Product List (Pre-configured)

### 1. Pure Shea Butter (250g)

- **Price**: GHc 250.00
- **Features**: Unrefined, Grade A, No Additives

### 2. Pure Shea Butter (500g)

- **Price**: GHc 20.00
- **Features**: Unrefined, Grade A, No Additives

### 3. Shea/Neem Soap

- **Price**: GHc 20.00
- **Features**: Organic Herbs, Natural Fragrance, Eco-friendly

**To add more products**: Edit `js/order.js` in the `ORDER_PRODUCTS` array

---

## 📊 Order Status Flow

```
Customer Submits
       ↓
PENDING (Initial Status) ← Default
       ↓
PROCESSING (Admin clicks "Process") ← Manual action required
       ↓
COMPLETED (Manually set in admin panel)
       ↓
Order Archive
```

---

## 🔐 Security

- ✅ All input is sanitized server-side
- ✅ Email validation ensures valid addresses
- ✅ Phone number flexible but validated
- ✅ CORS headers configured for safety
- ✅ Orders stored securely (database or files)

---

## 📝 Files Overview

| File                     | Purpose                    |
| ------------------------ | -------------------------- |
| `order.html`             | Customer order page        |
| `js/order.js`            | Order system logic         |
| `backend/order.php`      | Process & save orders      |
| `backend/get_orders.php` | Retrieve orders for admin  |
| `admin/orders.html`      | Admin management interface |
| `backup_orders/`         | Order file storage         |

---

## 🎯 Next Steps

1. **Test the order page**: `order.html`
2. **View admin panel**: `admin/orders.html`
3. **Edit products**: `js/order.js`
4. **Custom styling**: `css/styles.css`
5. **Production**: Update DB config in `backend/config.php`

---

**Status**: ✅ Complete & Ready for Use
**Last Updated**: January 2026
**Questions?** Check `ORDERING_SYSTEM_GUIDE.md` for detailed documentation
