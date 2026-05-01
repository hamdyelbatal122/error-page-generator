# Quick Start Guide

Get started with Error Page Generator in just **2 minutes**!

## 🚀 Installation

### Option 1: Direct File Access (Fastest)

```bash
# Step 1: Open index.html in your browser
open index.html

# That's it! The app is ready to use.
```

### Option 2: Local Server (Recommended)

```bash
# Using Python 3 (built-in on most systems)
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server -p 8000

# Then visit: http://localhost:8000
```

### Option 3: Deploy Online

#### GitHub Pages (Free & Easiest)

```bash
# 1. Create GitHub account (if needed)
# 2. Create new repository named: error-page-generator
# 3. Upload project files
# 4. Settings → Pages → Enable GitHub Pages
# 5. Your site is live at: https://yourusername.github.io/error-page-generator

# Via Git CLI:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/error-page-generator.git
git push -u origin main
```

#### Netlify (Free with continuous deployment)

```bash
# 1. Go to https://netlify.com
# 2. Sign up with GitHub
# 3. Click "New site from Git"
# 4. Select your repository
# 5. Deploy! (automatic updates from Git)

# Live at: https://your-project-name.netlify.app
```

#### Vercel (Fastest deployment)

```bash
# 1. Install Vercel CLI: npm i -g vercel
# 2. Run: vercel
# 3. Answer deployment questions
# 4. Done! Live at: https://your-project-name.vercel.app
```

---

## 📖 5-Minute Tutorial

### Step 1: Choose Error Type
1. Open the app in your browser
2. Select error code from dropdown (e.g., "404 - Not Found")

### Step 2: Pick a Template
1. Choose from 4 design templates:
   - **Tree** - Minimalist, clean (recommended)
   - **Robot** - Friendly, fun
   - **Galaxy** - Modern, creative
   - **Text** - Typography focused

### Step 3: Customize Content
```
Error Title:      "Page Not Found" → Your custom text
Error Message:    Description → Your custom message
Button Text:      "Go Home" → Any action text
Button Link:      URL → Where button points to
```

### Step 4: Color Your Brand
1. **Background Color** - Main page background
2. **Text Color** - Body text color
3. **Accent Color** - For error code and buttons

Use the color pickers to match your brand!

### Step 5: Preview & Export
1. Check "Preview" tab for real-time visualization
2. Try different viewports (Desktop, Tablet, Mobile)
3. Go to "Code" tab to:
   - Copy HTML/CSS
   - Download complete file
   - View different format options

---

## 💻 Usage Examples

### Example 1: Website 404 Page

```
1. Error Code: 404 - Not Found
2. Template: Tree
3. Title: "Oops! Page Not Found"
4. Message: "The page you're looking for doesn't exist."
5. Button: "Back to Home" → https://example.com
6. Colors: Match your website branding
7. Download & integrate into your site!
```

### Example 2: Maintenance Page

```
1. Error Code: 503 - Service Unavailable
2. Template: Robot
3. Title: "We're Under Maintenance"
4. Message: "We're improving our service. Back soon!"
5. Button: "Check Status" → https://status.example.com
6. Colors: Warning yellow/orange theme
7. Deploy to show during maintenance!
```

### Example 3: Custom Brand Page

```
1. Error Code: 500 - Server Error
2. Template: Galaxy
3. Title: "Something Went Wrong"
4. Message: "Our team is fixing this. Please try again later."
5. Button: "Contact Support" → https://support.example.com
6. Colors: Your company brand colors
7. Download & customize with logo!
```

---

## 🎯 All Features at a Glance

### Configuration Panel (Left)
```
✓ Error Code Selection     (6 types)
✓ Template Selection        (4 designs)
✓ Content Editing          (Title, Message, Button)
✓ URL Configuration        (Button link)
✓ Color Customization      (3 color pickers)
✓ Layout Toggle            (Navbar, Footer)
✓ Reset Button             (Restore defaults)
```

### Preview Section (Right)
```
Preview Tab:
✓ Live rendering
✓ Viewport selector (Desktop/Tablet/Mobile)
✓ Full-screen option
✓ Real-time updates

Code Tab:
✓ Multiple formats (HTML/CSS/Full)
✓ Copy to clipboard
✓ Download as file
✓ Syntax display
```

### Dark Mode
```
✓ Toggle in header (moon icon)
✓ Auto-saves preference
✓ Applied to interface
✓ Doesn't affect generated pages
```

---

## 📋 Config Storage

All your settings auto-save to browser storage:

```javascript
{
  errorPageConfig: { ... },
  darkMode: true/false
}
```

**Never manually edit** — the app manages this automatically.

### Clear Storage (Reset Everything)
```javascript
// Open browser console (F12)
localStorage.clear();
location.reload();
```

---

## 🔗 Integration Examples

### Add to Your Website

#### Static HTML Site
```html
<!-- In your web server directory -->
<a href="/error-pages/404.html">404 Page</a>
```

#### Apache Server (.htaccess)
```apache
ErrorDocument 404 /error-pages/error-404.html
ErrorDocument 500 /error-pages/error-500.html
```

#### Nginx Server
```nginx
error_page 404 /error-pages/error-404.html;
error_page 500 /error-pages/error-500.html;
```

#### Express.js (Node.js)
```javascript
app.use((req, res) => {
  res.status(404).sendFile('error-pages/error-404.html');
});
```

---

## 🎯 Pro Tips

### Tip 1: Brand Consistency
Use the same colors across all error pages for brand identity.

### Tip 2: Clear Messaging
Write simple, friendly error messages. Avoid technical jargon.

### Tip 3: Helpful Links
Always provide a button to navigate back to your main site.

### Tip 4: Mobile Testing
Test on real mobile devices using "Mobile" viewport option.

### Tip 5: Save Your Work
Take screenshots or note your color codes for future reference.

### Tip 6: Customize Further
Download the generated HTML and edit the CSS for advanced customization.

---

## ❓ Troubleshooting

### Issue: App not loading
**Solution:** 
- Hard refresh browser (Ctrl+F5 / Cmd+Shift+R)
- Clear browser cache
- Try different browser

### Issue: Changes not saving
**Solution:**
- Check LocalStorage is enabled
- Close private/incognito window
- Browser storage might be full

### Issue: Preview not updating
**Solution:**
- Click "Reset to Defaults" button
- Refresh the page
- Try different browser

### Issue: Download not working
**Solution:**
- Check browser download settings
- Try "Copy Code" instead
- Use different browser

### Issue: Dark mode not applying
**Solution:**
- Click theme toggle again
- Clear browser cache
- Check browser supports CSS custom properties

---

## 📚 Next Steps

1. **Create your first page** - Follow the 5-minute tutorial above
2. **Explore templates** - Try all 4 design options
3. **Read full documentation** - Check README.md for details
4. **Deploy online** - Use GitHub Pages, Netlify, or Vercel
5. **Share with community** - Star on GitHub ⭐

---

## 🆘 Need Help?

- **Stuck?** Check FAQ in README.md
- **Bug found?** Open GitHub Issue
- **Want to suggest something?** Create Feature Request
- **Have questions?** Check Discussions tab

---

## 🚀 You're Ready!

That's all you need to get started. Now go create beautiful error pages! 💪

**Happy generating! 🎨**

---

**Questions or feedback?**
- GitHub Issues: Report bugs
- Discussions: Ask questions
- Email: contact@yourdomain.com
