const fs = require('fs');

// 1. Security Update in estimator.js
let js = fs.readFileSync('assets/js/estimator.js', 'utf8');
if (!js.includes('escapeHtml')) {
    const escapeFunc = `
function escapeHtml(unsafe) {
    return (unsafe || '').toString()
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}
`;
    js = js.replace('const app = document.getElementById(\'estimatorApp\');', escapeFunc + '\nconst app = document.getElementById(\'estimatorApp\');');
    js = js.replace(/\$\{state\.lead\.name \|\| 'Valued Customer'\}/g, '${escapeHtml(state.lead.name) || \'Valued Customer\'}');
    js = js.replace(/\$\{state\.lead\.email \? state\.lead\.email \+ '<br>' : ''\}/g, '${state.lead.email ? escapeHtml(state.lead.email) + \'<br>\' : \'\'}');
    js = js.replace(/\$\{state\.lead\.phone \? state\.lead\.phone \+ '<br>' : ''\}/g, '${state.lead.phone ? escapeHtml(state.lead.phone) + \'<br>\' : \'\'}');
    fs.writeFileSync('assets/js/estimator.js', js, 'utf8');
}

// 2. SEO Update in index.html
let html = fs.readFileSync('index.html', 'utf8');

// Title & Meta
html = html.replace(
    '<title>Hewitt Plumbing & Heating | St Albans & Hertfordshire</title>',
    '<title>Hewitt Plumbing & Heating | Expert Plumber in St Albans, Hertfordshire</title>'
);
html = html.replace(
    '<meta property="og:title" content="Hewitt Plumbing & Heating | St Albans & Hertfordshire">',
    '<meta property="og:title" content="Hewitt Plumbing & Heating | Expert Plumber in St Albans, Hertfordshire">'
);
html = html.replace(
    '<meta name="description" content="Hewitt Plumbing & Heating - Your trusted local plumber and Gas Safe registered heating engineer in St Albans, Hertfordshire. Boiler repairs, servicing, installations, gas work & plumbing. Call 07540 182 837.">',
    '<meta name="description" content="Hewitt Plumbing & Heating - Your trusted local St Albans Plumber and Gas Safe registered heating engineer. Expert boiler repairs, servicing, installations, and general plumbing across Hertfordshire. Call 07540 182 837.">'
);

// H1 Update
html = html.replace(
    '<h1>Precision Plumbing & <br><em>Heating</em> Excellence</h1>',
    '<h1>Expert Plumbing & <br><em>Heating</em> in St Albans</h1>'
);

// Alt Tags (SEO)
html = html.replace(
    'alt="High-quality, professional photography of a modern, clean boiler installation in a stylish home"',
    'alt="Professional boiler installation by St Albans Plumber"'
);
html = html.replace(
    'alt="Close up of a professional plumbing engineer\'s hands working with tools on a modern boiler unit"',
    'alt="Gas Safe heating engineer repairing a boiler in Hertfordshire"'
);
html = html.replace(
    'alt="A brand new, sleek, white combi boiler installed neatly on a modern kitchen wall"',
    'alt="New combi boiler installation in St Albans"'
);
html = html.replace(
    'alt="A modern, stylish designer radiator in a beautifully decorated contemporary living room"',
    'alt="Central heating and radiator installation Hertfordshire"'
);
html = html.replace(
    'alt="High-end photography of a luxury kitchen sink with modern brass or chrome mixer tap"',
    'alt="General plumbing and leak repairs in St Albans"'
);

fs.writeFileSync('index.html', html, 'utf8');

console.log('Security and SEO audits complete.');
