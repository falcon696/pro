# Setup Instructions

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Copy Assets
Copy your image files from the `assets/` folder to `public/assets/`:
- `logo.png` 
- `falcon..png` (falcon bird image)
- `preview-1.png` through `preview-4.png` (project images)
- `client.png` (testimonial avatar)
- `world map.png` (optional, for footer decoration)

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio!

## Building for Production

```bash
npm run build
npm start
```

## Customization Guide

### 1. Update Personal Information

**Hero Section** (`src/components/Hero.tsx`):
- Change name and tagline
- Update social media links (GitHub, LinkedIn, WhatsApp, Email)
- Update CV download link

**About Section** (`src/components/About.tsx`):
- Update experience, focus, passion, goal descriptions
- Update CV download link

**Contact Section** (`src/components/Contact.tsx`):
- Update email address
- Update phone number
- Update location

**Footer** (`src/components/Footer.tsx`):
- Update social links
- Update current year

### 2. Update Projects

Edit `src/components/Projects.tsx`:
```typescript
const projects = [
  {
    title: 'Your Project Title',
    description: 'Project description',
    tech: ['Tech1', 'Tech2'],
    image: '/assets/preview-1.png',
    link: 'https://project-link.com',
  },
  // Add more projects...
];
```

### 3. Update Testimonials

Edit `src/components/Testimonials.tsx`:
```typescript
const testimonials = [
  {
    text: 'Testimonial text',
    author: 'Client Name',
    position: 'Client Position',
    image: '/assets/client.png',
    rating: 5,
  },
  // Add more testimonials...
];
```

### 4. Change Color Scheme

Edit `tailwind.config.js`:
```js
colors: {
  primary: '#00D9FF',    // Main color
  secondary: '#0A0E27',  // Secondary color
  dark: '#0F1419',       // Dark background
}
```

Edit `src/globals.css` for additional color tweaks:
```css
.glow-border {
  /* Adjust glow effects here */
  box-shadow: 0 0 20px rgba(0, 217, 255, 0.1);
}
```

### 5. Add More Sections

Create a new component in `src/components/`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function NewSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="new-section" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Your content here */}
      </div>
    </section>
  );
}
```

Then import it in `src/app/page.tsx`:
```typescript
import NewSection from '@/components/NewSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      {/* ... existing components ... */}
      <NewSection />
    </main>
  );
}
```

## Animation Customization

### Framer Motion Animations

Edit animation properties in components:

```typescript
// Fade in animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// Scale on hover
whileHover={{ scale: 1.05 }}

// Stagger children
variants={{
  container: {
    staggerChildren: 0.2,
  }
}}
```

### Tailwind Animations

Edit `tailwind.config.js` keyframes:
```js
keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  // Add custom animations
}
```

## SEO Optimization

Update `src/app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Your Name - Portfolio',
  description: 'Your description here',
  keywords: ['keyword1', 'keyword2'],
  openGraph: {
    title: 'Your Name',
    description: 'Your description',
    url: 'https://yourwebsite.com',
    type: 'website',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your project
4. Click Deploy

### Netlify
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. New site from Git
4. Select your repo
5. Deploy

### Self-hosted
```bash
npm run build
npm start
```

## Troubleshooting

### Images not showing?
- Ensure images are in `public/assets/` folder
- Check image paths in components match your filenames
- Clear `.next` cache: `rm -rf .next && npm run dev`

### Animations not working?
- Ensure Framer Motion is installed: `npm install framer-motion`
- Check browser console for errors
- Verify `motion` components are imported from 'framer-motion'

### Tailwind styles not applying?
- Clear `.next` cache
- Run `npm run build` to rebuild
- Check `tailwind.config.js` is properly configured

## Performance Tips

1. **Optimize Images**
   - Use Next.js Image component
   - Compress images before uploading
   - Use WebP format when possible

2. **Lazy Loading**
   - Images are lazy loaded with Next.js
   - Animations trigger on scroll with `useInView`

3. **Code Splitting**
   - Components are automatically code-split
   - Use dynamic imports for heavy components

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

Happy building! 🚀
