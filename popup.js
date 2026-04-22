
const defaultRPM = 6.50;
const nicheRPMOverrides = {
    finance: 18.00,
    tech: 8.50,
    education: 6.00,
    lifestyle: 3.50,
    gaming: 2.00
};

const viewsInput = document.getElementById('views-input');
const nicheSelect = document.getElementById('niche-select');
const geoSelect = document.getElementById('geo-select');
const taxInput = document.getElementById('tax-input');
const resultVal = document.getElementById('result-val');
const resultContainer = document.getElementById('result-container');

function calculateRevenue() {
    const views = parseFloat(viewsInput.value) || 0;
    const taxRate = (parseFloat(taxInput.value) || 0) / 100;
    const geoMultiplier = parseFloat(geoSelect.value) || 1.0;
    const selectedNiche = nicheSelect.value;
    
    let activeRpm = defaultRPM;
    if (selectedNiche !== 'default' && nicheRPMOverrides[selectedNiche]) {
        activeRpm = nicheRPMOverrides[selectedNiche];
    }

    const grossUSD = (views / 1000) * (activeRpm * geoMultiplier);
    const finalNetUSD = grossUSD - (grossUSD * taxRate);

    animateValue(finalNetUSD);
}

function animateValue(value) {
    resultContainer.classList.remove('rolling');
    void resultContainer.offsetWidth; 
    resultContainer.classList.add('rolling');
    resultVal.innerText = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    }).format(value);
}

[viewsInput, nicheSelect, geoSelect, taxInput].forEach(element => {
    element.addEventListener('input', calculateRevenue);
    element.addEventListener('change', calculateRevenue);
});

calculateRevenue();