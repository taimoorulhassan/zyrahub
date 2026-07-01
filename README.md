# Zyra Hub — Company Portfolio Website

A complete, production-ready portfolio website for Zyra Hub built with HTML5, CSS3, and Vanilla JavaScript.

---

## 📁 Project Structure

```
zyra-hub/
├── index.html        ← Main website (all sections)
├── style.css         ← All styles (edit CSS variables at top)
├── script.js         ← All interactivity
├── netlify.toml      ← Netlify deployment config
├── /images           ← Put section/project images here
├── /assets           ← Fonts, icons, other assets
└── /logos            ← Logo files and favicon
```

---

## 🚀 Deploy to Netlify (Free)

### Option A — Drag & Drop (Easiest)
1. Go to [app.netlify.com](https://app.netlify.com)
2. Log in → click **"Add new site"** → **"Deploy manually"**
3. Drag the entire `zyra-hub/` folder into the upload area
4. Done! Your site is live instantly.

### Option B — GitHub Auto-Deploy
1. Push the `zyra-hub/` folder to a GitHub repo
2. In Netlify: **"Add new site"** → **"Import an existing project"**
3. Connect GitHub → select your repo → click **Deploy**
4. Every push to `main` will auto-deploy your site.

---

## ✏️ How to Customize

### Change Colors
Open `style.css` and edit the CSS variables at the top (`:root` block):
```css
--color-primary: #6C3DE8;    /* Main purple */
--color-secondary: #E84B3D;  /* Red accent */
```

### Replace Logo
- Put your logo file in `/logos/`
- In `index.html`, find the `.logo-placeholder` divs and replace with:
```html
<img src="./logos/your-logo.png" alt="Zyra Hub" height="40" />
```

### Replace Placeholder Images
- Hero section: no image needed (gradient background)
- Projects: replace `src` in each `.project-img` tag
- Team photos: replace `src` in each `.team-photo` tag
- Testimonials: replace `src` in each `.testimonial-img-card img` tag
- Products: edit the `platformProducts` object in `script.js`

### Update Contact Info
Search `index.html` for:
- `hello@zyrahub.com` → replace with your email
- `+1 (000) 000-0000` → replace with your phone
- `@zyrahub` → replace with your Instagram handle
- All `href="#"` on social links → replace with real URLs

### Add Real Products
In `script.js`, find `platformProducts` and either:
1. Increase `count` for more placeholders, or
2. After generating, inspect the HTML and manually replace `<img src>` attributes

### Enable Contact Form
The form uses **Netlify Forms** out of the box — it works automatically when deployed to Netlify. No backend needed.

To use **Formspree** instead:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Update Team Members
In `index.html`, find `<!-- Team Member 1 -->` and fill in:
- Photo: replace `src` on `<img>`
- Name: replace `Name Placeholder`
- Role: replace `Role / Title Placeholder`
- Email: replace `email@placeholder.com`
- Phone: replace `+1 (000) 000-0000`
- Instagram: replace `href="#"` and `@instagramhandle`

### Update Seller/Buyer Reviews
Find each `<!-- Seller Review N -->` block and replace:
- Review text between `"..."` quotes
- Seller/buyer name in `<strong>` tag
- Platform in `<span>` tag

---

## ⚡ Performance Tips

- **Images**: Compress all images before uploading using [Squoosh](https://squoosh.app) or [TinyPNG](https://tinypng.com)
- **Image format**: Use WebP format for 30-50% smaller file sizes
- **Favicon**: Add a real 32x32 PNG to `/logos/favicon.png`
- **OG Image**: Add a 1200x630 image to `/images/og-image.jpg` for social sharing

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| Desktop (1024px+) | Full multi-column layouts |
| Tablet (768–1024px) | 2-column grids |
| Mobile (480–768px) | Single column |
| Small Mobile (<480px) | Compact, stacked |

---

## 🔧 Sections Checklist

- [x] Loading screen with animation
- [x] Sticky navbar with scroll spy
- [x] Mobile hamburger menu
- [x] Hero with animated stats counter
- [x] About Us
- [x] Platforms (Amazon, Walmart, Temu, TikTok)
- [x] Projects portfolio (5 cards)
- [x] Products tabs (25 + 18 + 10 + 10 placeholders)
- [x] Testimonials gallery (10 images + lightbox)
- [x] Seller reviews (5 cards)
- [x] Buyer reviews (5 cards)
- [x] Team / Collaborators (4 cards)
- [x] Contact section + Netlify form
- [x] Footer with links
- [x] Back to top button
- [x] Scroll reveal animations
- [x] SEO meta tags

---

Built for Zyra Hub. All rights reserved.
