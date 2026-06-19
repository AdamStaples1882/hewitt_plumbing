// assets/js/estimator.js

const categories = [
    { id: 'ufh', name: 'Underfloor Heating', desc: 'Water or electric systems' },
    { id: 'boiler', name: 'Boiler Replacement', desc: 'Combi, System or Conventional' },
    { id: 'ashp', name: 'Air Source Heat Pump', desc: 'Renewable heating' },
    { id: 'bathroom', name: 'Bathroom Installation', desc: 'Full refits & wet rooms' },
    { id: 'radiator', name: 'Radiator Install', desc: 'New or replacement radiators' },
    { id: 'cylinder', name: 'Cylinder Install', desc: 'Unvented or vented systems' },
    { id: 'extension', name: 'Plumbing for Extension', desc: 'New build or extensions' },
    { id: 'softener', name: 'Water Softener', desc: 'Hard water solutions' },
    { id: 'repipe', name: 'Whole House Repipe', desc: 'Complete pipework replacement' }
];

let state = {
    step: 1,
    category: null,
    config: {},
    details: { complexity: 1, region: 1 },
    lead: {},
    baseEstimate: 0,
    estimatedDays: '1-2'
};

const app = document.getElementById('estimatorApp');

function render() {
    app.innerHTML = `
        <div class="estimator-wizard">
            <div class="wizard-header">
                <h2 class="wizard-title">Instant Estimator</h2>
                <div class="progress-bar-container">
                    <div class="progress-step ${state.step >= 1 ? 'active' : ''} ${state.step > 1 ? 'completed' : ''}">1</div>
                    <div class="progress-step ${state.step >= 2 ? 'active' : ''} ${state.step > 2 ? 'completed' : ''}">2</div>
                    <div class="progress-step ${state.step >= 3 ? 'active' : ''} ${state.step > 3 ? 'completed' : ''}">3</div>
                    <div class="progress-step ${state.step >= 4 ? 'active' : ''} ${state.step > 4 ? 'completed' : ''}">4</div>
                </div>
            </div>
            
            <div class="wizard-body">
                ${renderStep()}
            </div>
            
            ${state.step < 4 ? `
            <div class="wizard-footer">
                <button class="btn-back" onclick="prevStep()" ${state.step === 1 ? 'style="visibility:hidden"' : ''}>Back</button>
                <button class="btn-next" onclick="nextStep()">${state.step === 3 ? 'Get Estimate' : 'Next Step'}</button>
            </div>
            ` : ''}
        </div>
        
        <div class="success-modal" id="successModal">
            <div class="modal-content">
                <h3>Success!</h3>
                <p>Your estimate has been securely emailed to you. You can also download it as a PDF right now.</p>
                <br>
                <button class="btn-next" onclick="closeModal()">View Estimate</button>
            </div>
        </div>
    `;
}

function renderStep() {
    if (state.step === 1) return renderCategorySelect();
    if (state.step === 2) return renderConfiguration();
    if (state.step === 3) return renderDetails();
    if (state.step === 4) return renderOutput();
}

function renderCategorySelect() {
    return `
        <div class="wizard-step-content active">
            <h3 class="step-title">What do you need help with?</h3>
            <p class="step-subtitle">Select the primary focus of your project to begin building your custom estimate.</p>
            <div class="category-grid">
                ${categories.map(c => `
                    <div class="category-card ${state.category === c.id ? 'selected' : ''}" onclick="selectCategory('${c.id}')">
                        <div class="category-name">${c.name}</div>
                        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">${c.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function selectCategory(id) {
    state.category = id;
    render();
    setTimeout(() => {
        nextStep();
    }, 150);
}

