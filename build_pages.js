const fs = require('fs');

// Read components
let nav = fs.readFileSync('nav.txt', 'utf8');
let footer = fs.readFileSync('footer.txt', 'utf8');

// Fix the nav logo (make it small)
nav = nav.replace(/<img[^>]*>/, '<img src="assets/images/logo-badge.jpg" alt="Hewitt Plumbing Logo" style="height: 50px; border-radius: 50%; border: 2px solid var(--brand-red);">');

// Fix the footer logo (make it big and centered)
footer = footer.replace(/<img[^>]*>/, '<img src="assets/images/logo-badge.jpg" alt="Hewitt Plumbing Logo" style="height: 120px; border-radius: 50%; border: 2px solid var(--brand-red); margin: 0 auto; display: block; margin-bottom: 1rem;">');

// Rebuild index.html
let indexContent = fs.readFileSync('index.html', 'utf8');
indexContent = indexContent.replace(/<nav[^>]*>[\s\S]*?<\/nav>/, nav);
indexContent = indexContent.replace(/<footer[^>]*>[\s\S]*?<\/footer>/, footer);
fs.writeFileSync('index.html', indexContent);

// Rebuild estimate.html
let estimateContent = fs.readFileSync('estimate.html', 'utf8');
// Fix body background
estimateContent = estimateContent.replace(/background-color: var\(--text-light\);/, 'background-color: var(--bg-black);');
// Replace nav and footer
estimateContent = estimateContent.replace(/<nav[^>]*>[\s\S]*?<\/nav>/, nav);
if (estimateContent.includes('<footer>')) {
    estimateContent = estimateContent.replace(/<footer[^>]*>[\s\S]*?<\/footer>/, footer);
} else {
    estimateContent = estimateContent.replace(/<\/body>/, footer + '\n</body>');
}
fs.writeFileSync('estimate.html', estimateContent);

// Rebuild social.html
let socialContent = fs.readFileSync('social.html', 'utf8');
// Remove existing logo in social.html
socialContent = socialContent.replace(/<div class="logo-container">[\s\S]*?<\/div>/, '');
// Add nav to top of body
socialContent = socialContent.replace(/<body>/, '<body>\n' + nav);
// Add footer to bottom
if (socialContent.includes('<div class="footer">')) {
    socialContent = socialContent.replace(/<div class="footer">[\s\S]*?<\/div>/, footer);
} else {
    socialContent = socialContent.replace(/<\/body>/, footer + '\n</body>');
}
fs.writeFileSync('social.html', socialContent);

console.log('Pages rebuilt successfully.');
