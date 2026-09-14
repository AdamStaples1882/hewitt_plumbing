const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const injection = `
        <div style="text-align: center; margin-top: 4rem;">
            <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 1.1rem; font-family: 'Inter', sans-serif;">Read more of our reviews or leave your own!</p>
            <div style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; padding: 0 1.5rem;">
                <a href="https://g.page/r/leave-review" target="_blank" class="btn-primary" style="display:inline-flex; align-items: center; justify-content: center; padding: 1rem 2rem; background: var(--brand-red); color: var(--bg-black); text-decoration:none; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; transition: 0.3s ease; min-width: 280px;">
                    Google Reviews
                </a>
                <a href="https://www.facebook.com/people/Hewitt-Plumbing-Heating/61594263961594/" target="_blank" class="btn-primary" style="display:inline-flex; align-items: center; justify-content: center; padding: 1rem 2rem; background: #1877F2; color: #ffffff; text-decoration:none; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; transition: 0.3s ease; border: 1px solid #1877F2; min-width: 280px;">
                    Facebook Reviews
                </a>
            </div>
        </div>
`;

// Insert right before the end of the reviews section
html = html.replace('</div>\n    </section>\n\n<section class="areas-section" id="areas">', '</div>\n' + injection + '    </section>\n\n<section class="areas-section" id="areas">');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Added review CTAs to index.html');