function renderConfiguration() {
    let inputs = '';
    
    if (state.category === 'boiler') {
        inputs = `
            <div class="input-grid">
                <div class="form-group">
                    <label class="form-label">Type of Boiler</label>
                    <div class="estimate-select-wrapper">
                        <select class="form-control" id="conf_type" onchange="updateConfig('type', this.value)">
                            <option value="2500" ${state.config.type === '2500' ? 'selected' : ''}>Budget Boiler</option>
                            <option value="3500" ${state.config.type === '3500' ? 'selected' : ''}>Mid Range Boiler</option>
                            <option value="5500" ${state.config.type === '5500' ? 'selected' : ''}>Premium Boiler</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Smart Controls? <span class="help-icon" title="Smart controls like Nest or Hive allow remote heating control.">?</span></label>
                    <div class="estimate-select-wrapper">
                        <select class="form-control" id="conf_smart" onchange="updateConfig('smart', this.value)">
                            <option value="0" ${state.config.smart === '0' ? 'selected' : ''}>No</option>
                            <option value="350" ${state.config.smart === '350' ? 'selected' : ''}>Yes (+£350)</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    } else if (state.category === 'bathroom') {
        inputs = `
            <div class="input-grid">
                <div class="form-group">
                    <label class="form-label">Specification Level</label>
                    <div class="estimate-select-wrapper">
                        <select class="form-control" id="conf_spec" onchange="updateConfig('spec', this.value)">
                            <option value="7000" ${state.config.spec === '7000' ? 'selected' : ''}>Standard (£5k - £9k)</option>
                            <option value="12000" ${state.config.spec === '12000' ? 'selected' : ''}>Premium (£9k - £15k)</option>
                            <option value="25000" ${state.config.spec === '25000' ? 'selected' : ''}>Luxury (£15k+)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="help-tip-content" style="display:block">
                <strong>Help Tip:</strong> Tile choice and plumbing alterations are often the largest cost variables in a bathroom installation.
            </div>
        `;
    } else {
        // Generic fallback for others for brevity in this MVP
        inputs = `
            <div class="form-group">
                <label class="form-label">Estimated Base Value</label>
                <p>We will calculate a standard indicative cost for this service type.</p>
            </div>
        `;
        state.config.spec = '1500'; // Default arbitrary base
    }

    return `
        <div class="wizard-step-content active">
            <h3 class="step-title">Configure your project</h3>
            <p class="step-subtitle">Tell us a bit more about your specific requirements.</p>
            ${inputs}
        </div>
    `;
}

function updateConfig(key, val) {
    state.config[key] = val;
}

function renderDetails() {
    return `
        <div class="wizard-step-content active">
            <h3 class="step-title">Property & Contact Details</h3>
            <p class="step-subtitle">We use this to apply regional pricing and to send your estimate.</p>
            
            <div class="input-grid">
                <div class="form-group">
                    <label class="form-label">Property Complexity / Access</label>
                    <div class="estimate-select-wrapper">
                        <select class="form-control" id="det_complex" onchange="state.details.complexity = parseFloat(this.value)">
                            <option value="1">Standard Access (x1.0)</option>
                            <option value="1.1">Slightly Restricted (x1.1)</option>
                            <option value="1.3">Complex Property (x1.3)</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Your Name *</label>
                    <input type="text" class="form-control" id="lead_name" placeholder="John Doe">
                </div>
                <div class="form-group">
                    <label class="form-label">Email Address *</label>
                    <input type="email" class="form-control" id="lead_email" placeholder="john@example.com">
                </div>
                <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" class="form-control" id="lead_phone" placeholder="07...">
                </div>
            </div>
        </div>
    `;
}

function calculateBase() {
    let base = 1500;
    if (state.category === 'boiler') {
        base = parseInt(state.config.type || 3500) + parseInt(state.config.smart || 0);
        state.estimatedDays = '1 - 2';
    } else if (state.category === 'bathroom') {
        base = parseInt(state.config.spec || 12000);
        state.estimatedDays = '5 - 10';
    } else if (state.category === 'ufh') {
        base = 4500; state.estimatedDays = '3 - 5';
    } else if (state.category === 'ashp') {
        base = 12000; state.estimatedDays = '4 - 7';
    } else if (state.category === 'radiator') {
        base = 800; state.estimatedDays = '1';
    } else {
        base = 2500; state.estimatedDays = '1 - 3';
    }
    
    return base * state.details.complexity;
}

function renderOutput() {
    const base = calculateBase();
    const lower = Math.round((base * 0.7) / 10) * 10;
    const upper = Math.round((base * 1.3) / 10) * 10;
    
    return `
        <div class="wizard-step-content active" id="pdfCaptureArea">
            <div style="text-align:center; margin-bottom: 2rem;">
                <div style="font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: var(--deep-black);">Hewitt Plumbing & Heating</div>
                <div style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Official Estimate Summary</div>
            </div>
            
            <div class="summary-container">
                <div class="summary-main">
                    <h3 class="step-title">Your Custom Estimate</h3>
                    <p class="step-subtitle">Thank you. Based on the industry averages and your provided details, here is your indicative project cost.</p>
                    
                    <div class="summary-item" style="border-bottom: 1px solid var(--stone); padding-bottom: 1rem; margin-bottom: 1rem;">
                        <span>Project Type</span>
                        <span>${categories.find(c=>c.id===state.category)?.name}</span>
                    </div>
                    <div class="summary-item">
                        <span>Expected Duration</span>
                        <span>${state.estimatedDays} Days</span>
                    </div>
                    <div class="summary-item">
                        <span>Confidence Rating</span>
                        <span style="color: var(--champagne);">★★★★☆</span>
                    </div>
                    
                    <div style="margin-top: 3rem;">
                        <button class="btn-next" onclick="downloadPDF()" data-html2canvas-ignore>Download PDF</button>
                        <a href="index.html#contact" class="btn-back" style="margin-left: 1rem; text-decoration: none; display: inline-block;" data-html2canvas-ignore>Book Home Survey</a>
                    </div>
                </div>
                
                <div class="summary-sidebar">
                    <div style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-secondary); margin-bottom: 0.5rem;">Estimated Cost</div>
                    <div class="summary-price">£${lower.toLocaleString()} <span style="font-size:2rem; color:var(--text-muted)">-</span> £${upper.toLocaleString()}</div>
                    <p style="font-size: 0.8rem; color: var(--text-secondary);">Includes estimated Labour & Materials.</p>
                    
                    <div class="summary-disclaimer">
                        <strong>Disclaimer:</strong> All estimates provided are indicative only and based on standard installation assumptions. Actual costs may vary by up to ±30% following a detailed site survey, access assessment, design requirements, specification changes and existing system conditions.
                    </div>
                </div>
            </div>
        </div>
    `;
}

function nextStep() {
    if (state.step === 1 && !state.category) {
        alert("Please select a project category.");
        return;
    }
    if (state.step === 3) {
        // Validate lead form
        const name = document.getElementById('lead_name').value;
        const email = document.getElementById('lead_email').value;
        if (!name || !email) {
            alert("Please provide your name and email to generate the estimate.");
            return;
        }
        state.lead = { name, email };
        
        // Trigger mock email
        document.getElementById('successModal').classList.add('active');
    }
    
    state.step++;
    render();
}

function prevStep() {
    state.step--;
    render();
}

function closeModal() {
    document.getElementById('successModal').classList.remove('active');
}

function downloadPDF() {
    const element = document.getElementById('pdfCaptureArea');
    const opt = {
        margin:       1,
        filename:     'Hewitt_Plumbing_Estimate.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
}

// Init
render();
