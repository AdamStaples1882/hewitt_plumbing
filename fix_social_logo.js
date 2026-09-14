const fs = require('fs');

const filename = 'social.html';
if (fs.existsSync(filename)) {
    let content = fs.readFileSync(filename, 'utf8');

    const logoRegex = /<div class="logo-mark">[\s\S]*?<\/div>\s*<div class="logo-text">[\s\S]*?<\/div>/g;
    content = content.replace(logoRegex, '<img src="assets/images/logo-badge.jpg" alt="Hewitt Plumbing Logo" style="height: 100px; border-radius: 50%; border: 2px solid var(--brand-red);">');

    fs.writeFileSync(filename, content, 'utf8');
}
console.log('Social logo fixed.');
