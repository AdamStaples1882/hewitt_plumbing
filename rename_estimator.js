const fs = require('fs');

// Update Nav Links in all files
const files = ['index.html', 'estimate.html', 'social-media.html'];
for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    
    // Change Navigation Link
    content = content.replace(
        /<a href="estimate.html" style="color: var\(--brand-red\); font-weight: 500;">Estimate<\/a>/g, 
        '<a href="estimate.html" style="color: var(--brand-red); font-weight: 500;">Project Estimator</a>'
    );
    // Change Title in estimate.html
    if (file === 'estimate.html') {
        content = content.replace('<title>Estimation Tool | Hewitt Plumbing & Heating</title>', '<title>Project Estimator | Hewitt Plumbing & Heating</title>');
    }
    
    fs.writeFileSync(file, content, 'utf8');
}

// Update estimator.js
let js = fs.readFileSync('assets/js/estimator.js', 'utf8');
js = js.replace(/Instant Estimator/g, 'Project Estimator');
fs.writeFileSync('assets/js/estimator.js', js, 'utf8');

console.log('Renamed Estimator to Project Estimator.');
