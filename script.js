const slider = document.querySelector('.slider-box ul');
const prevButton = document.querySelector('.slider-button.prev');
const nextButton = document.querySelector('.slider-button.next');
let currentSlide = 0;

prevButton.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        slider.style.transform = `translateX(-${currentSlide * 50}%)`;
    }
});

nextButton.addEventListener('click', () => {
    if (currentSlide < 1) { // Ajusta este número según la cantidad de slides
        currentSlide++;
        slider.style.transform = `translateX(-${currentSlide * 50}%)`;
    }
});
