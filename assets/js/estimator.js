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
    if(state.category !== id) {
        state.category = id;
        state.config = {}; // Reset config for new category
    }
    render();
    setTimeout(() => {
        nextStep();
    }, 150);
}

function updateConfig(key, val) {
    state.config[key] = val;
    render();
}

function renderRadioGroup(key, label, options) {
    let html = `<div class="form-group" style="margin-bottom: 2rem;">
        <label class="form-label">${label}</label>
        <div class="radio-card-grid">`;
    
    options.forEach(opt => {
        const isChecked = state.config[key] === opt.value;
        html += `
            <label class="radio-card" style="${isChecked ? 'border-color: var(--champagne); background: rgba(201, 169, 110, 0.05);' : ''}">
                <input type="radio" name="conf_${key}" value="${opt.value}" ${isChecked ? 'checked' : ''} onchange="updateConfig('${key}', '${opt.value}')">
                <span class="label-text">${opt.label}</span>
                ${opt.priceLabel ? `<span class="price-tag">${opt.priceLabel}</span>` : ''}
            </label>
        `;
    });
    
    html += `</div></div>`;
    return html;
}

function renderConfiguration() {
    let inputs = '';
    
    if (state.category === 'boiler') {
        state.config.type = state.config.type || '3500';
        state.config.smart = state.config.smart || '0';
        inputs += renderRadioGroup('type', 'Type of Boiler', [
            { value: '2500', label: 'Budget Boiler', priceLabel: '~£2.5k' },
            { value: '3500', label: 'Mid-Range Boiler', priceLabel: '~£3.5k' },
            { value: '5500', label: 'Premium Boiler', priceLabel: '~£5.5k' }
        ]);
        inputs += renderRadioGroup('smart', 'Add Smart Controls?', [
            { value: '0', label: 'No, standard controls' },
            { value: '350', label: 'Yes, add Hive/Nest', priceLabel: '+£350' }
        ]);
    } 
    else if (state.category === 'bathroom') {
        state.config.spec = state.config.spec || '7000';
        state.config.tile = state.config.tile || 'wet';
        inputs += renderRadioGroup('spec', 'Specification Level', [
            { value: '7000', label: 'Standard', priceLabel: '£5k - £9k' },
            { value: '12000', label: 'Premium', priceLabel: '£9k - £15k' },
            { value: '25000', label: 'Luxury', priceLabel: '£15k+' }
        ]);
        inputs += renderRadioGroup('tile', 'Tiling Scope', [
            { value: 'wet', label: 'Wet Zones Only' },
            { value: 'half', label: 'Half Tiled' },
            { value: 'full', label: 'Fully Tiled (Floor to Ceiling)' }
        ]);
    }
    else if (state.category === 'ufh') {
        state.config.area = state.config.area || 'med';
        state.config.system = state.config.system || 'water';
        inputs += renderRadioGroup('area', 'Floor Area', [
            { value: 'small', label: 'Small (< 20m²)' },
            { value: 'med', label: 'Medium (20 - 50m²)' },
            { value: 'large', label: 'Large (50m²+)' }
        ]);
        inputs += renderRadioGroup('system', 'System Type', [
            { value: 'electric', label: 'Electric Matting' },
            { value: 'water', label: 'Warm Water System' }
        ]);
    }
    else if (state.category === 'ashp') {
        state.config.size = state.config.size || '3bed';
        state.config.rads = state.config.rads || 'keep';
        inputs += renderRadioGroup('size', 'Property Size', [
            { value: '2bed', label: '2-Bed Home' },
            { value: '3bed', label: '3-Bed Home' },
            { value: '4bed', label: '4+ Bed Home' }
        ]);
        inputs += renderRadioGroup('rads', 'Radiator Upgrades', [
            { value: 'keep', label: 'Keep Existing' },
            { value: 'upgrade', label: 'Upgrade All (Recommended)' }
        ]);
    }
    else if (state.category === 'radiator') {
        state.config.qty = state.config.qty || '3to5';
        state.config.style = state.config.style || 'standard';
        inputs += renderRadioGroup('qty', 'Quantity', [
            { value: '1to2', label: '1 - 2 Radiators' },
            { value: '3to5', label: '3 - 5 Radiators' },
            { value: '6plus', label: '6+ Radiators' }
        ]);
        inputs += renderRadioGroup('style', 'Style', [
            { value: 'standard', label: 'Standard Panel' },
            { value: 'designer', label: 'Designer / Column' }
        ]);
    }
    else if (state.category === 'cylinder') {
        state.config.type = state.config.type || 'unvented';
        state.config.cap = state.config.cap || 'standard';
        inputs += renderRadioGroup('type', 'System Type', [
            { value: 'vented', label: 'Vented (Gravity)' },
            { value: 'unvented', label: 'Unvented (Megaflo)' }
        ]);
        inputs += renderRadioGroup('cap', 'Capacity', [
            { value: 'standard', label: 'Standard (~150L)' },
            { value: 'large', label: 'Large (250L+)' }
        ]);
    }
    else if (state.category === 'extension') {
        state.config.scope = state.config.scope || 'single';
        inputs += renderRadioGroup('scope', 'Scope of Work', [
            { value: 'single', label: 'Single Story (Kitchen)' },
            { value: 'double', label: 'Double Story (+ Bath)' },
            { value: 'wrap', label: 'Full Wrap-around' }
        ]);
    }
    else if (state.category === 'softener') {
        state.config.size = state.config.size || '3to4';
        inputs += renderRadioGroup('size', 'Household Size', [
            { value: '1to2', label: '1 - 2 People' },
            { value: '3to4', label: '3 - 4 People' },
            { value: '5plus', label: '5+ People' }
        ]);
    }
    else if (state.category === 'repipe') {
        state.config.size = state.config.size || '3bed';
        inputs += renderRadioGroup('size', 'Property Size', [
            { value: 'flat', label: 'Flat / Bungalow' },
            { value: '3bed', label: '3-Bed House' },
            { value: '4bed', label: '4+ Bed House' }
        ]);
    }

    return `
        <div class="wizard-step-content active">
            <h3 class="step-title">Configure your project</h3>
            <p class="step-subtitle">Tell us a bit more about your specific requirements.</p>
            ${inputs}
        </div>
    `;
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
                            <option value="1" ${state.details.complexity === 1 ? 'selected' : ''}>Standard Access (x1.0)</option>
                            <option value="1.1" ${state.details.complexity === 1.1 ? 'selected' : ''}>Slightly Restricted (x1.1)</option>
                            <option value="1.3" ${state.details.complexity === 1.3 ? 'selected' : ''}>Complex Property (x1.3)</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Your Name *</label>
                    <input type="text" class="form-control" id="lead_name" placeholder="John Doe" value="${state.lead.name || ''}" onchange="state.lead.name = this.value">
                </div>
                <div class="form-group">
                    <label class="form-label">Email Address *</label>
                    <input type="email" class="form-control" id="lead_email" placeholder="john@example.com" value="${state.lead.email || ''}" onchange="state.lead.email = this.value">
                </div>
                <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" class="form-control" id="lead_phone" placeholder="07..." value="${state.lead.phone || ''}" onchange="state.lead.phone = this.value">
                </div>
            </div>
        </div>
    `;
}

function calculateBase() {
    let base = 1500;
    const c = state.config;
    
    if (state.category === 'boiler') {
        base = parseInt(c.type) + parseInt(c.smart);
        state.estimatedDays = '1 - 2';
    } else if (state.category === 'bathroom') {
        base = parseInt(c.spec);
        if (c.tile === 'half') base += 1500;
        if (c.tile === 'full') base += 3000;
        state.estimatedDays = '5 - 10';
    } else if (state.category === 'ufh') {
        base = c.system === 'electric' ? 1000 : 3500;
        if (c.area === 'med') base *= 1.5;
        if (c.area === 'large') base *= 2.5;
        state.estimatedDays = '3 - 5';
    } else if (state.category === 'ashp') {
        base = c.size === '2bed' ? 10000 : (c.size === '3bed' ? 12000 : 15000);
        if (c.rads === 'upgrade') base += 3500;
        state.estimatedDays = '4 - 7';
    } else if (state.category === 'radiator') {
        let perRad = c.style === 'standard' ? 250 : 500;
        if (c.qty === '1to2') base = perRad * 1.5;
        if (c.qty === '3to5') base = perRad * 4;
        if (c.qty === '6plus') base = perRad * 7;
        state.estimatedDays = '1 - 2';
    } else if (state.category === 'cylinder') {
        base = c.type === 'vented' ? 1200 : 2500;
        if (c.cap === 'large') base += 500;
        state.estimatedDays = '1 - 2';
    } else if (state.category === 'extension') {
        if (c.scope === 'single') base = 3000;
        if (c.scope === 'double') base = 6000;
        if (c.scope === 'wrap') base = 9000;
        state.estimatedDays = '5 - 10';
    } else if (state.category === 'softener') {
        if (c.size === '1to2') base = 1200;
        if (c.size === '3to4') base = 1600;
        if (c.size === '5plus') base = 2200;
        state.estimatedDays = '1';
    } else if (state.category === 'repipe') {
        if (c.size === 'flat') base = 4000;
        if (c.size === '3bed') base = 7000;
        if (c.size === '4bed') base = 10000;
        state.estimatedDays = '7 - 14';
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
        // Form handled by onchange inputs, validate here
        const name = document.getElementById('lead_name').value;
        const email = document.getElementById('lead_email').value;
        if (!name || !email) {
            alert("Please provide your name and email to generate the estimate.");
            return;
        }
        state.lead.name = name;
        state.lead.email = email;
        
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
