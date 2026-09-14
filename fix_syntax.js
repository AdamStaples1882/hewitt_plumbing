const fs = require('fs');
let js = fs.readFileSync('assets/js/estimator.js', 'utf8');
js = js.replace(/\\`/g, '`');
js = js.replace(/\\\$/g, '$');
fs.writeFileSync('assets/js/estimator.js', js, 'utf8');
console.log('Fixed syntax error.');
