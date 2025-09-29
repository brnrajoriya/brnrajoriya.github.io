# BRN.Rajoriya — Portfolio Website

This is the source of my personal portfolio website, showcasing my work, skills, and experience.

Live site
- https://brnrajoriya.github.io

Highlights
- **Modern, responsive UI** with smooth interactions
- **Projects** including MSG91 Email, Unitymoney Online IB, ClickBetter, and GitHub boilerplates
- **Testimonials** carousel
- **Contact form** with inline success/error (AJAX via FormSubmit)
- **SEO**: meta tags + JSON‑LD Person schema

Tech
- HTML5
- CSS3 (`css/styles.css`)
- JavaScript (`js/script.js`)
- Font Awesome, Google Fonts

Local development
1) Clone
```bash
git clone https://github.com/brnrajoriya/brnrajoriya.github.io.git
cd brnrajoriya.github.io
```
2) Run locally (any static server)
```bash
python -m http.server 5500   # or
npx http-server -p 5500
```
Open http://localhost:5500

Content structure
- `index.html`: all sections (Hero, About, Skills, Experience, Certifications, Projects, Testimonials, Contact)
- `css/styles.css`: layout, components, animations
- `js/script.js`: navigation, carousel, skill animations, contact form (AJAX)

Deployment (already configured)
- This repo is the special user site `brnrajoriya.github.io`.
- GitHub Pages serves from the `main` branch at the repo root.
- After pushing to `main`, the site updates in ~1–2 minutes.

Contact
- Email: `mailto:brn.rajoriya@gmail.com`
- LinkedIn: https://www.linkedin.com/in/brnrajoriya/
- GitHub: https://github.com/brnrajoriya

Related
- IndoreShops (coming soon): https://indoreshops.github.io/

License
- MIT
