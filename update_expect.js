const fs = require('fs');

let js = fs.readFileSync('assets/js/estimator.js', 'utf8');

// The new "What to Expect Next" block
const expectHtml = `
                    <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(201, 169, 110, 0.05); border-left: 4px solid var(--brand-red); border-radius: 4px;">
                        <h4 style="color: var(--brand-red); margin-bottom: 0.5rem; font-family: 'Oswald', serif; font-size: 1.2rem; text-transform: uppercase;">What to Expect Next</h4>
                        <ol style="margin-left: 1.2rem; color: var(--text-light); font-size: 0.9rem; line-height: 1.6;">
                            <li style="margin-bottom: 0.5rem;"><strong>Download Your Estimate:</strong> Keep a copy of this PDF for your records.</li>
                            <li style="margin-bottom: 0.5rem;"><strong>Book a Site Visit:</strong> Click 'Book Home Survey' to schedule a time for us to visit your property.</li>
                            <li><strong>Final Fixed Quote:</strong> <span style="color: var(--champagne); font-weight: 500;">All estimates are strictly subject to a full site visit.</span> Once we assess the actual pipework, access, and specific requirements, we will provide you with a final, fixed-price quotation.</li>
                        </ol>
                    </div>
`;

// Insert it into renderOutput() right after the summary-item list (before the action buttons)
js = js.replace(
    /<\/div>\s*<div class="action-buttons"/,
    `</div>
                    ${expectHtml}
                    <div class="action-buttons"`
);

// Also make the disclaimer even more explicit
js = js.replace(
    /<strong>Disclaimer:<\/strong> All estimates provided are indicative only and based on standard installation assumptions. Actual costs may vary by up to ±30% following a detailed site survey, access assessment, design requirements, specification changes and existing system conditions./g,
    "<strong>Important:</strong> All estimates provided are indicative only. <strong>All estimates are subject to a full site visit.</strong> Actual costs will vary following a detailed site survey, access assessment, and final specification."
);

fs.writeFileSync('assets/js/estimator.js', js, 'utf8');
console.log('Added what to expect section.');
