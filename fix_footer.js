const fs = require('fs');
const files = ['index.html', 'estimate.html'];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Make footer logo bigger and center the footer brand content
    content = content.replace(/<img src="assets\/images\/logo-badge\.jpg" alt="Hewitt Plumbing Logo" style="height: 60px; border-radius: 50%; border: 2px solid var\(--brand-red\);">/g,
                              '<img src="assets/images/logo-badge.jpg" alt="Hewitt Plumbing Logo" style="height: 120px; border-radius: 50%; border: 2px solid var(--brand-red); margin: 0 auto; display: block; margin-bottom: 1rem;">');
    
    // Add text-align center to the footer-brand class CSS if it isn't already centered
    if (!content.includes('.footer-brand { text-align: center;')) {
        content = content.replace(/\.footer-brand p {/, '.footer-brand { text-align: center; }\n        .footer-brand p { margin: 0 auto; margin-top: 1.5rem;');
    }

    fs.writeFileSync(file, content, 'utf8');
}
console.log('Footer logo updated.');
