const fs = require('fs');

const mobileCSS = `
        /* EXTRA MOBILE FIXES */
        @media (max-width: 1024px) {
            .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 3rem !important; }
            .social-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 992px) {
            .nav-links { display: none; position: absolute; top: 100%; left: 0; right: 0; background: var(--bg-black); flex-direction: column; padding: 2rem; gap: 1.5rem; z-index: 1000; border-bottom: 2px solid var(--brand-red); text-align: center; }
            .nav-links.active { display: flex !important; }
            .mobile-menu-btn { display: block; background: none; border: 1px solid var(--brand-red); color: var(--brand-red); padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; text-transform: uppercase; font-weight: bold; }
        }
        @media (max-width: 768px) {
            .footer-grid { grid-template-columns: 1fr !important; text-align: center; }
            .footer-brand p { max-width: 100% !important; }
            .footer-col ul { display: flex; flex-direction: column; align-items: center; }
        }
`;

const toggleJS = `
    <script>
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            const btn = document.querySelector('.mobile-menu-btn');
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            btn.setAttribute('aria-expanded', isExpanded);
        }
    </script>
`;

function fixFile(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Add CSS before </style>
    if (!content.includes('/* EXTRA MOBILE FIXES */')) {
        content = content.replace('</style>', mobileCSS + '\n    </style>');
    }

    // Add JS before </body>
    if (!content.includes('function toggleMenu()')) {
        content = content.replace('</body>', toggleJS + '\n</body>');
    }

    fs.writeFileSync(file, content, 'utf8');
}

fixFile('estimate.html');
fixFile('social-media.html');

// For estimator.css specifically, we also need to append the footer queries
let estCss = fs.readFileSync('assets/css/estimator.css', 'utf8');
if (!estCss.includes('/* EXTRA MOBILE FIXES */')) {
    estCss += '\n\n' + mobileCSS;
    fs.writeFileSync('assets/css/estimator.css', estCss, 'utf8');
}

console.log('Mobile fixes applied.');
