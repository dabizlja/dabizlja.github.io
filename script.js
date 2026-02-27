document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Intersection Observer for scroll animations (Fade in up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's the skills section, animate the bars
                if (entry.target.querySelector('.skill-fill')) {
                    const bars = entry.target.querySelectorAll('.skill-fill');
                    bars.forEach(bar => {
                        bar.classList.add('animate');
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Navbar blur effect on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.85)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(25, 25, 35, 0.6)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle (simple version)
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Note: For a fully fleshed out mobile menu, we'd normally toggle a class 
            // and use CSS. Adding a simple alert or inline style toggle here for demonstration.
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 10, 15, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.backdropFilter = 'blur(20px)';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }

                // Scroll to element with offset for navbar
                const offset = 80; // navbar height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
