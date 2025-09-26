# Bhaskar Rajoriya — Personal Website

A modern, responsive personal portfolio for Bhaskar Rajoriya (Software Engineer). Built with plain HTML/CSS/JS for simplicity and fast GitHub Pages deployment.

## Features
- **Modern UI** with responsive layout and smooth interactions
- **Contact & Social** links (GitHub, LinkedIn, Instagram, Facebook)
- **SEO-ready** meta tags and JSON-LD Person schema
- **Easy hosting** on GitHub Pages

## Tech Stack
- **HTML5** for structure
- **CSS3** (custom styles in `css/styles.css`)
- **JavaScript** (`js/script.js` for interactivity)
- **Font Awesome** icons
- **Google Fonts** (Poppins)

---

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/brnrajoriya/personal-website.git
   cd personal-website
   ```

2. **Open locally**
   - Easiest: open `index.html` directly in your browser.
   - Recommended: use a local web server (avoids CORS quirks):
     - Python 3
       ```bash
       python -m http.server 5500
       ```
       Then open http://localhost:5500
     - Node (http-server)
       ```bash
       npx http-server -p 5500
       ```

3. **Edit content**
   - Update sections in `index.html` (About, Skills, Projects, Contact)
   - Styles in `css/styles.css`
   - Interactions in `js/script.js`

---

## Deployment — GitHub Pages

This project is set up to deploy as a **Project Site** at:

```
https://brnrajoriya.github.io/personal-website/
```

### One-time setup
1. **Create the repo** on GitHub named `personal-website` under the `brnrajoriya` account.
2. **Push the code**
   ```bash
   git init
   git remote add origin https://github.com/brnrajoriya/personal-website.git
   git add .
   git commit -m "Initial commit: personal website"
   git branch -M main
   git push -u origin main
   ```
3. **Enable GitHub Pages**
   - Go to GitHub repo ➜ Settings ➜ Pages
   - Source: `Deploy from a branch`
   - Branch: `main`, folder: `/ (root)`
   - Save. Pages will build and publish in ~1–3 minutes.

### Verify
- Visit: https://brnrajoriya.github.io/personal-website/
- If you see the site but assets don’t load, wait a minute and hard refresh (Ctrl/Cmd + Shift + R).

---

## SEO and Social Preview

- **Canonical/OG/Twitter URL** is set to the GitHub Pages URL in `index.html`:
  ```html
  <link rel="canonical" href="https://brnrajoriya.github.io/personal-website/">
  <meta property="og:url" content="https://brnrajoriya.github.io/personal-website/">
  ```
- **JSON-LD Person schema** includes your social links.
- To improve sharing previews, add a real image (1200x630 recommended):
  1. Place an image at `img/og-image.jpg`
  2. Update in `index.html`:
     ```html
     <meta property="og:image" content="https://brnrajoriya.github.io/personal-website/img/og-image.jpg">
     <meta name="twitter:image" content="https://brnrajoriya.github.io/personal-website/img/og-image.jpg">
     ```

---

## Custom Domain (optional)

If you have a custom domain:
1. Add a `CNAME` file at the project root containing your domain, e.g. `www.bhaskar.dev`.
2. In your DNS, create a CNAME record pointing `www` to `brnrajoriya.github.io`.
3. In GitHub ➜ Settings ➜ Pages, set the **Custom domain** and enforce HTTPS.

---

## Common Tasks

- **Update contact info**: Edit the Contact section in `index.html`:
  - Email link: `mailto:brn.rajoriya@gmail.com`
  - Phone link: `tel:+918817778900`
- **Update LinkedIn**: `https://www.linkedin.com/in/brnrajoriya/`
- **Add projects**: Replace placeholders in the Projects section with real images, titles, descriptions, and repository/demo links.

---

## License

This project is available under the MIT License. You are free to use and modify it.
