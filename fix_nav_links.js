const fs = require('fs');

const files = ['index.html', 'estimate.html', 'social-media.html'];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Fix the logo link
    content = content.replace(/<a href="#" class="logo">/, '<a href="index.html" class="logo">');

    // Fix the anchor links in the nav
    content = content.replace(/href="#services"/g, 'href="index.html#services"');
    content = content.replace(/href="#areas"/g, 'href="index.html#areas"');
    content = content.replace(/href="#reviews"/g, 'href="index.html#reviews"');
    content = content.replace(/href="#about"/g, 'href="index.html#about"');
    content = content.replace(/href="#contact"/g, 'href="index.html#contact"');
    
    // Also fix the link-in-bio nav addition if it uses bare anchors
    content = content.replace(/href="#contact" class="nav-cta"/g, 'href="index.html#contact" class="nav-cta"');

    fs.writeFileSync(file, content, 'utf8');
}

console.log('Fixed nav links.');
