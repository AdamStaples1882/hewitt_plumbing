const fs = require('fs');
const file = 'assets/css/estimator.css';

if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Update hardcoded white backgrounds
    content = content.replace(/background: #ffffff;/g, 'background: var(--bg-card);');
    
    // Update title color
    content = content.replace(/color: var\(--bg-black\);/g, 'color: var(--text-light);');
    
    // Update borders
    content = content.replace(/border-radius: 12px;/g, 'border-radius: 4px; border: 2px solid var(--border-dark);');
    content = content.replace(/border: 1px solid rgba\(0,0,0,0\.08\);/g, 'border: 2px solid var(--border-dark);');
    content = content.replace(/border-color: rgba\(201,\s*169,\s*110/g, 'border-color: rgba(230,0,0');
    content = content.replace(/background: rgba\(201,\s*169,\s*110/g, 'background: rgba(230,0,0');
    
    // Checkbox selections
    content = content.replace(/border-color: var\(--brand-red\);/g, 'border-color: var(--brand-red);'); // Ensure brand-red is used
    content = content.replace(/background: #faf9f7;/g, 'background: var(--bg-dark);');
    
    // Text colors
    content = content.replace(/color: var\(--text-primary\);/g, 'color: var(--text-light);');
    
    // Inputs
    content = content.replace(/background: transparent;/g, 'background: var(--bg-dark); color: var(--text-light);');
    content = content.replace(/border: 1px solid rgba\(0,0,0,0\.2\);/g, 'border: 2px solid var(--border-dark);');
    
    // Summary Box
    content = content.replace(/background: #f8f6f1;/g, 'background: var(--bg-dark);');
    
    // Buttons
    content = content.replace(/box-shadow: 0 10px 20px rgba\(201, 169, 110, 0\.2\);/g, 'box-shadow: 0 10px 20px rgba(230, 0, 0, 0.2);');

    fs.writeFileSync(file, content, 'utf8');
    console.log('Estimator CSS dark mode fixes applied.');
}
