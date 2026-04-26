document.getElementById('current-year').textContent = new Date().getFullYear();

const EVENTS_TAB_BASE =
    'events-tab-btn shrink-0 snap-start rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2';
const EVENTS_TAB_ACTIVE =
    'bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-md';
const EVENTS_TAB_INACTIVE =
    'bg-white/90 text-purple-900 ring-1 ring-purple-200 shadow-sm hover:bg-white hover:ring-purple-300';

function readEventsProgramFromHash() {
    const h = window.location.hash;
    if (h.startsWith('#events--')) {
        const slug = h.slice('#events--'.length);
        return slug || 'all';
    }
    return 'all';
}

function setEventsHash(program) {
    if (program === 'all') {
        history.replaceState(null, '', '#events');
    } else {
        history.replaceState(null, '', '#events--' + program);
    }
}

function applyEventsProgramFilter(program) {
    const stack = document.getElementById('events-cards-stack');
    if (!stack) return;
    let visibleCount = 0;
    stack.querySelectorAll('.event-card').forEach((card) => {
        const match = program === 'all' || card.dataset.eventProgram === program;
        card.classList.toggle('hidden', !match);
        if (match) visibleCount += 1;
    });
    const emptyEl = document.getElementById('events-empty-state');
    if (emptyEl) {
        const showEmpty = program !== 'all' && visibleCount === 0;
        emptyEl.classList.toggle('hidden', !showEmpty);
    }
}

function updateEventsTabButtons(activeProgram, tabButtons) {
    tabButtons.forEach((btn) => {
        const tab = btn.dataset.eventsTab;
        const isActive = tab === activeProgram;
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        btn.className = EVENTS_TAB_BASE + ' ' + (isActive ? EVENTS_TAB_ACTIVE : EVENTS_TAB_INACTIVE);
    });
}

window.setEventsProgramTab = function (program, opts) {
    opts = opts || {};
    const section = document.getElementById('events');
    if (!section) return;
    const tabButtons = section.querySelectorAll('[data-events-tab]');
    if (!tabButtons.length) return;
    const valid = new Set(
        Array.from(tabButtons).map((b) => b.dataset.eventsTab)
    );
    const resolved = valid.has(program) ? program : 'all';
    updateEventsTabButtons(resolved, tabButtons);
    applyEventsProgramFilter(resolved);
    const tabSelect = document.getElementById('events-tab-select');
    if (tabSelect && tabSelect.value !== resolved) {
        tabSelect.value = resolved;
    }
    if (opts.updateHash) {
        setEventsHash(resolved);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
        const tabButtons = eventsSection.querySelectorAll('[data-events-tab]');
        tabButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const program = btn.dataset.eventsTab;
                window.setEventsProgramTab(program, { updateHash: true });
            });
        });
        const eventsTabSelect = document.getElementById('events-tab-select');
        if (eventsTabSelect) {
            eventsTabSelect.addEventListener('change', () => {
                window.setEventsProgramTab(eventsTabSelect.value, { updateHash: true });
            });
        }
        window.addEventListener('hashchange', () => {
            if (!window.location.hash.startsWith('#events')) return;
            window.setEventsProgramTab(readEventsProgramFromHash(), { updateHash: false });
        });
        window.setEventsProgramTab(readEventsProgramFromHash(), { updateHash: false });
    }
});

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
            const program = this.dataset.eventsProgram;
            const href = this.getAttribute('href');
            if (typeof window.setEventsProgramTab === 'function') {
                if (program) {
                    window.setEventsProgramTab(program, { updateHash: true });
                } else if (href === '#events') {
                    window.setEventsProgramTab('all', { updateHash: true });
                }
            }
            const targetId = href;
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



document.addEventListener('DOMContentLoaded', function () {
    class Carousel {
        constructor(container) {
            this.container = container;
            this.slides = container.querySelectorAll('.carousel-slide');
            this.indicators = container.querySelectorAll('.gallery-indicator');
            this.prevButton = container.querySelector('.carousel-prev');
            this.nextButton = container.querySelector('.carousel-next');
            this.currentSlide = 0;

            this.init();
        }

        init() {
            this.updateSlides();

            // Event listeners
            this.nextButton.addEventListener('click', () => this.nextSlide());
            this.prevButton.addEventListener('click', () => this.prevSlide());

            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    this.currentSlide = index;
                    this.updateSlides();
                });
            });

            setInterval(() => this.nextSlide(), 5000);
        }

        updateSlides() {
            this.slides.forEach((slide, index) => {
                if (index === this.currentSlide) {
                    slide.classList.remove('hidden');
                } else {
                    slide.classList.add('hidden');
                }
            });

            this.indicators.forEach((indicator, index) => {
                if (index === this.currentSlide) {
                    indicator.classList.add('bg-white/80');
                    indicator.classList.remove('bg-white/50');
                } else {
                    indicator.classList.remove('bg-white/80');
                    indicator.classList.add('bg-white/50');
                }
            });
        }

        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.updateSlides();
        }

        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.updateSlides();
        }
    }

    // Initialize carousels
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(container => new Carousel(container));
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


