const slider = document.getElementById('testimonial-slider');
const dots = document.querySelectorAll('.indicator'); // Select all dots
let slideIndex = 0;
function showSlides() {
    const slides = slider.getElementsByClassName('testimonial-slide');
    // Update the transform for the slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(${-(slideIndex * 100)}%)`;
    }
    // Update the dot indicators
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
    slideIndex++;
    if (slideIndex >= slides.length) { slideIndex = 0; }

    setTimeout(showSlides, 5000); // Change slide every 5 seconds
}
showSlides();
