document.addEventListener('DOMContentLoaded', () => {
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const step = parseInt(button.dataset.step);
            nextStep(step);
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const step = parseInt(button.dataset.step);
            prevStep(step);
        });
    });
});

function displayFinalDetails() {
    const selectedPlan = document.querySelector('input[name="plan"]:checked');
    const selectedAddOns = document.querySelectorAll('input[name="add-ons"]:checked');

    if (!selectedPlan) {
        alert('Please select a plan.');
        return;
    }

    let planName = selectedPlan.nextElementSibling.querySelector('.image-text').textContent;
    let planPrice = selectedPlan.nextElementSibling.querySelector('.price').textContent;

    let addOns = [];
    let totalPrice = parseFloat(planPrice.replace(/[^0-9.]/g, ''));

    selectedAddOns.forEach(addOn => {
        let addOnName = addOn.nextElementSibling.querySelector('.top').textContent;
        let addOnPrice = addOn.nextElementSibling.querySelector('.price-for').textContent;
        totalPrice += parseFloat(addOnPrice.replace(/[^0-9.]/g, ''));
        addOns.push({
            name: addOnName,
            price: addOnPrice
        });
    });

    document.querySelector('.selected-plan').textContent = planName;
    document.querySelector('.selected-price').textContent = planPrice;

    let addOnsContainer = document.querySelector('.selected-addons-container');
    addOnsContainer.innerHTML = ''; // Clear previous add-ons
    addOns.forEach(addOn => {
        let addOnElement = document.createElement('p');
        addOnElement.textContent = `${addOn.name} ${addOn.price}`;
        addOnsContainer.appendChild(addOnElement);
    });

    document.querySelector('.total-price').textContent = `$${totalPrice}/mon`;
}

document.querySelector('.next-step[data-step="3"]').addEventListener('click', displayFinalDetails);

function nextStep(num) {
    let currentStep = document.querySelector('.step-section.active');
    currentStep.classList.remove('active');
    
    let nextStepEl = document.getElementById(`step${num + 1}`);
    nextStepEl.classList.add('active');
    
    let currentCircle = document.querySelector('.circle.selected');
    currentCircle.classList.remove('selected');
    
    let nextCircle = document.getElementById(`circle${num + 1}`);
    nextCircle.classList.add('selected');
}

function prevStep(num) {
    let currentStep = document.querySelector('.step-section.active');
    currentStep.classList.remove('active');
    
    let prevStepEl = document.getElementById(`step${num - 1}`);
    prevStepEl.classList.add('active');
    
    let currentCircle = document.querySelector('.circle.selected');
    currentCircle.classList.remove('selected');
    
    let prevCircle = document.getElementById(`circle${num - 1}`);
    prevCircle.classList.add('selected');
}
