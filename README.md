# 🪄 Hogwarts Magical Gallery

> A Harry Potter-themed magical image gallery application with immersive Wizarding World aesthetics.

![Theme](https://img.shields.io/badge/Theme-Harry%20Potter-gold)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🖼️ Magical Gallery
- Responsive grid layout with enchanted photo frames
- Lazy loading for optimal performance
- Full-screen lightbox with spell-like transitions
- Sort by upload time or file size

### 📤 Wizard's Archive (Upload)
- Drag & drop file upload
- Add images via URL (Google Images, Unsplash)
- File validation (JPG, PNG, WEBP)
- Size limit: 10MB

### 🌧️ Atmospheric Effects
- Animated rain overlay
- Floating magical particles
- Hovering candles with flickering flames
- Golden glow on image hover

### 🧭 Navigation
- Sticky responsive navbar
- 5 sections: Home, Gallery, Upload, Spells, About
- Magical hover animations

### 🔮 Spells & Effects Control
Toggle various magical effects:
- Rain
- Particles
- Candles
- Glow effects
- Animations
- Night mode

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
Harry Potter/
├── public/
│   ├── css/
│   │   └── style.css       # All magical styling
│   ├── js/
│   │   ├── app.js          # Main application logic
│   │   └── rain.js         # Rain effect system
│   └── index.html          # Main HTML file
├── data/
│   └── images.json         # Image metadata storage
├── uploads/                # Uploaded image files
├── server.js              # Express backend
├── package.json
└── README.md
```

## 🎨 Design Features

### Color Palette
- **Deep Blacks & Browns**: Castle stone backgrounds
- **Gold (#d4af37)**: Primary accent color
- **Emerald (#2ecc71)**: Secondary magical highlights
- **Crimson (#c0392b)**: Warning states
- **Parchment (#d4c4a8)**: Text and light elements

### Typography
- **Cinzel**: Display headings (wizardly serif)
- **Crimson Text**: Body text (elegant serif)
- **MedievalSharp**: Accent text (fantasy style)

### Effects
- Subtle rain animation
- Floating golden particles
- Candle flame flickering
- Hover glow transitions
- Spell-flash lightbox animation

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/images` | Get all images (supports `sort` and `order` params) |
| POST | `/api/upload` | Upload image file |
| POST | `/api/add-url` | Add image from URL |
| DELETE | `/api/images/:id` | Delete an image |

## ⚡ Performance

- Lazy loading for images
- Intersection Observer for efficient rendering
- CSS-based animations (GPU accelerated)
- Optimized for 4K images

## 🧙‍♂️ Theme Summary

A fully functional Harry Potter-inspired magical image gallery, blending modern full-stack development with immersive Wizarding World visuals, animated rain ambience, and high-resolution fantasy imagery.

---

*"It does not do to dwell on dreams and forget to live."* — Albus Dumbledore



