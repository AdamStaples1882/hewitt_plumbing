const fs = require('fs');

const files = ['index.html', 'estimate.html', 'social-media.html'];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Replace all links to #contact with #quote-form
    content = content.replace(/href="index\.html#contact"/g, 'href="index.html#quote-form"');
    
    // In index.html, give the form wrapper the ID
    if (file === 'index.html') {
        content = content.replace('<div class="contact-form-wrapper">', '<div class="contact-form-wrapper" id="quote-form">');
    }

    fs.writeFileSync(file, content, 'utf8');
}

// Check estimator.js for #contact
let js = fs.readFileSync('assets/js/estimator.js', 'utf8');
if (js.includes('index.html#contact')) {
    js = js.replace(/index\.html#contact/g, 'index.html#quote-form');
    fs.writeFileSync('assets/js/estimator.js', js, 'utf8');
}

console.log('Fixed quote navigation links.');
