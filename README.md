# Professional Portfolio Website

A modern, animated professional portfolio website built with HTML, CSS, and JavaScript. Features smooth animations, counting effects, and a clean corporate design.

## Features

### 🎨 **Animated Corporate Design**
- **Professional Color Scheme**: Deep blues and grays for a corporate feel
- **Smooth Animations**: Name slides in, years count up, elements fade in sequentially
- **Interactive Elements**: Hover effects on cards, buttons, and navigation
- **Responsive Layout**: Works perfectly on all devices

### ✨ **Animation Highlights**
- **Name Slide-in**: Your name slides in from the left with a smooth animation
- **Counting Animation**: Experience years, project counts, and technology numbers animate from 0
- **Sequential Reveals**: Title lines, subtitle, and description appear in sequence
- **Scroll Animations**: Work items animate as you scroll down the page
- **Hover Effects**: Cards lift and show gradient borders on hover

### 📱 **Sections**
- **Hero Section**: Animated introduction with your name, title, and credentials
- **Professional Experience**: Showcase your projects with detailed descriptions
- **Contact Form**: Professional contact form with success animations

## Files Structure

```
├── index.html          # Main HTML file
├── style.css           # Animated CSS styles
├── script.js           # JavaScript animations
└── README.md           # This file
```

## Customization

### 1. **Personal Information**
Edit `index.html` to update:
- Your name (replace "Your Name")
- Professional title
- Experience details
- Project descriptions
- Contact information

### 2. **Profile Photo**
Add your photo by:
1. Place your image in the project folder
2. Update the `.profile-image` CSS class in `style.css`:
```css
.profile-image {
  background-image: url('your-photo.jpg');
  background-size: cover;
  background-position: center;
}
```

### 3. **Colors & Styling**
The main colors are defined in `style.css`:
- Primary Blue: `#2a4d7a`
- Dark Blue: `#1b2c3a`
- Light Gray: `#e0e6ed`
- Background: `#f5f7fa`

### 4. **Animation Timing**
Adjust animation speeds in `script.js`:
- Change `setTimeout` delays for different timing
- Modify `duration` values in `animateCount()` function
- Update transition durations in CSS

## Deployment

### **GitHub Pages** (Recommended)
1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select "Deploy from a branch" → "main"
5. Your site will be available at `https://username.github.io/repository-name`

### **Netlify**
1. Drag and drop the project folder to [netlify.com](https://netlify.com)
2. Get instant deployment with custom domain options

### **Vercel**
1. Connect your GitHub repository to [vercel.com](https://vercel.com)
2. Automatic deployments on every push

## Browser Support
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Performance
- **Fast Loading**: Optimized animations and minimal dependencies
- **SEO Ready**: Semantic HTML structure
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Mobile Optimized**: Responsive design with touch-friendly interactions

## Animation Features

### **Entry Animations**
- Name slides in from left
- Title lines fade in sequentially
- Subtitle and description animate up
- Credentials count up from 0
- Professional card slides in from right

### **Scroll Animations**
- Work items animate as they enter viewport
- Section titles fade in on scroll
- Smooth parallax effect on hero section

### **Interactive Animations**
- Navigation links show underline on hover
- Buttons have shine effect on hover
- Cards lift and show gradient borders
- Form submission shows success animation

## Customization Tips

1. **Change Colors**: Update the CSS variables at the top of `style.css`
2. **Adjust Timing**: Modify the `setTimeout` values in `script.js`
3. **Add More Sections**: Follow the existing HTML structure
4. **Custom Animations**: Add new keyframes in `style.css`

## Support
For questions or customization help, check the code comments or create an issue in the repository.

---

**Built with ❤️ for professional developers** 