const fs = require('fs');

const filesToUpdate = ['index.html', 'estimate.html', 'assets/css/estimator.css'];

for (const file of filesToUpdate) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Fonts
    content = content.replace(/family=Cormorant\+Garamond[^&]+/g, 'family=Oswald:wght@400;500;600;700&family=Dancing+Script:wght@500;700');
    
    // CSS Variables Map
    content = content.replace(/--deep-black/g, '--bg-black');
    content = content.replace(/--charcoal/g, '--bg-dark');
    content = content.replace(/--champagne/g, '--brand-red');
    content = content.replace(/--gold-light/g, '--brand-red-light');
    content = content.replace(/--ivory/g, '--text-light');
    content = content.replace(/--warm-white/g, '--bg-card');
    content = content.replace(/--stone/g, '--border-dark');
    content = content.replace(/--cream/g, '--bg-card'); // map cream to bg-card

    // Values in :root
    content = content.replace(/--bg-black: #0a0a0a;/g, '--bg-black: #000000;');
    content = content.replace(/--bg-dark: #141414;/g, '--bg-dark: #111111;');
    content = content.replace(/--brand-red: #c9a96e;/g, '--brand-red: #e60000;');
    content = content.replace(/--brand-red-light: #d4b87a;/g, '--brand-red-light: #ff1a1a;');
    content = content.replace(/--text-light: #f8f6f1;/g, '--text-light: #ffffff;');
    content = content.replace(/--bg-card: #faf9f7;/g, '--bg-card: #1a1a1a;');
    content = content.replace(/--border-dark: #e5e0d8;/g, '--border-dark: #333333;');
    content = content.replace(/--text-primary: #1a1a1a;/g, '--text-primary: #ffffff;');
    content = content.replace(/--text-secondary: #4a4a4a;/g, '--text-secondary: #cccccc;');
    content = content.replace(/--text-muted: #7a7a7a;/g, '--text-muted: #888888;');

    // Typography
    content = content.replace(/Cormorant Garamond/g, 'Oswald');
    
    // Additional styling tweaks for high contrast
    content = content.replace(/rgba\(201,\s*169,\s*110/g, 'rgba(230, 0, 0'); // Champagne rgba to Red rgba
    content = content.replace(/rgba\(248,\s*246,\s*241/g, 'rgba(255, 255, 255'); // Ivory rgba to White rgba
    content = content.replace(/rgba\(10,\s*10,\s*10/g, 'rgba(0, 0, 0'); 
    
    // Fix nav bar colors for dark mode
    content = content.replace(/background: rgba\(255,\s*255,\s*255,\s*0\.95\);/g, 'background: rgba(0, 0, 0, 0.95);');
    content = content.replace(/border-bottom: 1px solid rgba\(0,\s*0,\s*0,\s*0\.04\);/g, 'border-bottom: 1px solid var(--border-dark);');
    content = content.replace(/nav\.scrolled { box-shadow: 0 4px 30px rgba\(0,\s*0,\s*0,\s*0\.06\); }/g, 'nav.scrolled { box-shadow: 0 4px 30px rgba(230, 0, 0, 0.15); }');
    content = content.replace(/color: #1a3c2a;/g, 'color: var(--text-light);'); // logo span text
    
    fs.writeFileSync(file, content, 'utf8');
}
console.log('Rebrand complete.');
