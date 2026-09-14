const fs = require('fs');

let content = fs.readFileSync('estimate.html', 'utf8');

// Fix navbar background
content = content.replace(/background: var\(--text-light\);/g, 'background: var(--bg-black);');

// Fix nav link colors
content = content.replace(/\.nav-links li a {/g, '.nav-links li a { color: var(--text-light); ');

// Fix nav CTA
content = content.replace(/border: 1px solid var\(--bg-black\);/g, 'border: 1px solid var(--brand-red); color: var(--brand-red);');
content = content.replace(/background: var\(--bg-black\); color: var\(--brand-red\) !important;/g, 'background: var(--brand-red); color: var(--bg-black) !important;');

fs.writeFileSync('estimate.html', content, 'utf8');
console.log('Fixed estimator header.');
