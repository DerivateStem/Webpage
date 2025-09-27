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
// para carrusel de novedades
const track = document.querySelector(".novedades-track");
const slides = document.querySelectorAll(".novedad-img-box");
const prevBtn = document.querySelector(".novedades-btn.prev");
const nextBtn = document.querySelector(".novedades-btn.next");

let index = 0;

function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;  // vuelve al inicio
    updateSlider();
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length; // va al final si retrocedes desde la primera
    updateSlider();
});
