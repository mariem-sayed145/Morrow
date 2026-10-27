# MORROW COFFEE ROASTERS

> An independent neighborhood coffee roastery focused on thoughtful sourcing, carefully roasted coffee, and slow everyday rituals.

Designed and engineered with an editorial, tactile aesthetic reminiscent of contemporary independent publications (Kinfolk, Drift, Cereal). Built entirely with modern semantic HTML5, Vanilla CSS3, and vanilla JavaScript without unnecessary frameworks or fake integrations.

---

## Brand & Design System

### Color Palette
- **Dark espresso (`#2A1E18`)**: Primary dark base for distinctive sections (Tasting Room & Workshop) and typography.
- **Roasted brown (`#5B3B2A`)**: Warm secondary accent for prices, accents, and dividers.
- **Warm cream (`#F4EBDD`)**: Primary editorial background, header, and contrast elements.
- **Paper white (`#FBF8F2`)**: Pure editorial canvas for collection and reading areas.
- **Muted olive (`#777A57`)**: Natural botanical supporting accent for labels and highlights.
- **Warm gray (`#A69B8E`)**: Subdued secondary text, coordinates, and subtle details.

### Typography
- **Headings & Display**: `Playfair Display` (editorial serif with italic accents and intentional line breaks).
- **Body & Navigation**: `DM Sans` (clean, contemporary, humanistic sans-serif).

---

## Features & Implementation

1. **Header & Navigation**:
   - Refined MORROW wordmark with roastery subline.
   - Smooth anchor navigation: *Our Coffee*, *The Roastery*, *Visit Us*, *Journal*.
   - Functional shopping bag toggle with dynamic item counter badge.
   - Accessible mobile drawer navigation with animated hamburger toggle.

2. **Hero Section**:
   - Asymmetric editorial layout with generous negative space.
   - Large authentic photograph showcasing freshly brewed specialty coffee, ceramic cup, and whole beans in warm morning light.
   - Editorial badge: `SMALL BATCH / BIG ON CHARACTER`.
   - Dual actions: *Explore Our Coffee* and *Meet the Roastery*.
   - Floating tactile caption note.

3. **Coffee Collection**:
   - 3 curated seasonal single-origins & house blends:
     - **01 — House Blend** ($19.50) — Huila, Colombia & Antigua, Guatemala (Chocolate, hazelnut, caramel).
     - **02 — Sunrise Ethiopia** ($22.00) — Yirgacheffe, Gedeb • Natural (Citrus, jasmine, stone fruit).
     - **03 — Slow Sunday Decaf** ($20.00) — Chiapas, Mexico • Mountain Water Process (Cocoa, almond, soft sweetness).
   - Bespoke product packaging photography with consistent square proportions.
   - Interactive **Quick View Modal** featuring grind options (*Whole Bean*, *Filter/V60*, *Espresso*, *French Press*) and package sizes (*300g*, *1kg*).
   - Interactive **Add to Bag** linking into an active shopping bag drawer.

4. **Brand Story**:
   - Asymmetrical two-column layout with authentic craft barista pour-over imagery.
   - Core philosophy copy: *"Coffee with a little more intention..."*
   - Transparent sourcing and small-batch drum roasting craft metrics.

5. **Our Process**:
   - Three key stages:
     - `01 — Thoughtfully sourced.`
     - `02 — Carefully roasted.`
     - `03 — Brewed your way.`
   - Horizontal timeline with circular indicators on desktop.
   - Responsive vertical sequence on mobile screens.

6. **Visit The Roastery (Dark Espresso Section)**:
   - Full dark espresso (`#2A1E18`) background with warm cream typography.
   - Fictional studio address clearly designated as a portfolio demo.
   - Opening hours and public cupping schedule.
   - Custom minimalist architectural map illustration (SVG vector graphic with streets and roastery marker).
   - Atmospheric interior roastery photography.
   - Interactive **"Get in Touch"** contact modal with input validation and polite demo feedback.

7. **The Journal**:
   - Three editorial article previews:
     - *A Better Morning Brew*
     - *Understanding Coffee Origins*
     - *The Art of the Slow Pour*
   - Interactive modal reader with full long-form articles, author tags, and high-resolution imagery (no broken links).

8. **Footer & Morning Dispatch Newsletter**:
   - Brand wordmark and philosophy.
   - Navigation links and contact placeholders.
   - Minimalist social media icons (Instagram, Are.na, Substack).
   - Client-side validated newsletter form with explicit confirmation that no data is transmitted or stored on a server.
   - Copyright notice and top scroll link.

---

## How to Run Locally

You can run Morrow Coffee Roasters using any standard static file server or directly in your browser.

### Option 1: Node.js (Recommended)
```bash
# From the project directory:
node server.js
```
Then open your browser at:
```
http://localhost:4040
```

### Option 2: Python 3
```bash
# From the project directory:
python -m http.server 4040
```
Then navigate to `http://localhost:4040`.

### Option 3: Direct File Opening
Double-click `index.html` in your file explorer to open it directly in Google Chrome, Microsoft Edge, Safari, or Firefox.

---

## File Structure

```
Morrow/
├── assets/
│   └── images/
│       ├── hero.jpg
│       ├── story.jpg
│       ├── roastery.jpg
│       ├── product-house-blend.jpg
│       ├── product-sunrise-ethiopia.jpg
│       ├── product-slow-sunday.jpg
│       ├── journal-morning-brew.jpg
│       ├── journal-origins.jpg
│       └── journal-slow-pour.jpg
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── index.html
├── server.js
├── verify.js
└── README.md
```
