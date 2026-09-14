const fs = require('fs');

const files = ['index.html', 'estimate.html', 'social-media.html'];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(
        /<a href="estimate\.html" style="color: var\(--brand-red\); font-weight: 500;">Project Estimator<\/a>/g,
        '<a href="estimate.html">Project Estimator</a>'
    );
    
    fs.writeFileSync(file, content, 'utf8');
}

console.log('Fixed nav link styling.');
