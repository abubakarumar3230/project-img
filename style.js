document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth navigation highlighting based on scrolling position
    const panels = document.querySelectorAll('.panel');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentPanelId = '';
        
        panels.forEach(panel => {
            const panelTop = panel.offsetTop;
            // Detect when panel occupies the majority of the view
            if (pageYOffset >= panelTop - 150) {
                currentPanelId = panel.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentPanelId}`) {
                link.classList.add('active');
            }
        });
    });

    // Optional subtle fade-in transition for sections when they appear on screen
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    panels.forEach(panel => {
        // Prepare elements for structural animation
        if(panel.id !== 'home') {
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(20px)';
            panel.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            sectionObserver.observe(panel);
        }
    });
});
