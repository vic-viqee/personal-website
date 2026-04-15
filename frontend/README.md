# Frontend | VL Murimi Portfolio

React 19 + TypeScript + Vite application with React Router for the portfolio website.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:5173

---

## 📁 Structure

```
src/
├── components/
│   ├── Admin.tsx          # Admin dashboard for content management
│   ├── BlogList.tsx      # Blog listing page
│   ├── BlogPostView.tsx  # Individual blog post view
│   ├── CodingSaga.tsx   # Timeline component
│   ├── ContactSection.tsx
│   ├── GadgetArsenal.tsx # Tools section
│   ├── OffDutyPursuits.tsx # Hobbies section
│   ├── ProjectCard.tsx   # Project display card
│   ├── Superpowers.tsx  # Skills section with animations
│   └── TrainingAcademy.tsx # Education section
├── api.ts                # API client functions
├── App.tsx               # Main app with routing
├── index.css            # Global styles and CSS variables
└── main.tsx             # Entry point
```

---

## 🎨 Features

- **React Router** for client-side routing
- **Dark/Light Theme** toggle
- **Animated Skills** with staggered reveals and level badges
- **Responsive Design** for all screen sizes
- **Comic Book Theme** with custom fonts (Bangers, JetBrains Mono)

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file (or set in deployment):

```env
VITE_API_URL=http://localhost:8000
VITE_ADMIN_SECRET=your_admin_secret
```

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder.

---

## 📱 Routes

| Path | Description |
|------|-------------|
| `/` | Home - Hero, projects, timeline, skills, contact |
| `/skills` | Skills/superpowers page with animations |
| `/timeline` | Coding journey timeline |
| `/blog` | Blog posts listing |
| `/blog/:slug` | Individual blog post |
| `/admin` | Content management dashboard |

---

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite 8
- React Router 7
- Axios
- CSS Variables for theming

---

## 🎯 Customization

### Adding New Sections

1. Create component in `src/components/`
2. Add route in `App.tsx`
3. Add nav link in the header

### Theme Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --c-accent: #4DB8FF;
  --c-black: #0d0d0d;
  --c-white: #ffffff;
}
```

---

&copy; 2026 Victor Lewis Murimi