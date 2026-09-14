const fs = require('fs');

let content = fs.readFileSync('social-media.html', 'utf8');

// Remove Instagram
content = content.replace(/<!-- Instagram Feed -->[\s\S]*?<!-- Facebook Feed -->/, '<!-- Facebook Feed -->');

// Rebuild the Facebook block
const fbHtml = `<!-- Facebook Feed -->
        <div class="social-widget-container">
            <h2>Connect on Facebook</h2>
            <div style="text-align:center; padding: 4rem 2rem; background: var(--bg-black); border: 2px solid #1877F2; border-radius: 8px;">
                <h3 style="color: var(--text-light); margin-bottom: 1rem; font-family: 'Oswald', sans-serif; font-size: 1.8rem;">Hewitt Plumbing & Heating</h3>
                <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 2rem;">Follow us on Facebook for our latest projects, updates, and customer stories.</p>
                <a href="https://www.facebook.com/people/Hewitt-Plumbing-Heating/61594263961594/" target="_blank" class="btn-primary" style="display:inline-block; padding: 1rem 2rem; background: #1877F2; color: #ffffff; text-decoration:none; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; transition: 0.3s ease; border-radius: 4px;">
                    View Facebook Page
                </a>
            </div>
        </div>
    </div>`;

content = content.replace(/<!-- Facebook Feed -->[\s\S]*?<\/div>\s*<\/div>\s*<footer>/, fbHtml + '\n\n    <footer>');

fs.writeFileSync('social-media.html', content, 'utf8');
console.log('Fixed social widgets.');
