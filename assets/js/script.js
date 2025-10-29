document.addEventListener('DOMContentLoaded', () => {
    // Mobile hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links (if using anchor links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('.main-header').offsetHeight, /* Adjust for fixed header */
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Scroll-to-top button (add button to HTML if desired)
    // const scrollToTopBtn = document.createElement('button');
    // scrollToTopBtn.id = 'scrollToTopBtn';
    // scrollToTopBtn.innerHTML = '&#9650;'; // Up arrow
    // document.body.appendChild(scrollToTopBtn);

    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 300) {
    //         scrollToTopBtn.classList.add('show');
    //     } else {
    //         scrollToTopBtn.classList.remove('show');
    //     }
    // });

    // scrollToTopBtn.addEventListener('click', () => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // });

    // Subtle fade-in or slide-up animations on scroll (requires Intersection Observer API)
    // This is a more advanced feature and would require more extensive JS.
    // For now, CSS hover animations are implemented.
});