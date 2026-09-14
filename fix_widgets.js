const fs = require('fs');

let content = fs.readFileSync('social-media.html', 'utf8');

const fbUrl = 'https://www.facebook.com/people/Hewitt-Plumbing-Heating/61594263961594/';

const googleReviewHTML = `
        <div style="text-align:center; padding: 3rem; border: 2px solid var(--border-dark); border-radius: 8px; background: var(--bg-black);">
            <h3 style="color: var(--text-light); margin-bottom: 1rem; font-family: 'Oswald', sans-serif; font-size: 1.8rem; text-transform: uppercase;">Happy with our work?</h3>
            <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 2rem;">Your feedback helps us grow. Please take a moment to leave us a review on Google.</p>
            <a href="https://g.page/r/leave-review" target="_blank" class="btn-primary" style="display:inline-block; padding: 1rem 2rem; background: var(--brand-red); color: var(--bg-black); text-decoration:none; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; transition: 0.3s ease;">
                &#9733; Leave a Google Review &#9733;
            </a>
        </div>
`;

const fbHTML = `
        <div style="text-align:center; padding: 2rem; background: var(--text-light); border-radius: 8px;">
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpeople%2FHewitt-Plumbing-Heating%2F61594263961594%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            <div style="margin-top: 1rem;">
                <a href="${fbUrl}" target="_blank" style="color: #1877F2; text-decoration: none; font-weight: 600;">Visit our Facebook Page &rarr;</a>
            </div>
        </div>
`;

const instaHTML = `
        <div style="text-align:center; padding: 3rem; border: 2px dashed var(--border-dark); border-radius: 8px;">
            <h3 style="color: var(--text-light); margin-bottom: 1rem;">Instagram Coming Soon</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Our latest project photos will be featured here.</p>
        </div>
`;

// Regex to match the three generic placeholders
const placeholderRegex = /<div class="elfsight-app-placeholder"[\s\S]*?<\/div>\s*<\/div>/g;
let matches = content.match(placeholderRegex);

if (matches && matches.length >= 3) {
    content = content.replace(matches[0], googleReviewHTML);
    content = content.replace(matches[1], instaHTML);
    content = content.replace(matches[2], fbHTML);
}

fs.writeFileSync('social-media.html', content, 'utf8');
console.log('Updated widgets with Facebook embed and Google Review button.');
