document.addEventListener('DOMContentLoaded', function() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Live typing effect (the full name is in the HTML, so it still shows without JS)
    function typeEffect(element, text, delay = 100) {
        let i = 0;
        element.textContent = '';
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, delay);
            }
        }
        type();
    }

    const heroTitle = document.getElementById('typing-text');
    if (heroTitle && !reduceMotion) {
        typeEffect(heroTitle, heroTitle.dataset.text || heroTitle.textContent, 100);
    }

    // Navbar: solid background once the page is scrolled
    const nav = document.getElementById('mainNav');
    function updateNav() {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }
    if (nav) {
        updateNav();
        window.addEventListener('scroll', updateNav, { passive: true });

        // Solid background while the mobile menu is open, and close it after a click
        if (window.jQuery) {
            const $collapse = window.jQuery('#navbarNav');
            $collapse.on('show.bs.collapse', function() { nav.classList.add('menu-open'); });
            $collapse.on('hidden.bs.collapse', function() { nav.classList.remove('menu-open'); });
            nav.querySelectorAll('.nav-link').forEach(function(link) {
                link.addEventListener('click', function() {
                    if ($collapse.hasClass('show')) {
                        $collapse.collapse('hide');
                    }
                });
            });
        }
    }

    // Reveal elements as they scroll into view
    const revealItems = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealItems.forEach(function(el) { observer.observe(el); });
    } else {
        revealItems.forEach(function(el) { el.classList.add('visible'); });
    }
});
