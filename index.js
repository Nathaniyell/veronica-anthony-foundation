document.getElementById('current-year').textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopButton = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollToTopButton.classList.remove('opacity-0', 'translate-y-10');
        } else {
            scrollToTopButton.classList.add('opacity-0', 'translate-y-10');
        }
    });


    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    window.addEventListener('scroll', () => {
        const header = document.getElementById('mainHeader');
        if (window.scrollY > 20) {
            header.classList.remove('bg-gradient-to-r', 'from-purple-50', 'to-purple-100');
            header.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-lg');
        } else {
            header.classList.add('bg-gradient-to-r', 'from-purple-50', 'to-purple-100');
            header.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-lg');
        }
    });

    // Handle mobile menu
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    let isMenuOpen = false;

    mobileMenuButton.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.style.display = 'block';
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            mobileMenu.style.display = 'none';
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });


    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            isMenuOpen = false;
        });
    });
});



// Carousel functionality
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.carousel-indicator');
    const prevButton = carousel.querySelector('.carousel-prev');
    const nextButton = carousel.querySelector('.carousel-next');
    let currentSlide = 0;

    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.remove('hidden');
            } else {
                slide.classList.add('hidden');
            }
        });

        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('bg-white/80');
                indicator.classList.remove('bg-white/50');
            } else {
                indicator.classList.remove('bg-white/80');
                indicator.classList.add('bg-white/50');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSlides();
        });
    });

    // Optional: Auto-advance slides every 2 seconds
    setInterval(nextSlide, 2000);
});


