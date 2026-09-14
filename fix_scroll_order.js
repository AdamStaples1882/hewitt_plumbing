const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add scroll-padding-top to html
html = html.replace('html { scroll-behavior: smooth; }', 'html { scroll-behavior: smooth; scroll-padding-top: 140px; }');
if (!html.includes('scroll-padding-top')) {
    // If not found in a specific block, inject it into the global styles
    html = html.replace('</style>', '    html { scroll-padding-top: 140px; }\n    </style>');
}

// 2. Swap Areas and Reviews
const areasStart = html.indexOf('<section class="areas-section" id="areas">');
const areasEnd = html.indexOf('</section>', areasStart) + 10;
const areasHtml = html.substring(areasStart, areasEnd);

const reviewsStart = html.indexOf('<section class="section reviews-section" id="reviews">');
const reviewsEnd = html.indexOf('</section>', reviewsStart) + 10;
const reviewsHtml = html.substring(reviewsStart, reviewsEnd);

if (areasStart !== -1 && reviewsStart !== -1 && areasStart < reviewsStart) {
    // Swap them. We remove areasHtml first, then insert it after reviewsEnd
    html = html.substring(0, areasStart) + html.substring(areasEnd, reviewsStart) + reviewsHtml + '\n\n' + areasHtml + html.substring(reviewsEnd);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed mobile scroll padding and swapped sections.');
