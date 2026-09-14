const fs = require('fs');

const files = ['index.html', 'estimate.html', 'social-media.html'];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Check if it already has the link to avoid duplicates
    if (!content.includes('href="social-media.html"')) {
        // Insert it after Reviews
        content = content.replace(/<li><a href="index\.html#reviews">Reviews<\/a><\/li>/g, '<li><a href="index.html#reviews">Reviews</a></li>\n                <li><a href="social-media.html">Social Media</a></li>');
    }

    fs.writeFileSync(file, content, 'utf8');
}

console.log('Added Social Media link to navigation.');
