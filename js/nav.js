// Sticky-nav behavior: scroll-aware tinting, active-link highlighting
// (via IntersectionObserver), and mobile menu toggle.

(function () {
    const nav = document.querySelector('.site-nav');
    if (!nav) {
        return;
    }

    const toggle = nav.querySelector('.nav-toggle');
    const menu = nav.querySelector('.nav-menu');
    const links = Array.from(nav.querySelectorAll('.nav-link'));

    // --- Scroll tint -------------------------------------------------
    let ticking = false;
    function updateScrollState() {
        if (window.scrollY > 80) {
            nav.classList.add('is-scrolled');
        } else {
            nav.classList.remove('is-scrolled');
        }
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollState);
            ticking = true;
        }
    }, { passive: true });
    updateScrollState();

    // --- Active link via IntersectionObserver -----------------------
    const sectionMap = new Map();
    links.forEach(function (link) {
        const id = link.getAttribute('href');
        if (id && id.startsWith('#')) {
            const target = document.querySelector(id);
            if (target) {
                sectionMap.set(target, link);
            }
        }
    });

    if ('IntersectionObserver' in window && sectionMap.size > 0) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                const link = sectionMap.get(entry.target);
                if (!link) {
                    return;
                }
                if (entry.isIntersecting) {
                    links.forEach(function (l) { l.classList.remove('is-active'); });
                    link.classList.add('is-active');
                }
            });
        }, {
            rootMargin: '-45% 0px -50% 0px',
            threshold: 0
        });
        sectionMap.forEach(function (_link, section) { observer.observe(section); });
    }

    // --- Mobile menu toggle -----------------------------------------
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            menu.classList.toggle('is-open', !expanded);
        });

        links.forEach(function (link) {
            link.addEventListener('click', function () {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('is-open');
            });
        });
    }
})();
