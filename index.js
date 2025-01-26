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

