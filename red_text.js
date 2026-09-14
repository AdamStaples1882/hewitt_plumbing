const fs = require('fs');

const redTextHTML = '<div style="color: var(--brand-red); font-weight: 500;">Gas Safe Registered Engineer &bull; St Albans, Hertfordshire</div>';

const files = ['index.html', 'estimate.html', 'social-media.html'];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Replace both variants with the red text version
    content = content.replace(/<div>Gas Safe Registered Engineer &bull; St Albans, Hertfordshire<\/div>/g, redTextHTML);
    content = content.replace(/<div>24\/7 Emergency Service Available<\/div>/g, redTextHTML);

    fs.writeFileSync(file, content, 'utf8');
}

console.log('Fixed top bar text.');
