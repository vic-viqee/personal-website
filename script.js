document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Navigation Toggle
    const burger = document.querySelector('.nav-burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    burger.addEventListener('click', () => {
        // Toggle the 'active' class on the links list
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });


    // 2. Smooth Scrolling for Anchor Links (Fallback for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Offset for the fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 3. Theme Switcher
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;

    const applyTheme = (theme) => {
        body.classList.remove('theme-dark', 'theme-cyberpunk');
        if (theme !== 'default') {
            body.classList.add(`theme-${theme}`);
        }
        localStorage.setItem('victor-lewis-murimi-portfolio-theme', theme);
    };

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            applyTheme(theme);
        });
    });

    // Load saved theme on page load
    const savedTheme = localStorage.getItem('victor-lewis-murimi-portfolio-theme') || 'default';
    applyTheme(savedTheme);

    // 4. Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.project-box');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            projectBoxes.forEach(project => {
                const projectCategory = project.dataset.category;
                if (category === 'all' || projectCategory === category) {
                    project.style.display = 'block'; // Show project
                } else {
                    project.style.display = 'none'; // Hide project
                }
            });
        });
    });

    // 5. Scroll Animations (Intersection Observer)
    const animateOnScrollElements = document.querySelectorAll('.comic-panel, .project-box, .section-header, .comic-btn, .avatar-container, .speech-bubble, .contact-card, .social-btn, .timeline-event, .badge-item, .tool-item, .hobby-bubble, .motto-container');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Determine animation type based on element or add specific classes in HTML
                if (entry.target.classList.contains('comic-panel')) {
                    // Specific animation for comic panels
                    entry.target.classList.add('animate-fade-in');
                } else if (entry.target.classList.contains('project-box')) {
                    entry.target.classList.add('animate-pop-in');
                } else if (entry.target.classList.contains('section-header')) {
                    entry.target.classList.add('animate-pop-in');
                } else if (entry.target.classList.contains('skill-item')) {
                    const skillBar = entry.target.querySelector('.skill-bar');
                    if (skillBar) {
                        skillBar.style.width = skillBar.style.width; // Re-apply width to trigger transition
                    }
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(element => {
        element.classList.add('hidden-element'); // Add initial hidden state
        observer.observe(element);
    });

    // 6. Clickable Project Panels (Flip Effect)
    projectBoxes.forEach(projectBox => {
        const projectInfoFront = projectBox.querySelector('.project-info-front');
        const projectDetailsBack = projectBox.querySelector('.project-details-back');
        const closeButton = projectBox.querySelector('.close-details-btn');

        // Toggle flip on clicking the front of the card
        if (projectInfoFront) {
            projectInfoFront.addEventListener('click', () => {
                projectBox.classList.add('flipped');
            });
        }

        // Close flip on clicking the close button
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event from bubbling to the projectInfoFront
                projectBox.classList.remove('flipped');
            });
        }
    });

    // 7. Mini Quest and Achievement System
    const geminiQuestTrigger = document.getElementById('gemini-quest-trigger');
    const achievementNotification = document.getElementById('achievement-notification');

    const showAchievement = (message) => {
        if (achievementNotification) {
            achievementNotification.textContent = message;
            achievementNotification.classList.add('show');
            setTimeout(() => {
                achievementNotification.classList.remove('show');
            }, 3000); // Hide after 3 seconds
        }
    };

    if (geminiQuestTrigger) {
        geminiQuestTrigger.addEventListener('click', () => {
            if (!localStorage.getItem('geminiQuestComplete')) {
                localStorage.setItem('geminiQuestComplete', 'true');
                showAchievement('ACHIEVEMENT UNLOCKED: GEMINI SEEKER!');
                // Optionally, reveal hidden content or enable new features here
            } else {
                showAchievement('You already found the Gemini secret!');
            }
        });
    }

    // 8. Fun Fact Bubble Interaction
    const funFactBubble = document.getElementById('fun-fact-bubble');
    const funFactText = document.getElementById('fun-fact-text');

    const funFacts = [
        "I once debugged for 48 hours straight fueled by coffee and sheer willpower!",
        "My keyboard has seen more action than a superhero's utility belt!",
        "I can code in my sleep... sometimes literally!",
        "My favorite superpower is turning caffeine into code!",
        "I believe every bug is just a feature in disguise... a very stubborn feature."
    ];

    let currentFactIndex = 0;

    const displayFunFact = () => {
        if (funFactBubble && funFactText) {
            funFactText.textContent = funFacts[currentFactIndex];
            funFactBubble.classList.add('show');
            currentFactIndex = (currentFactIndex + 1) % funFacts.length;
        }
    };

    // Initial display after a short delay
    setTimeout(() => {
        displayFunFact();
    }, 5000); // Display first fact after 5 seconds

    // Cycle facts every 10 seconds
    setInterval(() => {
        funFactBubble.classList.remove('show');
        setTimeout(() => {
            displayFunFact();
        }, 1000); // Allow time for hide animation before showing next
    }, 10000);
});

window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
});