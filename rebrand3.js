const fs = require('fs');

let content = fs.readFileSync('estimate.html', 'utf8');

// Logo CSS
content = content.replace(
`        .logo { display: flex; align-items: center; gap: 1.2rem; text-decoration: none; transition: var(--transition-fast); }
        .logo:hover { opacity: 0.8; }
        .logo-mark { width: 48px; height: 48px; border: 1.5px solid var(--brand-red); border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .logo-mark::before { content: ''; position: absolute; inset: 3px; border: 1px solid var(--brand-red); border-radius: 50%; opacity: 0.5; }
        .logo-mark span { font-family: 'Oswald', serif; font-size: 1.1rem; font-weight: 600; color: var(--text-light); letter-spacing: 0.05em; }
        .logo-text { display: flex; flex-direction: column; }
        .logo-text .brand { font-family: 'Oswald', serif; font-size: 1.5rem; font-weight: 500; color: var(--text-primary); letter-spacing: 0.08em; line-height: 1.2; text-transform: uppercase; }
        .logo-text .tagline { font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.25em; font-weight: 400; margin-top: 0.1rem; }`,

`        .logo { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; text-decoration: none; transition: var(--transition-fast); }
        .logo:hover { transform: scale(1.05); }
        .logo-mark { width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; position: relative; font-size: 2.5rem; color: var(--brand-red); text-shadow: 0 0 10px rgba(230,0,0,0.5); margin-bottom: -10px; }
        .logo-text { display: flex; flex-direction: column; align-items: center; }
        .logo-text .brand { font-family: 'Oswald', sans-serif; font-size: 2.2rem; font-weight: 700; color: #ffffff; letter-spacing: 0.05em; line-height: 1; text-transform: uppercase; background: linear-gradient(to bottom, #ffffff 40%, #aaaaaa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(2px 2px 0 rgba(230,0,0,0.8)); margin-bottom: 2px; }
        .logo-text .tagline { font-family: 'Oswald', sans-serif; font-size: 0.75rem; color: #ffffff; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; background: var(--brand-red); padding: 2px 8px; border-radius: 2px; }`
);

// HTML Logo Mark (replace HP with SVG flame)
content = content.replace(
`                <div class="logo-mark" aria-hidden="true"><span>HP</span></div>`,
`                <div class="logo-mark" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="var(--brand-red)" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg></div>`
);

fs.writeFileSync('estimate.html', content, 'utf8');
console.log('Estimate.html logo fixed.');
