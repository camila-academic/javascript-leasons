let lastSlide = 0;
let slide = 0;
let step = 0;

let slides = [];


function main() {
    slide = Number(sessionStorage.getItem('global.slide')) || 0;
    step = Number(sessionStorage.getItem('global.step')) || 0;

    const slideElements = document.querySelectorAll('.slide');
    for (let i = 0; i < slideElements.length; i++) {
        slides.push({
            'element': slideElements[i],
            'steps': getSlideSteps(slideElements[i]),
        });
    }

    document.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'ArrowLeft': gotoPrev(); break;
            case 'ArrowRight': gotoNext(); break;
        }
    });

    updateSlide();
}

function getSlideSteps(slideElement) {
    const elements = slideElement.querySelectorAll('[data-show-step], [data-hide-step]');
    let maxStep = 0;

    elements.forEach(el => {
        const showStep = Number(el.dataset.showStep || 0);

        const hideStep = el.dataset.hideStep !== undefined ? Number(el.dataset.hideStep) : 0;

        maxStep = Math.max(maxStep, showStep, hideStep);
    });

    return maxStep;
}

function gotoNext() {
    const currentSlide = slides[slide];

    if (step < currentSlide.steps) step++;
    else {
        if (slide < slides.length -1) {
            slide++;
            step = 0;
        }
    }

    updateSlide();
}
function gotoPrev() {
    if (step > 0) step--;
    else {
        slide--;
        if (slide < 0) slide = 0;
        step = slides[slide].steps;
    }

    updateSlide();
}

function updateSlide() {
    slides.forEach(slideObj => {
        slideObj.element.classList.remove('show');
    });

    const currentSlide = slides[slide];

    currentSlide.element.classList.add('show');

    updateStepVisibility(currentSlide.element);

    lastSlide = slide;

    sessionStorage.setItem('global.slide', slide);
    sessionStorage.setItem('global.step', step);
}
function updateStepVisibility(slideElement) {
    const elements = slideElement.querySelectorAll('[data-show-step], [data-hide-step]');

    elements.forEach(el => {
        const showStep = el.dataset.showStep !== undefined ? Number(el.dataset.showStep) : 0;
        const hideStep = el.dataset.hideStep !== undefined ? Number(el.dataset.hideStep) : Infinity;

        const visible = step >= showStep && step < hideStep;

        el.classList.toggle('step-visible', visible);
        el.classList.toggle('step-hidden', !visible);
    });
}


loadWikipedia("https://pt.wikipedia.org/wiki/JavaScript", 'embed_wikipedia_br_js');
loadWikipedia("https://en.wikipedia.org/wiki/JavaScript", 'embed_wikipedia_en_js');
loadWikipedia("https://pt.wikipedia.org/wiki/Brendan_Eich", 'embed_wikipedia_pt_brendan_eich');
loadPreview("https://developer.mozilla.org/pt-BR/docs/Web/JavaScript", 'embed_mozila_br_js');

main();
