const fs = require('fs');

const files = ['index.html', 'estimate.html', 'assets/css/estimator.css'];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Remove the accidental duplicate bg-card that overrides dark mode
    content = content.replace(/--bg-card: #f0ece4;/g, '');
    
    // Ensure body background is black
    content = content.replace(/background: var\(--bg-card\);/g, 'background: var(--bg-black);');
    content = content.replace(/background: var\(--warm-white\);/g, 'background: var(--bg-black);');

    fs.writeFileSync(file, content, 'utf8');
}
console.log('Fixed CSS variable override.');
