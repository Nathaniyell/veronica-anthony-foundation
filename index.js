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



// Gallery carousel functionality
document.addEventListener('DOMContentLoaded', function () {
    const galleryCarousel = document.querySelector('.gallery-carousel');
    if (!galleryCarousel) return;

    const slides = galleryCarousel.querySelector('.gallery-slides');
    const slideElements = galleryCarousel.querySelectorAll('.gallery-slide');
    const indicators = galleryCarousel.querySelectorAll('.gallery-indicator');
    const prevButton = galleryCarousel.querySelector('.gallery-prev');
    const nextButton = galleryCarousel.querySelector('.gallery-next');
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');

    let currentSlide = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function updateSlides(index) {
        currentSlide = index;
        const translateX = -currentSlide * 100;
        slides.style.transform = `translateX(${translateX}%)`;

        // Update indicators
        indicators.forEach((indicator, i) => {
            if (i === currentSlide) {
                indicator.classList.add('bg-white/80');
                indicator.classList.remove('bg-white/50');
            } else {
                indicator.classList.remove('bg-white/80');
                indicator.classList.add('bg-white/50');
            }
        });

        // Update thumbnails
        thumbnails.forEach((thumbnail, i) => {
            if (i === currentSlide) {
                thumbnail.classList.add('border-purple-700');
                thumbnail.classList.remove('border-transparent');
            } else {
                thumbnail.classList.remove('border-purple-700');
                thumbnail.classList.add('border-transparent');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideElements.length;
        updateSlides(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideElements.length) % slideElements.length;
        updateSlides(currentSlide);
    }

    // Touch events for mobile swipe
    function touchStart(event) {
        isDragging = true;
        startPos = event.type.includes('mouse')
            ? event.pageX
            : event.touches[0].clientX;
        slides.style.transition = 'none';
    }

    function touchMove(event) {
        if (!isDragging) return;

        const currentPosition = event.type.includes('mouse')
            ? event.pageX
            : event.touches[0].clientX;
        const diff = currentPosition - startPos;
        const slideWidth = galleryCarousel.offsetWidth;
        currentTranslate = prevTranslate + (diff / slideWidth) * 100;

        // Limit the drag to the next/previous slide only
        const minTranslate = -((slideElements.length - 1) * 100);
        currentTranslate = Math.max(minTranslate, Math.min(0, currentTranslate));

        slides.style.transform = `translateX(${currentTranslate}%)`;
    }

    function touchEnd() {
        isDragging = false;
        slides.style.transition = 'transform 0.3s ease-out';

        const movePercent = currentTranslate - prevTranslate;

        if (Math.abs(movePercent) > 20) {
            if (movePercent > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        } else {
            updateSlides(currentSlide);
        }

        prevTranslate = -currentSlide * 100;
    }

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => updateSlides(index));
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => updateSlides(index));
    });

    // Touch events
    slides.addEventListener('touchstart', touchStart);
    slides.addEventListener('touchmove', touchMove);
    slides.addEventListener('touchend', touchEnd);
    slides.addEventListener('mousedown', touchStart);
    slides.addEventListener('mousemove', touchMove);
    slides.addEventListener('mouseup', touchEnd);
    slides.addEventListener('mouseleave', touchEnd);

    // Prevent context menu on long press
    slides.addEventListener('contextmenu', e => e.preventDefault());

    // Auto-advance slides every 5 seconds
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pause autoplay on hover
    galleryCarousel.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    galleryCarousel.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });

    // Initialize first slide
    updateSlides(0);
});


