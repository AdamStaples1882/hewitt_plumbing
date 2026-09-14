const fs = require('fs');

const cssFix = `
    /* TOP BAR MOBILE FIXES */
    @media (max-width: 992px) {
        .top-bar {
            flex-direction: column !important;
            gap: 0.8rem !important;
            text-align: center !important;
            padding: 1rem 5% !important;
        }
        .top-bar > div:last-child {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.5rem !important;
            align-items: center !important;
        }
        .top-bar .divider {
            display: none !important;
        }
    }
`;

const files = ['index.html', 'estimate.html', 'social-media.html'];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    if (!content.includes('/* TOP BAR MOBILE FIXES */')) {
        content = content.replace('</style>', cssFix + '\n    </style>');
        fs.writeFileSync(file, content, 'utf8');
    }
}

// In case estimate.html loads estimator.css for its top-bar, we should add it there too
let estCss = fs.readFileSync('assets/css/estimator.css', 'utf8');
if (!estCss.includes('/* TOP BAR MOBILE FIXES */')) {
    estCss += '\n\n' + cssFix;
    fs.writeFileSync('assets/css/estimator.css', estCss, 'utf8');
}

console.log('Fixed top-bar styling on mobile.');
