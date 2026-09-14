const fs = require('fs');

function updateFile(filename) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf8');

    // 1. Logo Replacement
    const logoRegex = /<div class="logo-mark"[\s\S]*?<\/div>\s*<div class="logo-text"[\s\S]*?<\/div>/g;
    content = content.replace(logoRegex, '<img src="assets/images/logo-badge.jpg" alt="Hewitt Plumbing Logo" style="height: 60px; border-radius: 50%; border: 2px solid var(--brand-red);">');
    
    const preloaderLogoRegex = /<div class="preloader-logo">Hewitt<\/div>/g;
    content = content.replace(preloaderLogoRegex, '<img src="assets/images/logo-badge.jpg" alt="Hewitt Plumbing Logo" style="height: 100px; border-radius: 50%; border: 2px solid var(--brand-red); margin-bottom: 2rem; animation: preloaderPulse 2s infinite;">');

    // 2. Add Social Links to Navigation (only if not present)
    if (!content.includes('href="social.html"')) {
        content = content.replace(/(<li><a href="#contact">Contact<\/a><\/li>)/, '$1\n                <li><a href="social.html">Links</a></li>');
        content = content.replace(/(<li><a href="index.html#contact">Contact<\/a><\/li>)/, '$1\n                <li><a href="social.html">Links</a></li>');
    }

    // 3. Fix unreadable text opacities
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.[345]\)/g, 'rgba(255, 255, 255, 0.85)');
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.65?\)/g, 'rgba(255, 255, 255, 0.95)');

    // 4. Fix invisible borders
    content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.0[4568]\)/g, 'rgba(255, 255, 255, 0.15)');

    // 5. Fix mobile nav background
    content = content.replace(/background: rgba\(255,\s*255,\s*255,\s*0\.98\);/g, 'background: rgba(0, 0, 0, 0.98);');
    
    // Fix footer logo structure specifically if it existed
    const footerLogoRegex = /<div class="footer-brand">[\s\S]*?<a href="#" class="logo">[\s\S]*?<\/a>/;
    content = content.replace(footerLogoRegex, `<div class="footer-brand">\n                    <a href="index.html" class="logo"><img src="assets/images/logo-badge.jpg" alt="Hewitt Plumbing Logo" style="height: 60px; border-radius: 50%; border: 2px solid var(--brand-red);"></a>`);

    fs.writeFileSync(filename, content, 'utf8');
}

updateFile('index.html');
updateFile('estimate.html');
console.log('Fixes applied.');
