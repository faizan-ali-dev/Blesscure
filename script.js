tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-secondary": "#ffffff",
                    "on-primary-fixed": "#001d33",
                    "error": "#ba1a1a",
                    "inverse-surface": "#2e3133",
                    "on-primary": "#ffffff",
                    "error-container": "#ffdad6",
                    "tertiary-container": "#304a5d",
                    "surface-container-highest": "#e0e2e5",
                    "surface-container": "#eceff3",
                    "secondary-fixed-dim": "#b8c9d9",
                    "primary-fixed": "#c2e8ff",
                    "surface-variant": "#dfe3e9",
                    "secondary-fixed": "#d3e5f5",
                    "surface-dim": "#d7dadf",
                    "on-tertiary-container": "#a2b8cc",
                    "surface-bright": "#f8f9ff",
                    "on-tertiary-fixed-variant": "#364a59",
                    "tertiary-fixed-dim": "#b5c9d7",
                    "on-primary-fixed-variant": "#004a77",
                    "surface": "#f8faff",
                    "on-background": "#191c1e",
                    "inverse-on-surface": "#f0f1f4",
                    "on-surface": "#191c1e",
                    "tertiary-fixed": "#d1e4f2",
                    "outline-variant": "#c0c8cd",
                    "on-tertiary": "#ffffff",
                    "surface-tint": "#007bff",
                    "primary": "#007bff",
                    "on-primary-container": "#004a77",
                    "tertiary": "#1e2f3d",
                    "on-error": "#ffffff",
                    "surface-container-low": "#f1f4f9",
                    "on-error-container": "#93000a",
                    "inverse-primary": "#7ccfff",
                    "secondary": "#4a6273",
                    "primary-fixed-dim": "#7ccfff",
                    "on-secondary-container": "#324a5a",
                    "on-secondary-fixed-variant": "#324a5a",
                    "on-secondary-fixed": "#071e2c",
                    "background": "#f8faff",
                    "on-tertiary-fixed": "#0a1e2b",
                    "secondary-container": "#d3e5f5",
                    "primary-container": "#004a77",
                    "outline": "#70787d",
                    "surface-container-lowest": "#ffffff",
                    "surface-container-high": "#e6e9ee",
                    "on-surface-variant": "#40484d"
            },
            "borderRadius": {
                    "DEFAULT": "1rem",
                    "lg": "2rem",
                    "xl": "3rem",
                    "full": "9999px"
            },
            "fontFamily": {
                    "headline": ["Noto Serif"],
                    "body": ["Manrope"],
                    "label": ["Manrope"]
            }
          },
        },
      };

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('translate-x-full');
        mobileMenuOverlay.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
    };

    if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', toggleMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', toggleMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            mobileMenuOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
    });


    // ScrollSpy & Active Link logic
    const sections = document.querySelectorAll('section[id], div[id^="about-"], footer[id]');
    const navLinks = document.querySelectorAll('nav .hidden.md\\:flex a, #mobile-menu .flex-col a');

    const dtHighlight = ['text-[#006385]', 'border-b-2', 'border-[#006385]', 'pb-1', 'font-semibold'];
    const dtNormal = ['text-[#171c1e]/70', 'dark:text-[#f5fafc]/70'];
    
    const mobHighlight = ['text-[#006385]', 'font-bold', 'border-l-4', 'border-[#006385]'];
    const mobNormal = ['text-[#171c1e]/70', 'dark:text-[#f5fafc]/70'];

    function setActiveLink(targetHref) {
        navLinks.forEach(link => {
            const isMobile = link.parentElement.classList.contains('flex-col');
            const href = link.getAttribute('href');
            
            let isActive = false;
            
            if (href === targetHref) {
                isActive = true;
            } else if (targetHref === '#home' && (href === 'index.html' || href === '#')) {
                isActive = true;
            }

            if (isActive) {
                if (isMobile) {
                    link.classList.remove(...mobNormal);
                    link.classList.add(...mobHighlight);
                } else {
                    link.classList.remove(...dtNormal);
                    link.classList.add(...dtHighlight);
                }
            } else {
                if (isMobile) {
                    link.classList.remove(...mobHighlight);
                    link.classList.add(...mobNormal);
                } else {
                    link.classList.remove(...dtHighlight);
                    link.classList.add(...dtNormal);
                }
            }
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage.includes('services.html')) {
        setActiveLink('services.html');
    } else {
        // Set up ScrollSpy for index.html
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px', // Trigger when section passes top 20%
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveLink('#' + entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach(sec => observer.observe(sec));
    }

});