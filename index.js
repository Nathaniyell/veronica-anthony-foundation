document.getElementById('current-year').textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
    // Smooth scroll functionality for all navigation links
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

    // Counter Animation
    const counters = document.querySelectorAll('.count');
    let started = false;

    const startCount = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // Animation duration in milliseconds
        const step = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        };

        updateCounter();
    };

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const handleScroll = () => {
        if (!started && counters.length > 0) {
            const statsSection = document.querySelector('#impact');
            if (isElementInViewport(statsSection)) {
                counters.forEach(counter => startCount(counter));
                started = true;
                // Remove scroll listener after animation starts
                window.removeEventListener('scroll', handleScroll);
            }
        }
    };

    // Initial check and scroll listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // Handle scroll effects for header
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

    // Close mobile menu when clicking on links
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            isMenuOpen = false;
        });
    });
});
