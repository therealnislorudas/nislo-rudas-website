# Clovis DJ Website Clone

This is a pixel-perfect clone of the official Clovis DJ website (https://www.clovisdj.com/), recreated with semantic HTML5, modern CSS, and vanilla JavaScript with enhanced UX and animations.

## Features

- **Dark Theme**: Minimalist dark color scheme matching the original design
- **Responsive Design**: Fully responsive layout optimized for desktop and mobile
- **Bilingual Support**: English and French biography with language toggle
- **Media Integration**: SoundCloud and Bandcamp embeds for music playback
- **Interactive Navigation**: Smooth scrolling navigation with section highlighting
- **Contact Form**: Functional booking request form
- **Press Kit**: Downloadable press materials with access code protection
- **Social Links**: Direct links to Instagram, SoundCloud, Resident Advisor, and Bandcamp

## Enhanced UX & Animations

### Scroll Experience
- **Smooth Scrolling**: Native smooth scroll behavior with JavaScript enhancement
- **Section Highlighting**: Active navigation links update automatically on scroll
- **Parallax Effect**: Subtle parallax on hero image for depth perception
- **Performance Optimized**: Uses requestAnimationFrame for smooth 60fps animations

### Interactive Elements
- **Hover Effects**: Refined hover states on all interactive elements
- **Button Feedback**: Visual feedback on button clicks and hovers
- **Card Animations**: Subtle lift and scale effects on release cards
- **Link Animations**: Smooth transitions and underline animations
- **Modal Transitions**: Fade and scale animations for modal appearance

### Mobile Experience
- **Touch-Friendly**: 44px minimum tap targets for accessibility
- **Tap Feedback**: Visual feedback on touch interactions
- **Responsive Layout**: Optimized layouts for all screen sizes
- **Touch Scroll**: Momentum scrolling on iOS devices
- **Mobile Navigation**: Adapted spacing and sizing for mobile

### Page Load Animations
- **Staggered Reveals**: Elements animate in sequence for polished appearance
- **Fade Effects**: Smooth fade-in animations for sections
- **Scroll Animations**: Elements animate as they enter viewport
- **Performance**: CSS animations with hardware acceleration

## Project Structure

```
clovis-dj-clone/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styling
├── js/
│   └── main.js         # Interactive functionality
├── assets/
│   └── images/         # Placeholder images
└── README.md           # This file
```

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern CSS with CSS variables, grid, and flexbox
- **JavaScript (ES6+)**: Vanilla JS for interactivity
- **No Frameworks**: Pure HTML/CSS/JS for maximum performance

## Key Features Implementation

### Navigation
- Sticky navigation bar with smooth scrolling
- Active section highlighting on scroll
- Mobile-responsive menu

### Media Players
- SoundCloud embeds for DJ sets and podcasts
- Bandcamp embeds for release tracks
- Responsive iframe containers

### Interactive Elements
- Language toggle (EN/FR) for biography
- Copy-to-clipboard functionality for bio and email
- Modal for press kit access code
- Form validation for booking requests

### Design Details
- Custom dark color palette (#050505 background)
- Minimalist typography with precise letter-spacing
- Subtle hover effects and transitions
- Grayscale image filters with hover effects

## Development

To run the project locally:

1. Clone or download this repository
2. Navigate to the project directory
3. Start a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server -p 8000
```

4. Open your browser and visit: `http://localhost:8000`

## Customization

### Images
Replace placeholder images in `assets/images/` with actual artist photos and release artwork.

### Colors
Modify CSS variables in `css/style.css`:

```css
:root {
    --bg-color: #050505;
    --text-color: #ffffff;
    --text-muted: #666666;
    --border-color: #1a1a1a;
}
```

### Content
All text content is in `index.html`. Update the biography, track listings, and contact information as needed.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized CSS with no external dependencies
- Lazy loading for images
- Minimal JavaScript footprint
- Fast load times with no framework overhead

## Credits

Original website: https://www.clovisdj.com/
Artist: Clovis - DJ & Producer based in Berlin

## License

This is a clone project for educational purposes. All content belongs to the original artist.