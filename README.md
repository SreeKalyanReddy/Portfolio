# Jon Hecky Portfolio Clone

This is a clone of the Jon Hecky portfolio website (https://jonhecky.dev/) created as a learning exercise.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Interactive Elements**: 
  - Dad Mode toggle with fun animations
  - Contact form with validation
  - Portfolio grid with load more functionality
  - Smooth scrolling navigation
  - Hover effects and animations
- **Modern Web Technologies**:
  - HTML5 semantic elements
  - CSS3 with Grid and Flexbox
  - Vanilla JavaScript (ES6+)
  - CSS animations and transitions

## File Structure

```
jonhecky-clone/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All CSS styles
├── js/
│   └── script.js       # JavaScript functionality
├── images/
│   └── profile-placeholder.jpg
└── README.md           # This file
```

## Running the Project

### Option 1: Local HTTP Server
If you have Node.js installed:
```bash
npx http-server . -p 8000
```
Then open http://localhost:8000 in your browser.

### Option 2: Python Server
If you have Python installed:
```bash
python -m http.server 8000
```
Then open http://localhost:8000 in your browser.

### Option 3: Live Server Extension
If using VS Code, install the "Live Server" extension and right-click on `index.html` → "Open with Live Server"

## Interactive Features

### Dad Mode
Toggle the switch in the top-right corner to activate "Dad Mode" which:
- Applies a sepia filter to the page
- Shows a dad joke notification
- Demonstrates JavaScript event handling

### Contact Form
The contact form includes:
- Client-side validation
- Success/error notifications
- Responsive design

### Portfolio Grid
- Shows first 12 items initially
- "Load More" button reveals additional items
- Smooth fade-in animations

### Easter Eggs
Try the Konami Code: ↑↑↓↓←→←→BA for a surprise!

## Customization

To customize this template for your own use:

1. Replace content in `index.html` with your own information
2. Update the portfolio items with your projects
3. Modify colors in `style.css` to match your brand
4. Add your own profile image to the `images/` folder
5. Update contact form to connect to your backend/email service

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Credits

- Original design by Jon Hecky (https://jonhecky.dev/)
- Fonts: Inter from Google Fonts
- Icons and styling inspired by the original site
- Clone created for educational purposes

## License

This project is for educational purposes only. The original design belongs to Jon Hecky.