const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    'filter: grayscale(30%) brightness(0.8);',
    'filter: brightness(1);'
);

html = html.replace(
    'filter: grayscale(0%) brightness(0.9);',
    'filter: brightness(1.15) contrast(1.1);'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed image vividness.');
