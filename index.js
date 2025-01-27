    document.getElementById('current-year').textContent = new Date().getFullYear();

    document.addEventListener("DOMContentLoaded", () => {
        const counters = document.querySelectorAll(".count");
        let scrolled = false;

        const animateCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute("data-target");
                    const current = +counter.innerText;
                    const increment = target / 100;

                    if (current < target) {
                        counter.innerText = Math.ceil(current + increment);
                        setTimeout(updateCount, 100);
                    } else {
                        counter.innerText = target; 
                    }
                };

                updateCount();
            });
        };

        const handleScroll = () => {
            const statsSection = document.getElementById("stats");
            const sectionPosition = statsSection.getBoundingClientRect();
            if (sectionPosition.top <= window.innerHeight && !scrolled) {
                animateCounters();
                scrolled = true; // Ensure it only animates once
            }
        };

        window.addEventListener("scroll", handleScroll);
    });

   // Handle scroll effects
   window.addEventListener('scroll', () => {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 20) {
        header.classList.remove('bg-gradient-to-r', 'from-green-50', 'to-green-100');
        header.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-lg');
    } else {
        header.classList.add('bg-gradient-to-r', 'from-green-50', 'to-green-100');
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
