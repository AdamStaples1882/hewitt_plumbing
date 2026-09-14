const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');
const nav = indexContent.match(/<nav[^>]*>[\s\S]*?<\/nav>/)[0];
const footer = indexContent.match(/<footer[^>]*>[\s\S]*?<\/footer>/)[0];

const pageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hewitt Plumbing & Heating | Social Media & Reviews</title>
    <meta name="description" content="Check out our latest work and customer reviews. We are St Albans' top-rated plumbing and heating contractors.">
    <link rel="canonical" href="https://www.hewittplumbing.co.uk/social-media.html" />
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Dancing+Script:wght@500;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- We can reuse the main CSS or define inline for the specific sections -->
    <style>
        :root {
            --bg-black: #000000;
            --bg-dark: #111111;
            --bg-card: #1a1a1a;
            --brand-red: #e60000;
            --brand-red-light: #ff1a1a;
            --text-light: #ffffff;
            --border-dark: #333333;
            --transition-medium: all 0.3s ease;
            --transition-fast: all 0.2s ease;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background-color: var(--bg-black); color: var(--text-light); line-height: 1.6; overflow-x: hidden; }
        
        /* Navbar styles pulled from index */
        #navbar { padding: 1.5rem 5%; background: var(--bg-black); border-bottom: 1px solid var(--border-dark); position: sticky; top: 0; z-index: 100; transition: var(--transition-medium); }
        .nav-container { display: flex; justify-content: space-between; align-items: center; max-width: 1400px; margin: 0 auto; }
        .nav-links { display: flex; list-style: none; gap: 2.5rem; align-items: center; }
        .nav-links li a { font-size: 0.85rem; font-weight: 400; text-transform: uppercase; letter-spacing: 0.1em; transition: var(--transition-fast); color: var(--text-light); text-decoration: none; }
        .nav-links li a:hover { color: var(--brand-red); }
        .nav-cta { border: 1px solid var(--brand-red); padding: 0.8rem 1.5rem; transition: var(--transition-medium) !important; color: var(--brand-red); text-decoration: none; text-transform: uppercase; font-size: 0.85rem; font-weight: 500; }
        .nav-cta:hover { background: var(--brand-red); color: var(--bg-black) !important; }
        .mobile-menu-btn { display: none; background: none; border: none; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; color: var(--text-light); }
        
        @media (max-width: 900px) {
            .nav-links { display: none; }
            .mobile-menu-btn { display: block; }
        }

        /* Footer styles */
        footer { background: var(--bg-black); padding: 6rem 5% 2rem; position: relative; border-top: 1px solid var(--border-dark); }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; margin-bottom: 4rem; }
        .footer-brand { text-align: center; }
        .footer-brand p { margin: 0 auto; margin-top: 1.5rem; color: rgba(255, 255, 255, 0.85); font-size: 0.95rem; line-height: 1.9; font-weight: 300; max-width: 320px; }
        .footer-col h4 { color: var(--brand-red); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 2rem; font-weight: 500; }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .footer-col ul li a, .footer-col ul li { color: rgba(255, 255, 255, 0.85); text-decoration: none; font-size: 0.85rem; transition: var(--transition-fast); font-weight: 300; }
        .footer-col ul li a:hover { color: var(--brand-red); padding-left: 5px; }
        .footer-bottom { max-width: 1400px; margin: 0 auto; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.15); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.75rem; color: rgba(255, 255, 255, 0.85); text-transform: uppercase; letter-spacing: 0.15em; }

        /* Social Page Content */
        .social-header {
            text-align: center;
            padding: 4rem 2rem;
            background: linear-gradient(to bottom, rgba(230,0,0,0.1), transparent);
        }
        .social-header h1 {
            font-family: 'Oswald', sans-serif;
            font-size: 3.5rem;
            text-transform: uppercase;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 10px rgba(230,0,0,0.3);
        }
        .social-header p {
            font-size: 1.2rem;
            color: rgba(255,255,255,0.8);
            max-width: 600px;
            margin: 0 auto;
        }
        .social-grid {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 5% 4rem;
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
        }
        .social-widget-container {
            background: var(--bg-card);
            border: 1px solid var(--border-dark);
            border-radius: 8px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .social-widget-container h2 {
            font-family: 'Oswald', sans-serif;
            font-size: 2rem;
            color: var(--brand-red);
            text-transform: uppercase;
            margin-bottom: 1.5rem;
            text-align: center;
        }
    </style>
    <!-- Elfsight scripts -->
    <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
</head>
<body>

    ${nav}

    <div class="social-header">
        <h1>Social Media & Reviews</h1>
        <p>See our latest installations, emergency repairs, and what our customers in St Albans have to say about our work.</p>
    </div>

    <div class="social-grid">
        <!-- Google Reviews -->
        <div class="social-widget-container">
            <h2>Customer Reviews</h2>
            <!-- Placeholder for Elfsight Google Reviews Widget -->
            <div class="elfsight-app-placeholder" style="text-align:center; padding: 3rem; color: #888;">
                <p>Google Reviews Widget Loading...</p>
                <div class="elfsight-app-58b99c4c-7c09-4740-a197-0092c73336bc"></div> <!-- Generic ID, can be replaced -->
            </div>
        </div>

        <!-- Instagram Feed -->
        <div class="social-widget-container">
            <h2>Our Latest Work on Instagram</h2>
            <!-- Placeholder for Elfsight Instagram Widget -->
            <div class="elfsight-app-placeholder" style="text-align:center; padding: 3rem; color: #888;">
                <p>Instagram Feed Loading...</p>
                <div class="elfsight-app-399dc976-b3ea-42b7-a3f2-89decd395b09"></div> <!-- Generic ID, can be replaced -->
            </div>
        </div>
        
        <!-- Facebook Feed -->
        <div class="social-widget-container">
            <h2>Facebook Updates</h2>
            <!-- Placeholder for Elfsight Facebook Widget -->
            <div class="elfsight-app-placeholder" style="text-align:center; padding: 3rem; color: #888;">
                <p>Facebook Feed Loading...</p>
                <div class="elfsight-app-9760773d-82d2-45e0-8888-29471de9996d"></div> <!-- Generic ID, can be replaced -->
            </div>
        </div>
    </div>

    ${footer}

</body>
</html>`;

fs.writeFileSync('social-media.html', pageHTML, 'utf8');

// Now update navigation in ALL pages to point to social-media.html instead of social.html
const files = ['index.html', 'estimate.html', 'social-media.html'];
for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/href="social\.html"/g, 'href="social-media.html"');
    fs.writeFileSync(file, content, 'utf8');
}

console.log('social-media.html built.');
