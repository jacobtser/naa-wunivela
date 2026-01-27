# 🧈 Shear Butter - Premium Natural Butter Startup Website

A fully-featured, responsive, and secure website for Shear Butter startup built with vanilla HTML, CSS, and JavaScript.

## 📋 Features

### ✨ Frontend Features
- **Responsive Design** - Mobile-first approach, works perfectly on all devices
- **Beautiful UI** - Premium aesthetic with elegant typography and smooth animations
- **Navigation Tabs** - Professional tabbed navigation for different sections
- **Embedded Videos** - YouTube video integration for storytelling
- **Team Section** - Display experts and team members with detailed info
- **Mission & Vision** - Clear company purpose and goals
- **Testimonials** - Customer reviews with interactive slider
- **Contact Form** - Direct email integration using Formspree

### 🔒 Security Features
- **HTTPS Support** - Automatic redirect to HTTPS
- **XSS Protection** - Content Security Policy headers
- **Clickjacking Prevention** - X-Frame-Options headers
- **MIME Type Protection** - X-Content-Type-Options headers
- **Hotlink Protection** - Prevent unauthorized image usage
- **Bot/Scraper Blocking** - Block malicious bot access
- **Rate Limiting** - Prevent abuse and DDoS attacks

### 🎨 Design Features
- **Smooth Animations** - CSS3 animations that enhance UX
- **Beautiful Typography** - Playfair Display, Poppins, and Montserrat fonts
- **Color Scheme** - Gold (#D4AF37) and brown (#2C1810) premium colors
- **Responsive Breakpoints** - Optimized for all screen sizes
- **Modern Gradients** - Subtle gradient backgrounds

### 🛠️ Admin Panel
- **Dashboard** - Overview of all statistics
- **Video Management** - Upload and manage YouTube videos
- **Document Management** - Upload and organize documents
- **Team Messaging** - Send messages to team members
- **Settings Panel** - Configure Formspree and admin settings
- **Protected Access** - Password-protected admin area

## 📁 Project Structure

```
shear-butter-startup/
├── index.html                 # Main website
├── .htaccess                  # Apache security configuration
├── .gitignore                 # Git ignore rules
├── README.md                  # This file
│
├── css/
│   ├── styles.css            # Main styles
│   ├── responsive.css        # Responsive design rules
│   └── animations.css        # Animation definitions
│
├── js/
│   ├── main.js               # Core functionality
│   └── form.js               # Form handling and validation
│
├── admin/
│   ├── admin.html            # Admin dashboard
│   └── admin.js              # Admin functionality
│
├── backend/
│   └── config.php            # Backend configuration (optional)
│
└── assets/
    ├── images/               # Image storage
    ├── videos/               # Video files
    └── documents/            # Document files
```

## 🚀 Quick Start

### 1. Setup Instructions

#### Option A: Local Testing
1. Download all files
2. Open `index.html` in a modern web browser
3. For admin panel: Go to `admin/admin.html` and use password: `shear123`

#### Option B: Deploy on GitHub Pages
1. Create a new repository on GitHub
2. Push all files to the repository
3. Go to Settings → Pages
4. Select the branch and save
5. Your site will be live at `https://username.github.io/repository-name`

#### Option C: Deploy on Free Web Hosts
Recommended free hosts:
- **Netlify** (https://netlify.com) - Drag and drop deployment
- **Vercel** (https://vercel.com) - Git integration
- **GitHub Pages** (https://pages.github.com) - Free with GitHub
- **Infinity Free** (https://infinityfree.net) - Free hosting with domain

### 2. Configure Email Form

To enable the contact form:

1. Go to https://formspree.io
2. Sign up for a free account
3. Create a new form and get your Form ID
4. In `index.html`, update line with your form ID:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. Replace `YOUR_FORM_ID` with your actual Formspree ID

### 3. Admin Panel Setup

1. Access admin panel at `admin/admin.html`
2. Default password: `shear123` (CHANGE THIS!)
3. To change password:
   - Edit `admin/admin.js` line ~20
   - Change `if (password === 'shear123')` to your password
   - Minify the file before deployment

## 🔧 Customization

### Update Company Information

In `index.html`, update:
- Company name and logo
- Contact email and phone
- Physical address
- Social media links

### Modify Team Members

In `js/main.js`, update the `teamMembers` array:
```javascript
const teamMembers = [
    {
        name: 'Your Name',
        role: 'Your Role',
        bio: 'Your bio',
        emoji: '👨‍💼'
    },
    // Add more members...
];
```

### Add Testimonials

In `js/main.js`, update the `testimonials` array:
```javascript
const testimonials = [
    {
        text: 'Your testimonial text',
        author: 'Customer Name',
        rating: '★★★★★'
    },
    // Add more testimonials...
];
```

### Customize Colors

In `css/styles.css`, update the root variables:
```css
:root {
    --primary-color: #D4AF37;      /* Gold accent color */
    --secondary-color: #2C1810;    /* Brown text color */
    --accent-color: #F4E4C1;       /* Light cream color */
    /* ... more variables */
}
```

## 🔐 Security Recommendations

### Before Deployment

1. **Change Admin Password**
   - Edit `admin/admin.js`
   - Find line: `if (password === 'shear123')`
   - Change to a strong password

2. **Update Formspree Form ID**
   - Replace `YOUR_FORM_ID` in `index.html`
   - Get it from https://formspree.io

3. **Enable HTTPS**
   - Most hosting providers offer free SSL
   - The `.htaccess` file automatically redirects to HTTPS

4. **Minify Files (Optional)**
   - Minify `js/main.js` and `js/form.js` before production
   - Use online tools: https://www.minifier.org/

5. **Remove Console Logs**
   - Comment out or remove console.log statements in production

### Ongoing Security

- Keep the `.htaccess` file in place
- Regularly update Formspree settings
- Monitor inquiries for suspicious activity
- Keep backups of your data

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: 480px to 767px
- **Small Mobile**: Below 480px

## 🎯 Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Opera (Latest)

## 📊 Performance Tips

1. **Optimize Images**
   - Use WebP format where possible
   - Compress images: https://tinypng.com/

2. **Leverage Caching**
   - The `.htaccess` sets expiration headers
   - Images cached for 1 year
   - CSS/JS cached for 1 month

3. **Minify CSS/JS**
   - For production deployment
   - Reduces file size by 40-60%

4. **Use CDN**
   - For faster delivery globally
   - Fonts are already using Google CDN

## 🆘 Troubleshooting

### Contact Form Not Working
- Verify Formspree Form ID is correct
- Check that email is valid
- Allow Formspree emails through email filters

### Admin Panel Access Denied
- Clear browser cookies/localStorage
- Use correct password: `shear123`
- Try incognito/private browsing mode

### Videos Not Loading
- Check YouTube video URLs are correct
- Ensure URLs use `/embed/` format
- Verify YouTube video isn't restricted

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Verify all CSS files are loading
- Check browser developer console for errors

## 📚 Additional Resources

- [MDN Web Docs](https://developer.mozilla.org/) - Web technology reference
- [CSS Tricks](https://css-tricks.com/) - CSS tutorials and guides
- [JavaScript.info](https://javascript.info/) - JavaScript documentation
- [Formspree Docs](https://formspree.io/help/) - Email form help
- [GitHub Pages Guide](https://pages.github.com/) - Deployment guide

## 📝 License

This project is provided as-is for Shear Butter startup. Feel free to modify and deploy.

## 🤝 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review browser console for error messages
3. Verify all configuration steps were followed
4. Contact your hosting provider if infrastructure issues occur

## 👨‍💼 Attribution

**Created by the IT Department**

This website was developed with professional standards, security best practices, and modern web technologies. All code is optimized for performance, accessibility, and user experience.

---

**Version**: 1.0.0  
**Last Updated**: 2026  
**Status**: ✅ Production Ready
