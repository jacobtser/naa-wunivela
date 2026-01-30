# Ordering System - Complete Setup Guide

## Overview

The Naa-Wuni Vela ordering system is fully implemented with:

- ✅ Frontend order form (order.html)
- ✅ Product selection with quantity management
- ✅ Complete form validation
- ✅ Backend order processing (backend/order.php)
- ✅ Database storage with fallback file backup
- ✅ Admin order management interface
- ✅ Email notifications (when available)

## System Components

### 1. Frontend (order.html)

- **Location**: `order.html`
- **Features**:
  - Product listing with images and descriptions
  - Quantity controls for each product
  - Real-time order summary
  - Form validation with helpful error messages
  - Success modal with order confirmation

### 2. Product Management (order.js)

- **Location**: `js/order.js`
- **Features**:
  - Dynamic product loading
  - Quantity management with min/max limits
  - Order summary calculations
  - Form validation for:
    - Full Name (required, min 2 chars)
    - Email (valid email format)
    - Phone (flexible format acceptance)
    - Delivery Address (required, min 10 chars)
  - AJAX order submission

### 3. Backend Processing (backend/order.php)

- **Location**: `backend/order.php`
- **Features**:
  - POST request handling
  - Input sanitization and validation
  - Database storage (with fallback to file system)
  - Order ID generation (format: NV-YYYYMMDD-XXXXXX)
  - Admin email notifications
  - CORS support for cross-domain requests

### 4. Database Configuration (backend/config.php)

- **Location**: `backend/config.php`
- **Default Settings**:
  - Host: localhost
  - User: root
  - Password: (empty)
  - Database: shear_butter
- **Note**: Update these credentials for production environments

### 5. Order Retrieval (backend/get_orders.php)

- **Location**: `backend/get_orders.php`
- **Features**:
  - Retrieves orders from database
  - Falls back to backup files if database unavailable
  - Admin-only access (optional key-based authentication)

### 6. Admin Orders Interface (admin/orders.html)

- **Location**: `admin/orders.html`
- **Features**:
  - Admin authentication (default password: admin2026)
  - View all orders with details
  - Filter orders by status (Pending, Processing, Completed)
  - Update order status
  - Delete orders
  - View order details and items
  - Statistics dashboard (total, pending, processing, completed)

## Setup Instructions

### Basic Setup (No Database)

If you don't have a MySQL database:

1. Simply place the files in your web directory
2. The system will automatically save orders to `backup_orders/` folder
3. Orders will be stored as JSON files

### Setup With Database

If you want to use MySQL:

1. Create a database named `shear_butter`
2. Update `backend/config.php` with your credentials:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'your_user');
   define('DB_PASS', 'your_password');
   define('DB_NAME', 'shear_butter');
   ```
3. The `order.php` script will automatically create the `orders` table

### Server Requirements

- PHP 7.4+
- MySQL 5.7+ (optional, system works without it)
- Write permissions for `backup_orders/` folder

## Usage

### For Customers

1. Navigate to `order.html`
2. Browse products and select quantities
3. Fill in personal and delivery information
4. Submit the order
5. Receive confirmation with order ID

### For Admins

1. Navigate to `admin/orders.html`
2. Enter admin password (default: admin2026)
3. View all orders in a table format
4. Filter by status
5. Click "View" to see order details
6. Click "Process" to update order status
7. Click "Delete" to remove orders

## Product Configuration

Products are defined in `js/order.js`:

```javascript
const ORDER_PRODUCTS = [
  {
    id: "shea-butter-250g",
    name: "Pure Shea Butter (250g)",
    description: "100% natural, unrefined shea butter...",
    price: 250.0,
    image: "assets/images/shea.jpg",
    features: ["Unrefined", "Grade A", "No Additives"],
    badge: "Best Seller",
    minQuantity: 1,
    maxQuantity: 99999,
  },
  // ... more products
];
```

To add a new product, add an object to this array.

## Form Validation Rules

| Field                | Rules                                   |
| -------------------- | --------------------------------------- |
| Full Name            | Required, minimum 2 characters          |
| Email                | Required, must be valid email format    |
| Phone                | Required, flexible format (7-15 digits) |
| Delivery Address     | Required, minimum 10 characters         |
| Special Instructions | Optional                                |

## Order Processing Flow

```
Customer fills form
        ↓
Frontend validation
        ↓
AJAX request to backend/order.php
        ↓
Backend validation
        ↓
Database storage (or file backup)
        ↓
Order ID generated
        ↓
Success response sent to frontend
        ↓
Success modal displays order ID
        ↓
Form resets, customer redirected to home
```

## Database Schema

The system automatically creates an `orders` table with:

- order_id (unique)
- customer_name
- customer_email
- customer_phone
- customer_location
- special_instructions
- items (JSON)
- total_amount
- order_date
- status (pending, processing, completed, cancelled)
- ip_address
- created_at
- updated_at

## File Structure

```
/
├── order.html                 # Order page
├── backend/
│   ├── order.php             # Order processing
│   ├── get_orders.php        # Retrieve orders
│   └── config.php            # Configuration
├── admin/
│   ├── orders.html           # Admin orders interface
│   └── admin.js              # Admin functions
├── js/
│   ├── order.js              # Order system JS
│   └── main.js               # Main JS
├── css/
│   └── styles.css            # Styling
└── backup_orders/            # Auto-created for file storage
    └── NV-*.json             # Order files (auto-created)
```

## Troubleshooting

### Orders Not Saving

- Check if `backup_orders/` folder exists and is writable
- Check backend error logs at `backend/error.log`
- Verify database credentials if using MySQL

### "Order placed successfully" but can't find it

- Orders are saved to `backup_orders/*.json` files
- Admin can view them at `/admin/orders.html`
- Check browser console for error messages

### Database Connection Error

- System automatically falls back to file storage
- No action needed - orders will be saved as JSON files
- You can migrate to database later

### Form Validation Issues

- Phone numbers: Should be 7-15 digits
- Email: Must be valid format (e.g., user@example.com)
- Address: Must be at least 10 characters

## Security Notes

1. **Authentication**: Admin panel uses localStorage (set password in admin.js)
2. **CSRF Protection**: Implement token validation for production
3. **Input Sanitization**: Backend sanitizes all inputs
4. **File Permissions**: Place `backup_orders/` outside web root for production
5. **Database**: Use strong credentials for production

## Future Enhancements

- [ ] Payment gateway integration
- [ ] Email confirmation with order details
- [ ] SMS notifications
- [ ] Order tracking system
- [ ] Customer account system
- [ ] Inventory management
- [ ] Advanced analytics dashboard
- [ ] Multiple language support

## Support

For issues or questions:

1. Check error logs at `backend/error.log`
2. Check browser console for JavaScript errors
3. Verify all files are in correct locations
4. Test with sample data

---

**Last Updated**: January 2026
**Version**: 1.0
**Status**: Production Ready
